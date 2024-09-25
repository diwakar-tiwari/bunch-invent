import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { productsAPI } from "../services/authService";
import { updateStock } from '../services/stockService'; // Import the service function

const StockUpdate = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI() 
        
        const productOptions = response.data.map((product) => ({
          value: product.id,
          label: product.name, // Assuming each product has 'id' and 'name'
        }));
        setProducts(productOptions);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);



  const handleUpdateStock = async (e) => {
      e.preventDefault();
  
      // Log the selected product to see what is being passed
      console.log("Selected Product:", selectedProduct);
  
      if (selectedProduct && quantity) {
          console.log("Payload being sent:", {
              productId: selectedProduct.value,
              quantity,
          });
  
          try {
              // Use the updateStock service function to handle API call
              const response = await updateStock(selectedProduct.value, quantity); // Service handles API call
              
              setMessage(`Successfully updated stock for product: ${selectedProduct.label}`);
          } catch (error) {
              console.error("Error updating stock:", error);
              setMessage("Failed to update stock. Please try again.");
          }
      } else {
          setMessage("Please select a product and enter a valid quantity.");
      }
  
      setSelectedProduct(null);
      setQuantity("");
  };
  


  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Update Stock</h2>
      <form onSubmit={handleUpdateStock} className="space-y-4">
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
        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter quantity"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out w-full"
        >
          Update Stock
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default StockUpdate;
