import React from 'react';
import Papa from 'papaparse';

const CSVDownloader = ({ data, filename }) => {
  const handleDownload = () => {
    if (!data || data.length === 0) {
      alert("No data available to download.");
      return;
    }

    // Convert the data into CSV format
    const csv = Papa.unparse(data);

    // Create a Blob from the CSV string
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Create a temporary download link and click it to trigger download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', filename || 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
      onClick={handleDownload}
    >
      Download CSV
    </button>
  );
};

export default CSVDownloader;
