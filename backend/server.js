const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');

const companyRoutes = require('./routes/companyRoutes');
const customerRoutes = require('./routes/customerRoutes');

require('dotenv').config();

// Middleware
app.use(express.json());

// Register routes
app.use('/api/company', companyRoutes);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
// Customer routes
app.use('/api/customers', customerRoutes);

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
