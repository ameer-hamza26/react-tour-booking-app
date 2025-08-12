import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Event as EventIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Payment as PaymentIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
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

const BookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelDialog, setCancelDialog] = useState({
    open: false,
    reason: ''
  });

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const response = await bookingApi.getBooking(bookingId);
      setBooking(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch booking details');
      toast.error('Failed to fetch booking details');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    try {
      const response = await bookingApi.cancelBooking(bookingId, {
        cancellationReason: cancelDialog.reason
      });

      if (response.success) {
        toast.success('Booking cancelled successfully');
        setCancelDialog({ open: false, reason: '' });
        fetchBookingDetails(); // Refresh booking details
      }
    } catch (err) {
      toast.error(err.message || 'Failed to cancel booking');
    }
  };

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

  if (!booking) {
    return (
      <Container maxWidth="lg">
        <Alert severity="info" sx={{ mt: 4 }}>
          Booking not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Booking Details
          </Typography>
          <Chip
            icon={statusIcons[booking.status]}
            label={booking.status.toUpperCase()}
            color={statusColors[booking.status]}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Tour Information */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                {booking.tour.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {booking.tour.description}
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Location"
                    secondary={booking.tour.location}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Start Date"
                    secondary={format(new Date(booking.startDate), 'PPP')}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Number of People"
                    secondary={`${booking.numberOfPeople.adults} Adults, ${booking.numberOfPeople.children} Children`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <MoneyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Total Price"
                    secondary={`$${booking.totalPrice.toFixed(2)}`}
                  />
                </ListItem>
              </List>
            </Paper>

            {/* Contact Information */}
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Name"
                    secondary={booking.contactInfo.name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={booking.contactInfo.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary={booking.contactInfo.phone}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Booking Status and Actions */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Booking Status
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PaymentIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Payment Method"
                    secondary={booking.paymentMethod}
                  />
                </ListItem>
                {booking.specialRequests && (
                  <ListItem>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Special Requests"
                      secondary={booking.specialRequests}
                    />
                  </ListItem>
                )}
                {booking.cancellationReason && (
                  <ListItem>
                    <ListItemIcon>
                      <CancelIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Cancellation Reason"
                      secondary={booking.cancellationReason}
                    />
                  </ListItem>
                )}
              </List>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/tour/${booking.tour._id}`)}
                  fullWidth
                >
                  View Tour Details
                </Button>
                {['pending', 'confirmed'].includes(booking.status) && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setCancelDialog({ open: true, reason: '' })}
                    fullWidth
                  >
                    Cancel Booking
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Cancel Booking Dialog */}
      <Dialog
        open={cancelDialog.open}
        onClose={() => setCancelDialog({ open: false, reason: '' })}
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
            onClick={() => setCancelDialog({ open: false, reason: '' })}
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

export default BookingDetails; 