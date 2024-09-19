import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import ProductList from './pages/ProductList';
import SupplierList from './pages/SupplierList';
import CustomerList from './pages/CustomerList';
import AddProduct from './pages/AddProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddSupplier from './pages/AddSupplier';
import AddCustomer from './pages/AddCustomer';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/suppliers" element={<SupplierList />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/products" element={<ProductList />} />

          {/* Add more routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
