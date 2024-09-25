import React from "react";
import StockUpdate from "../components/StockUpdate";
import ReorderCheck from "../components/ReorderCheck";

const StockManagement = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Stock Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StockUpdate />
        <ReorderCheck />
      </div>
    </div>
  );
};

export default StockManagement;
