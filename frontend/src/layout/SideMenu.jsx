import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/tokenUtils"; // Assuming this utility function is available

const SideMenu = () => {
  const userName = localStorage.getItem("userName"); // Get user's name from localStorage
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken(); // Clear the token
    localStorage.removeItem("userName"); // Clear user name
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-4">Bunch-Invent 🏪</h2>
      
      {/* Displaying Username */}
      {userName && (
        <div className="mb-4">
          <p>Welcome, <strong>{userName}</strong>!</p>
        </div>
      )}

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

          {/* New Stock Management Links */}
          <li className="mb-2">
            <Link
              to="/stock-management"
              className="block py-2 px-4 hover:bg-gray-700 rounded transition duration-300 ease-in-out"
            >
              Stock Management
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded w-full mt-6 hover:bg-red-600 transition duration-300 ease-in-out"
      >
        Logout
      </button>
    </div>
  );
};

export default SideMenu;
