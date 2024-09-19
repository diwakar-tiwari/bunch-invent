import React, { useState } from 'react';
import api from '../services/api';
import TextInput from '../components/TextInput';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      setError(null);
      setSuccess(null);
      await api.post('/products', {
        name: productName,
        description: description,
        price: productPrice,
        quantity: quantity
      });
      toast.success('Product added successfully!');
      setProductName('');
      setProductPrice('');
    } catch (err) {
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <form onSubmit={handleAddProduct}>
        <TextInput
          label="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <TextInput
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextInput
          label="Product Price"
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <TextInput
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
