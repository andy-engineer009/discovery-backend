const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();  
const { initializeDatabase } = require('./config/db');
const srcRouter = require('./src/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use src router
app.use('/api', srcRouter);

// // Single API route that redirects to src
// app.get('/api', (req, res) => {
//   res.redirect('/src');
// });

// // Redirect root to src
// app.get('/', (req, res) => {
//   res.redirect('/src');
// });

// Initialize database and start server
const startServer = async () => {
  try {
    // Try to initialize database, but don't fail if it doesn't work
    try {
      await initializeDatabase();
      console.log('✅ Database connected and synced');
    } catch (dbError) {
      console.log('⚠️  Database connection failed, starting server without database');
      console.log('   Make sure to set up your .env file with database credentials');
    }
    
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📡 API available at http://localhost:${port}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();


