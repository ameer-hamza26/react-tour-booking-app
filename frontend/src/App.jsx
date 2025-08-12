import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import ExploreNow from './pages/ExploreNow';
import AddTour from './pages/AddTour';
import MyTour from './pages/MyTour';
import Tour from './pages/Tour';
import Navbar from './components/Navbar';
import TourDetailPage from './pages/TourDetailPage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import BookingForm from './components/BookingForm';
import BookingDetails from './pages/BookingDetails';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import AdminTours from './pages/AdminTours';
import AdminBookings from './pages/AdminBookings';
import AdminUsers from './pages/AdminUsers';

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/exploreNow" element={<ExploreNow />} />
            <Route path="/tour" element={<Tour />} />
            <Route path="/tour/:tourId" element={<TourDetailPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* User Protected Routes */}
            <Route path="/myTour" element={
              <PrivateRoute>
                <MyTour />
              </PrivateRoute>
            } />
            <Route path="/tour/:tourId/book" element={
              <PrivateRoute>
                <BookingForm />
              </PrivateRoute>
            } />
            <Route path="/bookings" element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            } />
            <Route path="/bookings/:bookingId" element={
              <PrivateRoute>
                <BookingDetails />
              </PrivateRoute>
            } />
            
            {/* Admin Protected Routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/tours" element={
              <AdminRoute>
                <AdminTours />
              </AdminRoute>
            } />
            <Route path="/admin/bookings" element={
              <AdminRoute>
                <AdminBookings />
              </AdminRoute>
            } />
            <Route path="/admin/users" element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            } />
            <Route path="/addTour" element={
              <AdminRoute>
                <AddTour />
              </AdminRoute>
            } />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
