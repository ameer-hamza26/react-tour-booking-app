import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
  Send as SendIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import contactImg from '../assets/images/Rectangle12.png';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    alert('Thank you for your message! We will get back to you soon.');
  };

  const contactInfo = [
    {
      icon: <LocationIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Visit Us',
      details: ['123 Travel Street', 'Tourism District', 'New York, NY 10001'],
      description: 'Come visit our office for personalized travel consultation'
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Speak with our travel experts for immediate assistance'
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Email Us',
      details: ['info@tourbay.com', 'support@tourbay.com'],
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: <TimeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM', 'Sun: Closed'],
      description: 'We\'re here to help during business hours'
    }
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, name: 'Facebook', color: '#1877F2' },
    { icon: <TwitterIcon />, name: 'Twitter', color: '#1DA1F2' },
    { icon: <InstagramIcon />, name: 'Instagram', color: '#E4405F' },
    { icon: <LinkedInIcon />, name: 'LinkedIn', color: '#0077B5' }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
          color: 'white', 
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box textAlign="center">
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 800,
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                mb: 3
              }}
            >
              Get In Touch
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}
            >
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Contact Form Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} alignItems="center">
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Card 
              sx={{ 
                p: 4,
                borderRadius: 3,
                // border: '1px solid #e5e7eb',
                height: '100%'
              }}
            >
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom 
                fontWeight="bold"
                sx={{ color: '#1f2937', mb: 3 }}
              >
                Send us a Message
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      multiline
                      rows={6}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<SendIcon />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)'
                        }
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>

          {/* Contact Image */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: 300, md: 500 },
                borderRadius: 3,
                overflow: 'hidden',
            
              }}
            >
              <Box
                component="img"
                src={contactImg}
                alt="Contact Us"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  p: 3,
                  zIndex: 2
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    mb: 1
                  }}
                >
                  We're Here to Help
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.6
                  }}
                >
                  Get in touch with our travel experts for personalized assistance and support.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Contact Information Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              fontWeight="bold"
              sx={{ color: '#1f2937' }}
            >
              Get In Touch
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Multiple ways to reach us for your travel needs
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 0, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {info.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      fontWeight="bold" 
                      sx={{ color: '#1f2937', mb: 2 }}
                    >
                      {info.title}
                    </Typography>
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      {info.details.map((detail, idx) => (
                        <Typography 
                          key={idx}
                          variant="body2" 
                          sx={{ color: '#6b7280', fontWeight: 500 }}
                        >
                          {detail}
                        </Typography>
                      ))}
                    </Stack>
                    <Typography 
                      variant="caption" 
                      sx={{ color: '#9ca3af', fontStyle: 'italic' }}
                    >
                      {info.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Social Media & Map Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} alignItems="center">
          {/* Social Media */}
          <Grid item xs={12} md={6}>
            <Box textAlign={isMobile ? 'center' : 'left'}>
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom 
                fontWeight="bold"
                sx={{ color: '#1f2937', mb: 3 }}
              >
                Follow Us
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ mb: 4, maxWidth: 400 }}
              >
                Stay connected with us on social media for travel tips, deals, and updates.
              </Typography>
              <Stack 
                direction="row" 
                spacing={2} 
                justifyContent={isMobile ? 'center' : 'flex-start'}
              >
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    sx={{
                      minWidth: 50,
                      height: 50,
                      borderRadius: '50%',
                      borderColor: social.color,
                      color: social.color,
                      '&:hover': {
                        bgcolor: social.color,
                        color: 'white',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    {social.icon}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Map Placeholder */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3}
              sx={{ 
                height: 300, 
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#e5e7eb',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box textAlign="center">
                <LocationIcon sx={{ fontSize: 60, color: '#9ca3af', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Interactive Map
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our office location will be displayed here
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
