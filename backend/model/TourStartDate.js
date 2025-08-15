import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TourStartDate = sequelize.define('TourStartDate', {
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
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Start date is required' },
      isDate: { msg: 'Please provide a valid date' }
    }
  }
}, {
  tableName: 'tour_start_dates',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default TourStartDate; 