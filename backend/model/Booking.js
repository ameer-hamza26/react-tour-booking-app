import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
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
  },
  adults: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Number of adults is required' },
      min: { args: [1], msg: 'At least 1 adult is required' }
    }
  },
  children: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'Children count cannot be negative' }
    }
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Total price is required' },
      min: { args: [0], msg: 'Total price must be positive' }
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'pending'
  },
  payment_status: {
    type: DataTypes.ENUM('pending', 'paid', 'refunded', 'failed'),
    allowNull: false,
    defaultValue: 'pending'
  },
  payment_method: {
    type: DataTypes.ENUM('credit_card', 'paypal', 'bank_transfer', 'stripe'),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Payment method is required' }
    }
  },
  stripe_payment_intent_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Stripe Payment Intent ID'
  },
  stripe_charge_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Stripe Charge ID'
  },
  stripe_customer_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Stripe Customer ID'
  },
  special_requests: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contact_phone: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Contact phone is required' }
    }
  },
  contact_email: {
    type: DataTypes.STRING(191),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Contact email is required' },
      isEmail: { msg: 'Please provide a valid email' }
    }
  },
  cancellation_reason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  refund_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
    validate: {
      min: { args: [0], msg: 'Refund amount cannot be negative' }
    }
  }
}, {
  tableName: 'bookings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Booking; 