import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Box, Stack, TextField } from '@mui/material';

import { editPost } from '../../redux/actions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

export default function EditPostModal({ open, setOpen, thePost }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(thePost.title);
  const [body, setBody] = useState(thePost.body);

  const editedPost = useSelector((state) => state.editedPost);
  const { success } = editedPost;

  const handleClose = () => setOpen(false);
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeBody = (e) => {
    setBody(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editPost(thePost.id, title, body));
  };

  useEffect(() => {
    if (success) {
      handleClose();
    }
  }, [success, dispatch]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField name="title" label="Title" defaultValue={title} multiline onChange={handleChangeTitle} />
            <TextField name="body" label="Body" defaultValue={body} multiline onChange={handleChangeBody} />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
