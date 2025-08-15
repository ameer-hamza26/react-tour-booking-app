import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TourFeature = sequelize.define('TourFeature', {
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
  feature: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Feature is required' }
    }
  }
}, {
  tableName: 'tour_features',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default TourFeature; 