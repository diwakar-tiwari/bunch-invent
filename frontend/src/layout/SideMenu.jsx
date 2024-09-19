import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link
              to="/products"
              className="block py-2 px-4 hover:bg-gray-700 rounded">
              Products
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/suppliers"
              className="block py-2 px-4 hover:bg-gray-700 rounded">
              Suppliers
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/customers"
              className="block py-2 px-4 hover:bg-gray-700 rounded">
              Customers
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/add-product"
              className="block py-2 px-4 hover:bg-gray-700 rounded">
              Add Product
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/add-supplier"
              className="block py-2 px-4 hover:bg-gray-700 rounded">
              Add Supplier
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/suppliers"
              className="block py-2 px-4 hover:bg-gray-700 rounded">
              Supplier List
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/add-customer"
              className="block py-2 px-4 hover:bg-gray-700 rounded">
              Add Customer
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/customers"
              className="block py-2 px-4 hover:bg-gray-700 rounded">
              Customer List
            </Link>
          </li>

          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
