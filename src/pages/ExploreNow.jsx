import React, { useState } from 'react';
import { Box, Button, Typography, Grid, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineDateRange, MdPriceChange } from 'react-icons/md';
import ExploreImg from '../assets/images/ExploreImg.png';

const ExploreNow = () => {
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <>
      {/* Background Box */}
      <Box
        sx={{
          position: 'relative',
          height: '60vh',
          backgroundImage: `url(${ExploreImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Centered Content for Buttons */}
      <Box
        sx={{
          position: 'absolute',
          top: '72%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {/* Location Button */}
          <Grid item xs={12} sm={4} md={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme => theme.palette.primary.light,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 1,
                width: '100%',
              }}
            >
              <FaLocationDot style={{ marginRight: 8 }} />
              Location
              <FormControl sx={{ marginLeft: 2 }}>
                <InputLabel id="location-select-label">Location</InputLabel>
                <Select
                  labelId="location-select-label"
                  value={location}
                  onChange={handleLocationChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Location' }}
                  sx={{ width: '120px' }}
                >
                  <MenuItem value="" disabled>Select Location</MenuItem>
                  <MenuItem value="New York">New York</MenuItem>
                  <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                  <MenuItem value="Paris">Paris</MenuItem>
                  <MenuItem value="Tokyo">Tokyo</MenuItem>
                  <MenuItem value="London">London</MenuItem>
                </Select>
              </FormControl>
            </Button>
          </Grid>

          {/* Date Button */}
          <Grid item xs={12} sm={4} md={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme => theme.palette.primary.light,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 1,
                width: '100%',
              }}
            >
              <MdOutlineDateRange style={{ marginRight: 8 }} />
              Date
              <TextField
                type="date"
                variant="outlined"
                sx={{
                  marginLeft: 2,
                  width: '120px',
                }}
              />
            </Button>
          </Grid>

          {/* Price Button */}
          <Grid item xs={12} sm={4} md={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme => theme.palette.primary.light,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 1,
                width: '100%',
              }}
            >
              <MdPriceChange style={{ marginRight: 8 }} />
              Price
              <FormControl sx={{ marginLeft: 2 }}>
                <InputLabel id="price-select-label">Price</InputLabel>
                <Select
                  labelId="price-select-label"
                  value={price}
                  onChange={handlePriceChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Price' }}
                  sx={{ width: '120px' }}
                >
                  <MenuItem value="" disabled>Price</MenuItem>
                  <MenuItem value="New York">$50 - $100</MenuItem>
                  <MenuItem value="Los Angeles">$100 - $200</MenuItem>
                  <MenuItem value="Paris">$200 - $300</MenuItem>
                  <MenuItem value="Tokyo">$300 - $400</MenuItem>
                  <MenuItem value="London">$400 - $500</MenuItem>
                </Select>
              </FormControl>
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Country Buttons */}
      <Box
        sx={{
          position: 'absolute',
          bottom: {xs:"-60%",md:"-10%"},
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: '70%',

        }}
      >
        <h1>Popular Search</h1>
        <Grid container spacing={2} justifyContent="center" sx={{ flexWrap: 'wrap' }}>
          {['USA', 'Canada', 'Japan', 'Australia', 'Germany', 'France', 'Italy', 'Brazil', 'Mexico', 'India', 'China', 'Thailand', 'Turkey', 'Egypt', 'Pakistan', 'Malaysia', 'Korea'].map((country, index) => (
            <Grid item key={index}>
              <Button variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: '20px' }}>
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
