import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, Typography, Card, CardMedia, Box ,CardContent,Button, Container, CircularProgress, Alert } from '@mui/material';
import { tourApi } from '../services/api';

function TourDetailPage() {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await tourApi.getTour(tourId);
        // Note: tourApi.getTour returns the API body; align with list page shape
        setTour(response.data || response);
      } catch (err) {
        setError(err.message || 'Failed to load tour details');
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [tourId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button variant="contained" component={Link} to="/tour">
          Back to Tours
        </Button>
      </Container>
    );
  }

  if (!tour) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography>Tour not found!</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Tour Name */}
      <Typography sx={{ mb: 5 }} variant="h4" gutterBottom align="center" color="text.primary">
        {tour.title || tour.name}
      </Typography>

      {/* Tour Images */}
      <Grid container spacing={4} justifyContent="center">
        {(tour.images && tour.images.length > 0 ? tour.images : [tour.image || '/default-tour-image.jpg']).map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={6} style={{ borderRadius: '12px' }}>
              <CardMedia
                component="img"
                height="250"
                image={image}
                alt={`${tour.title || tour.name} Image ${index + 1}`}
                style={{ borderRadius: '12px', objectFit: 'cover' }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tour Description */}
      <Box mt={4} sx={{ bgcolor: 'background.default', p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          About {tour.title || tour.name}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
          {tour.description}
        </Typography>
      </Box>

      {/* What's Included */}
      {Array.isArray(tour.included) && tour.included.length > 0 && (
        <Box mt={4} sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
            What's Included
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {tour.included.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{
                  bgcolor: 'grey.50',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 16 }}>
                    {item}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {(tour.destination || tour.departureLocation || tour.returnLocation || tour.price || tour.duration) && (
        <Box mt={4} sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
            Tour Details
          </Typography>
          {tour.destination && (
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 16 }}>
              <strong>Destination:</strong> {tour.destination}
            </Typography>
          )}
          {tour.departureLocation && (
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 16 }}>
              <strong>Departure Location:</strong> {tour.departureLocation}
            </Typography>
          )}
          {tour.returnLocation && (
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 16 }}>
              <strong>Return Location:</strong> {tour.returnLocation}
            </Typography>
          )}
          {tour.duration && (
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 16 }}>
              <strong>Duration:</strong> {tour.duration} days
            </Typography>
          )}
          {tour.price && (
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 16 }}>
              <strong>Price:</strong> ${tour.price}
            </Typography>
          )}
        </Box>
      )}

      {Array.isArray(tour.itinerary) && tour.itinerary.length > 0 && (
        <Box mt={4} sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
            Itinerary
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {tour.itinerary.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card elevation={6} sx={{
                  borderRadius: 2, 
                  bgcolor: 'background.paper', 
                  p: 2, 
                  boxShadow: 3, 
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' }
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                      {item.day || `Day ${index + 1}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14 }}>
                      {item.schedule || item.description}
                    </Typography>
                    {typeof item.temperature !== 'undefined' && (
                      <Typography variant="body2" color="warning.main" sx={{ fontSize: 14, fontWeight: 500, mt: 1.25 }}>
                        <strong>Temperature: </strong>{item.temperature}°C
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Book Now Button */}
      <Box mt={4} sx={{ display: 'flex', justifyContent: 'center'}}>
        <Button 
          variant="contained" 
          sx={{
            px: 3.5,
            py: 1.25, 
            borderRadius: 999, 
            fontSize: 16, 
            fontWeight: 600, 
            boxShadow: 3, 
            backgroundColor:theme => theme.palette.primary.light,
            '&:hover': {
              backgroundColor:theme => theme.palette.primary.dark }
          }}
          component={Link}
          to={`/tour/${tour._id || tourId}/book`}
        >
          Book Now
        </Button>
      </Box>
    </Container>
  );
}

export default TourDetailPage;
