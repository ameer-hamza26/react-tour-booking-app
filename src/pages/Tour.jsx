import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import img4 from "../assets/images/Rectangle9.png"
import img5 from "../assets/images/Rectangle10.png"
import img6 from "../assets/images/Rectangle11.png"
import img7 from "../assets/images/Rectangle12.png"
import img8 from "../assets/images/Rectangle13.png"
import img9 from "../assets/images/Rectangle14.png"

// Sample tour data
const tours = [
  { 
    id: 1, 
    name: 'Murree', 
    image: img4, 
    description: 'A scenic hill station in the Pir Panjal range, famous for its cool climate and stunning views of the surrounding mountains.' 
  },
  { 
    id: 2, 
    name: 'Swat Valley', 
    image: img5, 
    description: 'Known as the "Switzerland of Pakistan", Swat Valley offers breathtaking landscapes with lush green valleys, rivers, and snow-capped mountains.' 
  },
  { 
    id: 3, 
    name: 'Hunza Valley', 
    image: img6, 
    description: 'A beautiful mountainous region surrounded by towering peaks, known for its incredible landscapes, vibrant culture, and historic forts.' 
  },
  { 
    id: 4, 
    name: 'Skardu', 
    image: img7, 
    description: 'A stunning destination in Gilgit-Baltistan, known for its crystal-clear lakes, majestic mountains, and trekking opportunities to some of the world’s highest peaks.' 
  },
  { 
    id: 5, 
    name: 'Lahore', 
    image: img8, 
    description: 'A cultural hub of Pakistan, Lahore is home to iconic landmarks like the Badshahi Mosque, Lahore Fort, and vibrant markets filled with rich history and cuisine.' 
  },
  { 
    id: 6, 
    name: 'Karimabad', 
    image: img9, 
    description: 'A beautiful town in Hunza Valley, Karimabad is famous for its historical sites, breathtaking views, and the majestic Rakaposhi and Ultar Sar peaks.' 
  },
];

function Tour() {
  return (
    <div style={{ padding: '0 16px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tour Destinations
      </Typography>
      <Grid 
        container 
        spacing={4} // Spacing between the cards
        justifyContent="center"
        style={{
          padding: '0 16px', // Ensure there's space on the sides (desktop)
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
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Tour;
