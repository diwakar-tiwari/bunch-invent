import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import SupplierList from './pages/SupplierList';
import CustomerList from './pages/CustomerList';
import AddProduct from './pages/AddProduct';
import AddSupplier from './pages/AddSupplier';
import AddCustomer from './pages/AddCustomer';
import Register from './pages/Register'; 
import Login from './pages/Login'; 
import PrivateRoute from './utils/PrivateRoute'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes - Wrapped with PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/add-supplier" element={<AddSupplier />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/customers" element={<CustomerList />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
