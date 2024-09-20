const db = require('../config/db');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const [product] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)',
      [name, description, price, quantity]
    );
    res.status(201).json({ id: result.insertId, name, description, price, quantity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add multiple products in bulk
exports.addProductsBulk = async (req, res) => {
  const { products } = req.body;

  // Validate input
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'Invalid product data' });
  }

  // Prepare bulk insert query
  const values = products.map((product) => [
    product.name,
    product.description,
    product.price,
    product.quantity,
  ]);

  const sql = `INSERT INTO products (name, description, price, quantity) VALUES ?`;

  try {
    const [result] = await db.query(sql, [values]);
    res.status(201).json({ message: `${result.affectedRows} products added successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
  
    // Validate input parameters
    if (!id || (name === undefined && description === undefined && price === undefined && quantity === undefined)) {
      return res.status(400).json({ message: 'Invalid input parameters' });
    }
  
    // Prepare the SQL query with parameters
    const updateFields = [];
    const queryParams = [];
  
    if (name !== undefined) {
      updateFields.push('name = ?');
      queryParams.push(name);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      queryParams.push(description);
    }
    if (price !== undefined) {
      updateFields.push('price = ?');
      queryParams.push(price);
    }
    if (quantity !== undefined) {
      updateFields.push('quantity = ?');
      queryParams.push(quantity);
    }
  
    // If no fields to update
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }
  
    queryParams.push(id); // Append the id for the WHERE clause
  
    try {
      const updateQuery = `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`;
      const [result] = await db.execute(updateQuery, queryParams);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Return the updated product
      const [updatedProduct] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
      res.json(updatedProduct[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Delete a product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  