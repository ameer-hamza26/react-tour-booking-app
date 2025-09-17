import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Stack,
  Chip
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { paymentApi } from '../services/api';
import { toast } from 'react-toastify';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

// Check if Stripe is properly configured
if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY === 'pk_test_your_stripe_publishable_key_here') {
  console.warn('⚠️ Stripe publishable key not configured. Please add VITE_STRIPE_PUBLISHABLE_KEY to your .env file');
}

// Card Element styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

// Payment Form Component
const PaymentForm = ({ booking, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [stripeNotConfigured, setStripeNotConfigured] = useState(false);

  useEffect(() => {
    if (booking?.id) {
      createPaymentIntent();
    }
  }, [booking?.id]);

  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      const response = await paymentApi.createPaymentIntent(booking.id);
      
      if (response.data && response.data.client_secret) {
        setClientSecret(response.data.client_secret);
      } else {
        throw new Error('No client secret received from server');
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      
      // Check if it's a Stripe configuration error
      if (error.message && (error.message.includes('Invalid API Key') || error.message.includes('Stripe is not properly configured'))) {
        toast.error('Stripe is not properly configured. Using test mode.');
        setStripeNotConfigured(true);
        // Don't call onPaymentError for configuration issues, just show test mode
        return;
      } else {
        toast.error(error.message || 'Failed to initialize payment');
        onPaymentError?.(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe is not loaded. Please refresh the page.');
      return;
    }

    if (!clientSecret) {
      toast.error('Payment not initialized. Please try again.');
      return;
    }

    // Check if client secret is valid format
    if (!clientSecret.includes('_secret_')) {
      toast.error('Invalid payment configuration. Please contact support.');
      return;
    }

    setLoading(true);
    setPaymentStatus('processing');

    try {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${booking.user?.first_name} ${booking.user?.last_name}`,
            email: booking.contact_email,
            phone: booking.contact_phone,
          },
        },
      });

      if (error) {
        console.error('Payment failed:', error);
        setPaymentStatus('failed');
        toast.error(error.message || 'Payment failed');
        onPaymentError?.(error);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentStatus('succeeded');
        toast.success('Payment successful!');
        
        // Confirm payment on backend
        await paymentApi.confirmPayment(paymentIntent.id);
        onPaymentSuccess?.(paymentIntent);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      toast.error('Payment failed. Please try again.');
      onPaymentError?.(error);
    } finally {
      setLoading(false);
    }
  };

  if (!booking) {
    return (
      <Alert severity="error">
        No booking information available
      </Alert>
    );
  }

  // Check if Stripe is properly configured (frontend or backend)
  if (stripeNotConfigured || 
      !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY === 'pk_test_your_stripe_publishable_key_here' ||
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY.includes('placeholder')) {
    return (
      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
        <CardContent>
          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Stripe Payment Not Configured
            </Typography>
            <Typography variant="body2">
              Please configure your Stripe keys in the environment variables to enable payment processing.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Add <code>VITE_STRIPE_PUBLISHABLE_KEY</code> to your frontend .env file.
            </Typography>
          </Alert>
          
          <Box sx={{ p: 2, backgroundColor: '#f8fafc', borderRadius: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Booking Summary
            </Typography>
            <Typography variant="body2">Tour: {booking.tour?.title}</Typography>
            <Typography variant="body2">Total: ${booking.total_price}</Typography>
            <Typography variant="body2">Status: Pending Payment</Typography>
          </Box>

          <Box sx={{ mt: 3, p: 2, backgroundColor: '#e0f2fe', borderRadius: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              🧪 Test Mode
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              For testing purposes, you can simulate a successful payment:
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                toast.success('Test payment completed successfully!');
                onPaymentSuccess?.({ id: 'test_payment_intent_123' });
              }}
              sx={{ mr: 2 }}
            >
              Simulate Payment Success
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                toast.error('Test payment failed');
                onPaymentError?.({ message: 'Test payment failed' });
              }}
            >
              Simulate Payment Failure
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#1f2937' }}>
          Payment Details
        </Typography>
        
        <Divider sx={{ my: 2 }} />

        {/* Booking Summary */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#2563eb' }}>
            {booking.tour?.title}
          </Typography>
          
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Chip 
              label={`${booking.adults} Adults`} 
              color="primary" 
              size="small" 
            />
            {booking.children > 0 && (
              <Chip 
                label={`${booking.children} Children`} 
                color="secondary" 
                size="small" 
              />
            )}
            <Chip 
              label={`${booking.tour?.duration} days`} 
              variant="outlined" 
              size="small" 
            />
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Start Date: {new Date(booking.start_date).toLocaleDateString()}
          </Typography>
          
          <Typography variant="h6" sx={{ color: '#059669', fontWeight: 600 }}>
            Total Amount: ${booking.total_price}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Payment Form */}
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Payment Information
          </Typography>
          
          <Box sx={{ 
            p: 2, 
            border: '1px solid #e5e7eb', 
            borderRadius: 2, 
            mb: 3,
            backgroundColor: '#f9fafb'
          }}>
            <CardElement options={cardElementOptions} />
          </Box>

          {/* Payment Status */}
          {paymentStatus === 'processing' && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Processing your payment...
            </Alert>
          )}

          {paymentStatus === 'succeeded' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Payment successful! Your booking has been confirmed.
            </Alert>
          )}

          {paymentStatus === 'failed' && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Payment failed. Please check your card details and try again.
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!stripe || loading || paymentStatus === 'succeeded'}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              backgroundColor: '#2563eb',
              '&:hover': {
                backgroundColor: '#1d4ed8'
              }
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : paymentStatus === 'succeeded' ? (
              'Payment Successful'
            ) : (
              `Pay $${booking.total_price}`
            )}
          </Button>
        </form>

        {/* Security Notice */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: '#f8fafc', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            🔒 Your payment information is secure and encrypted. We use Stripe for secure payment processing.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Main Payment Component with Stripe Elements
const StripePayment = ({ booking, onPaymentSuccess, onPaymentError }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm 
        booking={booking} 
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />
    </Elements>
  );
};

export default StripePayment;
