const db = require('../config/db');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new category
exports.addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      const [result] = await db.execute('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      const [updatedCategory] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
      res.json(updatedCategory[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Delete a category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await db.execute('DELETE FROM categories WHERE id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  