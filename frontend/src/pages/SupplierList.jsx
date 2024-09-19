import React, { useState, useEffect } from 'react';
import api from '../services/api';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/suppliers');
      setSuppliers(response.data);
    } catch (err) {
      setError('Failed to fetch suppliers');
    }
  };

  const deleteSupplier = async (id) => {
    try {
      await api.delete(`/suppliers/${id}`);
      fetchSuppliers(); // Refresh the list
    } catch (err) {
      setError('Failed to delete supplier');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Suppliers</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id} className="mb-2 border-b pb-2 flex justify-between items-center">
            {supplier.name} - {supplier.email} - {supplier.phone}
            <button
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              onClick={() => deleteSupplier(supplier.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;
