import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab
} from '@mui/material';
import {
  Event as EventIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { bookingApi } from '../services/api';
import { format } from 'date-fns';

const statusColors = {
  pending: 'warning',
  confirmed: 'info',
  cancelled: 'error',
  completed: 'success'
};

const statusIcons = {
  pending: <PendingIcon />,
  confirmed: <CheckCircleIcon />,
  cancelled: <CancelIcon />,
  completed: <CheckCircleIcon />
};

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: '',
    tourId: ''
  });
  const [activeTab, setActiveTab] = useState('all');
  const [cancelDialog, setCancelDialog] = useState({
    open: false,
    bookingId: null,
    reason: ''
  });

  // Fetch bookings when filters change
  useEffect(() => {
    fetchBookings();
  }, [filters]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Create a clean filters object
      const cleanFilters = {};
      
      // Process each filter
      for (const [key, value] of Object.entries(filters)) {
        // Skip undefined, null, empty strings, and 'null' strings
        if (value === undefined || value === null || value === '' || value === 'null') {
          continue;
        }
        
        // Special handling for tourId
        if (key === 'tourId') {
          const tourIdNum = Number(value);
          if (!isNaN(tourIdNum) && tourIdNum > 0) {
            cleanFilters[key] = tourIdNum;
          }
          continue;
        }
        
        // For other filters, just copy the value
        cleanFilters[key] = value;
      }
      
      console.log('Fetching bookings with filters:', cleanFilters);
      const response = await bookingApi.getUserBookings(cleanFilters);
      
      // Handle response
      const bookingsData = Array.isArray(response) 
        ? response 
        : (response?.data || []);
        
      setBookings(Array.isArray(bookingsData) ? bookingsData : []);
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch bookings';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    try {
      const response = await bookingApi.cancelBooking(cancelDialog.bookingId, {
        cancellationReason: cancelDialog.reason
      });

      if (response.success) {
        toast.success('Booking cancelled successfully');
        setCancelDialog({ open: false, bookingId: null, reason: '' });
        fetchBookings(); // Refresh bookings list
      }
    } catch (err) {
      toast.error(err.message || 'Failed to cancel booking');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Bookings
        </Typography>

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="All" value="all" />
          <Tab label="Pending" value="pending" />
          <Tab label="Confirmed" value="confirmed" />
          <Tab label="Completed" value="completed" />
          <Tab label="Cancelled" value="cancelled" />
        </Tabs>

        {filteredBookings.length === 0 ? (
          <Alert severity="info">
            No bookings found. Start exploring our tours!
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {filteredBookings.map((booking) => (
              <Grid item xs={12} md={6} key={booking.id}>
                <Card elevation={3}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" component="div">
                        {booking.tour.title}
                      </Typography>
                      <Chip
                        icon={statusIcons[booking.status]}
                        label={booking.status.toUpperCase()}
                        color={statusColors[booking.status]}
                        size="small"
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EventIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {booking.start_date ? format(new Date(booking.start_date), 'PPP') : '—'}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PeopleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {booking.adults} Adults, {booking.children} Children
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <MoneyIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Total: ${Number(booking.total_price).toFixed(2)}
                      </Typography>
                    </Box>

                    {booking.specialRequests && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Special Requests: {booking.specialRequests}
                      </Typography>
                    )}
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => navigate(`/bookings/${booking.id}`)}
                    >
                      View Details
                    </Button>
                    {['pending', 'confirmed'].includes(booking.status) && (
                      <Button
                        size="small"
                        color="error"
                        onClick={() => setCancelDialog({
                          open: true,
                          bookingId: booking.id,
                          reason: ''
                        })}
                      >
                        Cancel
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Cancel Booking Dialog */}
      <Dialog
        open={cancelDialog.open}
        onClose={() => setCancelDialog({ open: false, bookingId: null, reason: '' })}
      >
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please provide a reason for cancellation:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={cancelDialog.reason}
            onChange={(e) => setCancelDialog(prev => ({ ...prev, reason: e.target.value }))}
            placeholder="Enter cancellation reason..."
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setCancelDialog({ open: false, bookingId: null, reason: '' })}
          >
            Keep Booking
          </Button>
          <Button
            onClick={handleCancelBooking}
            color="error"
            disabled={!cancelDialog.reason.trim()}
          >
            Confirm Cancellation
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyBookings; 