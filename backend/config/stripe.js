import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Check if Stripe secret key is provided and not a placeholder
if (!process.env.STRIPE_SECRET_KEY || 
    process.env.STRIPE_SECRET_KEY === 'sk_test_your_stripe_secret_key_here' ||
    process.env.STRIPE_SECRET_KEY.includes('placeholder') ||
    process.env.STRIPE_SECRET_KEY.includes('your_stripe_secret_key')) {
  console.warn('⚠️ STRIPE_SECRET_KEY is not properly configured');
  console.warn('Using placeholder key - Stripe payments will not work');
  console.warn('Please add your real Stripe secret key to the .env file');
  console.warn('Example: STRIPE_SECRET_KEY=sk_test_your_actual_stripe_secret_key_here');
  
  // Don't exit, just warn - this allows the app to run in test mode
}

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Use the latest API version
});

console.log('✅ Stripe initialized successfully');

export default stripe;
