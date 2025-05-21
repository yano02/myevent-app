const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Invitee = sequelize.define('Invitee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  response: {
    type: DataTypes.ENUM('yes', 'no', 'maybe'),
    allowNull: false,
    defaultValue: 'maybe'
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Events',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

module.exports = Invitee; 