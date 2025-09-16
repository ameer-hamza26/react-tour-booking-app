import React, { useState } from 'react';
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
import { adminApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AddTour = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState(['']);
  const [startDates, setStartDates] = useState([new Date()]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
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
    if (!isValid) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    
    try {
      setLoading(true);
      
      // Prepare form data for file upload
      const formData = new FormData();
      
      // Prepare tour data with correct field names
      const tourData = {
        title: data.title,
        description: data.description,
        destination: data.destination,
        price: Number(data.price),
        duration: Number(data.duration),
        max_group_size: Number(data.maxGroupSize),
        difficulty: data.difficulty,
        highlights: data.highlights || '',
        features: features.filter(f => f && f.trim() !== ''),
        start_dates: startDates.map(date => new Date(date).toISOString())
      };
      
      // Append all tour data to formData as JSON string
      formData.append('tour', JSON.stringify(tourData));
      
      // Add image if exists
      if (image) {
        formData.append('image', image);
      }

      // Show loading toast
      const toastId = toast.loading('Creating tour...');
      
      try {
        // Send request to create tour
        const response = await adminApi.createTour(formData);
        
        if (response.success) {
          // Update loading toast to success
          toast.update(toastId, {
            render: 'Tour created successfully!',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            closeButton: true
          });
          
          // Reset form
          reset();
          setFeatures(['']);
          setStartDates([new Date()]);
          setImage(null);
          setImagePreview('');
          
          // Redirect to tours list after a short delay
          setTimeout(() => {
            navigate('/admin/tours');
          }, 1500);
        } else {
          throw new Error(response.message || 'Failed to create tour');
        }
      } catch (error) {
        console.error('Error creating tour:', error);
        // Update loading toast to error
        toast.update(toastId, {
          render: error.response?.data?.message || error.message || 'Failed to create tour',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          closeButton: true
        });
        
        // If it's a duplicate tour error, show more details
        if (error.response?.data?.code === 'DUPLICATE_TOUR') {
          toast.warning('A tour with this title and destination already exists', {
            autoClose: 7000,
            closeButton: true
          });
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };



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

export default AddTour;
