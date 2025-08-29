import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Divider,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle as AccountIcon,
  Dashboard as DashboardIcon,
  Tour as TourIcon,
  BookOnline as BookingIcon,
  People as UserIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AppBar position="static" elevation={1} sx={{ backgroundColor: '#fff', color: 'text.primary' }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 70 }}>
        {/* Logo */}
        <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography 
            component="span" 
            sx={{ 
              color: 'primary.main',
              fontSize: 28,
              fontWeight: 'bold',
              fontFamily: 'inherit'
            }}
          >
            Tour
          </Typography>
          <Typography 
            component="span" 
            sx={{ 
              color: 'secondary.main',
              fontSize: 28,
              fontWeight: 'bold',
              fontFamily: 'inherit'
            }}
          >
            Bay
          </Typography>
        </RouterLink>

        {/* Navigation Links - Desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
          <RouterLink to="/tour" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
              Tours
            </Button>
          </RouterLink>
          
          <RouterLink to="/exploreNow" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
              Explore
            </Button>
          </RouterLink>

          {user && (
            <div>
              
              
              <RouterLink to="/bookings" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit" sx={{ textTransform: 'none', fontWeight: 500 }}>
                  My Bookings
                </Button>
              </RouterLink>
            </div>
          )}

          {isAdmin && (
            <RouterLink to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button 
                color="inherit" 
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 500,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}
                startIcon={<AdminIcon />}
              >
                Admin
              </Button>
            </RouterLink>
          )}
        </Box>

        {/* User Menu / Auth Buttons - Desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          {user ? (
            <div>
              <Chip
                icon={isAdmin ? <AdminIcon /> : <PersonIcon />}
                label={isAdmin ? 'Admin' : 'User'}
                color={isAdmin ? 'error' : 'primary'}
                size="small"
                variant="outlined"
              />
              <IconButton
                onClick={handleUserMenuOpen}
                sx={{ p: 0 }}
              >
                <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                  {user.firstName ? user.firstName[0] : user.email[0]}
                </Avatar>
              </IconButton>
            </div>
          ) : (
            <div>
              <RouterLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit" sx={{ textTransform: 'none' }}>
                  Login
                </Button>
              </RouterLink>
              <RouterLink to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button 
                  variant="contained" 
                  sx={{ 
                    textTransform: 'none',
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    }
                  }}
                >
                  Sign Up
                </Button>
              </RouterLink>
            </div>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuItem onClick={handleMenuClose}>
            <RouterLink to="/tour" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <Button fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                Tours
              </Button>
            </RouterLink>
          </MenuItem>
          
          <MenuItem onClick={handleMenuClose}>
            <RouterLink to="/exploreNow" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <Button fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                Explore
              </Button>
            </RouterLink>
          </MenuItem>

          {user && (
            <div>
            
              
              <MenuItem onClick={handleMenuClose}>
                <RouterLink to="/bookings" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <Button fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                    My Bookings
                  </Button>
                </RouterLink>
              </MenuItem>
            </div>
          )}

          {isAdmin && (
            <MenuItem onClick={handleMenuClose}>
              <RouterLink to="/admin" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                <Button 
                  fullWidth 
                  sx={{ 
                    justifyContent: 'flex-start', 
                    textTransform: 'none',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    }
                  }}
                  startIcon={<AdminIcon />}
                >
                  Admin Dashboard
                </Button>
              </RouterLink>
            </MenuItem>
          )}

          {!user && (
            <div>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <RouterLink to="/login" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <Button fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>
                    Login
                  </Button>
                </RouterLink>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <RouterLink to="/register" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    sx={{ 
                      justifyContent: 'flex-start', 
                      textTransform: 'none',
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark'
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </RouterLink>
              </MenuItem>
            </div>
          )}
        </Menu>

        {/* User Menu */}
        <Menu
          anchorEl={userMenuAnchorEl}
          open={Boolean(userMenuAnchorEl)}
          onClose={handleUserMenuClose}
          PaperProps={{
            sx: { minWidth: 200 }
          }}
        >
          <MenuItem onClick={handleUserMenuClose}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                {user?.firstName ? user.firstName[0] : user?.email[0]}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight="medium">
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="caption" color="text.secondary"> 
                  {user?.email}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
          
          <Divider />
          
          {isAdmin && (
            <div>
              <MenuItem onClick={() => { navigate('/admin'); handleUserMenuClose(); }}>
                <DashboardIcon sx={{ mr: 1 }} />
                Admin Dashboard
              </MenuItem>
              <MenuItem onClick={() => { navigate('/admin/tours'); handleUserMenuClose(); }}>
                <TourIcon sx={{ mr: 1 }} />
                Manage Tours
              </MenuItem>
              <MenuItem onClick={() => { navigate('/admin/bookings'); handleUserMenuClose(); }}>
                <BookingIcon sx={{ mr: 1 }} />
                Manage Bookings
              </MenuItem>
              <MenuItem onClick={() => { navigate('/admin/users'); handleUserMenuClose(); }}>
                <UserIcon sx={{ mr: 1 }} />
                Manage Users
              </MenuItem>
              <Divider />
            </div>
          )}
          
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
