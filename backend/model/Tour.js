import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a tour title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  destination: {
    type: String,
    required: [true, 'Please provide a destination']
  },
  duration: {
    type: Number,
    required: [true, 'Please provide duration in days']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Please provide maximum group size']
  },
  images: [{
    type: String
  }],
  startDates: [{
    type: Date
  }],
  features: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better search performance
tourSchema.index({ title: 'text', description: 'text', destination: 'text' });

const Tour = mongoose.model('Tour', tourSchema);
export default Tour; 