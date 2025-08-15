import User from './User.js';
import Tour from './Tour.js';
import Booking from './Booking.js';
import TourImage from './TourImage.js';
import TourStartDate from './TourStartDate.js';
import TourFeature from './TourFeature.js';

// User associations
User.hasMany(Booking, {
  foreignKey: 'user_id',
  as: 'bookings'
});

// Tour associations
Tour.hasMany(Booking, {
  foreignKey: 'tour_id',
  as: 'bookings'
});

Tour.hasMany(TourImage, {
  foreignKey: 'tour_id',
  as: 'images'
});

Tour.hasMany(TourStartDate, {
  foreignKey: 'tour_id',
  as: 'startDates'
});

Tour.hasMany(TourFeature, {
  foreignKey: 'tour_id',
  as: 'features'
});

// Booking associations
Booking.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Booking.belongsTo(Tour, {
  foreignKey: 'tour_id',
  as: 'tour'
});

// TourImage associations
TourImage.belongsTo(Tour, {
  foreignKey: 'tour_id',
  as: 'tour'
});

// TourStartDate associations
TourStartDate.belongsTo(Tour, {
  foreignKey: 'tour_id',
  as: 'tour'
});

// TourFeature associations
TourFeature.belongsTo(Tour, {
  foreignKey: 'tour_id',
  as: 'tour'
});

export {
  User,
  Tour,
  Booking,
  TourImage,
  TourStartDate,
  TourFeature
}; 