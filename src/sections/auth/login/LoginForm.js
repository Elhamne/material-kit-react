import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  Alert,
  Snackbar,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { login } from '../../../redux/actions';
import { USER_LOGIN_RESET } from '../../../redux/constant';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [open, setOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { success, error, userInfo } = userLogin;

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleClick = () => {
    dispatch(login(email, password));
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (success && userInfo) {
      navigate('/dashboard', { replace: true });
    } else if (error) {
      setAlertMsg(error);
      setOpen(true);
      dispatch({ type: USER_LOGIN_RESET });
    }
  }, [success, userInfo, error]);

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={handleChangeEmail} />

        <TextField
          name="password"
          label="Password"
          onChange={handleChangePassword}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <FormControlLabel control={<Checkbox name="remember" />} label="Remember me" />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {alertMsg}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
