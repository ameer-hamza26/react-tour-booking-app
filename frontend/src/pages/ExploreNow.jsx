import React from 'react';
import { Box, Button, Typography, Grid, Container, Stack } from '@mui/material';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange, MdPriceChange } from "react-icons/md";
import ExploreImg from "../assets/images/ExploreImg.png";

const ExploreNow = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 420, sm: 520, md: 620 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.45)), url(${ExploreImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
            <Typography variant="h3" sx={{ fontSize: { xs: 28, sm: 36, md: 48 }, fontWeight: 800, lineHeight: 1.2 }}>
              Explore Your Next Adventure
            </Typography>
            <Typography variant="body1" sx={{ mt: 1.5, fontSize: { xs: 14, sm: 16, md: 18 }, opacity: 0.9 }}>
              Find the best destinations, dates, and deals curated just for you.
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{
            bgcolor: 'rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 4,
            p: { xs: 1.25, sm: 1.5 },
            backdropFilter: 'blur(6px)',
          }}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  sx={{
                    py: 1.5,
                    gap: 1,
                    fontWeight: 600,
                    borderRadius: 3,
                    backgroundColor: (t) => t.palette.primary.light,
                    '&:hover': { backgroundColor: (t) => t.palette.primary.dark },
                  }}
                >
                  <FaLocationDot /> Location
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  sx={{
                    py: 1.5,
                    gap: 1,
                    fontWeight: 600,
                    borderRadius: 3,
                    backgroundColor: (t) => t.palette.primary.light,
                    '&:hover': { backgroundColor: (t) => t.palette.primary.dark },
                  }}
                >
                  <MdOutlineDateRange /> Choose Date
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  sx={{
                    py: 1.5,
                    gap: 1,
                    fontWeight: 600,
                    borderRadius: 3,
                    backgroundColor: (t) => t.palette.primary.light,
                    '&:hover': { backgroundColor: (t) => t.palette.primary.dark },
                  }}
                >
                  <MdPriceChange /> Price Range
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Popular Search */}
          <Box sx={{ mt: { xs: 3, sm: 4 } }}>
            <Typography component="h2" variant="h6" sx={{ fontSize: { xs: 18, sm: 22, md: 26 }, fontWeight: 700, textAlign: 'center', mb: 1.5 }}>
              Popular Searches
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" justifyContent="center">
              {[
                'USA','Canada','Japan','Australia','Germany','France','Italy','Brazil','Mexico',
                'India','China','Thailand','Turkey','Egypt','Pakistan','Malaysia','Korea',
              ].map((country) => (
                <Button
                  key={country}
                  variant="outlined"
                  size="small"
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.6)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 999,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 1.5,
                    '&:hover': {
                      borderColor: '#fff',
                      backgroundColor: 'rgba(255,255,255,0.18)'
                    }
                  }}
                >
                  {country}
                </Button>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ExploreNow;
