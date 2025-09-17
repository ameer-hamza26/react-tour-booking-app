import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip } from '@mui/material';
import { 
  Explore as ExploreIcon, 
  Security as SecurityIcon, 
  Support as SupportIcon,
  Star as StarIcon 
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

const HomePage = () => {
  const features = [
    {
      icon: <ExploreIcon sx={{ fontSize: 40 }} />,
      title: 'Explore Destinations',
      description: 'Discover amazing places around the world with our curated tour packages.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Safe & Secure',
      description: 'Your safety is our priority with verified accommodations and experienced guides.'
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Get help anytime with our round-the-clock customer support team.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing experience! The tour was perfectly organized and the destinations were breathtaking.',
      location: 'New York, USA'
    },
    {
      name: 'Michael Chen',
      rating: 5,
      comment: 'Best vacation I\'ve ever had. Professional guides and unforgettable memories.',
      location: 'Toronto, Canada'
    },
    {
      name: 'Emma Davis',
      rating: 5,
      comment: 'Incredible service and beautiful locations. Highly recommend TourBay!',
      location: 'London, UK'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" component="h2" gutterBottom fontWeight="bold">
            Why Choose TourBay?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            We provide exceptional travel experiences with unmatched quality and service
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  textAlign: 'center',
                  p: 3,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    transition: 'transform 0.3s ease-in-out',
                    boxShadow: 3
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            Ready to Start Your Adventure?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of travelers who have discovered the world with TourBay
          </Typography>
          <Button
            component={RouterLink}
            to="/exploreNow"
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
          >
            Explore Tours Now
          </Button>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" component="h2" gutterBottom fontWeight="bold">
            What Our Travelers Say
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Real experiences from real travelers
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box display="flex" gap={0.5} mb={2}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: 'warning.main' }} />
                    ))}
                  </Box>
                  <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                    "{testimonial.comment}"
                  </Typography>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.location}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h2" component="div" color="primary.main" fontWeight="bold">
                500+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Tours Available
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h2" component="div" color="primary.main" fontWeight="bold">
                10K+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Happy Travelers
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h2" component="div" color="primary.main" fontWeight="bold">
                50+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Destinations
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h2" component="div" color="primary.main" fontWeight="bold">
                98%
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Satisfaction Rate
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
