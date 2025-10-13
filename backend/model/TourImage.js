import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TourImage = sequelize.define('TourImage', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  tour_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: 'tours',
      key: 'id'
    }
  },
  url: {
    type: DataTypes.STRING(1024),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Image URL is required' },
      isValidPath(value) {
        // Accept both full URLs and relative paths
        if (!value || typeof value !== 'string') {
          throw new Error('Image URL is required');
        }
        
        // Check if it's a valid URL (starts with http/https)
        if (value.startsWith('http://') || value.startsWith('https://')) {
          try {
            new URL(value);
            return true;
          } catch {
            throw new Error('Please provide a valid URL');
          }
        }
        
        // Check if it's a valid relative path (starts with /)
        if (value.startsWith('/')) {
          return true;
        }
        
        throw new Error('Please provide a valid URL or path');
      }
    }
  }
}, {
  tableName: 'tour_images',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default TourImage; 