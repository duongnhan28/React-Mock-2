import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import {
  Avatar,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Alert,
  Snackbar,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLogin } from '../../redux/loginSlice';
import { checkLogin } from '../../redux/utils/loginAPI';
import LoadingButton from '@mui/lab/LoadingButton';

const theme = createTheme();

const Login = () => {
  const location = useLocation();
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    const username = formData.get('username');
    const password = formData.get('password');
    const result = await checkLogin(username, password);
    setLoading(false);

    if (result) {
      dispatch(setLogin({ id: username }));
      setShowError(false);
      navigate(location.state?.prevUrl || '/');
    } else {
      setShowError(true);
    }
  };

  const handleCloseAlert = () => setShowError(false);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoFocus
                data-testid="username"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                data-testid="password"
              />
              <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                data-testid="submit-btn"
              >
                Sign In
              </LoadingButton>
              <Snackbar
                open={showError}
                autoHideDuration={5000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Alert severity="error">Invalid username or password</Alert>
              </Snackbar>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
