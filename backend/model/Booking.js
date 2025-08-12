import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  numberOfPeople: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer'],
    required: true
  },
  specialRequests: {
    type: String,
    trim: true
  },
  contactInfo: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  cancellationReason: {
    type: String,
    trim: true
  },
  refundAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ tour: 1, startDate: 1 });
bookingSchema.index({ status: 1, paymentStatus: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking; 