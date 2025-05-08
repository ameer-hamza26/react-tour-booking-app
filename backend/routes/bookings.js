import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// User routes
router.post('/', createBooking);
router.get('/', getUserBookings);
router.get('/:id', getBooking);
router.delete('/:id', cancelBooking);

// Admin routes
router.put('/:id', authorize('admin'), updateBookingStatus);

export default router; 