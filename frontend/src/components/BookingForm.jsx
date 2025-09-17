import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { bookingApi, tourApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import StripePayment from './StripePayment';

const steps = ['Tour Details', 'Personal Information', 'Payment', 'Confirmation'];

const BookingForm = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [createdBooking, setCreatedBooking] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      numberOfPeople: {
        adults: 1,
        children: 0
      },
      paymentMethod: 'credit_card',
      specialRequests: '',
      contactInfo: {
        phone: '',
        email: user?.email || ''
      }
    }
  });

  // Watch form values for price calculation
  const numberOfPeople = watch('numberOfPeople');
  const startDate = watch('startDate');

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await tourApi.getTour(tourId);
        setTour(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch tour details');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [tourId]);

  useEffect(() => {
    if (tour && numberOfPeople) {
      const price = (tour.price * numberOfPeople.adults) +
                   (tour.price * 0.7 * numberOfPeople.children);
      setTotalPrice(price);
    }
  }, [tour, numberOfPeople]);

  const handleNext = (e) => {
    if (e) {
      e.preventDefault();
    }
    
    // Prevent going to payment step (step 2) without completing previous steps
    if (activeStep === 1 && !isValid) {
      toast.error('Please fill in all required fields before proceeding');
      return;
    }
    
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const bookingData = {
        ...data,
        // Ensure correct types for backend validation/queries
        tourId: Number(tourId),
        startDate: data.startDate instanceof Date ? data.startDate.toISOString() : data.startDate,
        totalPrice
      };

      const response = await bookingApi.createBooking(bookingData);
      
      if (response.success) {
        toast.success('Booking created successfully!');
        // Sequelize returns `id`, not `_id`
        navigate(`/bookings/${response.data.id}`);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !tour) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Tour Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  {tour.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tour.description}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: 'Start date is required' }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Start Date"
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        minDate={new Date()}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.startDate,
                            helperText: errors.startDate?.message
                          }
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="numberOfPeople.adults"
                  control={control}
                  rules={{
                    required: 'Number of adults is required',
                    min: { value: 1, message: 'At least 1 adult is required' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Number of Adults"
                      type="number"
                      fullWidth
                      error={!!errors.numberOfPeople?.adults}
                      helperText={errors.numberOfPeople?.adults?.message}
                      inputProps={{ min: 1, max: 10 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="numberOfPeople.children"
                  control={control}
                  rules={{
                    min: { value: 0, message: 'Cannot be negative' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Number of Children"
                      type="number"
                      fullWidth
                      error={!!errors.numberOfPeople?.children}
                      helperText={errors.numberOfPeople?.children?.message}
                      inputProps={{ min: 0, max: 10 }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="contactInfo.phone"
                  control={control}
                  rules={{
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: 'Invalid phone number format'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      fullWidth
                      error={!!errors.contactInfo?.phone}
                      helperText={errors.contactInfo?.phone?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="contactInfo.email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      fullWidth
                      disabled
                      value={user?.email}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="specialRequests"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 500,
                      message: 'Special requests cannot exceed 500 characters'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Special Requests"
                      multiline
                      rows={4}
                      fullWidth
                      error={!!errors.specialRequests}
                      helperText={errors.specialRequests?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            
            {/* Booking Summary */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Booking Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2">Tour:</Typography>
                  <Typography variant="body2">Start Date:</Typography>
                  <Typography variant="body2">Adults:</Typography>
                  <Typography variant="body2">Children:</Typography>
                  <Typography variant="body2">Contact Email:</Typography>
                  <Typography variant="body2">Contact Phone:</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6">Total Price:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <Typography variant="body2">{tour.title}</Typography>
                  <Typography variant="body2">{startDate?.toLocaleDateString()}</Typography>
                  <Typography variant="body2">{numberOfPeople.adults}</Typography>
                  <Typography variant="body2">{numberOfPeople.children}</Typography>
                  <Typography variant="body2">{user?.email || 'N/A'}</Typography>
                  <Typography variant="body2">{watch('contactInfo.phone') || 'N/A'}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6" color="primary">${totalPrice.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Payment Section */}
            {!createdBooking ? (
              <Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Click "Create Booking" to proceed with payment.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={async () => {
                    try {
                      setLoading(true);
                      const formData = {
                        tourId: tourId,
                        startDate: startDate instanceof Date ? startDate.toISOString() : startDate,
                        numberOfPeople: {
                          adults: numberOfPeople.adults,
                          children: numberOfPeople.children
                        },
                        paymentMethod: 'stripe',
                        specialRequests: watch('specialRequests') || '',
                        contactInfo: {
                          phone: watch('contactInfo.phone'),
                          email: user?.email
                        }
                      };
                      
                      const response = await bookingApi.createBooking(formData);
                      setCreatedBooking(response.data);
                      toast.success('Booking created successfully! Proceed with payment.');
                    } catch (error) {
                      toast.error(error.message || 'Failed to create booking');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  sx={{ mb: 3 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Create Booking & Proceed to Payment'}
                </Button>
              </Box>
            ) : (
              <StripePayment
                booking={createdBooking}
                onPaymentSuccess={(paymentIntent) => {
                  setPaymentCompleted(true);
                  toast.success('Payment completed successfully!');
                  setTimeout(() => {
                    navigate(`/bookings/${createdBooking.id}`);
                  }, 2000);
                }}
                onPaymentError={(error) => {
                  toast.error('Payment failed. Please try again.');
                }}
              />
            )}
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Booking Confirmation
            </Typography>
            
            {paymentCompleted ? (
              <Box>
                <Alert severity="success" sx={{ mb: 3 }}>
                  🎉 Congratulations! Your booking has been confirmed and payment has been processed successfully.
                </Alert>
                
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Booking Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Tour: {tour.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Start Date: {startDate?.toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Number of Adults: {numberOfPeople.adults}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Number of Children: {numberOfPeople.children}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Price: ${totalPrice.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Payment Status: ✅ Paid
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Booking Status: ✅ Confirmed
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    You will be redirected to your booking details shortly...
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box>
                <Alert severity="info" sx={{ mb: 3 }}>
                  Please complete the payment to confirm your booking.
                </Alert>
                
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Booking Summary
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Tour: {tour.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Start Date: {startDate?.toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Number of Adults: {numberOfPeople.adults}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Number of Children: {numberOfPeople.children}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Price: ${totalPrice.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Payment Status: ⏳ Pending
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
            Book Your Tour
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Complete the steps below to confirm your booking.
          </Typography>
        </Box>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length - 1 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                sx={{ px: 3, py: 1.1, width: { xs: '100%', sm: 'auto' } }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!isValid || loading}
                sx={{
                  px: 3.5,
                  py: 1.1,
                  width: { xs: '100%', sm: 'auto' },
                  backgroundColor: theme => theme.palette.primary.light,
                  '&:hover': {
                    backgroundColor: theme => theme.palette.primary.dark
                  }
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Confirm Booking'}
              </Button>
            </Box>
          </form>
        ) : (
          <div>
            {renderStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                sx={{ px: 3, py: 1.1, width: { xs: '100%', sm: 'auto' } }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isValid || activeStep === 2}
                type="button"
                sx={{
                  px: 3.5,
                  py: 1.1,
                  width: { xs: '100%', sm: 'auto' },
                  backgroundColor: theme => theme.palette.primary.light,
                  '&:hover': {
                    backgroundColor: theme => theme.palette.primary.dark
                  }
                }}
              >
                {activeStep === 2 ? 'Complete Payment First' : 'Next'}
              </Button>
            </Box>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default BookingForm; 