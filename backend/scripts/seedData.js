import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../model/User.js';
import Tour from '../model/Tour.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample tours data
const sampleTours = [
  {
    title: 'Murree Hill Station Tour',
    description: 'Experience the beauty of Pakistan\'s most popular hill station. Enjoy cool weather, scenic views, and local culture.',
    destination: 'Murree, Pakistan',
    duration: 3,
    price: 500,
    maxGroupSize: 15,
    images: [
      'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    startDates: [
      new Date('2024-05-01'),
      new Date('2024-05-15'),
      new Date('2024-06-01')
    ],
    features: [
      'Scenic Mountain Views',
      'Local Market Visit',
      'Traditional Food Tasting',
      'Photography Sessions'
    ],
    rating: 4.5
  },
  {
    title: 'Swat Valley Adventure',
    description: 'Discover the "Switzerland of Pakistan" with its breathtaking landscapes, rivers, and snow-capped mountains.',
    destination: 'Swat Valley, Pakistan',
    duration: 5,
    price: 800,
    maxGroupSize: 12,
    images: [
      'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    startDates: [
      new Date('2024-05-10'),
      new Date('2024-05-25'),
      new Date('2024-06-10')
    ],
    features: [
      'Valley Exploration',
      'River Rafting',
      'Local Culture Experience',
      'Mountain Trekking'
    ],
    rating: 4.8
  },
  {
    title: 'Hunza Valley Expedition',
    description: 'Explore the majestic Hunza Valley, surrounded by towering peaks and rich cultural heritage.',
    destination: 'Hunza Valley, Pakistan',
    duration: 7,
    price: 1200,
    maxGroupSize: 10,
    images: [
      'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    startDates: [
      new Date('2024-05-05'),
      new Date('2024-05-20'),
      new Date('2024-06-05')
    ],
    features: [
      'Ancient Fort Visit',
      'Local Village Tour',
      'Mountain Photography',
      'Traditional Music Night'
    ],
    rating: 4.9
  }
];

// Admin user data
const adminUser = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin'
};

// Seed function
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Tour.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create(adminUser);
    console.log('Admin user created:', admin.email);

    // Create tours
    const tours = await Tour.create(sampleTours);
    console.log(`${tours.length} tours created`);

    console.log('Seed data created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run seed function
seedData(); 