import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Chip,
  Paper,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

// Popular destinations for quick filters
const popularDestinations = [
  'Murree',
  'Swat Valley',
  'Hunza Valley',
  'Skardu',
  'Lahore',
  'Karimabad'
];

const SearchTour = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    date: null
  });

  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  // Check if any search parameter is filled
  useEffect(() => {
    const hasSearchQuery = Object.values(searchParams).some(value => 
      value !== '' && value !== null
    );
    setIsSearchEnabled(hasSearchQuery);
  }, [searchParams]);

  const handleInputChange = (field) => (event) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleDateChange = (date) => {
    setSearchParams(prev => ({
      ...prev,
      date
    }));
  };

  const handlePopularDestinationClick = (destination) => {
    setSearchParams(prev => ({
      ...prev,
      location: destination
    }));
  };

  const handleClearSearch = () => {
    setSearchParams({
      location: '',
      minPrice: '',
      maxPrice: '',
      date: null
    });
  };

  const handleSearch = async () => {
    try {
      // Format the search parameters
      const formattedParams = {
        ...searchParams,
        // Convert date to ISO string if it exists
        date: searchParams.date ? searchParams.date.toISOString() : undefined,
        // Convert price strings to numbers if they exist
        minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
        maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined
      };

      // Remove undefined values
      const cleanParams = Object.fromEntries(
        Object.entries(formattedParams).filter(([_, value]) => value !== undefined && value !== '')
      );

      const response = await axios.get('/api/tours', { 
        params: cleanParams,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      onSearch(response.data.data);
    } catch (error) {
      console.error('Error searching tours:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Search Tours
      </Typography>

      {/* Popular Destinations */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Popular Destinations
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {popularDestinations.map((destination) => (
            <Chip
              key={destination}
              label={destination}
              onClick={() => handlePopularDestinationClick(destination)}
              color={searchParams.location === destination ? 'primary' : 'default'}
              clickable
            />
          ))}
        </Box>
      </Box>

      <Grid container spacing={2}>
        {/* Location Search */}
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Location"
            value={searchParams.location}
            onChange={handleInputChange('location')}
            InputProps={{
              endAdornment: searchParams.location && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchParams(prev => ({ ...prev, location: '' }))}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* Price Range */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Min Price"
                type="number"
                value={searchParams.minPrice}
                onChange={handleInputChange('minPrice')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Max Price"
                type="number"
                value={searchParams.maxPrice}
                onChange={handleInputChange('maxPrice')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Date Picker */}
        <Grid item xs={12} md={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Tour Date"
              value={searchParams.date}
              onChange={handleDateChange}
              slotProps={{
                textField: { fullWidth: true }
              }}
            />
          </LocalizationProvider>
        </Grid>

        {/* Search and Clear Buttons */}
        <Grid item xs={12} md={2}>
          <Box sx={{ display: 'flex', gap: 1, height: '100%' }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              disabled={!isSearchEnabled}
            >
              Search
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClearSearch}
              disabled={!isSearchEnabled}
            >
              Clear
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchTour; 