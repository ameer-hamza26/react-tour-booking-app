import express from 'express';
import multer from '../utils/multer.js';
import {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
} from '../controllers/tourController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { withSequenceReset } from '../middleware/sequenceMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getTours);
router.get('/:id', getTour);

// Protected routes (Admin only)
router.post(
  '/',
  protect,
  authorize('admin'),
  multer.single('image'),
  createTour
);

router.put(
  '/:id', 
  protect, 
  authorize('admin'), 
  multer.single('image'),  // Add this line
  updateTour
);
router.delete('/:id', protect, authorize('admin'), withSequenceReset('tours', 'id'), deleteTour);

export default router; 