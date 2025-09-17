import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, Box, CircularProgress, Alert, Button, Container, Paper } from '@mui/material';
import SearchTour from '../components/SearchTour';
import { tourApi } from '../services/api';

function Tour() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tours on component mount
  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Prepare filters for the API - only include non-empty values
      const apiFilters = {};
      
      if (filters.destination && filters.destination.trim() !== '') {
        apiFilters.destination = filters.destination.trim();
      }
      
      if (filters.minPrice && filters.minPrice !== '') {
        apiFilters.minPrice = filters.minPrice;
      }
      
      if (filters.maxPrice && filters.maxPrice !== '') {
        apiFilters.maxPrice = filters.maxPrice;
      }
      
      if (filters.startDate) {
        apiFilters.date = new Date(filters.startDate).toISOString().split('T')[0];
      }
      
      console.log('Fetching tours with filters:', apiFilters);
      
      const response = await tourApi.getTours(apiFilters);
      console.log('Received tour data:', response);
      
      // Handle response format - the API returns { success: true, data: [...] }
      let toursData = [];
      if (response && response.success && Array.isArray(response.data)) {
        toursData = response.data;
      } else if (Array.isArray(response)) {
        toursData = response;
      } else if (response && Array.isArray(response.data)) {
        toursData = response.data;
      }
      
      console.log('Processed tours data:', toursData);
      setTours(toursData);
    } catch (err) {
      setError(err.message || 'Failed to fetch tours. Please try again.');
      console.error('Error fetching tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchParams) => {
    await fetchTours(searchParams);
  };

  if (loading && tours.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error && tours.length === 0) {
    return (
      <Box p={3}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => fetchTours()}
          sx={{
            backgroundColor: theme => theme.palette.primary.light,
            '&:hover': {
              backgroundColor: theme => theme.palette.primary.dark
            }
          }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  // Ensure we always map over an array
  const tourList = Array.isArray(tours) ? tours : [];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
    

      {/* Search Component */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f8fafc' }}>
        <SearchTour onSearch={handleSearch} />
      </Paper>

      {/* Loading State */}
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Tours Grid */}
      <Grid 
        container 
        spacing={3}
        justifyContent="center"
      >
        {tourList.map((tour) => (
          <Grid item xs={12} sm={6} md={4} key={tour.id ?? tour._id ?? `${tour.title}-${tour.price}`}>
            <Card elevation={0} sx={{ 
              height: '100%', 
              borderRadius: 2, 
              overflow: 'hidden', 
              transition: 'all 0.2s ease-in-out', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
              border: '1px solid #f8fafc',
              '&:hover': { 
                transform: 'translateY(-2px)', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
              } 
            }}>
              <Link to={`/tour/${tour.id ?? tour._id}` } style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                  component="img"
                  image={tour.images?.[0]?.url || tour.images?.[0] || '/default-tour-image.jpg'}
                  alt={tour.title}
                  sx={{ height: 220, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom noWrap>
                    {tour.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {tour.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      ${tour.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tour.duration} days
                    </Typography>
                  </Box>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Results */}
      {!loading && tourList.length === 0 && (
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
          No tours found matching your search criteria.
        </Typography>
      )}
    </Container>
  );
}

export default Tour;
