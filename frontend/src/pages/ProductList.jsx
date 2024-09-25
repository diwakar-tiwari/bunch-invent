import React, { useState, useEffect } from 'react';
import api from '../services/api';
import useTable from '../hooks/useTable';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import EditModal from '../components/EditModal';
import CSVDownloader from '../components/CSVDownloader';
import { toast } from 'react-toastify';
import { productsAPI } from '../services/authService';

const ProductList = () => {

  
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  
  const {
    currentItems,
    handleSearch,
    handleSort,
    handlePageChange,
    totalPages,
    currentPage,
    searchTerm,
  } = useTable(products, 10);  // Reusing the custom hook

  useEffect(() => {
    fetchProducts();
    
  }, []);

  const fetchProducts = async () => {
    try {
      // const response = await api.get('/products');
      const response = await productsAPI()
   
      
      setProducts(response.data);
    } catch (err) {
      toast.error('Failed to fetch products');
    }
  };

  const handleEdit = (product) => setEditProduct(product);

  const handleSave = async () => {
    try {
      await api.put(`/products/${editProduct.id}`, editProduct);
      fetchProducts();
      setEditProduct(null);
      toast.success('Product updated successfully');
    } catch (err) {
      toast.error('Failed to update product');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/products/${editProduct.id}`);
      fetchProducts();
      setEditProduct(null);
      toast.success('Product deleted successfully');
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name', sortable: true },
    { label: 'Description', key: 'description' },
    { label: 'Price', key: 'price', sortable: true },
    { label: 'Quantity', key: 'quantity', sortable: true },
  ];

 
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-400 rounded w-full"
      />

      {/* Download CSV Button */}
      <CSVDownloader data={products} filename="products.csv" />

      {/* Product Table */}
      <Table columns={columns} data={currentItems} onSort={handleSort} onEdit={handleEdit} />

      {/* Pagination */}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />

      {/* Edit Modal */}
      <EditModal
        item={editProduct}
        onClose={() => setEditProduct(null)}
        onSave={handleSave}
        onDelete={handleDelete}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ProductList;
