import { body, validationResult } from 'express-validator';

// Validation middleware for booking creation
export const validateBooking = [
  // Tour ID validation
  body('tourId')
    .notEmpty()
    .withMessage('Tour ID is required')
    .isInt({ min: 1 })
    .withMessage('Invalid tour ID'),

  // Start date validation
  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Invalid date format')
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      if (date < today) {
        throw new Error('Start date cannot be in the past');
      }
      return true;
    }),

  // Number of people validation
  body('numberOfPeople')
    .isObject()
    .withMessage('Number of people must be an object')
    .custom((value) => {
      if (!value.adults || value.adults < 1) {
        throw new Error('At least one adult is required');
      }
      if (value.children && value.children < 0) {
        throw new Error('Number of children cannot be negative');
      }
      return true;
    }),

  // Payment method validation
  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required')
    .isIn(['credit_card', 'paypal', 'bank_transfer'])
    .withMessage('Invalid payment method'),

  // Contact info validation
  body('contactInfo')
    .isObject()
    .withMessage('Contact info must be an object')
    .custom((value) => {
      if (!value.phone) {
        throw new Error('Phone number is required');
      }
      if (!/^[0-9]{10,15}$/.test(value.phone)) {
        throw new Error('Invalid phone number format');
      }
      return true;
    }),

  // Special requests validation (optional)
  body('specialRequests')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Special requests cannot exceed 500 characters'),

  // Validation result middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }
    next();
  }
];

// Validation middleware for booking status update
export const validateBookingStatus = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['pending', 'confirmed', 'cancelled', 'completed'])
    .withMessage('Invalid status'),

  body('paymentStatus')
    .notEmpty()
    .withMessage('Payment status is required')
    .isIn(['pending', 'paid', 'refunded', 'failed'])
    .withMessage('Invalid payment status'),

  body('cancellationReason')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Cancellation reason cannot exceed 500 characters'),

  body('refundAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Refund amount must be a positive number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }
    next();
  }
]; 