import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Avatar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Tour as TourIcon,
  BookOnline as BookingIcon,
  People as UserIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTours: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch dashboard statistics
      const [toursRes, bookingsRes, usersRes] = await Promise.all([
        api.get('/tours'),
        api.get('/bookings'),
        api.get('/admin/users')
      ]);

      setStats({
        totalTours: toursRes.data.data?.length || 0,
        totalBookings: bookingsRes.data.data?.length || 0,
        totalUsers: usersRes.data.data?.length || 0,
        totalRevenue: 0 // You can calculate this from bookings
      });

      // Get recent bookings
      if (bookingsRes.data.data) {
        setRecentBookings(bookingsRes.data.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { transform: 'translateY(-4px)', transition: 'transform 0.2s' } : {}
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" component="div" fontWeight="bold" color={color}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const QuickActionCard = ({ title, description, icon, buttonText, onClick, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" gap={2}>
          <Avatar sx={{ bgcolor: color, width: 64, height: 64 }}>
            {icon}
          </Avatar>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            startIcon={icon}
            fullWidth
          >
            {buttonText}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h6">Loading dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="div">
          <DashboardIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Admin Dashboard
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
        <Typography variant="h6" color="text.secondary">
          Welcome back, {user?.firstName}! Here's what's happening with your tour booking system.
        </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tours"
            value={stats.totalTours}
            icon={<TourIcon />}
            color="primary.main"
            onClick={() => navigate('/admin/tours')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={<BookingIcon />}
            color="secondary.main"
            onClick={() => navigate('/admin/bookings')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<UserIcon />}
            color="success.main"
            onClick={() => navigate('/admin/users')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={<TrendingUpIcon />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      {/* Quick Actions and Recent Activity */}
      <Grid container spacing={4}>
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <QuickActionCard
                title="Add New Tour"
                description="Create a new tour package"
                icon={<AddIcon />}
                buttonText="Add Tour"
                onClick={() => navigate('/admin/tours/add')}
                color="primary.main"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <QuickActionCard
                title="Manage Tours"
                description="Edit or delete existing tours"
                icon={<TourIcon />}
                buttonText="Manage Tours"
                onClick={() => navigate('/admin/tours')}
                color="secondary.main"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <QuickActionCard
                title="View Bookings"
                description="Check all booking details"
                icon={<BookingIcon />}
                buttonText="View Bookings"
                onClick={() => navigate('/admin/bookings')}
                color="success.main"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <QuickActionCard
                title="User Management"
                description="Manage user accounts"
                icon={<UserIcon />}
                buttonText="Manage Users"
                onClick={() => navigate('/admin/users')}
                color="warning.main"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Recent Bookings */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Recent Bookings
          </Typography>
          <Paper elevation={2}>
            <List>
              {recentBookings.length > 0 ? (
                recentBookings.map((booking, index) => (
                  <React.Fragment key={booking.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <BookingIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={`${booking.user?.firstName} ${booking.user?.lastName}`}
                        secondary={`Booked ${booking.tour?.name} for ${new Date(booking.bookingDate).toLocaleDateString()}`}
                      />
                      <Chip 
                        label={booking.status} 
                        color={booking.status === 'confirmed' ? 'success' : 'warning'}
                        size="small"
                      />
                    </ListItem>
                    {index < recentBookings.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary="No recent bookings"
                    secondary="New bookings will appear here"
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;