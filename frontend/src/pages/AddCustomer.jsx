import React, { useState } from 'react';
import api from '../services/api';
import TextInput from '../components/TextInput';

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(null);
      await api.post('/customers', {
        name,
        phone,
        email,
        address
      });
      setSuccess('Customer added successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.error : 'Failed to add customer. Please try again.');
    }
  };
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Customer</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <form onSubmit={handleAddCustomer}>
        <TextInput
          label="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
          <TextInput
          label="Phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
          <TextInput
          label="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
