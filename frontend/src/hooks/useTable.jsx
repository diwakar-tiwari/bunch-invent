import { useState, useMemo } from 'react';

const useTable = (items, itemsPerPage) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Filter based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [items, searchTerm]);

  // Sort based on selected column and direction
  const sortedItems = useMemo(() => {
    if (!sortColumn) return filteredItems;
    return [...filteredItems].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      }
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    });
  }, [filteredItems, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const currentItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = column => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = pageNumber => setCurrentPage(pageNumber);

  return {
    currentItems,
    handleSearch,
    handleSort,
    handlePageChange,
    totalPages,
    currentPage,
    sortColumn,
    sortDirection,
    searchTerm
  };
};

export default useTable;
