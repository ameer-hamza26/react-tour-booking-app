import stripe from '../config/stripe.js';
import Booking from '../model/Booking.js';
import Tour from '../model/Tour.js';
import User from '../model/User.js';

// Create Payment Intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user.id;

    // Check if Stripe is properly configured
    if (!process.env.STRIPE_SECRET_KEY || 
        process.env.STRIPE_SECRET_KEY === 'sk_test_your_stripe_secret_key_here' ||
        process.env.STRIPE_SECRET_KEY.includes('placeholder') ||
        process.env.STRIPE_SECRET_KEY.includes('your_stripe_secret_key')) {
      return res.status(400).json({
        success: false,
        message: 'Stripe is not properly configured',
        error: 'Invalid API Key provided: ' + process.env.STRIPE_SECRET_KEY?.substring(0, 20) + '***'
      });
    }

    // Get booking details
    const booking = await Booking.findOne({
      where: { id: bookingId, user_id: userId },
      include: [
        { model: Tour, as: 'tour' },
        { model: User, as: 'user' }
      ]
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.payment_status === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already paid'
      });
    }

    // Create or get Stripe customer
    let customerId = booking.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: booking.contact_email,
        name: `${booking.user.first_name} ${booking.user.last_name}`,
        metadata: {
          booking_id: bookingId,
          user_id: userId
        }
      });
      customerId = customer.id;
      
      // Update booking with customer ID
      await booking.update({ stripe_customer_id: customerId });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.total_price * 100), // Convert to cents
      currency: 'usd',
      customer: customerId,
      metadata: {
        booking_id: bookingId,
        user_id: userId,
        tour_id: booking.tour_id
      },
      description: `Payment for ${booking.tour.title} - Booking #${bookingId}`,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Update booking with payment intent ID
    await booking.update({ 
      stripe_payment_intent_id: paymentIntent.id,
      payment_method: 'stripe'
    });

    res.status(200).json({
      success: true,
      data: {
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id
      }
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payment intent',
      error: error.message
    });
  }
};

// Confirm Payment
export const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const userId = req.user.id;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
      return res.status(404).json({
        success: false,
        message: 'Payment intent not found'
      });
    }

    // Find booking by payment intent ID
    const booking = await Booking.findOne({
      where: { 
        stripe_payment_intent_id: paymentIntentId,
        user_id: userId 
      }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update booking based on payment status
    if (paymentIntent.status === 'succeeded') {
      await booking.update({
        payment_status: 'paid',
        status: 'confirmed',
        stripe_charge_id: paymentIntent.latest_charge
      });

      res.status(200).json({
        success: true,
        message: 'Payment confirmed successfully',
        data: {
          booking_id: booking.id,
          payment_status: 'paid',
          booking_status: 'confirmed'
        }
      });
    } else if (paymentIntent.status === 'requires_payment_method') {
      await booking.update({
        payment_status: 'failed'
      });

      res.status(400).json({
        success: false,
        message: 'Payment failed. Please try again.',
        data: {
          booking_id: booking.id,
          payment_status: 'failed'
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment is still processing',
        data: {
          booking_id: booking.id,
          payment_status: paymentIntent.status
        }
      });
    }

  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error confirming payment',
      error: error.message
    });
  }
};

// Handle Stripe Webhooks
export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent succeeded:', paymentIntent.id);
        
        // Update booking status
        await Booking.update(
          { 
            payment_status: 'paid',
            status: 'confirmed',
            stripe_charge_id: paymentIntent.latest_charge
          },
          { 
            where: { stripe_payment_intent_id: paymentIntent.id } 
          }
        );
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('PaymentIntent failed:', failedPayment.id);
        
        // Update booking status
        await Booking.update(
          { payment_status: 'failed' },
          { where: { stripe_payment_intent_id: failedPayment.id } }
        );
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
};

// Get Payment Status
export const getPaymentStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({
      where: { id: bookingId, user_id: userId },
      attributes: ['id', 'payment_status', 'status', 'stripe_payment_intent_id']
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        booking_id: booking.id,
        payment_status: booking.payment_status,
        booking_status: booking.status,
        payment_intent_id: booking.stripe_payment_intent_id
      }
    });

  } catch (error) {
    console.error('Error getting payment status:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting payment status',
      error: error.message
    });
  }
};
