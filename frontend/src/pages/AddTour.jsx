import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  MenuItem, 
  Grid, 
  Box, 
  Container, 
  Typography, 
  Paper,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tourApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AddTour = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState(['']);
  const [startDates, setStartDates] = useState([new Date()]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    control,
    watch
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      destination: '',
      price: '',
      duration: 1,
      maxGroupSize: 10,
      difficulty: 'easy',
      highlights: ''
    }
  });

  // Redirect if not admin
  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      toast.error('Unauthorized access');
    }
  }, [user, isAdmin, navigate]);

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleRemoveFeature = (index) => {
    if (features.length > 1) {
      const newFeatures = [...features];
      newFeatures.splice(index, 1);
      setFeatures(newFeatures);
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleAddStartDate = () => {
    setStartDates([...startDates, new Date()]);
  };

  const handleRemoveStartDate = (index) => {
    if (startDates.length > 1) {
      const newDates = [...startDates];
      newDates.splice(index, 1);
      setStartDates(newDates);
    }
  };

  const handleDateChange = (date, index) => {
    const newDates = [...startDates];
    newDates[index] = date;
    setStartDates(newDates);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    if (!isValid) return;
    
    try {
      setLoading(true);
      
      // Prepare form data for file upload
      const formData = new FormData();
      
      // Add tour data
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      
      // Add features and dates
      features.forEach((feature, index) => {
        if (feature.trim() !== '') {
          formData.append('features', feature);
        }
      });
      
      startDates.forEach((date) => {
        formData.append('startDates', new Date(date).toISOString());
      });
      
      // Add image if exists
      if (image) {
        formData.append('image', image);
      }

      // Send request to create tour
      await tourApi.createTour(formData);
      
      // Show success message
      toast.success('Tour created successfully!');
      
      // Redirect to tours list after a short delay
      setTimeout(() => {
        navigate('/admin/tours');
      }, 1500);
      
    } catch (error) {
      console.error('Error creating tour:', error);
      toast.error(error.response?.data?.message || 'Failed to create tour');
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!isAdmin) {
      navigate('/');
      toast.error('You do not have permission to access this page');
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            Create New Tour
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Tour Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tour Title"
                  {...register('title', { required: 'Title is required' })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  {...register('description', { required: 'Description is required' })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>

              {/* Destination */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Destination"
                  {...register('destination', { required: 'Destination is required' })}
                  error={!!errors.destination}
                  helperText={errors.destination?.message}
                />
              </Grid>

              {/* Price */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Price (USD)"
                  {...register('price', { 
                    required: 'Price is required',
                    min: { value: 1, message: 'Price must be greater than 0' }
                  })}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 8 }}>$</span>,
                  }}
                />
              </Grid>

              {/* Duration */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Duration (days)"
                  {...register('duration', { 
                    required: 'Duration is required',
                    min: { value: 1, message: 'Duration must be at least 1 day' }
                  })}
                  error={!!errors.duration}
                  helperText={errors.duration?.message}
                />
              </Grid>

              {/* Max Group Size */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Max Group Size"
                  {...register('maxGroupSize', { 
                    required: 'Group size is required',
                    min: { value: 1, message: 'Group size must be at least 1' }
                  })}
                  error={!!errors.maxGroupSize}
                  helperText={errors.maxGroupSize?.message}
                />
              </Grid>

              {/* Difficulty */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={!!errors.difficulty}>
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    label="Difficulty"
                    defaultValue="easy"
                    {...register('difficulty', { required: 'Difficulty is required' })}
                  >
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="difficult">Difficult</MenuItem>
                  </Select>
                  {errors.difficulty && (
                    <FormHelperText>{errors.difficulty.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Features */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Features
                </Typography>
                {features.map((feature, index) => (
                  <Box key={index} display="flex" gap={2} mb={2}>
                    <TextField
                      fullWidth
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="Add a feature (e.g., Air Conditioning)"
                    />
                    <Button 
                      variant="outlined" 
                      color="error"
                      onClick={() => handleRemoveFeature(index)}
                      disabled={features.length <= 1}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button 
                  variant="outlined" 
                  onClick={handleAddFeature}
                  sx={{ mt: 1 }}
                >
                  Add Feature
                </Button>
              </Grid>

              {/* Start Dates */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Available Start Dates
                </Typography>
                {startDates.map((date, index) => (
                  <Box key={index} display="flex" gap={2} mb={2}>
                    <DatePicker
                      label="Start Date"
                      value={date}
                      onChange={(newDate) => handleDateChange(newDate, index)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                    <Button 
                      variant="outlined" 
                      color="error"
                      onClick={() => handleRemoveStartDate(index)}
                      disabled={startDates.length <= 1}
                      sx={{ minWidth: '120px' }}
                    >
                      Remove Date
                    </Button>
                  </Box>
                ))}
                <Button 
                  variant="outlined" 
                  onClick={handleAddStartDate}
                  sx={{ mt: 1 }}
                >
                  Add Start Date
                </Button>
              </Grid>

              {/* Highlights */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Highlights (comma separated)"
                  placeholder="Highlight 1, Highlight 2, Highlight 3"
                  {...register('highlights')}
                />
              </Grid>

              {/* Image Upload */}
              <Grid item xs={12}>
                <Box mb={2}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="tour-image-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="tour-image-upload">
                    <Button variant="outlined" component="span" fullWidth>
                      Upload Tour Image
                    </Button>
                  </label>
                  {imagePreview && (
                    <Box mt={2} textAlign="center">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} 
                      />
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{ py: 1.5, mt: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Create Tour'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

// Higher Order Component for admin protection
const withAdminProtection = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (!user || !isAdmin) {
        navigate('/');
        toast.error('You do not have permission to access this page');
      } else {
        setIsLoading(false);
      }
    }, [user, isAdmin, navigate]);

    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress />
        </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAdminProtection(AddTour);
