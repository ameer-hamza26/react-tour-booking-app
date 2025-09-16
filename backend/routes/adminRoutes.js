import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { adminProtect } from '../middleware/adminMiddleware.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
  getAllBookings,
  getBookingStats,
  updateBookingStatus
} from '../controllers/adminController.js';
import {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
} from '../controllers/tourController.js';
import multer from '../utils/multer.js';
import { withSequenceReset } from '../middleware/sequenceMiddleware.js';

const router = express.Router();

// All admin routes are protected and require admin role
router.use(protect);
router.use(adminProtect);

// User management routes
router.get('/users', getAllUsers);
router.get('/users/stats', getUserStats);
router.get('/users/statistics', getUserStats); // Alternative endpoint
router.get('/users/:id', getUserById);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Booking management routes
router.get('/bookings', getAllBookings);
router.get('/bookings/stats', getBookingStats);
router.put('/bookings/:id/status', updateBookingStatus);

// Tour management routes
router.get('/tours', getTours);
router.get('/tours/:id', getTour);
router.post('/tours', multer.single('image'), createTour);
router.put('/tours/:id', multer.single('image'), updateTour);
router.delete('/tours/:id', withSequenceReset('tours', 'id'), deleteTour);

export default router; 