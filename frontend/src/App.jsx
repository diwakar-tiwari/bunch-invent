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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Dashboard Route */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/suppliers" element={<SupplierList />} />        
          <Route path="/customers" element={<CustomerList />} />
          {/* Add more routes as needed */}
        </Routes>
      </Layout>
      <ToastContainer /> {/* ToastContainer for toast notifications */}
    </Router>
  );
}

export default App;
