import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div >
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-2 border-b pb-2">
            {product.name} - {product.price} USD
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
