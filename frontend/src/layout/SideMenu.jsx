import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-4">Bunch-Invent 🏪</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link
              to="/"
              className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300 ease-in-out"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/products"
              className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300 ease-in-out"
            >
              Products
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/suppliers"
              className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300 ease-in-out"
            >
              Suppliers
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/customers"
              className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300 ease-in-out"
            >
              Customers
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/add-product"
              className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300 ease-in-out"
            >
              Add Product
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/add-supplier"
              className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300 ease-in-out"
            >
              Add Supplier
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/add-customer"
              className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300 ease-in-out"
            >
              Add Customer
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
