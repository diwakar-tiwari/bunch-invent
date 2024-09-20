import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [error, setError] = useState(null);
  const [editSupplier, setEditSupplier] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [suppliersPerPage] = useState(5);

  // Search and sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/suppliers');
      setSuppliers(response.data);
      setFilteredSuppliers(response.data); // Set filtered list to match the original
    } catch (err) {
      setError('Failed to fetch suppliers');
    }
  };

  // Search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSuppliers(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Sort functionality
  const handleSort = (column) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(direction);

    const sorted = [...filteredSuppliers].sort((a, b) => {
      if (direction === 'asc') {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setFilteredSuppliers(sorted);
  };

  // Pagination
  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = filteredSuppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);
  const totalPages = Math.ceil(filteredSuppliers.length / suppliersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Edit supplier
  const handleEdit = (supplier) => {
    setEditSupplier(supplier);
  };

  // Update supplier
  const handleUpdateSupplier = async () => {
    try {
      await api.put(`/suppliers/${editSupplier.id}`, editSupplier);
      fetchSuppliers();
      toast.success('Supplier updated successfully');
      setEditSupplier(null); // Close modal after update
    } catch (err) {
      toast.error('Failed to update supplier');
    }
  };

  // Delete supplier
  const deleteSupplier = async (id) => {
    try {
      await api.delete(`/suppliers/${id}`);
      fetchSuppliers();
      toast.success('Supplier deleted successfully');
      setEditSupplier(null); // Close modal after delete
    } catch (err) {
      setError('Failed to delete supplier');
    }
  };

  // Handle form input change in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Sorting icon
  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    if (sortDirection === 'asc') {
      return <span>▲</span>;
    } else {
      return <span>▼</span>;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supplier List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by supplier name..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-400 rounded w-full"
      />

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th
              className="py-2 px-4 border-b text-left cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Name {renderSortIcon('name')}
            </th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th
              className="py-2 px-4 border-b text-left cursor-pointer"
              onClick={() => handleSort('phone')}
            >
              Phone {renderSortIcon('phone')}
            </th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSuppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td className="py-2 px-4 border-b">{supplier.id}</td>
              <td className="py-2 px-4 border-b">{supplier.name}</td>
              <td className="py-2 px-4 border-b">{supplier.email}</td>
              <td className="py-2 px-4 border-b">{supplier.phone}</td>
              <td className="py-2 px-4 border-b flex gap-2">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(supplier)}
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
            className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Edit Supplier Modal */}
      {editSupplier && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Supplier</h2>

            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={editSupplier.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={editSupplier.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={editSupplier.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600"
                onClick={() => setEditSupplier(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                onClick={handleUpdateSupplier}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                onClick={() => deleteSupplier(editSupplier.id)}
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

export default SupplierList;
