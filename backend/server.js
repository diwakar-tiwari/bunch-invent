const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const customerRoutes = require('./routes/customerRoutes');
const stockRoutes = require('./routes/stockRoutes')

dotenv.config();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Change as needed
  credentials: true,
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  next();
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/customers', customerRoutes);
// Stock management routes
app.use('/api/stock', stockRoutes);

// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
