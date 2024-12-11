import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import img1 from "../assets/images/Rectangle6.png"
import img2 from "../assets/images/Rectangle7.png"
import img3 from "../assets/images/Rectangle8.png"
import { Link as RouterLink } from "react-router-dom";
import "../index.css" 


const HeroSection = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        // backgroundColor:"green",
        // mt:-5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: { xs: 3, md: 6 },
      }}
    >
      <Grid container spacing={10} alignItems="center" >
        {/* Left Side */}
        <Grid item xs={12} md={6} sx={{mt:-15}}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
            Explore The New World
            With Tourbay
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            No matter where in the world you want to go, we
            can help get you there and make your tour a
            stupendous memory.
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button
              variant="contained"
              sx={{
                textTransform: 'none',
                backgroundColor: theme => theme.palette.primary.light,
                ":hover": {
                  backgroundColor: theme => theme.palette.primary.dark,
                },
              }}
            >
              <RouterLink
                to="/exploreNow"
                style={{
                  textDecoration: 'none', // Remove underline
                  color: 'inherit',       // Inherit color from Button
                }}
              >
                Explore Now
              </RouterLink>
            </Button>
          </Box>
        </Grid>

        {/* Right Side */}




<Grid item xs={12} md={6} sx={{ textAlign: 'center',zIndex:"2",mt:{ xs: 3, md: 15 } }}>
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

        <div class="custom-shape-divider-bottom-1732173359">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" class="shape-fill"></path>
    </svg>
</div>
      </Grid>
    </Box>
  );
};

export default HeroSection;
