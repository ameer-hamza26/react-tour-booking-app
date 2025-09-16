import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Link, 
  IconButton,
  Divider
} from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e5e7eb',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  fontWeight: 800, 
                  color: '#2563eb',
                  mb: 2 
                }}
              >
                TourBay
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#6b7280', 
                  lineHeight: 1.6,
                  mb: 3 
                }}
              >
                Your trusted partner for unforgettable travel experiences. We create memories that last a lifetime through carefully crafted tour packages and exceptional service.
              </Typography>
            </Box>
            
            {/* Contact Info */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: '#2563eb', fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  info@tourbay.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ color: '#2563eb', fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: '#2563eb', fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  123 Travel Street, Adventure City
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography 
              variant="h6" 
              component="h3" 
              sx={{ 
                fontWeight: 600, 
                color: '#1f2937',
                mb: 2 
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/tours" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                All Tours
              </Link>
              <Link href="/exploreNow" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                Explore Now
              </Link>
              <Link href="/about" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                About Us
              </Link>
              <Link href="/contact" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography 
              variant="h6" 
              component="h3" 
              sx={{ 
                fontWeight: 600, 
                color: '#1f2937',
                mb: 2 
              }}
            >
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/tours?type=adventure" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                Adventure Tours
              </Link>
              <Link href="/tours?type=cultural" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                Cultural Tours
              </Link>
              <Link href="/tours?type=nature" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                Nature Tours
              </Link>
              <Link href="/tours?type=luxury" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                Luxury Tours
              </Link>
            </Box>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography 
              variant="h6" 
              component="h3" 
              sx={{ 
                fontWeight: 600, 
                color: '#1f2937',
                mb: 2 
              }}
            >
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/help" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                Help Center
              </Link>
              <Link href="/faq" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                FAQ
              </Link>
              <Link href="/terms" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                Terms of Service
              </Link>
              <Link href="/privacy" sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography 
              variant="h6" 
              component="h3" 
              sx={{ 
                fontWeight: 600, 
                color: '#1f2937',
                mb: 2 
              }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                sx={{ 
                  color: '#6b7280',
                  '&:hover': { 
                    color: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)'
                  }
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: '#6b7280',
                  '&:hover': { 
                    color: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)'
                  }
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: '#6b7280',
                  '&:hover': { 
                    color: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)'
                  }
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: '#6b7280',
                  '&:hover': { 
                    color: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)'
                  }
                }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#e5e7eb' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#6b7280',
              fontSize: '0.875rem'
            }}
          >
            © {new Date().getFullYear()} TourBay. All rights reserved. | Made with ❤️ for travelers worldwide.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
