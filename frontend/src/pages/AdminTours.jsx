import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Tour as TourIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axios';

const AdminTours = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tours');
      setTours(response.data.data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setSnackbar({
        open: true,
        message: 'Error fetching tours',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTour = async () => {
    try {
      await api.delete(`/tours/${tourToDelete._id}`);
      setSnackbar({
        open: true,
        message: 'Tour deleted successfully',
        severity: 'success'
      });
      fetchTours(); // Refresh the list
    } catch (error) {
      console.error('Error deleting tour:', error);
      setSnackbar({
        open: true,
        message: 'Error deleting tour',
        severity: 'error'
      });
    } finally {
      setDeleteDialogOpen(false);
      setTourToDelete(null);
    }
  };

  const openDeleteDialog = (tour) => {
    setTourToDelete(tour);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTourToDelete(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const TourCard = ({ tour }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {tour.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {tour.description}
        </Typography>
        <Box display="flex" gap={1} mb={2}>
          <Chip 
            label={`$${tour.price}`} 
            color="primary" 
            size="small" 
          />
          <Chip 
            label={tour.duration} 
            color="secondary" 
            size="small" 
          />
          <Chip 
            label={tour.difficulty} 
            color={tour.difficulty === 'Easy' ? 'success' : tour.difficulty === 'Medium' ? 'warning' : 'error'} 
            size="small" 
          />
        </Box>
        <Typography variant="caption" color="text.secondary">
          Location: {tour.location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<ViewIcon />}
          onClick={() => navigate(`/tour/${tour._id}`)}
        >
          View
        </Button>
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/admin/tours/edit/${tour._id}`)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => openDeleteDialog(tour)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h6">Loading tours...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Manage Tours
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Create, edit, and manage tour packages
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/tours/add')}
        >
          Add New Tour
        </Button>
      </Box>

      {/* Tours Grid */}
      {tours.length > 0 ? (
        <Grid container spacing={3}>
          {tours.map((tour) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tour._id}>
              <TourCard tour={tour} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <TourIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No tours found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Get started by creating your first tour package
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/addTour')}
          >
            Create First Tour
          </Button>
        </Paper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Tour</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{tourToDelete?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteTour} color="error" variant="contained">
            Delete
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

export default AdminTours; 