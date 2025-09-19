# TourBay - PERN Stack Tour Booking System

A full-stack tour booking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring admin and user functionality with Material-UI design.

## 🚀 Features

### User Features
- **Tour Browsing**: Explore available tours with detailed information
- **User Authentication**: Secure registration and login system
- **Tour Bookings**: Book tours with guest count and date selection
- **Booking Management**: View and manage personal bookings
- **Responsive Design**: Mobile-friendly interface with Material-UI

### Admin Features
- **Admin Dashboard**: Overview of tours, bookings, and users
- **Tour Management**: Create, edit, and delete tour packages
- **Booking Management**: View all bookings and update status
- **User Management**: Manage user accounts and roles
- **Analytics**: View booking statistics and user data

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

## 📁 Project Structure

```
react-tour-booking-app/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── model/             # Database models
│   ├── routes/            # API routes
│   ├── config/            # Configuration files
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- postgresql account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-tour-booking-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Run the Application**
   
   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Tours
- `GET /api/tours` - Get all tours
- `GET /api/tours/:id` - Get specific tour
- `POST /api/tours` - Create tour (Admin)
- `PUT /api/tours/:id` - Update tour (Admin)
- `DELETE /api/tours/:id` - Delete tour (Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get specific booking
- `PUT /api/bookings/:id` - Update booking status (Admin)
- `DELETE /api/bookings/:id` - Cancel booking

### Admin
- `GET /api/admin/users` - Get all users (Admin)
- `PATCH /api/admin/users/:id` - Update user (Admin)
- `DELETE /api/admin/users/:id` - Delete user (Admin)

## 🔐 Authentication & Authorization

- **JWT-based authentication**
- **Role-based access control** (User/Admin)
- **Protected routes** for authenticated users
- **Admin-only routes** for administrative functions

## 🎨 UI/UX Features

- **Material-UI Design System**
- **Responsive Layout**
- **Dark/Light Theme Support**
- **Interactive Components**
- **Loading States**
- **Error Handling**
- **Toast Notifications**

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like Heroku, Railway, or DigitalOcean
3. Configure MongoDB Atlas connection

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages
3. Update API base URL in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@ameer-hamza26](https://github.com/ameer-hamza26)

## 🙏 Acknowledgments

- Material-UI for the component library
- postgresql for database hosting
- React community for excellent documentation 
