import React, { useState, useEffect } from 'react';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Fetch suppliers from the backend
    fetch('http://localhost:5000/api/suppliers')
      .then(response => response.json())
      .then(data => setSuppliers(data))
      .catch(error => console.error('Error fetching suppliers:', error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Suppliers</h1>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id} className="mb-2 border-b pb-2">
            {supplier.name} - {supplier.contact}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;
