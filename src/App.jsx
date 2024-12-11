import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExploreNow from './pages/ExploreNow';
import AddTour from './pages/AddTour';
import MyTour from './pages/MyTour';
import Tour from './pages/Tour';
import Navbar from './components/Navbar';  // Ensure you import Navbar

const App = () => {
  return (
    <Router>
      {/* Navbar will be rendered on every page */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exploreNow" element={<ExploreNow />} />
        <Route path="/addTour" element={<AddTour />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/myTour" element={<MyTour />} />
      </Routes>
    </Router>
  );
};

export default App;
