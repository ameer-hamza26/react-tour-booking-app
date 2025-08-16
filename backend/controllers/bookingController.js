import { Booking, Tour, User, TourImage } from '../model/index.js';
import { Op } from 'sequelize';
import sequelize from '../config/database.js';

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
    const tour = await Tour.findOne({ 
      where: { id: tourId, is_active: true } 
    });
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
    const existingBookings = await Booking.count({
      where: {
        tour_id: tourId,  
        start_date: bookingDate,
        status: { [Op.in]: ['pending', 'confirmed'] }
      }
    });

    if (existingBookings >= tour.max_group_size) {
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
      user_id: req.user.id,
      tour_id: tourId,
      start_date: bookingDate,
      adults: numberOfPeople.adults,
      children: numberOfPeople.children,
      total_price: totalPrice,
      payment_method: paymentMethod,
      special_requests: specialRequests,
      contact_phone: contactInfo.phone,
      contact_email: req.user.email // Ensure email matches user's email
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
    const { status, startDate, endDate, tourId } = req.query;
    let whereClause = { user_id: req.user.id };
    // console.log('getUserBookings query:', req.query);
    // Add filters if provided
    if (status) {
      whereClause.status = status;
    }
    if (startDate && endDate) {
      whereClause.start_date = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }
    // Optional filter by tour if a valid ID is provided
    if (tourId && !isNaN(Number(tourId))) {
      whereClause.tour_id = Number(tourId);
    }

    const bookings = await Booking.findAll({
      where: whereClause,
      include: [
        {
          model: Tour,
          as: 'tour',
          attributes: ['title', 'destination', 'price', 'duration'],
          include: [
            {
              model: TourImage,
              as: 'images',
              attributes: ['url'],
              limit: 1
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });

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
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        {
          model: Tour,
          as: 'tour',
          attributes: ['title', 'destination', 'price', 'duration', 'max_group_size'],
          include: [
            {
              model: TourImage,
              as: 'images',
              attributes: ['url']
            }
          ]
        },
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name', 'email']
        }
      ]
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns the booking or is admin
    if (booking.user_id !== req.user.id && req.user.role !== 'admin') {
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
    const booking = await Booking.findByPk(req.params.id);

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
    const updateData = { status, payment_status: paymentStatus };
    if (status === 'cancelled') {
      updateData.cancellation_reason = cancellationReason;
      updateData.refund_amount = refundAmount;
    }

    await booking.update(updateData);

    const updatedBooking = await Booking.findByPk(booking.id, {
      include: [
        {
          model: Tour,
          as: 'tour',
          attributes: ['title', 'destination']
        }
      ]
    });

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
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns the booking or is admin
    if (booking.user_id !== req.user.id && req.user.role !== 'admin') {
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
    const bookingDate = new Date(booking.start_date);
    const today = new Date();
    const daysUntilTour = Math.ceil((bookingDate - today) / (1000 * 60 * 60 * 24));
    
    let refundAmount = 0;
    if (daysUntilTour > 30) {
      refundAmount = booking.total_price * 0.9; // 90% refund
    } else if (daysUntilTour > 15) {
      refundAmount = booking.total_price * 0.7; // 70% refund
    } else if (daysUntilTour > 7) {
      refundAmount = booking.total_price * 0.5; // 50% refund
    }

    await booking.update({
      status: 'cancelled',
      payment_status: 'refunded',
      cancellation_reason: cancellationReason,
      refund_amount: refundAmount
    });

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
    const statusStats = await Booking.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('SUM', sequelize.col('total_price')), 'totalRevenue']
      ],
      group: ['status']
    });

    const paymentStats = await Booking.findAll({
      attributes: [
        'payment_status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('SUM', sequelize.col('total_price')), 'totalAmount']
      ],
      group: ['payment_status']
    });

    res.json({
      success: true,
      data: {
        statusStats,
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