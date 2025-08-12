import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking,
  getBookingStats
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validateBooking } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Public routes
// None - all booking routes require authentication

// Protected routes (require authentication)
router.use(protect); // Apply authentication middleware to all routes

// User routes
router.post('/', validateBooking, createBooking);
router.get('/', getUserBookings);
router.get('/:id', getBooking);
router.delete('/:id', cancelBooking);

// Admin routes
router.put('/:id', authorize('admin'), updateBookingStatus);
router.get('/stats/overview', authorize('admin'), getBookingStats);

export default router; 