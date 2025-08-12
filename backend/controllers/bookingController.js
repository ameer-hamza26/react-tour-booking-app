import Booking from '../model/Booking.js';
import Tour from '../model/Tour.js';
import User from '../model/User.js';

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    const {
      tourId,
      startDate,
      numberOfPeople,
      paymentMethod,
      specialRequests,
      contactInfo
    } = req.body;

    // Check if tour exists and is active
    const tour = await Tour.findOne({ _id: tourId, isActive: true });
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found or not available'
      });
    }

    // Validate start date
    const bookingDate = new Date(startDate);
    const today = new Date();

    // Compare only year, month, and day (ignore time and timezone)
    const bookingYMD = [bookingDate.getUTCFullYear(), bookingDate.getUTCMonth(), bookingDate.getUTCDate()];
    const todayYMD = [today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()];

    // Check if the date is valid
    if (isNaN(bookingDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }

    // Check if date is in the future (strictly greater than today)
    if (
      bookingYMD[0] < todayYMD[0] ||
      (bookingYMD[0] === todayYMD[0] && bookingYMD[1] < todayYMD[1]) ||
      (bookingYMD[0] === todayYMD[0] && bookingYMD[1] === todayYMD[1] && bookingYMD[2] <= todayYMD[2])
    ) {
      return res.status(400).json({
        success: false,
        message: 'Booking date must be in the future'
      });
    }

    // Check if tour is available for the selected date
    const existingBookings = await Booking.countDocuments({
      tour: tourId,
      startDate: bookingDate,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBookings >= tour.maxGroupSize) {
      return res.status(400).json({
        success: false,
        message: 'Tour is fully booked for this date'
      });
    }

    // Calculate total price
    const totalPrice = (tour.price * numberOfPeople.adults) + 
                      (tour.price * 0.7 * numberOfPeople.children); // 30% discount for children

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      tour: tourId,
      startDate: bookingDate,
      numberOfPeople,
      totalPrice,
      paymentMethod,
      specialRequests,
      contactInfo: {
        ...contactInfo,
        email: req.user.email // Ensure email matches user's email
      }
    });

    // Add booking to user's bookings
    await User.findByIdAndUpdate(req.user.id, {
      $push: { bookings: booking._id }
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
export const getUserBookings = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let query = { user: req.user.id };

    // Add filters if provided
    if (status) {
      query.status = status;
    }
    if (startDate && endDate) {
      query.startDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const bookings = await Booking.find(query)
      .populate('tour', 'title destination images price duration')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('tour', 'title destination images price duration maxGroupSize')
      .populate('user', 'firstName lastName email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns the booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private/Admin
export const updateBookingStatus = async (req, res) => {
  try {
    const { status, paymentStatus, cancellationReason, refundAmount } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Validate status transition
    const validTransitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['completed', 'cancelled'],
      cancelled: [],
      completed: []
    };

    if (!validTransitions[booking.status].includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot change status from ${booking.status} to ${status}`
      });
    }

    // Update booking
    const updateData = { status, paymentStatus };
    if (status === 'cancelled') {
      updateData.cancellationReason = cancellationReason;
      updateData.refundAmount = refundAmount;
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('tour', 'title destination');

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const cancelBooking = async (req, res) => {
  try {
    const { cancellationReason } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns the booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    // Only allow cancellation if booking is pending or confirmed
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a booking that is already completed or cancelled'
      });
    }

    // Calculate refund amount based on cancellation policy
    const bookingDate = new Date(booking.startDate);
    const today = new Date();
    const daysUntilTour = Math.ceil((bookingDate - today) / (1000 * 60 * 60 * 24));
    
    let refundAmount = 0;
    if (daysUntilTour > 30) {
      refundAmount = booking.totalPrice * 0.9; // 90% refund
    } else if (daysUntilTour > 15) {
      refundAmount = booking.totalPrice * 0.7; // 70% refund
    } else if (daysUntilTour > 7) {
      refundAmount = booking.totalPrice * 0.5; // 50% refund
    }

    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    booking.cancellationReason = cancellationReason;
    booking.refundAmount = refundAmount;
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get booking statistics
// @route   GET /api/bookings/stats
// @access  Private/Admin
export const getBookingStats = async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' }
        }
      }
    ]);

    const paymentStats = await Booking.aggregate([
      {
        $group: {
          _id: '$paymentStatus',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalPrice' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        statusStats: stats,
        paymentStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 