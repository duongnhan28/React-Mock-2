import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeLogin } from '../../redux/loginSlice';
import {
  Box,
  Tabs,
  Tab,
  AppBar,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Container,
  Toolbar,
} from '@mui/material';

const route = ['/', '/leaderboard', '/add'];
const settings = ['Logout'];

const Header = () => {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.login.authedUser);
  const users = useSelector((state) => state.users.users);
  const [value, setValue] = useState('/'); // Initialize state with a default value
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(removeLogin());
  };

  useEffect(() => {
    setValue(window.location.pathname); // Set initial value based on window location
  }, []);

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="">
        <Toolbar disableGutters>
          <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" role="navigation">
              {route.map((path, index) => (
                <Tab key={path} label={index === 0 ? 'Home' : index === 1 ? 'Leaderboard' : 'New'} 
                  value={path} component={Link} to={path} />
              ))}
            </Tabs>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src={users[authedUser]?.avatarURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleLogout}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography marginLeft="5px" component="p">{authedUser}</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
