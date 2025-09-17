import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  createPaymentIntent, 
  confirmPayment, 
  handleWebhook,
  getPaymentStatus 
} from '../controllers/paymentController.js';

const router = express.Router();

// Webhook endpoint (no auth required)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Protected routes
router.use(protect);

// Create payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Confirm payment
router.post('/confirm-payment', confirmPayment);

// Get payment status
router.get('/status/:bookingId', getPaymentStatus);

export default router;
