import app from './app.js';
import connectDB from './config/dbConnection.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Try to start server on PORT, if busy try PORT + 1, and so on
    const tryPort = async (port) => {
      try {
        await new Promise((resolve, reject) => {
          const server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
            resolve();
          });

          server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
              console.log(`Port ${port} is busy, trying ${port + 1}...`);
              reject(error);
            } else {
              reject(error);
            }
          });
        });
      } catch (error) {
        if (error.code === 'EADDRINUSE') {
          await tryPort(port + 1);
        } else {
          throw error;
        }
      }
    };

    await tryPort(process.env.PORT || 5000);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

// Start the server
startServer();