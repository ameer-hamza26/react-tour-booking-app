import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Card, CardMedia, Box ,CardContent,Button, Container } from '@mui/material';
import img4 from "../assets/images/Rectangle9.png";
import img5 from "../assets/images/Rectangle10.png";
import img6 from "../assets/images/Rectangle11.png";
import img7 from "../assets/images/Rectangle12.png";
import img8 from "../assets/images/Rectangle13.png";
import img9 from "../assets/images/Rectangle14.png";

// Sample tour details
const tourDetails = {
  1: { 
    name: 'Murree', 
    images: [img4, img5, img6, img7, img8, img9], 
    description: `Murree, located in the Pir Panjal range, is one of Pakistan's most beloved hill stations. With its breathtaking landscapes, pine forests, and cool climate, Murree is a popular retreat during the summer months, providing a much-needed escape from the heat of the plains. The town offers a perfect mix of natural beauty and colonial-era charm.

    Visitors can enjoy a variety of activities, including hiking through the lush pine forests, taking a chairlift ride at Patriata (New Murree), and exploring the bustling Mall Road, lined with charming shops and eateries. Pindi Point and Kashmir Point are two of the most famous spots for panoramic views, where tourists can gaze at the majestic mountains and the lush green valleys that stretch into the horizon.

    Murree’s climate remains pleasant year-round, making it an attractive destination not just for summer, but also for winter vacations. The town receives snowfall during the winter months, turning it into a snowy wonderland, ideal for those who enjoy the cold and winter sports. Whether you are exploring the beautiful surroundings on foot, enjoying a cup of tea in a local café, or shopping for local handicrafts, Murree offers something for everyone.`,
    included: ['Hotel Stay', 'Meals', 'Sightseeing', 'Transportation'],
    destination: 'Murree, Pakistan',
    departureLocation: 'Islamabad, Pakistan',
    returnLocation: 'Islamabad, Pakistan',
    itinerary: [
      { day: 'Day 1', schedule: 'Arrival in Murree. Explore local markets.', temperature: 18 },
      { day: 'Day 2', schedule: 'Visit Pindi Point and Kashmir Point.', temperature: 20 },
      { day: 'Day 3', schedule: 'Shopping and return to Islamabad.', temperature: 22 }
    ]
  },
  2: { 
    name: 'Swat Valley', 
    images: [img4, img5, img6, img7, img8, img9], 
    description: `Swat Valley, often referred to as the "Switzerland of Pakistan," is a stunningly beautiful region surrounded by snow-capped mountains, lush greenery, and sparkling rivers. Located in the Khyber Pakhtunkhwa province, this valley is a natural paradise for outdoor enthusiasts, history buffs, and photographers alike. The valley is famous for its unspoiled beauty, rich cultural heritage, and historical significance.

    The Swat River runs through the valley, adding to the picturesque charm of the region. Its crystal-clear waters and the cascading waterfalls offer plenty of opportunities for nature lovers and adventure seekers. The valley is dotted with many historical landmarks, including ancient Buddhist archaeological sites like Udegram Monastery and Butkara Stupa, which provide a glimpse into the valley’s significant past during the Gandhara civilization.

    Visitors can explore the enchanting Fizagat Park, enjoy boating on the pristine lakes, or embark on an exciting trek to Malam Jabba for skiing during the winter months. The valley's traditional Pashtun hospitality and the serene landscapes make it an ideal place for relaxation, while also offering a wealth of outdoor activities. Whether you're hiking in the mountains, visiting historical sites, or simply enjoying the beautiful countryside, Swat Valley promises a memorable experience.`,
    included: ['Hotel Stay', 'Meals', 'Sightseeing', 'Transportation'],
    destination: 'Swat Valley, Pakistan',
    departureLocation: 'Peshawar, Pakistan',
    returnLocation: 'Peshawar, Pakistan',
    itinerary: [
      { day: 'Day 1', schedule: 'Arrival in Swat. Visit Fizagat Park.', temperature: 15 },
      { day: 'Day 2', schedule: 'Visit historical sites and lakes.', temperature: 17 },
      { day: 'Day 3', schedule: 'Explore Malam Jabba and skiing.', temperature: 5 }
    ]
  },
  3: { 
    name: 'Hunza Valley', 
    images: [img4, img5, img6, img7, img8, img9], 
    description: `Nestled between the mighty Karakoram Range and the towering peaks of Rakaposhi and Ultar Sar, Hunza Valley is a paradise for trekkers, nature lovers, and adventure enthusiasts. Known for its breathtaking mountain scenery, crystal-clear rivers, and vibrant culture, Hunza is one of the most picturesque valleys in the world.

    The valley is home to several ancient forts, including the historic Baltit Fort and Altit Fort, which provide visitors with a glimpse into Hunza’s rich cultural heritage and history. These forts offer sweeping views of the valley and its surrounding peaks, making them popular tourist destinations. Hunza is also renowned for its fruit orchards, particularly apricots, which are harvested during the summer months and are a highlight of the region’s agricultural traditions.

    With clear blue skies and towering snow-capped peaks, Hunza Valley is a photographer’s dream. Visitors can trek to the famous Eagle's Nest for panoramic views of the valley, or simply relax by the river while soaking in the natural beauty. Hunza is also known for its hospitality, with the local Hunzakuts being warm, friendly, and eager to share their culture with visitors. Whether you're hiking, exploring historical sites, or simply admiring the stunning landscapes, Hunza offers an unforgettable experience.`,
    included: ['Hotel Stay', 'Meals', 'Sightseeing', 'Transportation'],
    destination: 'Hunza Valley, Pakistan',
    departureLocation: 'Gilgit, Pakistan',
    returnLocation: 'Gilgit, Pakistan',
    itinerary: [
      { day: 'Day 1', schedule: 'Arrival in Hunza. Visit Baltit Fort.', temperature: 10 },
      { day: 'Day 2', schedule: 'Explore Altit Fort and Eagle’s Nest.', temperature: 12 },
      { day: 'Day 3', schedule: 'Relax by the river and enjoy local apricots.', temperature: 14 }
    ]
  },
  4: { 
    name: 'Skardu', 
    images: [img4, img5, img6, img7, img8, img9], 
    description: `Skardu, located in the Gilgit-Baltistan region of northern Pakistan, is a mesmerizing destination for nature lovers, trekkers, and adventurers. Known as the gateway to some of the world’s highest peaks, including K2, Skardu is surrounded by dramatic landscapes, serene lakes, and picturesque valleys that make it a haven for outdoor enthusiasts.

    One of the main attractions in Skardu is its serene lakes, such as the Lower Kachura Lake, located in the Shangrila Resort, which is renowned for its crystal-clear waters surrounded by towering mountains. Upper Kachura Lake offers a similar tranquility, and both lakes provide opportunities for boating and photography. The famous Shigar Valley, with its stunning views and traditional villages, is another must-see spot for travelers.

    For trekkers, Skardu is the starting point for expeditions to K2 base camp, one of the most challenging and prestigious treks in the world. The region is also home to historical sites, including the Skardu Fort, which offers panoramic views of the valley. The rugged terrain and natural beauty of Skardu attract adventurers looking to explore the untamed beauty of the mountains and valleys. Whether you're trekking, visiting ancient forts, or relaxing by the lakes, Skardu offers a unique blend of adventure and tranquility.`,
    included: ['Hotel Stay', 'Meals', 'Sightseeing', 'Transportation'],
    destination: 'Skardu, Pakistan',
    departureLocation: 'Islamabad, Pakistan',
    returnLocation: 'Islamabad, Pakistan',
    itinerary: [
      { day: 'Day 1', schedule: 'Arrival in Skardu. Explore Lower Kachura Lake.', temperature: 8 },
      { day: 'Day 2', schedule: 'Visit Skardu Fort and Shigar Valley.', temperature: 10 },
      { day: 'Day 3', schedule: 'Trek to K2 Base Camp or relax by Upper Kachura Lake.', temperature: 6 }
    ]
  },
  5: { 
    name: 'Lahore', 
    images: [img4, img5, img6, img7, img8, img9], 
    description: `Lahore, the cultural capital of Pakistan, is a vibrant city known for its rich history, stunning Mughal architecture, and lively atmosphere. As one of Pakistan’s most dynamic cities, Lahore offers a deep dive into the country’s cultural heritage, with iconic landmarks and bustling markets that provide a glimpse into its rich history.

    Key historical sites in Lahore include the Badshahi Mosque, one of the largest mosques in the world, and the Lahore Fort, both of which are UNESCO World Heritage Sites. The Shalimar Gardens, designed in the Mughal era, are another iconic attraction that showcases the grandeur of Mughal garden architecture. Lahore also boasts several museums, including the Lahore Museum, which houses an extensive collection of historical artifacts, and the Lahore Railway Station, a historical landmark in itself.

    The city’s vibrant street life is another major highlight. The bustling markets and food streets, especially near the Badshahi Mosque, are a must-visit for food lovers. Lahore is famous for its mouth-watering street food, including kebabs, biryanis, and traditional Punjabi dishes. The city is also known for its lively festivals, traditional music, and arts. Whether you are exploring its historic sites, indulging in local cuisine, or enjoying the lively atmosphere, Lahore is a city that promises a rich cultural experience.`,
    included: ['Hotel Stay', 'Meals', 'Sightseeing', 'Transportation'],
    destination: 'Lahore, Pakistan',
    departureLocation: 'Karachi, Pakistan',
    returnLocation: 'Karachi, Pakistan',
    itinerary: [
      { day: 'Day 1', schedule: 'Arrival in Lahore. Visit Badshahi Mosque and Lahore Fort.', temperature: 25 },
      { day: 'Day 2', schedule: 'Explore Shalimar Gardens and food street.', temperature: 28 },
      { day: 'Day 3', schedule: 'Visit Lahore Museum and Railway Station.', temperature: 30 }
    ]
  },
  6: { 
    name: 'Karimabad', 
    images: [img4, img5, img6, img7, img8, img9], 
    description: `Karimabad, the capital of Hunza District, is a picturesque town nestled in the breathtaking Hunza Valley. Surrounded by towering peaks such as Rakaposhi, Ultar Sar, and Ladyfinger Peak, Karimabad is a gateway to some of the most stunning landscapes in northern Pakistan. The town offers a perfect blend of natural beauty, rich culture, and historical significance.

    A must-visit in Karimabad is the ancient Baltit Fort, which offers spectacular views of the valley and surrounding peaks. The fort is over 700 years old and provides insight into the region's rich history and culture. Another prominent site is the Altit Fort, which is even older, offering magnificent views and a glimpse into the heritage of the region.

    Karimabad is also known for its lush green terraced fields and vibrant apricot orchards, which are a significant part of the local economy. During the summer, the valley is a paradise for trekkers and nature lovers, with numerous trails offering panoramic views of the Karakoram Range.

    Visitors can enjoy hiking, explore the unique local culture, and interact with the warm and friendly people of Hunza. Whether you're trekking to Eagle’s Nest for sweeping views of the valley, exploring ancient forts, or simply relaxing in the serene environment, Karimabad promises an unforgettable experience.`,
    included: ['Hotel Stay', 'Meals', 'Sightseeing', 'Transportation'],
    destination: 'Karimabad, Hunza Valley, Pakistan',
    departureLocation: 'Gilgit, Pakistan',
    returnLocation: 'Gilgit, Pakistan',
    itinerary: [
      { day: 'Day 1', schedule: 'Arrival in Karimabad. Visit Baltit Fort.', temperature: 12 },
      { day: 'Day 2', schedule: 'Explore Altit Fort and hike to Eagle’s Nest.', temperature: 15 },
      { day: 'Day 3', schedule: 'Relax by the river and visit local apricot orchards.', temperature: 14 }
    ]
  }
};


function TourDetailPage() {
  const { tourId } = useParams();
  const tour = tourDetails[tourId];

  if (!tour) {
    return <div>Tour not found!</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Tour Name */}
      <Typography sx={{ mb: 5 }} variant="h4" gutterBottom align="center" color="text.primary">
        {tour.name}
      </Typography>

      {/* Tour Images */}
      <Grid container spacing={4} justifyContent="center">
        {tour.images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={6} style={{ borderRadius: '12px' }}>
              <CardMedia
                component="img"
                height="250"
                image={image}
                alt={`${tour.name} Image ${index + 1}`}
                style={{ borderRadius: '12px', objectFit: 'cover' }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tour Description */}
      <Box mt={4} sx={{ bgcolor: 'background.default', p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          About {tour.name}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
          {tour.description}
        </Typography>
      </Box>

      {/* What's Included */}
<Box mt={4} sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
  <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
    What's Included
  </Typography>
  <Grid container spacing={2} justifyContent="center">
    {tour.included.map((item, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Box sx={{
          bgcolor: 'grey.50',
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 16 }}>
            {item}
          </Typography>
        </Box>
      </Grid>
    ))}
  </Grid>
</Box>

{/* Tour Destination, Departure, Return */}
<Box mt={4} sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
  <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
    Tour Details
  </Typography>
  <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 16 }}>
    <strong>Destination:</strong> {tour.destination}
  </Typography>
  <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 16 }}>
    <strong>Departure Location:</strong> {tour.departureLocation}
  </Typography>
  <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 16 }}>
    <strong>Return Location:</strong> {tour.returnLocation}
  </Typography>
</Box>

{/* Itinerary */}
<Box mt={4} sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, boxShadow: 3 }}>
  <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
    Itinerary
  </Typography>
  <Grid container spacing={3} justifyContent="center">
    {tour.itinerary.map((item, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card elevation={6} sx={{
          borderRadius: 2, 
          bgcolor: 'background.paper', 
          p: 2, 
          boxShadow: 3, 
          transition: 'transform 0.3s ease',
          '&:hover': { transform: 'scale(1.05)' }
        }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              {item.day}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14 }}>
              {item.schedule}
            </Typography>
            {/* Temperature */}
            <Typography variant="body2" color="warning.main" sx={{ fontSize: 14, fontWeight: 500, mt: 1.25 }}>
              <strong>Temperature: </strong>{item.temperature}°C
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>

      {/* Book Now Button */}
      <Box mt={4} sx={{ display: 'flex', justifyContent: 'center'}}>
        <Button 
          variant="contained" 
          sx={{
            px: 3.5,
            py: 1.25, 
            borderRadius: 999, 
            fontSize: 16, 
            fontWeight: 600, 
            boxShadow: 3, 
            backgroundColor:theme => theme.palette.primary.light,
            '&:hover': {
              backgroundColor:theme => theme.palette.primary.dark }
          }}
        >
          Book Now
        </Button>
      </Box>
    </Container>
  );
}

export default TourDetailPage;
