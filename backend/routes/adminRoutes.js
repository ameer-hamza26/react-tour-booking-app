import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { adminProtect } from '../middleware/adminMiddleware.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
} from '../controllers/adminController.js';

const router = express.Router();

// All admin routes are protected and require admin role
router.use(protect);
router.use(adminProtect);

// User management routes
router.get('/users', getAllUsers);
router.get('/users/stats', getUserStats);
router.get('/users/:id', getUserById);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router; 