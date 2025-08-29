import { Tour, TourImage, TourStartDate, TourFeature } from '../model/index.js';
import { Op } from 'sequelize';
import sequelize from '../config/database.js';

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
export const getTours = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, date } = req.query;
    let whereClause = { is_active: true };

    // Search by location
    if (location) {
      whereClause.destination = {
        [Op.like]: `%${location}%`
      };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = Number(minPrice);
      if (maxPrice) whereClause.price[Op.lte] = Number(maxPrice);
    }

    const tours = await Tour.findAll({
      where: whereClause,
      include: [
        {
          model: TourImage,
          as: 'images',
          attributes: ['url']
        },
        {
          model: TourStartDate,
          as: 'startDates',
          attributes: ['start_date']
        },
        {
          model: TourFeature,
          as: 'features',
          attributes: ['feature']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    // Filter by date if provided
    let filteredTours = tours;
    if (date) {
      const searchDate = new Date(date);
      filteredTours = tours.filter(tour => 
        tour.startDates.some(startDate => 
          new Date(startDate.start_date) >= searchDate
        )
      );
    }

    res.json({
      success: true,
      count: filteredTours.length,
      data: filteredTours
    });
  } catch (error) {
    console.error('Error in getTours:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tours',
      error: error.message
    });
  }
};

// @desc    Get single tour
// @route   GET /api/tours/:id
// @access  Public
export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id, {
      include: [
        {
          model: TourImage,
          as: 'images',
          attributes: ['url']
        },
        {
          model: TourStartDate,
          as: 'startDates',
          attributes: ['start_date']
        },
        {
          model: TourFeature,
          as: 'features',
          attributes: ['feature']
        }
      ]
    });
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create tour
// @route   POST /api/tours
// @access  Private/Admin
export const createTour = async (req, res) => {
  try {
    const { images, startDates, features, ...tourData } = req.body;

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
          message: 'Tour already exists',
          data: existingTour
        });
      }
    }

    // Create tour
    const tour = await Tour.create(tourData);

    // Create related data if provided
    if (images && images.length > 0) {
      await TourImage.bulkCreate(
        images.map(url => ({ tour_id: tour.id, url }))
      );
    }

    if (startDates && startDates.length > 0) {
      await TourStartDate.bulkCreate(
        startDates.map(date => ({ tour_id: tour.id, start_date: date }))
      );
    }

    if (features && features.length > 0) {
      await TourFeature.bulkCreate(
        features.map(feature => ({ tour_id: tour.id, feature }))
      );
    }

    // Fetch the complete tour with related data
    const completeTour = await Tour.findByPk(tour.id, {
      include: [
        { model: TourImage, as: 'images' },
        { model: TourStartDate, as: 'startDates' },
        { model: TourFeature, as: 'features' }
      ]
    });
    
    res.status(201).json({
      success: true,
      data: completeTour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update tour
// @route   PUT /api/tours/:id
// @access  Private/Admin

export const updateTour = async (req, res) => {
  try {
    const { images, startDates, features, ...tourData } = req.body;
    
    const tour = await Tour.findByPk(req.params.id);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    // Update tour data
    await tour.update(tourData);

    // Update related data if provided
    if (images !== undefined) {
      await TourImage.destroy({ where: { tour_id: tour.id } });
      if (images.length > 0) {
        await TourImage.bulkCreate(
          images.map(url => ({ tour_id: tour.id, url }))
        );
      }
    }

    if (startDates !== undefined) {
      await TourStartDate.destroy({ where: { tour_id: tour.id } });
      if (startDates.length > 0) {
        await TourStartDate.bulkCreate(
          startDates.map(date => ({ tour_id: tour.id, start_date: date }))
        );
      }
    }

    if (features !== undefined) {
      await TourFeature.destroy({ where: { tour_id: tour.id } });
      if (features.length > 0) {
        await TourFeature.bulkCreate(
          features.map(feature => ({ tour_id: tour.id, feature }))
        );
      }
    }

    // Fetch updated tour with related data
    const updatedTour = await Tour.findByPk(tour.id, {
      include: [
        { model: TourImage, as: 'images' },
        { model: TourStartDate, as: 'startDates' },
        { model: TourFeature, as: 'features' }
      ]
    });

    res.json({
      success: true,
      data: updatedTour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete tour
// @route   DELETE /api/tours/:id
// @access  Private/Admin
export const deleteTour = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    // Store the transaction on the request object for use in the middleware
    req.transaction = t;
    
    const tour = await Tour.findByPk(req.params.id, { transaction: t });

    if (!tour) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    // Delete the tour
    await tour.destroy({ transaction: t });
    
    // The sequence reset is now handled by the withSequenceReset middleware
    await t.commit();
    
    // The middleware will handle the response
    res.status(200).json({
      success: true,
      message: 'Tour deleted successfully'
    });
  } catch (error) {
    await t.rollback();
    console.error('Error deleting tour:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete tour',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};