import React, { useState } from 'react';
import { Box, Button, Typography, Grid, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineDateRange, MdPriceChange } from 'react-icons/md';
import './styles.css'; // Import your CSS file

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
      <Box className="explore-box">
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
              <Button className="button">
                <FaLocationDot className="icon" />
                Location
                <FormControl className="form-control">
                  <InputLabel id="location-select-label">Location</InputLabel>
                  <Select
                    labelId="location-select-label"
                    value={location}
                    onChange={handleLocationChange}
                    displayEmpty
                    inputProps={{
                      'aria-label': 'Location',
                    }}
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
              <Button className="button">
                <MdOutlineDateRange className="icon" />
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
              <Button className="button">
                <MdPriceChange className="icon" />
                Price
                <FormControl className="form-control">
                  <InputLabel id="price-select-label">Price</InputLabel>
                  <Select
                    labelId="price-select-label"
                    value={price}
                    onChange={handlePriceChange}
                    displayEmpty
                    inputProps={{
                      'aria-label': 'Price',
                    }}
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
      </Box>

      {/* Country Buttons */}
      <Box sx={{ textAlign: 'center', paddingTop: '20px' }}>
        <h1>Popular Search</h1>
        <Grid container spacing={2} justifyContent="center" sx={{ flexWrap: 'wrap' }}>
          {['USA', 'Canada', 'Japan', 'Australia', 'Germany', 'France', 'Italy', 'Brazil', 'Mexico', 'India', 'China', 'Thailand', 'Turkey', 'Egypt', 'Pakistan', 'Malaysia', 'Korea'].map((country, index) => (
            <Grid item key={index}>
              <Button className="country-button">{country}</Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ExploreNow;
