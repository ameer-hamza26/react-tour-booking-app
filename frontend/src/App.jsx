import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import ExploreNow from './pages/ExploreNow';
import AddTour from './pages/AddTour';


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

const App = () => {
  return (
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
          <Route path="/admin/tours/add" element={
            <AdminRoute>
              <AddTour />
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
          <Route path="/admin/tours/add" element={
            <AdminRoute>
              <AddTour />
            </AdminRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
