import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Alert,
  Snackbar,
} from '@mui/material';
// components
import Iconify from './iconify';
import Scrollbar from './scrollbar';
import EditPostModal from './modals/EditPostModal';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import { deletePost } from '../redux/actions';
import { DELETE_POST_RESET, EDIT_POST_RESET } from '../redux/constant';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '#', label: '#', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'body', label: 'Body', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PostsTable({ thePosts }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [thePost, setThePost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('info');
  const [alertMsg, setAlertMsg] = useState('');

  const deletedPost = useSelector((state) => state.deletedPost);
  const { success: successDelete, error: errorDelete } = deletedPost;

  const editedPost = useSelector((state) => state.editedPost);
  const { success: successEdit, error: errorEdit } = editedPost;

  useEffect(() => {
    if (successDelete) {
      setAlertSeverity('success');
      setAlertMsg('The post deleted successfully.');
      setOpenAlert(true);
      dispatch({ type: DELETE_POST_RESET });
    } else if (errorDelete) {
      setAlertSeverity('error');
      setAlertMsg(errorDelete);
      setOpenAlert(true);
    }
  }, [successDelete, errorDelete]);

  useEffect(() => {
    if (successEdit) {
      setAlertSeverity('success');
      setAlertMsg('The post updated successfully.');
      setOpenAlert(true);
      dispatch({ type: EDIT_POST_RESET });
    } else if (errorEdit) {
      setAlertSeverity('error');
      setAlertMsg(errorEdit);
      setOpenAlert(true);
    }
  }, [successEdit, errorEdit]);

  const handleOpenMenu = (event, row) => {
    setThePost(row);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleDelete = () => {
    dispatch(deletePost(thePost.id));
  };

  const handleEdit = () => {
    setModalOpen(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = thePosts.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, title) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - thePosts.length) : 0;

  const filteredPosts = applySortFilter(thePosts, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredPosts.length && !!filterName;

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Posts
        </Typography>
      </Stack>

      <Card>
        <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={thePosts.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { id, title, body } = row;
                  const selectedPost = selected.indexOf(id) !== -1;

                  return (
                    <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedPost}>
                      <TableCell padding="checkbox">
                        <Checkbox checked={selectedPost} onChange={(event) => handleClick(event, title)} />
                      </TableCell>

                      <TableCell component="th" scope="row" padding="none">
                        <Typography variant="subtitle2" noWrap>
                          {id}
                        </Typography>
                      </TableCell>

                      <TableCell align="left">{title}</TableCell>

                      <TableCell align="left">{body}</TableCell>

                      <TableCell align="right">
                        <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row)}>
                          <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={thePosts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      {modalOpen && thePost && <EditPostModal open={modalOpen} setOpen={setModalOpen} thePost={thePost} />}
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMsg}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

PostsTable.propTypes = {
  thePosts: PropTypes.array,
};
