import React, { useState, useEffect } from 'react';
import api from '../services/api';
import useTable from '../hooks/useTable';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import EditModal from '../components/EditModal';
import CSVDownloader from '../components/CSVDownloader';
import { toast } from 'react-toastify';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);

  const {
    currentItems,
    handleSearch,
    handleSort,
    handlePageChange,
    totalPages,
    currentPage,
    searchTerm,
  } = useTable(customers, 10);  // Reusing the custom hook

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (err) {
      toast.error('Failed to fetch customers');
    }
  };

  const handleEdit = (customer) => setEditCustomer(customer);

  const handleSave = async () => {
    try {
      await api.put(`/customers/${editCustomer.id}`, editCustomer);
      fetchCustomers();
      setEditCustomer(null);
      toast.success('Customer updated successfully');
    } catch (err) {
      toast.error('Failed to update customer');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/customers/${editCustomer.id}`);
      fetchCustomers();
      setEditCustomer(null);
      toast.success('Customer deleted successfully');
    } catch (err) {
      toast.error('Failed to delete customer');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name', sortable: true },
    { label: 'Email', key: 'email', sortable: true },
    { label: 'Phone', key: 'phone' },
    { label: 'Address', key: 'address' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by customer name..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-400 rounded w-full"
      />

      {/* Download CSV Button */}
      <CSVDownloader data={customers} filename="customers.csv" />

      {/* Customer Table */}
      <Table columns={columns} data={currentItems} onSort={handleSort} onEdit={handleEdit} />

      {/* Pagination */}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />

      {/* Edit Modal */}
      <EditModal
        item={editCustomer}
        onClose={() => setEditCustomer(null)}
        onSave={handleSave}
        onDelete={handleDelete}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default CustomerList;
