import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import ProductDetail from './ProductDetail';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
      toast.success('Products loaded successfully!', {
        toastId: 'products-loaded-successfully'
      });
    } catch (err) {
      setError('Failed to fetch products');
      toast.error('Failed to fetch products', {
        toastId: 'fetch-products-error'
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setError(null);
      setLoading(true);
      await api.delete(`/products/${id}`);
      fetchProducts();
      toast.success('Product deleted successfully!', {
        toastId: 'product-deleted-successfully'
      });
    } catch (err) {
      setError('Failed to delete product');
      toast.error('Failed to delete product', {
        toastId: 'delete-product-error'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortOption === 'name' ? a.name.localeCompare(b.name) : a.price - b.price));

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="text-gray-500">Loading products...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <input
        type="text"
        placeholder="Search products..."
        className="border p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className="border p-2 mb-4 w-full"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>

      <ul>
        {currentProducts.map((product) => (
          <li key={product.id} className="mb-2 border-b pb-2 flex justify-between items-center">
            <span onClick={() => setSelectedProduct(product)} className="cursor-pointer">
              {product.name} - {product.price} USD
            </span>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`mx-1 px-3 py-1 border ${currentPage === number + 1 ? 'bg-blue-500 text-white' : ''}`}
          >
            {number + 1}
          </button>
        ))}
      </div>

      {selectedProduct && (
        <ProductDetail product={selectedProduct} onUpdate={fetchProducts} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default ProductList;
