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

    // Normalize and validate tourId (must be a positive integer)
    const tourIdNum = Number(tourId);
    if (!Number.isInteger(tourIdNum) || tourIdNum <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing tourId'
      });
    }

    // Check if tour exists and is active
    const tour = await Tour.findOne({ 
      where: { id: tourIdNum, is_active: true } 
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
        tour_id: tourIdNum,  
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
      tour_id: tourIdNum,
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
    // Ensure user is authenticated
    if (!req.user?.id) {
      console.error('User not authenticated or missing user ID');
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    // Log all query parameters for debugging
    console.log('Raw query params:', JSON.stringify(req.query));
    
    // Safely parse query parameters
    const queryParams = {
      status: String(req.query.status || '').trim(),
      startDate: String(req.query.startDate || '').trim(),
      endDate: String(req.query.endDate || '').trim(),
      tourId: String(req.query.tourId || '').trim()
    };
    
    console.log('Processed query params:', JSON.stringify(queryParams));
    
    // Base where clause with user ID
    const whereClause = { user_id: req.user.id };
    
    // Add status filter if provided and valid
    if (queryParams.status && !['undefined', 'null', ''].includes(queryParams.status)) {
      whereClause.status = queryParams.status;
      console.log('Added status filter:', queryParams.status);
    }
    
    // Handle date range filter
    if (queryParams.startDate && queryParams.endDate && 
        !['undefined', 'null', ''].includes(queryParams.startDate) &&
        !['undefined', 'null', ''].includes(queryParams.endDate)) {
      try {
        const start = new Date(queryParams.startDate);
        const end = new Date(queryParams.endDate);
        
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          whereClause.start_date = {
            [Op.between]: [start, end]
          };
          console.log('Added date range filter:', { start, end });
        } else {
          console.warn('Invalid date range:', { startDate: queryParams.startDate, endDate: queryParams.endDate });
        }
      } catch (dateError) {
        console.error('Error processing date range:', dateError);
      }
    }
    
    // Handle tour filter - only add if tourId is provided and valid
    if (queryParams.tourId && !['undefined', 'null', ''].includes(queryParams.tourId)) {
      console.log('Processing tourId:', queryParams.tourId);
      
      try {
        const tourIdNum = parseInt(queryParams.tourId, 10);
        
        if (isNaN(tourIdNum)) {
          console.warn(`Invalid tourId (not a number): ${queryParams.tourId}`);
        } else if (tourIdNum <= 0) {
          console.warn(`Invalid tourId (must be positive): ${tourIdNum}`);
        } else {
          // Don't verify tour existence here - let the query handle it
          whereClause.tour_id = tourIdNum;
          console.log(`Added tour filter: ${tourIdNum}`);
        }
      } catch (tourError) {
        console.error('Error processing tourId:', tourError);
      }
    }

    console.log('Final where clause:', JSON.stringify(whereClause, null, 2));
    
    try {
      // Build the query with explicit associations
      const queryOptions = {
        where: whereClause,
        include: [
          {
            model: Tour,
            as: 'tour',
            attributes: ['id', 'title', 'destination', 'price', 'duration'],
            required: false,
            include: [
              {
                model: TourImage,
                as: 'images',
                attributes: ['id', 'url'],
                limit: 1,
                required: false
              }
            ]
          }
        ],
        order: [['created_at', 'DESC']],
        logging: (sql, queryObject) => {
          console.log('Executing SQL:', sql);
          if (queryObject?.bind) {
            console.log('Query parameters:', queryObject.bind);
          }
        }
      };

      console.log('Executing query with options:', JSON.stringify({
        ...queryOptions,
        // Don't log the entire where clause again to avoid cluttering logs
        where: '...',
        logging: '...'
      }, null, 2));

      const bookings = await Booking.findAll(queryOptions);

      return res.json({
        success: true,
        count: bookings.length,
        data: bookings
      });
    } catch (dbError) {
      console.error('Database query error details:', {
        message: dbError.message,
        name: dbError.name,
        stack: dbError.stack,
        original: dbError.original?.message || 'No original error'
      });
      throw new Error(`Database error: ${dbError.message}`);
    }
  } catch (error) {
    console.error('Error in getUserBookings:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while fetching bookings'
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res) => {
  try {
    console.log('GET /api/bookings/:id', {
      params: req.params,
      user: req.user,
      headers: req.headers
    });
    
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        {
          model: Tour,
          as: 'tour',
          attributes: ['id', 'title', 'description', 'destination', 'price', 'duration', 'max_group_size'],
          include: [
            {
              model: TourImage,
              as: 'images',
              attributes: ['url'],
              limit: 1 // Only get the first image
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
      console.log('Booking not found:', req.params.id);
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    console.log('Found booking:', {
      id: booking.id,
      user_id: booking.user_id,
      requesting_user_id: req.user.id,
      user_role: req.user.role
    });

    // Check if user owns the booking or is admin
    if (booking.user_id !== req.user.id && req.user.role !== 'admin') {
      console.log('Unauthorized access attempt:', {
        bookingUserId: booking.user_id,
        requestingUserId: req.user.id,
        userRole: req.user.role
      });
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    // Format the response to match frontend expectations
    const formattedBooking = {
      id: booking.id,
      status: booking.status,
      startDate: booking.start_date,
      numberOfPeople: {
        adults: booking.adults || 0,
        children: booking.children || 0
      },
      totalPrice: booking.total_price,
      paymentMethod: booking.payment_method,
      specialRequests: booking.special_requests,
      cancellationReason: booking.cancellation_reason,
      contactInfo: {
        name: `${booking.user?.first_name || ''} ${booking.user?.last_name || ''}`.trim(),
        email: booking.user?.email || '',
        phone: booking.contact_phone || '',
        specialRequests: booking.special_requests || ''
      },
      tour: {
        id: booking.tour?.id,
        title: booking.tour?.title || 'Tour not found',
        description: booking.tour?.description || '',
        location: booking.tour?.destination || '',
        price: booking.tour?.price || 0,
        duration: booking.tour?.duration || 0,
        image: booking.tour?.images?.[0]?.url || '/default-tour.jpg'
      },
      user: {
        id: booking.user_id,
        name: `${booking.user?.first_name || ''} ${booking.user?.last_name || ''}`.trim(),
        email: booking.user?.email || ''
      }
    };

    res.json({
      success: true,
      data: formattedBooking
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