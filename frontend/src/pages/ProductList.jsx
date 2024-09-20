import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  // Search and sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setFilteredProducts(response.data); // Set the filtered list initially to the same as full list
    } catch (err) {
      setError('Failed to fetch products');
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Handle sorting
  const handleSort = (column) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(direction);

    const sorted = [...filteredProducts].sort((a, b) => {
      if (direction === 'asc') {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setFilteredProducts(sorted);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Handle edit
  const handleEdit = (product) => {
    setEditProduct(product);
  };

  // Handle update
  const handleUpdateProduct = async () => {
    try {
      await api.put(`/products/${editProduct.id}`, editProduct);
      fetchProducts();
      toast.success('Product updated successfully');
      setEditProduct(null); // Close the edit modal
    } catch (err) {
      toast.error('Failed to update product');
    }
  };

  // Handle delete
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
      toast.success('Product deleted successfully');
      setEditProduct(null); // Close the edit modal after deletion
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Sorting Icon
  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    if (sortDirection === 'asc') {
      return <span>▲</span>;
    } else {
      return <span>▼</span>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-400 rounded w-full"
      />

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Table for displaying products */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Description</th>
            <th
              className="py-2 px-4 border-b text-left cursor-pointer"
              onClick={() => handleSort('price')}
            >
              Price {renderSortIcon('price')}
            </th>
            <th
              className="py-2 px-4 border-b text-left cursor-pointer"
              onClick={() => handleSort('quantity')}
            >
              Quantity {renderSortIcon('quantity')}
            </th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">₹ {product.price}</td>
              <td className="py-2 px-4 border-b">{product.quantity}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Edit modal */}
      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={editProduct.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <input
                type="text"
                name="description"
                value={editProduct.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={editProduct.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={editProduct.quantity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600"
                onClick={() => setEditProduct(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                onClick={handleUpdateProduct}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                onClick={() => deleteProduct(editProduct.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
