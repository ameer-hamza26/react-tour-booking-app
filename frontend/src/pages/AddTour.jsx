import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid, Box, Container, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'; // Ensure correct import here
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import confirmImage from "../assets/images/confirmtour.png";

const AddTour = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue
  } = useForm({
    mode: 'onChange', // Revalidate on each input change
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    adults: 1,
    children: 0,
    paymentMethod: 'Credit Card',
  });

  const onSubmit = (data) => {
    console.log(data); // Process form data here
    toast.success("Your Booking has been confirmed!"); // Show success notification
  }
  return (
    <Container maxWidth="lg" sx={{ paddingTop: '2rem' }}>
      {/* Toast Notification Container */}
      <ToastContainer />
      <Typography mb={5} variant="h4" align="center" gutterBottom>
        Confirm Your Booking
      </Typography>
      <Grid container spacing={2}>
        {/* Left side - Form */}
        <Grid item xs={12} md={5}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* Full Name */}
            <TextField
              label="Full Name"
              name="name"
              {...register('name', { required: 'Name is required' })}
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{ marginBottom: '1rem' }}
            />

            {/* Email Address */}
            <TextField
              label="Email Address"
              name="email"
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email format' } })}
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ marginBottom: '1rem' }}
            />

            {/* Phone Number */}
            <TextField
              label="Phone Number"
              name="phone"
              {...register('phone', { required: 'Phone number is required', pattern: { value: /^[0-9]{11}$/, message: 'Phone number should be 10 digits' } })}
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={{ marginBottom: '1rem' }}
            />

           {/* Number of Adults and Children */}
           <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
  <Grid item xs={6}>
    <TextField
      label="Number of Adults"
      name="adults"
      type="number"
      {...register('adults', { 
        required: 'At least 1 adult is required', // Error message for adults
        min: { value: 1, message: 'At least 1 adult is required' },
        max: { value: 9, message: 'Maximum of 9 adults allowed' }
      })}
      value={formData.adults}
      onChange={(e) => {
        setFormData({ ...formData, adults: e.target.value });
        setValue("adults", e.target.value); // Update react-hook-form state
      }}
      fullWidth
      error={!!errors.adults}
      helperText={errors.adults?.message}
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      label="Number of Children"
      name="children"
      type="number"
      {...register('children', { 
        min: { value: 0, message: 'At least 1 child is required' }, // Only set min if you want children to have a lower limit
        max: { value: 9, message: 'Maximum of 9 children allowed' }  // Optional, but set max for children
      })}
      value={formData.children}
      onChange={(e) => {
        setFormData({ ...formData, children: e.target.value });
        setValue("children", e.target.value); // Update react-hook-form state
      }}
      fullWidth
      error={!!errors.children}
      helperText={errors.children?.message}
    />
  </Grid>
</Grid>



            {/* Payment Method */}
            <FormControl fullWidth required sx={{ marginBottom: '1rem' }}>
              <InputLabel>Payment Method</InputLabel>
              <Select
                label="Payment Method"
                name="paymentMethod"
                {...register('paymentMethod', { required: 'Payment method is required' })}
                value={formData.paymentMethod}
                onChange={(e) => {
                  setFormData({ ...formData, paymentMethod: e.target.value });
                  setValue("paymentMethod", e.target.value); // Update react-hook-form state
                }}
                error={!!errors.paymentMethod}
              >
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="Master Card">Master Card</MenuItem>
                <MenuItem value="PayPal">PayPal</MenuItem>
                <MenuItem value="Visa">Visa</MenuItem>
              </Select>
              {errors.paymentMethod && <Typography color="error">{errors.paymentMethod?.message}</Typography>}
            </FormControl>

            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <Button
                variant="contained"
                // color="primary"
                type="submit"
                sx={{ width: '100%' ,
                  backgroundColor:theme => theme.palette.primary.light,
                  '&:hover': {
                    backgroundColor:theme => theme.palette.primary.dark },
                    padding:"10px"
                }}
                disabled={!isValid} // Disable button when form is invalid
              >
                Confirm Booking
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Right side - Image */}
        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
              src={confirmImage}
              alt="Tour Image" 
              style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}
            />
          </Box>
        </Grid>
      </Grid>

      
    </Container>
  );
};

export default AddTour;
