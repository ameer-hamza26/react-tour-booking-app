import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Avatar
} from '@mui/material';
import {
  BookOnline as BookingIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  CheckCircle as ConfirmIcon,
  Cancel as CancelIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import api from '../utils/axios';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    search: ''
  });
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, filters]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/bookings');
      setBookings(response.data.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setSnackbar({
        open: true,
        message: 'Error fetching bookings',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = [...bookings];

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(booking => booking.status === filters.status);
    }

    // Filter by search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.user?.firstName?.toLowerCase().includes(searchTerm) ||
        booking.user?.lastName?.toLowerCase().includes(searchTerm) ||
        booking.tour?.name?.toLowerCase().includes(searchTerm) ||
        booking.tour?.location?.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredBookings(filtered);
  };

  const handleStatusUpdate = async () => {
    try {
      await api.patch(`/bookings/${selectedBooking._id}`, {
        status: newStatus
      });
      
      setSnackbar({
        open: true,
        message: 'Booking status updated successfully',
        severity: 'success'
      });
      
      fetchBookings(); // Refresh the list
      setStatusDialogOpen(false);
      setSelectedBooking(null);
      setNewStatus('');
    } catch (error) {
      console.error('Error updating booking status:', error);
      setSnackbar({
        open: true,
        message: 'Error updating booking status',
        severity: 'error'
      });
    }
  };

  const openStatusDialog = (booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setStatusDialogOpen(true);
  };

  const closeStatusDialog = () => {
    setStatusDialogOpen(false);
    setSelectedBooking(null);
      setNewStatus('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <ConfirmIcon />;
      case 'pending':
        return <FilterIcon />;
      case 'cancelled':
        return <CancelIcon />;
      default:
        return <BookingIcon />;
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h6">Loading bookings...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Manage Bookings
        </Typography>
        <Typography variant="h6" color="text.secondary">
          View and manage all tour bookings
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search bookings"
              variant="outlined"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search by name, tour, or location..."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Total: {filteredBookings.length} bookings
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Bookings Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Tour</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Guests</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <TableRow key={booking._id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {booking.user?.firstName} {booking.user?.lastName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {booking.user?.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {booking.tour?.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {booking.tour?.location}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {booking.numberOfGuests} guests
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(booking.status)}
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<ViewIcon />}
                          onClick={() => {/* Navigate to booking details */}}
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() => openStatusDialog(booking)}
                        >
                          Update Status
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Box py={4} textAlign="center">
                      <BookingIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        No bookings found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {filters.status !== 'all' || filters.search 
                          ? 'Try adjusting your filters' 
                          : 'No bookings have been made yet'
                        }
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Status Update Dialog */}
      <Dialog open={statusDialogOpen} onClose={closeStatusDialog}>
        <DialogTitle>Update Booking Status</DialogTitle>
        <DialogContent>
          <Box py={1}>
            <Typography variant="body2" gutterBottom>
              Current Status: <Chip label={selectedBooking?.status} color={getStatusColor(selectedBooking?.status)} size="small" />
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>New Status</InputLabel>
              <Select
                value={newStatus}
                label="New Status"
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeStatusDialog}>Cancel</Button>
          <Button onClick={handleStatusUpdate} variant="contained" color="primary">
            Update Status
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminBookings; 