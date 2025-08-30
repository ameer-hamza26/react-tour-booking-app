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
  createTour: async (tourData) => {
    try {
      const response = await api.post('/tours', tourData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error creating tour' };
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
      throw error.response?.data || { message: 'Error registering user' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error logging in' };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching user data' };
    }
  }
}; 