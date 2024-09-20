import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);

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
      toast.success('Customer deleted successfully');
    } catch (err) {
      setError('Failed to delete customer');
    }
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
  };

  const handleUpdateCustomer = async () => {
    try {
      await api.put(`/customers/${editCustomer.id}`, editCustomer);
      fetchCustomers(); // Refresh the list
      toast.success('Customer updated successfully');
      setEditCustomer(null);
    } catch (err) {
      toast.error('Failed to update customer');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Phone</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="py-2 px-4 border-b">{customer.id}</td>
              <td className="py-2 px-4 border-b">{customer.name}</td>
              <td className="py-2 px-4 border-b">{customer.email}</td>
              <td className="py-2 px-4 border-b">{customer.phone}</td>
              <td className="py-2 px-4 border-b flex gap-2">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(customer)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  onClick={() => deleteCustomer(customer.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editCustomer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Customer</h2>

            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={editCustomer.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={editCustomer.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={editCustomer.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600 mr-2"
                onClick={() => setEditCustomer(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                onClick={handleUpdateCustomer}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
