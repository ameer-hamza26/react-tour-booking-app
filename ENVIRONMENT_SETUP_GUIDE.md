# 🔧 Environment Variables Setup Guide

This guide will help you set up all the necessary environment variables for your Tour Booking System.

## 📋 Required Environment Variables

### **1. Backend Environment Variables**

Create or update your `backend/.env` file:

```env
# Server Configuration
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tourbay_db
DB_USER=postgres
DB_PASSWORD=your_database_password_here

# JWT Configuration (keep your current values)
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# NEW: Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### **2. Frontend Environment Variables**

Create or update your `frontend/.env` file:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key_here
```

## 🔑 **Stripe Keys Setup**

### **1. Get Your Stripe Keys**

1. **Sign up for Stripe**: Go to [https://stripe.com](https://stripe.com) and create an account
2. **Get Test Keys**: In your Stripe dashboard, go to "Developers" → "API keys"
3. **Copy the keys**:
   - **Publishable key**: `pk_test_...` (starts with pk_test_)
   - **Secret key**: `sk_test_...` (starts with sk_test_)

### **2. Update Environment Variables**

**Backend (.env):**
```env
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Frontend (.env):**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key_here
```

### **3. Test Cards (Use these for testing)**

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`
- **Any future date** and **any 3-digit CVC**

## 🔧 **Setup Instructions**

### **Step 1: Database Setup**
1. Make sure PostgreSQL is running
2. Update the database credentials in `backend/.env`
3. Run the backend server to test database connection

### **Step 2: Stripe Setup**
1. Sign up for a Stripe account
2. Get your test keys from the Stripe dashboard
3. Update both `backend/.env` and `frontend/.env` with your keys
4. Test the payment flow with the test cards above

### **Step 3: Webhook Setup (Optional)**
1. In Stripe dashboard, go to "Webhooks"
2. Add endpoint: `http://localhost:8080/api/payments/webhook`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

## ⚠️ **Important Security Notes**

### **Never Commit These Files:**
- ✅ `.env` files are already in `.gitignore`
- ✅ Never commit real API keys to version control
- ✅ Use test keys for development
- ✅ Use live keys only in production

### **Production Setup:**
- Use environment variables in your hosting platform
- Never hardcode keys in your application code
- Use different keys for development and production

## 🚀 **Testing Your Setup**

### **Backend Test:**
```bash
cd backend
npm start
# Should see: "✅ Stripe initialized successfully"
```

### **Frontend Test:**
```bash
cd frontend
npm run dev
# Should load without Stripe errors
```

### **Payment Test:**
1. Create a booking
2. Use test card: `4242 4242 4242 4242`
3. Any future date and any 3-digit CVC
4. Should process successfully

## 🆘 **Troubleshooting**

### **Common Issues:**

1. **"Stripe is not properly configured"**
   - Check that your keys are real Stripe keys (not placeholders)
   - Verify keys are in the correct `.env` files

2. **"Invalid API Key"**
   - Make sure you're using test keys (start with `sk_test_` and `pk_test_`)
   - Check for typos in the keys

3. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check database credentials in `backend/.env`

4. **Frontend API Errors**
   - Verify `VITE_API_BASE_URL` points to your backend
   - Make sure backend server is running

## 📞 **Need Help?**

If you're still having issues:
1. Check the console logs for specific error messages
2. Verify all environment variables are set correctly
3. Make sure both frontend and backend servers are running
4. Test with the provided test cards

---

**Happy coding! 🎉**
