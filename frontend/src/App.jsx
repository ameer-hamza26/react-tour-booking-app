import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import ExploreNow from './pages/ExploreNow';
import AddTour from './pages/AddTour';
import MyTour from './pages/MyTour';
import Tour from './pages/Tour';
import Navbar from './components/Navbar';  // Ensure you import Navbar
import TourDetailPage from './pages/TourDetailPage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar will be rendered on every page */}
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exploreNow" element={<ExploreNow />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/tour/:tourId" element={<TourDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/addTour" element={
            <PrivateRoute>
              <AddTour />
            </PrivateRoute>
          } />
          <Route path="/myTour" element={
            <PrivateRoute>
              <MyTour />
            </PrivateRoute>
          } />

          {/* 404 Route - This should be the last route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
