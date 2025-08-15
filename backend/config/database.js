import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'tourbay_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Postgresql Database connected successfully');
    
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized');
    
    return sequelize;
  } catch (error) {
    console.error('Error connecting to postgresql database:', error);
    process.exit(1);
  }
};

export default sequelize; 