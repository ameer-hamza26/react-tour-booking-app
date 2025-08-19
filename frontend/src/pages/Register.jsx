import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  InputAdornment
} from '@mui/material';
import { Person, Email, Lock } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join TourBay to explore and book amazing tours.">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              size="medium"
              autoComplete="given-name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              size="medium"
              autoComplete="family-name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          autoComplete="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          autoComplete="new-password"
          helperText="Password must be at least 6 characters long"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="normal"
          required
          autoComplete="new-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            )
          }}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          sx={{ mt: 3, py: 1.25 }}
        >
          {loading ? 'Creating Account...' : 'Register'}
        </Button>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              Login here
            </Link>
          </Typography>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default Register; 