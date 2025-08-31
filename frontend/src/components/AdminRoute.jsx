import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="50vh"
        gap={2}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  console.log('AdminRoute - User:', user);
  console.log('AdminRoute - User role:', user?.role);
  console.log('AdminRoute - Loading:', loading);

  if (!user) {
    console.log('AdminRoute - No user, redirecting to login');
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  if (user.role !== 'admin') {
    console.log('AdminRoute - User is not admin, redirecting to home');
    // Redirect to home if not admin
    toast.error('You do not have permission to access this page');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute; 