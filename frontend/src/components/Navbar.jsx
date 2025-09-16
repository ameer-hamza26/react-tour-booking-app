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
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        color: 'text.primary'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 80, px: { xs: 2, md: 4 } }}>
        {/* Logo */}
        <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundColor: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              T
            </Box>
            <Typography 
              component="span" 
              sx={{ 
                color: '#2563eb',
                fontSize: 28,
                fontWeight: 800,
                fontFamily: 'inherit',
                letterSpacing: '-0.5px'
              }}
            >
              TourBay
            </Typography>
          </Box>
        </RouterLink>

        {/* Navigation Links - Desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
          <RouterLink to="/tour" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button 
              color="inherit" 
              sx={{ 
                textTransform: 'none', 
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.08)',
                  color: 'primary.main'
                }
              }}
            >
              Tours
            </Button>
          </RouterLink>
          
          <RouterLink to="/exploreNow" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button 
              color="inherit" 
              sx={{ 
                textTransform: 'none', 
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.08)',
                  color: 'primary.main'
                }
              }}
            >
              Explore
            </Button>
          </RouterLink>

          {user && (
            <RouterLink to="/bookings" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button 
                color="inherit" 
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.08)',
                    color: 'primary.main'
                  }
                }}
              >
                My Bookings
              </Button>
            </RouterLink>
          )}

          {isAdmin && (
            <RouterLink to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button 
                variant="contained"
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: '#059669',
                  '&:hover': {
                    backgroundColor: '#047857',
                  }
                }}
                startIcon={<AdminIcon />}
              >
                Admin Panel
              </Button>
            </RouterLink>
          )}
        </Box>

        {/* User Menu / Auth Buttons - Desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                icon={isAdmin ? <AdminIcon /> : <PersonIcon />}
                label={isAdmin ? 'Administrator' : 'Customer'}
                color={isAdmin ? 'secondary' : 'primary'}
                size="medium"
                sx={{
                  fontWeight: 600,
                  px: 1,
                  '& .MuiChip-icon': {
                    fontSize: '1rem'
                  }
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{ 
                    p: 0,
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 44, 
                      height: 44, 
                      backgroundColor: isAdmin ? '#059669' : '#2563eb',
                      fontWeight: 'bold',
                      fontSize: '1.1rem'
                    }}
                  >
                    {user.firstName ? user.firstName[0] : user.email[0]}
                  </Avatar>
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <RouterLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button 
                  color="inherit" 
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(37, 99, 235, 0.08)',
                      color: 'primary.main'
                    }
                  }}
                >
                  Login
                </Button>
              </RouterLink>
              <RouterLink to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button 
                  variant="contained" 
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: '#2563eb',
                    '&:hover': {
                      backgroundColor: '#1d4ed8',
                    }
                  }}
                >
                  Sign Up
                </Button>
              </RouterLink>
            </Box>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton 
            color="inherit" 
            onClick={handleMenuOpen}
            sx={{
              p: 1.5,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(37, 99, 235, 0.08)',
                color: 'primary.main'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ 
            display: { xs: 'block', md: 'none' },
            '& .MuiPaper-root': {
              borderRadius: 3,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              mt: 1
            }
          }}
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
            sx: { 
              minWidth: 280,
              borderRadius: 3,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              mt: 1
            }
          }}
        >
          <MenuItem onClick={handleUserMenuClose} sx={{ py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Avatar 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  background: isAdmin 
                    ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
                    : 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  boxShadow: isAdmin 
                    ? '0 4px 15px rgba(5, 150, 105, 0.3)'
                    : '0 4px 15px rgba(37, 99, 235, 0.3)',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                {user?.firstName ? user.firstName[0] : user?.email[0]}
              </Avatar>
              <Box>
                <Typography variant="body1" fontWeight="600" color="text.primary">
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary"> 
                  {user?.email}
                </Typography>
                <Chip
                  icon={isAdmin ? <AdminIcon /> : <PersonIcon />}
                  label={isAdmin ? 'Administrator' : 'Customer'}
                  color={isAdmin ? 'secondary' : 'primary'}
                  size="small"
                  sx={{ mt: 0.5, fontSize: '0.75rem' }}
                />
              </Box>
            </Box>
          </MenuItem>
          
          <Divider />
          
          {isAdmin && (
            <Box>
              <MenuItem 
                onClick={() => { navigate('/admin'); handleUserMenuClose(); }}
                sx={{ 
                  borderRadius: 2, 
                  mx: 1, 
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(5, 150, 105, 0.08)',
                    color: 'secondary.main'
                  }
                }}
              >
                <DashboardIcon sx={{ mr: 2, color: 'secondary.main' }} />
                <Typography fontWeight="500">Admin Dashboard</Typography>
              </MenuItem>
              <MenuItem 
                onClick={() => { navigate('/admin/tours'); handleUserMenuClose(); }}
                sx={{ 
                  borderRadius: 2, 
                  mx: 1, 
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(5, 150, 105, 0.08)',
                    color: 'secondary.main'
                  }
                }}
              >
                <TourIcon sx={{ mr: 2, color: 'secondary.main' }} />
                <Typography fontWeight="500">Manage Tours</Typography>
              </MenuItem>
              <MenuItem 
                onClick={() => { navigate('/admin/bookings'); handleUserMenuClose(); }}
                sx={{ 
                  borderRadius: 2, 
                  mx: 1, 
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(5, 150, 105, 0.08)',
                    color: 'secondary.main'
                  }
                }}
              >
                <BookingIcon sx={{ mr: 2, color: 'secondary.main' }} />
                <Typography fontWeight="500">Manage Bookings</Typography>
              </MenuItem>
              <MenuItem 
                onClick={() => { navigate('/admin/users'); handleUserMenuClose(); }}
                sx={{ 
                  borderRadius: 2, 
                  mx: 1, 
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(5, 150, 105, 0.08)',
                    color: 'secondary.main'
                  }
                }}
              >
                <UserIcon sx={{ mr: 2, color: 'secondary.main' }} />
                <Typography fontWeight="500">Manage Users</Typography>
              </MenuItem>
              <Divider sx={{ my: 1 }} />
            </Box>
          )}
          
          <MenuItem 
            onClick={handleLogout}
            sx={{ 
              borderRadius: 2, 
              mx: 1, 
              my: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(220, 38, 38, 0.08)',
                color: 'error.main'
              }
            }}
          >
            <LogoutIcon sx={{ mr: 2, color: 'error.main' }} />
            <Typography fontWeight="500">Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
