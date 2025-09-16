import { useState, useEffect, useCallback } from 'react';
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
  CircularProgress,
  Alert,
  Snackbar,
  Tooltip,
  Fade,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  alpha
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Clear as ClearIcon, 
  LocationOn as LocationIcon,
  AttachMoney as AttachMoneyIcon,
  CalendarToday as CalendarTodayIcon,
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { tourApi } from '../services/api';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [searchParams, setSearchParams] = useState({
    destination: '',
    minPrice: '',
    maxPrice: '',
    startDate: null
  });

  const [touched, setTouched] = useState({
    destination: false,
    minPrice: false,
    maxPrice: false
  });

  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce search to avoid too many API calls
  const debouncedSearch = useCallback(debounce(async (query) => {
      if (!query || query.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await tourApi.getTours({ destination: query });
        // Handle response format - the API returns { success: true, data: [...] }
        let toursData = [];
        if (response && response.success && Array.isArray(response.data)) {
          toursData = response.data;
        } else if (Array.isArray(response)) {
          toursData = response;
        } else if (response && Array.isArray(response.data)) {
          toursData = response.data;
        }
        
        const uniqueDestinations = [...new Set(toursData.map(tour => tour.destination))];
        setSuggestions(uniqueDestinations.slice(0, 5));
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    }, 300), []);

  // Validate form
  const validateForm = useCallback(() => {
    const { destination, minPrice, maxPrice } = searchParams;
    
    // Check if any field has a value
    const hasAnyValue = 
      destination.trim() !== '' || 
      minPrice !== '' || 
      maxPrice !== '' || 
      searchParams.startDate !== null;
    
    // Validate price range if both are provided
    const isValidPriceRange = 
      !minPrice || 
      !maxPrice || 
      Number(minPrice) <= Number(maxPrice);
    
    return hasAnyValue && isValidPriceRange;
  }, [searchParams]);

  // Update search enabled state when form changes
  useEffect(() => {
    setIsSearchEnabled(validateForm());
  }, [searchParams, validateForm]);

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    
    // Validate numeric inputs
    if ((field === 'minPrice' || field === 'maxPrice') && value !== '') {
      // Only allow numbers and empty string
      if (!/^\d*$/.test(value)) return;
      
      // Limit price length
      if (value.length > 8) return;
    }
    
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    // Fetch destination suggestions
    if (field === 'destination') {
      debouncedSearch(value);
    }
  };

  const handleDateChange = (date) => {
    setSearchParams(prev => ({
      ...prev,
      startDate: date
    }));
    
    // Auto-search when date is selected
    if (validateForm()) {
      handleSearch();
    }
  };

  const handleSuggestionSelect = (destination) => {
    setSearchParams(prev => ({
      ...prev,
      destination
    }));
    setShowSuggestions(false);
    
    // Auto-search when suggestion is selected
    if (validateForm()) {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchParams({
      destination: '',
      minPrice: '',
      maxPrice: '',
      startDate: null
    });
    setTouched({
      destination: false,
      minPrice: false,
      maxPrice: false
    });
    setError('');
    setSuggestions([]);
    setShowSuggestions(false);
    // Call onSearch with empty object to fetch all tours
    onSearch({});
  };
  
  const handleCloseError = () => {
    setError('');
  };

  const handleSearch = async () => {
    if (!isSearchEnabled || isLoading) return;
    
    setIsLoading(true);
    setError('');
    setShowSuggestions(false);
    
    try {
      // Validate price range
      if (searchParams.minPrice && searchParams.maxPrice && 
          Number(searchParams.minPrice) > Number(searchParams.maxPrice)) {
        throw new Error('Minimum price cannot be greater than maximum price');
      }
      
      // Prepare search parameters
      const searchFilters = {
        destination: searchParams.destination ? searchParams.destination.trim() : '',
        minPrice: searchParams.minPrice || '',
        maxPrice: searchParams.maxPrice || '',
        startDate: searchParams.startDate ? searchParams.startDate.toISOString().split('T')[0] : ''
      };
      
      console.log('Searching with filters:', searchFilters);
      
      // Call the parent's onSearch with the filters
      onSearch(searchFilters);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error searching tours';
      setError(errorMessage);
      console.error('Error searching tours:', error);
      // Call onSearch with empty object to fetch all tours on error
      onSearch({});
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard events for form submission
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && isSearchEnabled) {
      handleSearch();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card 
        elevation={0}
        sx={{ 
          mb: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          overflow: 'visible'
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              fontSize: { xs: '1.75rem', md: '2.125rem' }
            }}
          >
            <SearchIcon fontSize="large" /> Discover Your Next Adventure
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600 }}>
            Find the perfect tour package tailored to your preferences. Search by destination, date, or budget.
          </Typography>
          
          <Box onKeyPress={handleKeyPress}>
            <Grid container spacing={2} alignItems="flex-start">
              {/* Destination Field */}
              <Grid item xs={12} md={4}>
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    label="Destination"
                    value={searchParams.destination}
                    onChange={handleInputChange('destination')}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    variant="outlined"
                    size="medium"
                    placeholder="Where would you like to go?"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'background.paper',
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: 'primary.light',
                        },
                      },
                    }}
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <Paper 
                      elevation={4} 
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        zIndex: 10,
                        mt: 0.5,
                        maxHeight: 200,
                        overflow: 'auto',
                        borderRadius: 2,
                        '&::-webkit-scrollbar': {
                          width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: 'rgba(0,0,0,0.2)',
                          borderRadius: '3px',
                        },
                      }}
                    >
                      {suggestions.map((suggestion) => (
                        <Box
                          key={suggestion}
                          onClick={() => handleSuggestionSelect(suggestion)}
                          sx={{
                            p: 1.5,
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: 'action.hover',
                            },
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            color: 'text.primary',
                          }}
                        >
                          <LocationIcon color="primary" fontSize="small" />
                          <Typography variant="body2">{suggestion}</Typography>
                        </Box>
                      ))}
                    </Paper>
                  )}
                </Box>
              </Grid>
              
              {/* Date Picker */}
              <Grid item xs={12} sm={6} md={3}>
                <DatePicker
                  label="Start Date"
                  value={searchParams.startDate}
                  onChange={handleDateChange}
                  disablePast
                  enableAccessibleFieldDOMStructure={false}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="medium"
                        placeholder="Select travel date"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background.paper',
                            borderRadius: 2,
                            '&:hover fieldset': {
                              borderColor: 'primary.light',
                            },
                          },
                        }}
                      />
                    )
                  }}
                />
              </Grid>
              
              {/* Price Range Fields */}
              <Grid item xs={12} sm={6} md={5}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1.5,
                  flexDirection: { xs: 'column', sm: 'row' }
                }}>
                  <TextField
                    fullWidth
                    label="Min Price"
                    type="number"
                    value={searchParams.minPrice}
                    onChange={handleInputChange('minPrice')}
                    variant="outlined"
                    size="medium"
                    placeholder="Min"
                    error={touched.minPrice && searchParams.minPrice && searchParams.maxPrice && 
                          Number(searchParams.minPrice) > Number(searchParams.maxPrice)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon color={touched.minPrice && searchParams.minPrice && searchParams.maxPrice && 
                                                Number(searchParams.minPrice) > Number(searchParams.maxPrice) ? 'error' : 'action'} />
                        </InputAdornment>
                      ),
                      inputProps: { 
                        min: 0,
                        style: { textAlign: 'left' }
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'background.paper',
                        borderRadius: 2,
                      },
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Max Price"
                    type="number"
                    value={searchParams.maxPrice}
                    onChange={handleInputChange('maxPrice')}
                    variant="outlined"
                    size="medium"
                    placeholder="Max"
                    error={touched.maxPrice && searchParams.minPrice && searchParams.maxPrice && 
                          Number(searchParams.minPrice) > Number(searchParams.maxPrice)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon color={touched.maxPrice && searchParams.minPrice && searchParams.maxPrice && 
                                                Number(searchParams.minPrice) > Number(searchParams.maxPrice) ? 'error' : 'action'} />
                        </InputAdornment>
                      ),
                      inputProps: { 
                        min: searchParams.minPrice || 0,
                        style: { textAlign: 'left' }
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'background.paper',
                        borderRadius: 2,
                      },
                    }}
                  />
                </Box>
                {touched.maxPrice && searchParams.minPrice && searchParams.maxPrice && 
                 Number(searchParams.minPrice) > Number(searchParams.maxPrice) && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                    Maximum price must be greater than minimum price
                  </Typography>
                )}
              </Grid>
              
              {/* Action Buttons */}
              <Grid item xs={12} sx={{ 
                display: 'flex', 
                gap: 1.5,
                alignItems: 'center',
                justifyContent: { xs: 'center', sm: 'flex-start' },
                flexWrap: 'wrap'
              }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  disabled={!isSearchEnabled || isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    boxShadow: '0 4px 14px rgba(25, 118, 210, 0.4)',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(25, 118, 210, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    transition: 'all 0.2s ease-in-out',
                    minWidth: { xs: '100%', sm: 'auto' }
                  }}
                >
                  {isLoading ? 'Searching...' : 'Find Tours'}
                </Button>
                
                <Tooltip title="Clear all filters">
                  <span>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleClear}
                      disabled={isLoading || !isSearchEnabled}
                      startIcon={<ClearIcon />}
                      size="large"
                      sx={{
                        py: 1.5,
                        px: 3,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: 'action.hover',
                          transform: 'translateY(-2px)',
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                        },
                        transition: 'all 0.2s ease-in-out',
                        minWidth: { xs: '100%', sm: 'auto' }
                      }}
                    >
                      Clear
                    </Button>
                  </span>
                </Tooltip>
                
                <Tooltip title="Search by destination, date, or price range. Press Enter to search.">
                  <IconButton 
                    color="info" 
                    size="medium"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
          
          {/* Popular Destinations */}
          <Box sx={{ mt: 4, mb: 1 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}>
              <TrendingUpIcon fontSize="small" color="primary" /> Popular Destinations:
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1,
              '& .MuiChip-root': {
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2,
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              },
            }}>
              {popularDestinations.map((destination) => (
                <Tooltip key={destination} title={`Search for ${destination} tours`} arrow>
                  <Chip
                    label={destination}
                    onClick={() => handleSuggestionSelect(destination)}
                    color={searchParams.destination === destination ? 'primary' : 'default'}
                    variant={searchParams.destination === destination ? 'filled' : 'outlined'}
                    clickable
                    disabled={isLoading}
                    size={isSmallMobile ? 'small' : 'medium'}
                    sx={{
                      fontWeight: searchParams.destination === destination ? 600 : 'normal',
                      '& .MuiChip-label': {
                        px: 1.5,
                      },
                    }}
                    onMouseDown={(e) => e.preventDefault()} // Prevent focus on click
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
        </CardContent>
        
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          TransitionComponent={Fade}
          sx={{
            '& .MuiAlert-root': {
              boxShadow: 3,
              borderRadius: 2,
              minWidth: 300,
            },
          }}
        >
          <Alert 
            onClose={handleCloseError} 
            severity="error" 
            sx={{ 
              width: '100%',
              '& .MuiAlert-message': {
                display: 'flex',
                alignItems: 'center',
              },
              '& .MuiAlert-icon': {
                alignItems: 'center',
              },
            }}
            elevation={6}
          >
            {error}
          </Alert>
        </Snackbar>
      </Card>
    </LocalizationProvider>
  );
};

SearchTour.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchTour;