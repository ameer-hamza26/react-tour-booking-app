import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToast.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Tour as TourIcon,
  Close as CloseIcon,
  Image as ImageIcon,
  Place as PlaceIcon,
  LocationOn as LocationOnIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { adminApi } from '../services/api';

const AdminTours = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [features, setFeatures] = useState(['']);
  const [startDates, setStartDates] = useState([new Date()]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue
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

  useEffect(() => {
    fetchTours();
    
    // Cleanup function
    return () => {
      setTours([]);
      setLoading(false);
      setDeleteDialogOpen(false);
      setTourToDelete(null);
      closeEditDialog();
    };
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getAllTours();
      console.log('Tours API Response:', response); // Log the response
      setTours(response.data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch tours. Please try again later.');
      setTours([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTour = async () => {
    const toastId = toast.loading('Deleting tour...');
    try {
      await adminApi.deleteTour(tourToDelete.id);
      toast.update(toastId, {
        render: 'Tour deleted successfully',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeButton: true
      });
      fetchTours(); // Refresh the list
    } catch (error) {
      console.error('Error deleting tour:', error);
      toast.update(toastId, {
        render: error.response?.data?.message || 'Failed to delete tour',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        closeButton: true
      });
    } finally {
      setDeleteDialogOpen(false);
      setTourToDelete(null);
    }
  };

  const openDeleteDialog = (tour) => {
    setTourToDelete(tour);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTourToDelete(null);
  };
  
  // Cleanup function for edit dialog
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingTour(null);
    setFeatures(['']);
    setStartDates([new Date()]);
    setImage(null);
    setImagePreview('');
    reset();
  };

  const handleCloseEditDialog = () => {
    if (!isSubmitting) { // Only allow closing if not submitting
      closeEditDialog();
    }
  };

  const handleEditClick = (tour) => {
    console.log('Editing tour:', tour);
    // Reset form first
    reset();
    // Then set editing tour and other states
    setEditingTour(tour);
    
    // Set form values
    reset({
      title: tour.title,
      description: tour.description,
      destination: tour.destination,
      price: tour.price,
      duration: tour.duration,
      maxGroupSize: tour.max_group_size || 10,
      difficulty: tour.difficulty || 'easy',
      highlights: tour.highlights || ''
    });
    
    // Set features and start dates
    setFeatures(tour.features?.length > 0 ? tour.features : ['']);
    setStartDates(tour.start_dates?.length > 0 
      ? tour.start_dates.map(date => new Date(date)) 
      : [new Date()]
    );
    
    // Set image preview if exists
    setImagePreview(tour.image_url || '');
    setImage(null);
    
    setEditDialogOpen(true);
  };

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
    console.log('Form submitted with data:', data);
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    // Validate editingTour exists and has an ID
    if (!editingTour?.id) {
      toast.error('No tour selected for editing');
      setEditDialogOpen(false);
      return;
    }

    const toastId = toast.loading('Updating tour...');
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      // Append each field individually to match the backend's expected format
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('destination', data.destination);
      formData.append('price', Number(data.price));
      formData.append('duration', Number(data.duration));
      formData.append('max_group_size', Number(data.maxGroupSize));
      formData.append('difficulty', data.difficulty);
      formData.append('highlights', data.highlights || '');
      
      // Append features - ensure we only process non-empty strings
      features
        .filter(f => f && typeof f === 'string' && f.trim() !== '')
        .forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });
      
      // Append start dates
      startDates.forEach((date, index) => {
        formData.append(`start_dates[${index}]`, date.toISOString().split('T')[0]);
      });
      
      // Append image if changed
      if (image) {
        formData.append('image', image);
      }
      
      // Make the API call to update the tour
      const response = await adminApi.updateTour(editingTour.id, formData);
      
      // Show success message
      toast.update(toastId, {
        render: 'Tour updated successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
        closeButton: true
      });
      
      // Close the dialog and reset form
      closeEditDialog();
      
      // Refresh the tours list
      await fetchTours();
    } catch (error) {
      console.error('Error updating tour:', error);
      
      // Show detailed error message
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update tour';
      toast.update(toastId, {
        render: errorMessage,
        type: 'error',
        isLoading: false,
        autoClose: 4000,
        closeButton: true
      });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const TourCard = ({ tour }) => (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {/* Header with Image */}
      <Box 
        sx={{
          height: 160,
          backgroundImage: `url(${tour.images?.[0]?.url || 'https://via.placeholder.com/400x200?text=No+Image'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
          },
        }}
      >
        <Box sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          p: 2,
          zIndex: 1,
          color: 'white',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
            {tour.title || 'Untitled Tour'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PlaceIcon fontSize="small" />
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {tour.destination || 'No destination'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 60,
          }}
        >
          {tour.description || 'No description available'}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: 1,
          mb: 2,
        }}>
          <Chip 
            label={`$${tour.price || '0'}`} 
            color="primary"
            variant="outlined"
            size="small"
            sx={{ fontWeight: 600 }}
          />
          <Chip 
            label={`${tour.duration || 0} days`} 
            color="secondary"
            variant="outlined"
            size="small"
          />
          <Chip 
            label={tour.difficulty || 'N/A'} 
            color={
              tour.difficulty?.toLowerCase() === 'easy' ? 'success' : 
              tour.difficulty?.toLowerCase() === 'medium' ? 'warning' : 'error'
            } 
            size="small"
            variant="outlined"
          />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1,
          mt: 'auto',
          pt: 1,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}>
          <LocationOnIcon color="action" fontSize="small" />
          <Typography variant="caption" color="text.secondary">
            {tour.location || 'Location not specified'}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ 
        p: 2, 
        pt: 0,
        justifyContent: 'space-between',
        gap: 1,
      }}>
        <Button
          size="small"
          startIcon={<ViewIcon />}
          onClick={() => navigate(`/tour/${tour.id}`)}
          sx={{ 
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          View Details
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(tour);
            }}
            sx={{ 
              minWidth: 'auto',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'action.hover',
              },
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            startIcon={<DeleteIcon />}
            onClick={(e) => {
              e.stopPropagation();
              openDeleteDialog(tour);
            }}
            sx={{ 
              minWidth: 'auto',
              color: 'error.main',
              '&:hover': {
                backgroundColor: 'rgba(211, 47, 47, 0.04)',
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h6">Loading tours...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Manage Tours
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/tours/add')}
        >
          Add New Tour
        </Button>
      </Box>

      {/* Tours Grid */}
      {tours.length > 0 ? (
        <Grid container spacing={3}>
          {tours.map((tour) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tour.id}>
              <TourCard tour={tour} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <TourIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No tours found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Get started by creating your first tour package
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/tours/add')}
          >
            Create First Tour
          </Button>
        </Paper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Tour</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{tourToDelete?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteTour} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Tour Dialog */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Edit Tour</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    {...register('title', { required: 'Title is required' })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    {...register('description', { required: 'Description is required' })}
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Destination"
                    {...register('destination', { required: 'Destination is required' })}
                    error={!!errors.destination}
                    helperText={errors.destination?.message}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    type="number"
                    {...register('price', { 
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be positive' }
                    })}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Duration (days)"
                    type="number"
                    {...register('duration', { 
                      required: 'Duration is required',
                      min: { value: 1, message: 'Duration must be at least 1 day' }
                    })}
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Max Group Size"
                    type="number"
                    {...register('maxGroupSize', { 
                      required: 'Max group size is required',
                      min: { value: 1, message: 'Group size must be at least 1' }
                    })}
                    error={!!errors.maxGroupSize}
                    helperText={errors.maxGroupSize?.message}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal" error={!!errors.difficulty}>
                    <InputLabel>Difficulty</InputLabel>
                    <Select
                      label="Difficulty"
                      {...register('difficulty', { required: 'Difficulty is required' })}
                      defaultValue="easy"
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Highlights (comma separated)"
                    {...register('highlights')}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                    Features
                  </Typography>
                  {features.map((feature, index) => (
                    <Box key={index} display="flex" gap={1} mb={1}>
                      <TextField
                        fullWidth
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        size="small"
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveFeature(index)}
                        disabled={features.length === 1}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddFeature}
                    sx={{ mt: 1 }}
                  >
                    Add Feature
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                    Start Dates
                  </Typography>
                  {startDates.map((date, index) => (
                    <Box key={index} display="flex" gap={1} mb={1}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label={`Start Date ${index + 1}`}
                          value={date}
                          onChange={(newDate) => handleDateChange(newDate, index)}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </LocalizationProvider>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveStartDate(index)}
                        disabled={startDates.length === 1}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddStartDate}
                    sx={{ mt: 1 }}
                  >
                    Add Start Date
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                    Tour Image
                  </Typography>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="tour-image-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="tour-image-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<ImageIcon />}
                      sx={{ mb: 2 }}
                    >
                      {imagePreview ? 'Change Image' : 'Upload Image'}
                    </Button>
                  </label>
                  {imagePreview && (
                    <Box mt={2}>
                      <img
                        src={imagePreview}
                        alt="Tour preview"
                        style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseEditDialog}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Update Tour'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </LocalizationProvider>

      
      </Container>

  );
};

export default AdminTours; 