import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { productsAPI } from "../services/authService";
import { checkReorderLevel } from "../services/stockService";

const ReorderCheck = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI() // Replace with your API
        const productOptions = response.data.map((product) => ({
          value: product.id,
          label: product.name,
        }));
        setProducts(productOptions);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleReorderCheck = async (e) => {
    e.preventDefault();

    if (selectedProduct) {
      try {
        const response = await checkReorderLevel(selectedProduct.value);
        console.log(response);
        
        const reorderNeeded = response.reorderNeeded;
        setMessage(
          reorderNeeded
            ? `Product: ${selectedProduct.label} needs to be reordered.`
            : `Product: ${selectedProduct.label} is sufficiently stocked.`
        );
      } catch (error) {
        console.error("Error checking reorder status:", error);
        setMessage("Failed to check reorder status. Please try again.");
      }
    } else {
      setMessage("Please select a product.");
    }

    setSelectedProduct(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Reorder Level Check</h2>
      <form onSubmit={handleReorderCheck} className="space-y-4">
        <div>
          <label className="block text-gray-700">Product</label>
          <Select
            options={products}
            value={selectedProduct}
            onChange={setSelectedProduct}
            placeholder="Select or search a product..."
            className="mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 ease-in-out w-full"
        >
          Check Reorder Status
        </button>
      </form>
      {message && <p className="mt-4 text-blue-600">{message}</p>}
    </div>
  );
};

export default ReorderCheck;
