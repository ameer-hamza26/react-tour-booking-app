import api from '../utils/axios';


// Tour API calls
export const tourApi = {
  // Get all tours with optional filters
  getTours: async (filters = {}) => {
    try {
      const response = await api.get('/tours', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching tours' };
    }
  },

  // Get single tour by ID
  getTour: async (tourId) => {
    try {
      const response = await api.get(`/tours/${tourId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching tour details' };
    }
  },


  // Create new tour (admin only)
  createTour: async (formData) => {
    try {
      const response = await api.post('/tours', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error in createTour:', error);
      // Return the error response data if available
      if (error.response?.data) {
        throw error.response.data;
      }
      throw { message: error.message || 'Error creating tour' };
    }
  },

  // Update tour (admin only)
  updateTour: async (tourId, tourData) => {
    try {
      const response = await api.put(`/tours/${tourId}`, tourData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating tour' };
    }
  },

  // Delete tour (admin only)
  deleteTour: async (tourId) => {
    try {
      const response = await api.delete(`/tours/${tourId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error deleting tour' };
    }
  }
};

// Booking API calls
export const bookingApi = {
  // Create new booking
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error creating booking' };
    }
  },

  // Get user's bookings with optional filters
  getUserBookings: async (filters = {}) => {
    try {
      console.log('Fetching bookings with filters:', filters);
      
      // Create a new object with only valid, non-empty values
      const cleanFilters = {};
      
      Object.entries(filters).forEach(([key, value]) => {
        // Skip undefined, null, empty strings, and 'null' strings
        if (value === undefined || value === null || value === '' || value === 'null') {
          return;
        }
        
        // Special handling for tourId
        if (key === 'tourId') {
          const tourIdNum = Number(value);
          // Only include valid tour IDs
          if (!isNaN(tourIdNum) && tourIdNum > 0) {
            cleanFilters[key] = tourIdNum;
          } else {
            console.warn(`Skipping invalid tourId: ${value}`);
          }
          return;
        }
        
        cleanFilters[key] = value;
      });
      
      // Only include the query string if there are filters
      const queryString = Object.keys(cleanFilters).length > 0 
        ? `?${new URLSearchParams(cleanFilters).toString()}`
        : '';
      
      const response = await api.get(`/bookings${queryString}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching bookings' };
    }
  },

  // Get single booking
  getBooking: async (bookingId) => {
    try {
      const response = await api.get(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching booking details' };
    }
  },

  // Cancel a booking
  cancelBooking: async (bookingId) => {
    try {
      const response = await api.delete(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error canceling booking' };
    }
  }
};

// Auth API calls
export const authApi = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user data' };
    }
  }
};

// Admin API calls
export const adminApi = {
  // Get all users (admin only)
  getAllUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching users' };
    }
  },

  // Get user statistics (admin only)
  getUserStats: async () => {
    try {
      const response = await api.get('/admin/users/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching user statistics' };
    }
  },

  // Get user statistics with detailed analytics
  getUserDetailedStats: async () => {
    try {
      const response = await api.get('/admin/users/statistics');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching detailed user statistics' };
    }
  },

  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching dashboard stats' };
    }
  },

  // Get recent bookings
  getRecentBookings: async (limit = 5) => {
    try {
      const response = await api.get(`/admin/bookings/recent?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching recent bookings' };
    }
  },

  // Get all bookings (admin only)
  getAllBookings: async (filters = {}) => {
    try {
      const response = await api.get('/admin/bookings', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching all bookings' };
    }
  },

  // Get booking statistics (admin only)
  getBookingStats: async () => {
    try {
      const response = await api.get('/admin/bookings/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching booking statistics' };
    }
  },

  // Update booking status (admin only)
  updateBookingStatus: async (bookingId, statusData) => {
    try {
      const response = await api.put(`/admin/bookings/${bookingId}/status`, statusData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating booking status' };
    }
  },

  // Update user (admin only)
  updateUser: async (userId, userData) => {
    try {
      const response = await api.patch(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating user' };
    }
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error deleting user' };
    }
  },

  // Admin tour management
  // Get all tours (admin only)
  getAllTours: async () => {
    try {
      const response = await api.get('/admin/tours');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching tours' };
    }
  },

  // Create tour (admin only)
  createTour: async (formData) => {
    try {
      const response = await api.post('/admin/tours', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error creating tour' };
    }
  },

  // Update tour (admin only)
  updateTour: async (tourId, formData) => {
    try {
      const response = await api.put(`/admin/tours/${tourId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating tour' };
    }
  },

  // Delete tour (admin only)
  deleteTour: async (tourId) => {
    try {
      const response = await api.delete(`/admin/tours/${tourId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error deleting tour' };
    }
  }
};

// Export all API modules
export default {
  tours: tourApi,
  bookings: bookingApi,
  auth: authApi,
  admin: adminApi
};