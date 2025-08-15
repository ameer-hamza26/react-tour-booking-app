import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tour = sequelize.define('Tour', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Please provide a tour title' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Please provide a description' }
    }
  },
  destination: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Please provide a destination' }
    }
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Please provide duration in days' },
      min: { args: [1], msg: 'Duration must be at least 1 day' }
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Please provide a price' },
      min: { args: [0], msg: 'Price must be positive' }
    }
  },
  max_group_size: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Please provide maximum group size' },
      min: { args: [1], msg: 'Group size must be at least 1' }
    }
  },
  rating: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: false,
    defaultValue: 0.0,
    validate: {
      min: { args: [0], msg: 'Rating must be at least 0' },
      max: { args: [5], msg: 'Rating must be at most 5' }
    }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'tours',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Tour; 