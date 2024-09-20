import React, { useState } from 'react';
import api from '../services/api';
import TextInput from '../components/TextInput';
import { toast } from 'react-toastify';
import Papa from 'papaparse';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [csvFile, setCsvFile] = useState(null); // New state for CSV file
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
        quantity: quantity,
      });
      toast.success('Product added successfully!');
      setProductName('');
      setDescription('');
      setProductPrice('');
      setQuantity('');
    } catch (err) {
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle CSV upload
  const handleFileUpload = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleAddProductsFromCSV = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      setError('Please upload a CSV file.');
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      setError(null);
      setSuccess(null);

      // Parse CSV file using PapaParse
      Papa.parse(csvFile, {
        header: true, // Treat the first row as header
        skipEmptyLines: true,
        complete: async (results) => {
          const products = results.data;

          // Post products to the backend API
          await api.post('/products/bulk', { products });

          toast.success('Products added successfully!');
          setCsvFile(null);
        },
        error: () => {
          setError('Failed to parse CSV file. Please try again.');
        },
      });
    } catch (err) {
      setError('Failed to upload CSV. Please try again.');
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

      {/* CSV Upload Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Upload Products via CSV</h2>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <button
          onClick={handleAddProductsFromCSV}
          className={`bg-green-500 text-white py-2 px-4 mt-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
          disabled={loading || !csvFile} // Disable button if no file is selected or loading
        >
          {loading ? 'Uploading...' : 'Upload CSV'}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
