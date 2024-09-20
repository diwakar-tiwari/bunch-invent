// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    suppliers: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const productResponse = await api.get('/products');
      const customerResponse = await api.get('/customers');
      const supplierResponse = await api.get('/suppliers');
      
      setStats({
        products: productResponse.data.length,
        customers: customerResponse.data.length,
        suppliers: supplierResponse.data.length,
      });
    } catch (err) {
      setError('Failed to fetch dashboard stats');
      toast.error('Failed to fetch dashboard stats');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="text-4xl font-bold">{stats.products}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Customers</h2>
          <p className="text-4xl font-bold">{stats.customers}</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Suppliers</h2>
          <p className="text-4xl font-bold">{stats.suppliers}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
