import React from 'react';
import { Box, Typography, Button, Grid, Container, Stack, Chip } from '@mui/material';
import { 
  Explore as ExploreIcon, 
  FlightTakeoff as FlightIcon,
  LocationOn as LocationIcon,
  Star as StarIcon
} from '@mui/icons-material';
import img1 from "../assets/images/Rectangle6.png"
import img2 from "../assets/images/Rectangle7.png"
import img3 from "../assets/images/Rectangle8.png"
import { Link as RouterLink } from "react-router-dom";

const HeroSection = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Side - Content */}
          <Grid item xs={12} md={6}>
            <Stack spacing={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              {/* Badge */}
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Chip
                  icon={<StarIcon />}
                  label="Trusted by 10,000+ Travelers"
                  color="primary"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                />
              </Box>

              {/* Main Heading */}
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  color: '#1f2937',
                  lineHeight: 1.1,
                  mb: 2,
                }}
              >
                Explore The New World
                <br />
                <Box component="span" sx={{ 
                  color: '#2563eb',
                }}>
                  With TourBay
                </Box>
              </Typography>

              {/* Subtitle */}
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#6b7280',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  maxWidth: '500px',
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                No matter where in the world you want to go, we can help get you there and make your tour a stupendous memory.
              </Typography>

              {/* Features */}
              <Stack direction="row" spacing={3} sx={{ 
                justifyContent: { xs: 'center', md: 'flex-start' },
                flexWrap: 'wrap',
                gap: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon sx={{ color: '#2563eb', fontSize: '1.5rem' }} />
                  <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 500 }}>
                    50+ Destinations
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlightIcon sx={{ color: '#059669', fontSize: '1.5rem' }} />
                  <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 500 }}>
                    Best Deals
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StarIcon sx={{ color: '#2563eb', fontSize: '1.5rem' }} />
                  <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 500 }}>
                    5-Star Service
                  </Typography>
                </Box>
              </Stack>

              {/* CTA Buttons */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                sx={{ 
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  mt: 3
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ExploreIcon />}
                  component={RouterLink}
                  to="/exploreNow"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                  }}
                >
                  Explore Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/tour"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  View Tours
                </Button>
              </Stack>
            </Stack>
          </Grid>

        {/* Right Side */}




<Grid item xs={12} md={6} sx={{ zIndex:"2",mt:{ xs: 3, md: 15 } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={img3}
              alt="Image 1"
              sx={{
                width: '100%',
                maxWidth: '200px',
                borderRadius: '8px',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={img2}
                alt="Image 2"
                sx={{
                  width: '100%',
                  maxWidth: '200px',
                  borderRadius: '8px',
                }}
              />
              <Box
                component="img"
                src={img1}
                alt="Image 3"
                sx={{
                  width: '100%',
                  maxWidth: '200px',
                  borderRadius: '8px',
                }}
              />
            </Box>
          </Box>
        </Grid>
        </Grid>
      </Container>

      {/* Bottom Wave */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(248, 250, 252, 0.1) 100%)',
          zIndex: 3
        }}
      />
    </Box>
  );
};

export default HeroSection;
