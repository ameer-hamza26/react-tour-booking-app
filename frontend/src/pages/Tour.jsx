import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
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
      const response = await tourApi.getTours(filters);
      setTours(response.data);
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

  return (
    <div style={{ padding: '0 16px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tour Destinations
      </Typography>

      {/* Search Component */}
      <SearchTour onSearch={handleSearch} />

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
        spacing={4}
        justifyContent="center"
        style={{
          padding: '0 16px',
        }}
      >
        {tours.map(tour => (
          <Grid item xs={12} sm={6} md={4} key={tour._id}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
              <Link to={`/tour/${tour._id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={tour.images[0] || '/default-tour-image.jpg'}
                  alt={tour.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {tour.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
      {!loading && tours.length === 0 && (
        <Typography variant="h6" align="center" color="textSecondary" sx={{ mt: 4 }}>
          No tours found matching your search criteria.
        </Typography>
      )}
    </div>
  );
}

export default Tour;
