import React, { useState, useEffect } from 'react';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customers from the backend
    fetch('http://localhost:5000/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id} className="mb-2 border-b pb-2">
            {customer.name} - {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
