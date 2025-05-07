import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange, MdPriceChange } from "react-icons/md";
import ExploreImg from "../assets/images/ExploreImg.png";

const ExploreNow = () => {
  return (
    <>
      {/* Background Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '40vh', md: '60vh' }, // Adjust height for small devices
          backgroundImage: `url(${ExploreImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Button Section */}
      <Box
        sx={{
          position: 'absolute',
          top: '72%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
          padding: { xs: 2, md: 0 }, // Add padding for small devices
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm="auto">
            <Button
              variant="contained"
              sx={{
                width: { xs: '100%', sm: 'auto' },
                padding: 2,
                backgroundColor: (theme) => theme.palette.primary.light,
              }}
            >
              <FaLocationDot style={{ marginRight: 5 }} /> Location
            </Button>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Button
              variant="contained"
              sx={{
                width: { xs: '100%', sm: 'auto' },
                padding: 2,
                backgroundColor: (theme) => theme.palette.primary.light,
              }}
            >
              <MdOutlineDateRange style={{ marginRight: 5 }} /> Choose Date
            </Button>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Button
              variant="contained"
              sx={{
                width: { xs: '100%', sm: 'auto' },
                padding: 2,
                backgroundColor: (theme) => theme.palette.primary.light,
              }}
            >
              <MdPriceChange style={{ marginRight: 5 }} /> Price Range
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Popular Search Section */}
      <Box
        sx={{
          position: 'absolute',
          bottom: {xs:'-60%',sm:"-40%",md:"-10%"},
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: { xs: '90%', md: '70%' }, // Adjust width for small devices
        }}
      >
        <Typography variant="h6" sx={{ fontSize: { xs: '1.2rem', md: '2rem' },mb:"1rem",fontWeight:"bold" }}>
          Popular Search
        </Typography>
        <Grid container spacing={1} justifyContent="center">
          {[
            'USA', 'Canada', 'Japan', 'Australia', 'Germany', 'France', 'Italy', 'Brazil', 'Mexico',
            'India', 'China', 'Thailand', 'Turkey', 'Egypt', 'Pakistan', 'Malaysia', 'Korea',
          ].map((country, index) => (
            <Grid item key={index} xs={4} sm="auto">
              <Button
                variant="outlined"
                sx={{
                  width: '100%', // Full width on small devices
                  backgroundColor: '#fff',
                  borderRadius: '20px',
                  fontSize: { xs: '0.8rem', md: '1rem' }, // Adjust font size
                  padding: { xs: 1, md: 2 }, // Adjust padding
                }}
              >
                {country}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ExploreNow;
