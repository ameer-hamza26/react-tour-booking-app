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
      const data = await tourApi.getTours(filters);
      // Normalize: API may return an array or an object with a data array
      const list = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
      setTours(list);
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
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
          Tour Destinations
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Find your perfect getaway from our curated list of tours.
        </Typography>
      </Box>

      {/* Search Component */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 3, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
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
        {tourList.map(tour => (
          <Grid item xs={12} sm={6} md={4} key={tour._id}>
            <Card elevation={0} sx={{ height: '100%', borderRadius: 3, overflow: 'hidden', transition: 'transform 0.25s ease, box-shadow 0.25s ease', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 32px rgba(0,0,0,0.10)' } }}>
              <Link to={`/tour/${tour._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                  component="img"
                  image={tour.images?.[0] || '/default-tour-image.jpg'}
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
