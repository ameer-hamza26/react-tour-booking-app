import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, Box, CircularProgress } from '@mui/material';
import img4 from "../assets/images/Rectangle9.png";
import img5 from "../assets/images/Rectangle10.png";
import img6 from "../assets/images/Rectangle11.png";
import img7 from "../assets/images/Rectangle12.png";
import img8 from "../assets/images/Rectangle13.png";
import img9 from "../assets/images/Rectangle14.png";
import SearchTour from '../components/SearchTour';
import axios from 'axios';

// Sample tour data (will be replaced with API data)
const sampleTours = [
  { 
    id: 1, 
    name: 'Murree', 
    image: img4, 
    description: 'A scenic hill station in the Pir Panjal range, famous for its cool climate and stunning views of the surrounding mountains.',
    price: 500,
    destination: 'Murree, Pakistan',
    startDates: ['2024-05-01', '2024-05-15', '2024-06-01']
  },
  { 
    id: 2, 
    name: 'Swat Valley', 
    image: img5, 
    description: 'Known as the "Switzerland of Pakistan", Swat Valley offers breathtaking landscapes with lush green valleys, rivers, and snow-capped mountains.',
    price: 800,
    destination: 'Swat Valley, Pakistan',
    startDates: ['2024-05-10', '2024-05-25', '2024-06-10']
  },
  { 
    id: 3, 
    name: 'Hunza Valley', 
    image: img6, 
    description: 'A beautiful mountainous region surrounded by towering peaks, known for its incredible landscapes, vibrant culture, and historic forts.',
    price: 1200,
    destination: 'Hunza Valley, Pakistan',
    startDates: ['2024-05-05', '2024-05-20', '2024-06-05']
  },
  { 
    id: 4, 
    name: 'Skardu', 
    image: img7, 
    description: 'A stunning destination in Gilgit-Baltistan, known for its crystal-clear lakes, majestic mountains, and trekking opportunities to some of the world\'s highest peaks.',
    price: 1500,
    destination: 'Skardu, Pakistan',
    startDates: ['2024-05-15', '2024-05-30', '2024-06-15']
  },
  { 
    id: 5, 
    name: 'Lahore', 
    image: img8, 
    description: 'A cultural hub of Pakistan, Lahore is home to iconic landmarks like the Badshahi Mosque, Lahore Fort, and vibrant markets filled with rich history and cuisine.',
    price: 600,
    destination: 'Lahore, Pakistan',
    startDates: ['2024-05-01', '2024-05-15', '2024-06-01']
  },
  { 
    id: 6, 
    name: 'Karimabad', 
    image: img9, 
    description: 'A beautiful town in Hunza Valley, Karimabad is famous for its historical sites, breathtaking views, and the majestic Rakaposhi and Ultar Sar peaks.',
    price: 1000,
    destination: 'Karimabad, Pakistan',
    startDates: ['2024-05-10', '2024-05-25', '2024-06-10']
  },
];

function Tour() {
  const [tours, setTours] = useState(sampleTours);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);

    try {
      // In a real application, this would be an API call
      // const response = await axios.get('/api/tours', { params: searchParams });
      // setTours(response.data.data);

      // For now, we'll filter the sample data
      const filteredTours = sampleTours.filter(tour => {
        const matchesLocation = !searchParams.location || 
          tour.destination.toLowerCase().includes(searchParams.location.toLowerCase());
        
        const matchesPrice = (!searchParams.minPrice || tour.price >= Number(searchParams.minPrice)) &&
          (!searchParams.maxPrice || tour.price <= Number(searchParams.maxPrice));
        
        const matchesDate = !searchParams.date || 
          tour.startDates.some(date => new Date(date) >= searchParams.date);

        return matchesLocation && matchesPrice && matchesDate;
      });

      setTours(filteredTours);
    } catch (err) {
      setError('Failed to fetch tours. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '0 16px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tour Destinations
      </Typography>

      {/* Search Component */}
      <SearchTour onSearch={handleSearch} />

      {/* Loading State */}
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}

      {/* Tours Grid */}
      <Grid 
        container 
        spacing={4}
        justifyContent="center"
        style={{
          padding: '0 16px',
        }}
      >
        {tours.map(tour => (
          <Grid item xs={12} sm={6} md={4} key={tour.id}>
            <Card sx={{ height: '100%' }}>
              <Link to={`/tour/${tour.id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={tour.image}
                  alt={tour.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {tour.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tour.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    ${tour.price}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Results */}
      {!loading && tours.length === 0 && (
        <Typography variant="h6" align="center" color="textSecondary" sx={{ mt: 4 }}>
          No tours found matching your search criteria.
        </Typography>
      )}
    </div>
  );
}

export default Tour;
