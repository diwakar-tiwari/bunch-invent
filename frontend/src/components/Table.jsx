import React from 'react';

const Table = ({ columns, data, onSort, onEdit }) => {
  const renderSortIcon = (column) => {
    if (!column.sortable) return null;
    return <span>⇅</span>; // Simplified sorting indicator
  };

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="py-2 px-4 border-b text-left cursor-pointer"
              onClick={() => column.sortable && onSort(column.key)}
            >
              {column.label} {renderSortIcon(column)}
            </th>
          ))}
          <th className="py-2 px-4 border-b text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.key} className="py-2 px-4 border-b">
                {item[column.key]}
              </td>
            ))}
            <td className="py-2 px-4 border-b">
              <button
                className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                onClick={() => onEdit(item)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
