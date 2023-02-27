import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import PostsTable from '../components/PostsTable';

import { fetchPosts } from '../redux/actions';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { success: successLogin, userInfo } = userLogin;

  const posts = useSelector((state) => state.posts);
  const { success: successPosts, thePosts } = posts;

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  // Check authorization
  useEffect(() => {
    if (!userInfo && !successLogin) {
      // navigate to login page
      navigate('/login', { replace: true });
    }
  }, [userInfo, successLogin]);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        {successPosts && <PostsTable thePosts={thePosts} />}
      </Container>
    </>
  );
}
