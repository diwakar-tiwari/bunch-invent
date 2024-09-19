import React, { useState } from 'react';
import api from '../services/api';
import TextInput from '../components/TextInput';

const AddSupplier = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(null);
      await api.post('/suppliers', {
        name,
        email,
        phone,
      });
      setSuccess('Supplier added successfully!');
      setName('');
      setEmail('');
      setPhone('');
    } catch (err) {
      setError('Failed to add supplier. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Supplier</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <form onSubmit={handleAddSupplier}>
        <TextInput
          label="Supplier Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Supplier
        </button>
      </form>
    </div>
  );
};

export default AddSupplier;
