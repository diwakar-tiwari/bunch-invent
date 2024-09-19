import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts(); // Refresh the list
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-2 border-b pb-2 flex justify-between items-center">
            {product.name} - {product.price} USD
            <button
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
