import dotenv from 'dotenv';
import sequelize, { connectDB } from '../config/database.js';
import { User, Tour, TourImage, TourStartDate, TourFeature } from '../model/index.js';

// Load env
dotenv.config();

const sampleTours = [
  {
    title: 'Murree Hill Station Tour',
    description: "Experience the beauty of Pakistan's most popular hill station. Enjoy cool weather, scenic views, and local culture.",
    destination: 'Murree, Pakistan',
    duration: 3,
    price: 500,
    max_group_size: 15,
    rating: 4.5,
    images: [
      'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=800&q=80'
    ],
    startDates: ['2025-09-01', '2025-09-15', '2025-10-01'],
    features: [
      'Scenic Mountain Views',
      'Local Market Visit',
      'Traditional Food Tasting',
      'Photography Sessions'
    ]
  },
  {
    title: 'Swat Valley Adventure',
    description: 'Discover the "Switzerland of Pakistan" with breathtaking landscapes, rivers, and snow-capped mountains.',
    destination: 'Swat Valley, Pakistan',
    duration: 5,
    price: 800,
    max_group_size: 12,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=800&q=80'
    ],
    startDates: ['2025-09-10', '2025-09-25', '2025-10-10'],
    features: ['Valley Exploration', 'River Rafting', 'Local Culture Experience', 'Mountain Trekking']
  },
  {
    title: 'Hunza Valley Expedition',
    description: 'Explore the majestic Hunza Valley, surrounded by towering peaks and rich cultural heritage.',
    destination: 'Hunza Valley, Pakistan',
    duration: 7,
    price: 1200,
    max_group_size: 10,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=800&q=80'
    ],
    startDates: ['2025-09-05', '2025-09-20', '2025-10-05'],
    features: ['Ancient Fort Visit', 'Local Village Tour', 'Mountain Photography', 'Traditional Music Night']
  }
];

const adminUser = {
  first_name: 'atif',
  last_name: 'khan',
  email: 'atif@tourbay.com',
  password: '123456', // will be hashed by model hook
  role: 'admin'
};

async function seed() {
  try {
    // Ensure DB connection and models are synced
    await connectDB();

    // Wipe existing data in order to avoid FK issues
    await sequelize.transaction(async (t) => {
      await TourImage.destroy({ where: {}, truncate: true, cascade: true, transaction: t });
      await TourStartDate.destroy({ where: {}, truncate: true, cascade: true, transaction: t });
      await TourFeature.destroy({ where: {}, truncate: true, cascade: true, transaction: t });
      await sequelize.models.Booking.destroy({ where: {}, truncate: true, cascade: true, transaction: t });
      await Tour.destroy({ where: {}, truncate: true, cascade: true, transaction: t });
      await User.destroy({ where: {}, truncate: true, cascade: true, transaction: t });
    });

    // Create admin
    const admin = await User.create(adminUser);
    console.log('Admin created:', admin.email);

    // Create tours and related data
    for (const t of sampleTours) {
      const { images, startDates, features, ...tourData } = t;
      const tour = await Tour.create(tourData);

      if (images?.length) {
        await TourImage.bulkCreate(images.map((url) => ({ tour_id: tour.id, url })));
      }
      if (startDates?.length) {
        await TourStartDate.bulkCreate(startDates.map((d) => ({ tour_id: tour.id, start_date: d })));
      }
      if (features?.length) {
        await TourFeature.bulkCreate(features.map((f) => ({ tour_id: tour.id, feature: f })));
      }
    }

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
