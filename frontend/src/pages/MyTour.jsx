import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, IconButton, Box } from '@mui/material';
import { Delete, Edit, Info } from '@mui/icons-material';
import { styled } from '@mui/system';

import img4 from "../assets/images/Rectangle9.png";
import img5 from "../assets/images/Rectangle10.png";
import img6 from "../assets/images/Rectangle11.png";
import img7 from "../assets/images/Rectangle12.png";
import img8 from "../assets/images/Rectangle13.png";
import img9 from "../assets/images/Rectangle14.png";

// Sample tour data
const tours = [
  { id: 1, name: 'Murree', image: img4, description: 'A scenic hill station in the Pir Panjal range, famous for its cool climate and stunning views of the surrounding mountains.' },
  { id: 2, name: 'Swat Valley', image: img5, description: 'Known as the "Switzerland of Pakistan", Swat Valley offers breathtaking landscapes with lush green valleys, rivers, and snow-capped mountains.' },
  { id: 3, name: 'Hunza Valley', image: img6, description: 'A beautiful mountainous region surrounded by towering peaks, known for its incredible landscapes, vibrant culture, and historic forts.' },
  { id: 4, name: 'Skardu', image: img7, description: 'A stunning destination in Gilgit-Baltistan, known for its crystal-clear lakes, majestic mountains, and trekking opportunities to some of the world’s highest peaks.' },
  { id: 5, name: 'Lahore', image: img8, description: 'A cultural hub of Pakistan, Lahore is home to iconic landmarks like the Badshahi Mosque, Lahore Fort, and vibrant markets filled with rich history and cuisine.' },
  { id: 6, name: 'Karimabad', image: img9, description: 'A beautiful town in Hunza Valley, Karimabad is famous for its historical sites, breathtaking views, and the majestic Rakaposhi and Ultar Sar peaks.' },
];

// Styled Card with hover effect
const HoverCard = styled(Card)({
  position: 'relative',
  '&:hover .action-buttons': {
    opacity: 1, // Show buttons on hover
  },
});

const MyTour = () => {
  const [toursList, setToursList] = useState(tours);

  const handleDelete = (id) => {
    setToursList(toursList.filter((tour) => tour.id !== id));
  };

  const handleUpdate = (id) => {
    console.log(`Update tour with id: ${id}`);
    // Implement update logic
  };

  const handleDetails = (id) => {
    console.log(`View details of tour with id: ${id}`);
    // Implement details view logic
  };

  return (
    <div style={{ padding: '0 16px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tour Destinations
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {toursList.map((tour) => (
          <Grid item xs={12} sm={6} md={4} key={tour.id}>
            <HoverCard>
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
                </CardContent>
              </Link>

              {/* Action Buttons */}
              <Box
                className="action-buttons"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  padding: '8px',
                  borderRadius: '4px',
                }}
              >
                <IconButton onClick={() => handleDetails(tour.id)} color="primary">
                  <Info />
                </IconButton>
                <IconButton onClick={() => handleUpdate(tour.id)} color="secondary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(tour.id)} color="error">
                  <Delete />
                </IconButton>
              </Box>
            </HoverCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyTour;
