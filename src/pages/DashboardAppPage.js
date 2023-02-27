import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import PostsTable from '../components/PostsTable';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { success: successLogin, userInfo } = userLogin;

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
        <PostsTable />
      </Container>
    </>
  );
}
