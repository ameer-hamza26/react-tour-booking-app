import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Explore as ExploreIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  Star as StarIcon,
  People as PeopleIcon,
  TrendingUp as TrendingIcon,
  CheckCircle as CheckIcon,
  LocationOn as LocationIcon,
  FlightTakeoff as FlightIcon,
  Hotel as HotelIcon
} from '@mui/icons-material';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      position: 'CEO & Founder',
      image: '/api/placeholder/200/200',
      description: 'Travel enthusiast with 15+ years in the industry',
      expertise: ['Strategy', 'Leadership', 'Travel Planning']
    },
    {
      name: 'Michael Chen',
      position: 'Head of Operations',
      image: '/api/placeholder/200/200',
      description: 'Operations expert ensuring smooth travel experiences',
      expertise: ['Operations', 'Logistics', 'Customer Service']
    },
    {
      name: 'Emma Davis',
      position: 'Travel Specialist',
      image: '/api/placeholder/200/200',
      description: 'Passionate about creating unforgettable travel memories',
      expertise: ['Destinations', 'Cultural Tours', 'Adventure Travel']
    },
    {
      name: 'David Wilson',
      position: 'Customer Success Manager',
      image: '/api/placeholder/200/200',
      description: 'Dedicated to ensuring every customer has an amazing experience',
      expertise: ['Customer Care', 'Support', 'Relationships']
    }
  ];

  const values = [
    {
      icon: <ExploreIcon sx={{ fontSize: 48 }} />,
      title: 'Adventure',
      description: 'We believe every journey should be an adventure that creates lasting memories and broadens horizons.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48 }} />,
      title: 'Trust',
      description: 'Your safety and satisfaction are our top priorities. We partner with verified, reliable service providers.'
    },
    {
      icon: <SupportIcon sx={{ fontSize: 48 }} />,
      title: 'Support',
      description: 'Our dedicated team provides 24/7 support to ensure your travel experience is seamless and worry-free.'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 48 }} />,
      title: 'Community',
      description: 'We build connections between travelers and local communities, creating meaningful cultural exchanges.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Travelers', icon: <PeopleIcon /> },
    { number: '500+', label: 'Tours Available', icon: <ExploreIcon /> },
    { number: '50+', label: 'Destinations', icon: <LocationIcon /> },
    { number: '98%', label: 'Satisfaction Rate', icon: <StarIcon /> }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'Company Founded',
      description: 'TourBay was established with a vision to make travel accessible and memorable for everyone.'
    },
    {
      year: '2019',
      title: 'First 1000 Customers',
      description: 'We reached our first milestone of 1000 satisfied customers across various destinations.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched our comprehensive online platform during the global pandemic to serve customers virtually.'
    },
    {
      year: '2021',
      title: 'International Expansion',
      description: 'Expanded our services to 25+ countries, becoming a global travel platform.'
    },
    {
      year: '2022',
      title: 'Award Recognition',
      description: 'Received the "Best Travel Platform" award from the International Tourism Association.'
    },
    {
      year: '2023',
      title: '10,000+ Customers',
      description: 'Celebrated serving over 10,000 travelers with exceptional tour experiences worldwide.'
    }
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
              About TourBay
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
              We're passionate about creating unforgettable travel experiences that connect people with the world's most amazing destinations.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom 
              fontWeight="bold"
              sx={{ color: '#1f2937', mb: 3 }}
            >
              Our Story
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              Founded in 2018, TourBay began as a small team of travel enthusiasts who believed that everyone deserves to experience the beauty and wonder of our world. What started as a passion project has grown into a trusted platform serving thousands of travelers worldwide.
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              We understand that travel is more than just visiting places – it's about creating memories, building connections, and discovering new perspectives. That's why we carefully curate each tour, partner with local experts, and ensure every detail is perfect for your journey.
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Chip 
                icon={<CheckIcon />} 
                label="Verified Partners" 
                color="primary" 
                variant="outlined"
              />
              <Chip 
                icon={<StarIcon />} 
                label="5-Star Service" 
                color="primary" 
                variant="outlined"
              />
              <Chip 
                icon={<SupportIcon />} 
                label="24/7 Support" 
                color="primary" 
                variant="outlined"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3}
              sx={{ 
                height: 400, 
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f8fafc',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box textAlign="center">
                <FlightIcon sx={{ fontSize: 80, color: '#3B82F6', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Our Journey
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  From local tours to global adventures
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom 
              fontWeight="bold"
              sx={{ color: '#1f2937' }}
            >
              Our Impact
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Numbers that reflect our commitment to excellence
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    textAlign: 'center', 
                    p: 4,
                    borderRadius: 3,
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {stat.icon}
                    </Box>
                    <Typography 
                      variant="h2" 
                      component="div" 
                      color="primary.main" 
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                    >
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Values Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom 
            fontWeight="bold"
            sx={{ color: '#1f2937' }}
          >
            Our Values
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            The principles that guide everything we do
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 3,
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ color: 'primary.main', mb: 3 }}>
                    {value.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom 
                    fontWeight="bold"
                    sx={{ color: '#1f2937', mb: 2 }}
                  >
                    {value.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom 
              fontWeight="bold"
              sx={{ color: '#1f2937' }}
            >
              Meet Our Team
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              The passionate people behind your amazing travel experiences
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        mx: 'auto', 
                        mb: 3,
                        bgcolor: 'primary.main',
                        fontSize: '2rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom 
                      fontWeight="bold"
                      sx={{ color: '#1f2937', mb: 1 }}
                    >
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      color="primary.main" 
                      fontWeight="600"
                      sx={{ mb: 2 }}
                    >
                      {member.position}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mb: 3, lineHeight: 1.6 }}
                    >
                      {member.description}
                    </Typography>
                    <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
                      {member.expertise.map((skill, idx) => (
                        <Chip 
                          key={idx}
                          label={skill} 
                          size="small" 
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom 
            fontWeight="bold"
            sx={{ color: '#1f2937' }}
          >
            Our Journey
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Key milestones in our growth and development
          </Typography>
        </Box>
        
        <Box sx={{ position: 'relative' }}>
          {/* Timeline Line */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 20, md: '50%' },
              top: 0,
              bottom: 0,
              width: 2,
              bgcolor: 'primary.main',
              transform: { xs: 'none', md: 'translateX(-1px)' }
            }}
          />
          
          <Stack spacing={4}>
            {milestones.map((milestone, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                  textAlign: { xs: 'left', md: index % 2 === 0 ? 'right' : 'left' }
                }}
              >
                {/* Timeline Dot */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: 20, md: '50%' },
                    transform: { xs: 'translateX(-6px)', md: 'translateX(-6px)' },
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    border: '3px solid white',
                    boxShadow: '0 0 0 3px #3B82F6',
                    zIndex: 2
                  }}
                />
                
                {/* Content */}
                <Box
                  sx={{
                    width: { xs: '100%', md: '45%' },
                    ml: { xs: 6, md: index % 2 === 0 ? 0 : 'auto' },
                    mr: { xs: 0, md: index % 2 === 0 ? 'auto' : 0 },
                    pl: { xs: 0, md: index % 2 === 0 ? 0 : 4 },
                    pr: { xs: 0, md: index % 2 === 0 ? 4 : 0 }
                  }}
                >
                  <Card 
                    sx={{ 
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
                    <Typography 
                      variant="h4" 
                      component="div" 
                      color="primary.main" 
                      fontWeight="bold"
                      sx={{ mb: 1 }}
                    >
                      {milestone.year}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      fontWeight="bold"
                      sx={{ color: '#1f2937', mb: 2 }}
                    >
                      {milestone.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {milestone.description}
                    </Typography>
                  </Card>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
