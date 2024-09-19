import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (err) {
      setError('Failed to fetch customers');
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers(); // Refresh the list
    } catch (err) {
      setError('Failed to delete customer');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <ul>
        {customers.map((customer) => (
          <li key={customer.id} className="mb-2 border-b pb-2 flex justify-between items-center">
            {customer.name} - {customer.email} - {customer.phone}
            <button
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              onClick={() => deleteCustomer(customer.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
