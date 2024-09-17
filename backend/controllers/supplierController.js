const db = require('../config/db');

// Get all suppliers
exports.getSuppliers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM suppliers');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a supplier by ID
exports.getSupplierById = async (req, res) => {
    const { id } = req.params;

    try {
        const [supplier] = await db.execute('SELECT * FROM suppliers WHERE id = ?', [id]);
        if (supplier.length === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(supplier[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new supplier
exports.addSupplier = async (req, res) => {
  const { name, contact_info } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO suppliers (name, contact_info) VALUES (?, ?)',
      [name, contact_info]
    );
    res.status(201).json({ id: result.insertId, name, contact_info });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update a supplier
exports.updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { name, contact_info } = req.body;
  
    // Validate input parameters
    if (!id || (name === undefined && contact_info === undefined)) {
      return res.status(400).json({ message: 'Invalid input parameters' });
    }
  
    // Prepare the SQL query with parameters
    const updateFields = [];
    const queryParams = [];
  
    if (name !== undefined) {
      updateFields.push('name = ?');
      queryParams.push(name);
    }
    if (contact_info !== undefined) {
      updateFields.push('contact_info = ?');
      queryParams.push(contact_info);
    }
  
    // If no fields to update
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }
  
    queryParams.push(id); // Append the id for the WHERE clause
  
    try {
      const updateQuery = `UPDATE suppliers SET ${updateFields.join(', ')} WHERE id = ?`;
      const [result] = await db.execute(updateQuery, queryParams);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Supplier not found' });
      }
  
      // Return the updated supplier
      const [updatedSupplier] = await db.execute('SELECT * FROM suppliers WHERE id = ?', [id]);
      res.json(updatedSupplier[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Delete a supplier
exports.deleteSupplier = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await db.execute('DELETE FROM suppliers WHERE id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Supplier not found' });
      }
  
      res.json({ message: 'Supplier deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
