import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import ProductList from './pages/ProductList';
import SupplierList from './pages/SupplierList';
import CustomerList from './pages/CustomerList';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/suppliers" element={<SupplierList />} />
          <Route path="/customers" element={<CustomerList />} />
          {/* Add more routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
