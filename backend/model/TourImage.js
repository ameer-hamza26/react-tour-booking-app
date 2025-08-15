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
      isUrl: { msg: 'Please provide a valid URL' }
    }
  }
}, {
  tableName: 'tour_images',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default TourImage; 