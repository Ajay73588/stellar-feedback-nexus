const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/customer', require('./routes/customer.routes'));
app.use('/api/company', require('./routes/company.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/feedback', require('./routes/feedback.routes'));

const PORT = process.env.PORT || 3000;

// Test database connection and start server
async function startServer() {
  try {
    console.log('Attempting to connect to database with config:', {
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    });

    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.original?.code,
      errno: error.original?.errno,
      sqlState: error.original?.sqlState,
      sqlMessage: error.original?.sqlMessage
    });
  }
}

startServer(); 