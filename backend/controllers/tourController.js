import { Tour, TourImage, TourStartDate, TourFeature } from '../model/index.js';
import { Op } from 'sequelize';
import sequelize from '../config/database.js';

// @desc    Get all active tours with optional filtering
// @route   GET /api/tours
// @access  Public
export const getTours = async (req, res) => {
  try {
    const { destination, minPrice, maxPrice, date } = req.query;
    
    // Build where clause for filtering
    const whereClause = { is_active: true };
    
    // Filter by destination (case-insensitive)
    if (destination && destination.trim() !== '') {
      whereClause.destination = {
        [Op.iLike]: `%${destination.trim()}%`
      };
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) {
        whereClause.price[Op.gte] = parseFloat(minPrice);
      }
      if (maxPrice) {
        whereClause.price[Op.lte] = parseFloat(maxPrice);
      }
    }
    
    // Filter by start date
    let startDateFilter = null;
    if (date && date.trim() !== '') {
      startDateFilter = {
        model: TourStartDate,
        as: 'startDates',
        where: {
          start_date: {
            [Op.gte]: new Date(date)
          }
        },
        required: true
      };
    }
    
    // Build include array
    const includeArray = [
      { model: TourImage, as: 'images' },
      { model: TourFeature, as: 'features' }
    ];
    
    // Add start dates filter if needed
    if (startDateFilter) {
      includeArray.push(startDateFilter);
    } else {
      includeArray.push({ model: TourStartDate, as: 'startDates' });
    }

    console.log('Tour query filters:', {
      whereClause,
      startDateFilter: !!startDateFilter,
      queryParams: req.query
    });

    const tours = await Tour.findAll({
      where: whereClause,
      include: includeArray,
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours
    });
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tours',
      error: error.message
    });
  }
};

// @desc    Get single active tour
// @route   GET /api/tours/:id
// @access  Public
export const getTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findOne({
      where: { 
        id,
        is_active: true 
      },
      include: [
        { model: TourImage, as: 'images' },
        { model: TourStartDate, as: 'startDates' },
        { model: TourFeature, as: 'features' }
      ]
    });

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found or not active'
      });
    }

    res.status(200).json({
      success: true,
      data: tour
    });
  } catch (error) {
    console.error('Error fetching tour:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tour',
      error: error.message
    });
  }
};

// @desc    Create tour (Admin only)
// @route   POST /api/admin/tours
// @access  Private/Admin
export const createTour = async (req, res) => {
  try {
    // Parse the tour data from the form
    const tourData = req.body.tour ? JSON.parse(req.body.tour) : req.body;
    
    // If there's an uploaded file, add its path to the images array
    if (req.file) {
      const imageUrl = `/uploads/${req.file.filename}`;
      if (!tourData.images) {
        tourData.images = [];
      }
      tourData.images.push(imageUrl);
    }

    // Check if a similar active tour already exists (case-insensitive by title + destination)
    if (tourData.title && tourData.destination) {
      const existingTour = await Tour.findOne({
        where: {
          is_active: true,
          title: { [Op.iLike]: tourData.title },
          destination: { [Op.iLike]: tourData.destination }
        }
      });

      if (existingTour) {
        return res.status(409).json({
          success: false,
          message: 'A tour with this title and destination already exists',
          data: existingTour
        });
      }
    }

    // Create the tour with the provided data
    const tour = await Tour.create(tourData);

    // If there are features, create them
    if (tourData.features && tourData.features.length > 0) {
      await Promise.all(
        tourData.features.map(feature =>
          TourFeature.create({
            ...feature,
            tourId: tour.id
          })
        )
      );
    }

    // If there are start dates, create them
    if (tourData.startDates && tourData.startDates.length > 0) {
      await Promise.all(
        tourData.startDates.map(date =>
          TourStartDate.create({
            date,
            tourId: tour.id
          })
        )
      );
    }

    // Reload the tour with all associated data
    const createdTour = await Tour.findByPk(tour.id, {
      include: [
        { model: TourFeature, as: 'features' },
        { model: TourStartDate, as: 'startDates' },
        { model: TourImage, as: 'images' }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Tour created successfully',
      data: createdTour
    });
  } catch (error) {
    console.error('Error creating tour:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating tour',
      error: error.message
    });
  }
};

// @desc    Update tour (Admin only)
// @route   PUT /api/admin/tours/:id
// @access  Private/Admin
export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Handle both form-data and JSON body
    const body = req.body.tour ? JSON.parse(req.body.tour) : req.body;
    
    // Extract features and start_dates from the request
    const features = [];
    const startDates = [];
    
    // Handle features array
    if (body.features) {
      features.push(...(Array.isArray(body.features) ? body.features : [body.features]));
    } else {
      // Handle form-data array format (features[0], features[1], etc.)
      Object.keys(req.body).forEach(key => {
        if (key.startsWith('features[')) {
          features.push(req.body[key]);
        } else if (key.startsWith('start_dates[')) {
          startDates.push(req.body[key]);
        }
      });
    }
    
    // Prepare tour data
    const tourData = {
      title: body.title || req.body.title,
      description: body.description || req.body.description,
      destination: body.destination || req.body.destination,
      price: parseFloat(body.price || req.body.price),
      duration: parseInt(body.duration || req.body.duration, 10),
      maxGroupSize: parseInt(body.max_group_size || body.maxGroupSize || req.body.max_group_size, 10),
      difficulty: body.difficulty || req.body.difficulty,
      highlights: body.highlights || req.body.highlights || '',
      features: features.filter(Boolean),
      startDates: startDates.length > 0 ? startDates : (body.start_dates || [])
    };

    // Rest of the function remains the same...
    const tour = await Tour.findByPk(id);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    // Handle file upload if exists
    if (req.file) {
      const imageUrl = `/uploads/${req.file.filename}`;
      tourData.images = [...(tour.images || []), imageUrl];
    }

    // Update the tour
    await tour.update(tourData);

    // Update features
    await TourFeature.destroy({ where: { tour_id: id } });
    if (features && features.length > 0) {
      await Promise.all(
        features.map(feature =>
          TourFeature.create({
            ...feature,
            tour_id: id
          })
        )
      );
    }

    // Update start dates
    if (tourData.startDates && tourData.startDates.length > 0) {
      await TourStartDate.destroy({ where: { tour_id: id } });
      await Promise.all(
        tourData.startDates.map(date => {
          // Ensure we have a valid date
          const startDate = new Date(date);
          if (isNaN(startDate.getTime())) {
            throw new Error(`Invalid date format: ${date}`);
          }
          return TourStartDate.create({
            start_date: startDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
            tour_id: id
          });
        })
      );
    }

    // Get the updated tour with associations
    const updatedTour = await Tour.findByPk(id, {
      include: [
        { model: TourFeature, as: 'features' },
        { model: TourStartDate, as: 'startDates' },
        { model: TourImage, as: 'images' }
      ]
    });

    res.status(200).json({
      success: true,
      data: updatedTour
    });

  } catch (error) {
    console.error('Error updating tour:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating tour',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
// @desc    Delete tour (Admin only)
// @route   DELETE /api/admin/tours/:id
// @access  Private/Admin
export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the tour
    const tour = await Tour.findByPk(id);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    // Soft delete by setting is_active to false
    await tour.update({ is_active: false });

    res.status(200).json({
      success: true,
      message: 'Tour deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting tour:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting tour',
      error: error.message
    });
  }
};

// @desc    Get all tours (Admin only - includes inactive)
// @route   GET /api/admin/tours
// @access  Private/Admin
export const getAllTours = async (req, res) => {
  try {
    const { destination, minPrice, maxPrice, isActive } = req.query;
    
    // Build where clause for filtering
    const whereClause = {};
    
    // Filter by destination (case-insensitive)
    if (destination && destination.trim() !== '') {
      whereClause.destination = {
        [Op.iLike]: `%${destination.trim()}%`
      };
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) {
        whereClause.price[Op.gte] = parseFloat(minPrice);
      }
      if (maxPrice) {
        whereClause.price[Op.lte] = parseFloat(maxPrice);
      }
    }
    
    // Filter by active status
    if (isActive !== undefined) {
      whereClause.is_active = isActive === 'true';
    }

    console.log('Admin tour query filters:', {
      whereClause,
      queryParams: req.query
    });

    const tours = await Tour.findAll({
      where: whereClause,
      include: [
        { model: TourImage, as: 'images' },
        { model: TourStartDate, as: 'startDates' },
        { model: TourFeature, as: 'features' }
      ],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours
    });
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tours',
      error: error.message
    });
  }
};

// @desc    Get single tour (Admin only - includes inactive)
// @route   GET /api/admin/tours/:id
// @access  Private/Admin
export const getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByPk(id, {
      include: [TourFeature, TourStartDate, TourImage]
    });

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.status(200).json({
      success: true,
      data: tour
    });
  } catch (error) {
    console.error('Error fetching tour:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tour',
      error: error.message
    });
  }
};
