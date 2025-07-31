const { Sequelize } = require('sequelize');
const config = require('../database/config.js');

// Get the current environment (default to development)
require('dotenv').config();
// const env = process.env.NODE_ENV || 'development';

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    // pool: {
    //   max: 5,
    //   min: 0,
    //   acquire: 30000,
    //   idle: 10000
    // }
  }
);

// Import all models
const User = require('../database/models/User')(sequelize, Sequelize.DataTypes);
const payments = require('../database/models/payments')(sequelize, Sequelize.DataTypes);

// Define associations here
// User has many payments, payments belong to user
User.hasMany(payments, { foreignKey: 'user_id' });
payments.belongsTo(User, { foreignKey: 'user_id' });

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

// Sync all models with alter: true
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized successfully with alter: true');
  } catch (error) {
    console.error('❌ Error synchronizing database:', error);
    throw error;
  }
};

// Initialize database (connection + sync)
const initializeDatabase = async () => {
  try {
    await testConnection();
    await syncDatabase();
    console.log('✅ Database initialization completed');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  payments,
  User,
  testConnection,
  syncDatabase,
  initializeDatabase
};
