import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Card, CardMedia, Box } from '@mui/material';
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

    Murree’s climate remains pleasant year-round, making it an attractive destination not just for summer, but also for winter vacations. The town receives snowfall during the winter months, turning it into a snowy wonderland, ideal for those who enjoy the cold and winter sports. Whether you are exploring the beautiful surroundings on foot, enjoying a cup of tea in a local café, or shopping for local handicrafts, Murree offers something for everyone.`
  },
  2: { 
    name: 'Swat Valley', 
    images: [img4, img5, img6, img7, img8, img9], 
    description: `Swat Valley, often referred to as the "Switzerland of Pakistan," is a stunningly beautiful region surrounded by snow-capped mountains, lush greenery, and sparkling rivers. Located in the Khyber Pakhtunkhwa province, this valley is a natural paradise for outdoor enthusiasts, history buffs, and photographers alike. The valley is famous for its unspoiled beauty, rich cultural heritage, and historical significance.

    The Swat River runs through the valley, adding to the picturesque charm of the region. Its crystal-clear waters and the cascading waterfalls offer plenty of opportunities for nature lovers and adventure seekers. The valley is dotted with many historical landmarks, including ancient Buddhist archaeological sites like Udegram Monastery and Butkara Stupa, which provide a glimpse into the valley’s significant past during the Gandhara civilization.

    Visitors can explore the enchanting Fizagat Park, enjoy boating on the pristine lakes, or embark on an exciting trek to Malam Jabba for skiing during the winter months. The valley's traditional Pashtun hospitality and the serene landscapes make it an ideal place for relaxation, while also offering a wealth of outdoor activities. Whether you're hiking in the mountains, visiting historical sites, or simply enjoying the beautiful countryside, Swat Valley promises a memorable experience.`
  },
  3: { 
    name: 'Hunza Valley', 
    images: [img4, img5, img6, img7, img8, img9], 
    description: `Nestled between the mighty Karakoram Range and the towering peaks of Rakaposhi and Ultar Sar, Hunza Valley is a paradise for trekkers, nature lovers, and adventure enthusiasts. Known for its breathtaking mountain scenery, crystal-clear rivers, and vibrant culture, Hunza is one of the most picturesque valleys in the world.

    The valley is home to several ancient forts, including the historic Baltit Fort and Altit Fort, which provide visitors with a glimpse into Hunza’s rich cultural heritage and history. These forts offer sweeping views of the valley and its surrounding peaks, making them popular tourist destinations. Hunza is also renowned for its fruit orchards, particularly apricots, which are harvested during the summer months and are a highlight of the region’s agricultural traditions.

    With clear blue skies and towering snow-capped peaks, Hunza Valley is a photographer’s dream. Visitors can trek to the famous Eagle's Nest for panoramic views of the valley, or simply relax by the river while soaking in the natural beauty. Hunza is also known for its hospitality, with the local Hunzakuts being warm, friendly, and eager to share their culture with visitors. Whether you're hiking, exploring historical sites, or simply admiring the stunning landscapes, Hunza offers an unforgettable experience.`
  },
  4: { 
    name: 'Skardu', 
    images: [img4, img5, img6, img7, img8, img9], 
    description: `Skardu, located in the Gilgit-Baltistan region of northern Pakistan, is a mesmerizing destination for nature lovers, trekkers, and adventurers. Known as the gateway to some of the world’s highest peaks, including K2, Skardu is surrounded by dramatic landscapes, serene lakes, and picturesque valleys that make it a haven for outdoor enthusiasts.

    One of the main attractions in Skardu is its serene lakes, such as the Lower Kachura Lake, located in the Shangrila Resort, which is renowned for its crystal-clear waters surrounded by towering mountains. Upper Kachura Lake offers a similar tranquility, and both lakes provide opportunities for boating and photography. The famous Shigar Valley, with its stunning views and traditional villages, is another must-see spot for travelers.

    For trekkers, Skardu is the starting point for expeditions to K2 base camp, one of the most challenging and prestigious treks in the world. The region is also home to historical sites, including the Skardu Fort, which offers panoramic views of the valley. The rugged terrain and natural beauty of Skardu attract adventurers looking to explore the untamed beauty of the mountains and valleys. Whether you're trekking, visiting ancient forts, or relaxing by the lakes, Skardu offers a unique blend of adventure and tranquility.`
  },
  5: { 
    name: 'Lahore', 
    images: [img4, img5, img6, img7, img8, img9], 
    description: `Lahore, the cultural capital of Pakistan, is a vibrant city known for its rich history, stunning Mughal architecture, and lively atmosphere. As one of Pakistan’s most dynamic cities, Lahore offers a deep dive into the country’s cultural heritage, with iconic landmarks and bustling markets that provide a glimpse into its rich history.

    Key historical sites in Lahore include the Badshahi Mosque, one of the largest mosques in the world, and the Lahore Fort, both of which are UNESCO World Heritage Sites. The Shalimar Gardens, designed in the Mughal era, are another iconic attraction that showcases the grandeur of Mughal garden architecture. Lahore also boasts several museums, including the Lahore Museum, which houses an extensive collection of historical artifacts, and the Lahore Railway Station, a historical landmark in itself.

    The city’s vibrant street life is another major highlight. The bustling markets and food streets, especially near the Badshahi Mosque, are a must-visit for food lovers. Lahore is famous for its mouth-watering street food, including kebabs, biryanis, and traditional Punjabi dishes. The city is also known for its lively festivals, traditional music, and arts scene, which attract visitors from all over the world.

    With its mix of ancient history, modern energy, and warm hospitality, Lahore is a must-visit destination for anyone looking to experience the heart and soul of Pakistan.`
  },
  6: { 
    name: 'Karimabad', 
    images: [img4, img5, img6, img7, img8, img9], 
    description: `Karimabad, the main town in Hunza Valley, is one of the most picturesque towns in Pakistan, offering stunning views of the surrounding peaks, including Rakaposhi and Ultar Sar. Karimabad is a peaceful and serene destination that is rich in both natural beauty and cultural heritage, making it an ideal place for travelers seeking tranquility and adventure.

    The town is home to several historical sites, including the Baltit Fort and Altit Fort, which offer insights into Hunza’s rich heritage and history. These forts, perched on the mountainside, provide panoramic views of the valley below and the towering peaks that surround it. Karimabad’s colorful bazaars are also an interesting place to explore, offering a variety of local handicrafts, fruits, and traditional Hunza products.

    One of the top attractions near Karimabad is Eagle’s Nest, a viewpoint that offers a bird’s-eye view of the valley and several of the region’s highest peaks. For those interested in hiking, there are plenty of trekking routes that lead through the valleys and offer incredible views of the natural landscape. Karimabad is also famous for its clear skies, pristine rivers, and peaceful environment, making it a perfect place for relaxation.

    Whether you're exploring historical forts, hiking through scenic landscapes, or simply enjoying the breathtaking views, Karimabad offers a rich cultural experience and natural beauty that will leave visitors in awe.`
  }
};

function TourDetailPage() {
  const { tourId } = useParams();
  const tour = tourDetails[tourId];

  if (!tour) {
    return <div>Tour not found!</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Tour Name */}
      <Typography  mb={5} variant="h4" gutterBottom align="center" style={{ color: '#2C3E50' }}>
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
      <Box mt={4} sx={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', boxShadow: 2 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          About {tour.name}
        </Typography>
        <Typography variant="body1" paragraph style={{ lineHeight: 1.6, color: '#34495E' }}>
          {tour.description}
        </Typography>
      </Box>
    </div>
  );
}

export default TourDetailPage;
