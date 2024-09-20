import React, { useState, useEffect } from 'react';
import api from '../services/api';
import useTable from '../hooks/useTable';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import EditModal from '../components/EditModal';
import CSVDownloader from '../components/CSVDownloader';
import { toast } from 'react-toastify';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editSupplier, setEditSupplier] = useState(null);

  const {
    currentItems,
    handleSearch,
    handleSort,
    handlePageChange,
    totalPages,
    currentPage,
    searchTerm,
  } = useTable(suppliers, 10);  // Reusing the custom hook

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/suppliers');
      setSuppliers(response.data);
    } catch (err) {
      toast.error('Failed to fetch suppliers');
    }
  };

  const handleEdit = (supplier) => setEditSupplier(supplier);

  const handleSave = async () => {
    try {
      await api.put(`/suppliers/${editSupplier.id}`, editSupplier);
      fetchSuppliers();
      setEditSupplier(null);
      toast.success('Supplier updated successfully');
    } catch (err) {
      toast.error('Failed to update supplier');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/suppliers/${editSupplier.id}`);
      fetchSuppliers();
      setEditSupplier(null);
      toast.success('Supplier deleted successfully');
    } catch (err) {
      toast.error('Failed to delete supplier');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name', sortable: true },
    { label: 'Contact', key: 'contact' },
    { label: 'Email', key: 'email' },
    { label: 'Address', key: 'address' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Supplier List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by supplier name..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-400 rounded w-full"
      />

      {/* Download CSV Button */}
      <CSVDownloader data={suppliers} filename="suppliers.csv" />

      {/* Supplier Table */}
      <Table columns={columns} data={currentItems} onSort={handleSort} onEdit={handleEdit} />

      {/* Pagination */}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />

      {/* Edit Modal */}
      <EditModal
        item={editSupplier}
        onClose={() => setEditSupplier(null)}
        onSave={handleSave}
        onDelete={handleDelete}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SupplierList;
