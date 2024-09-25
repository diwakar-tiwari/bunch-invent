const db = require('../config/db');

// Update stock quantity (add or subtract stock)
exports.updateStock = async (req, res) => {
    const { product_id, quantity_change } = req.body;

    if (!product_id || quantity_change === undefined) {
        return res.status(400).json({ message: 'Product ID and quantity change are required' });
    }

    try {
        // Fetch current stock
        const [product] = await db.execute('SELECT stock_quantity FROM products WHERE id = ?', [product_id]);
        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const newStock = product[0].stock_quantity + quantity_change;

        // Update stock in the database
        await db.execute('UPDATE products SET stock_quantity = ? WHERE id = ?', [newStock, product_id]);

        res.status(200).json({ message: 'Stock updated successfully', new_stock: newStock });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Check if product stock is below reorder level
exports.checkReorderLevel = async (req, res) => {
    const { product_id } = req.params;

    try {
        const [product] = await db.execute(
            'SELECT stock_quantity, reorder_level FROM products WHERE id = ?',
            [product_id]
        );

        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const { stock_quantity, reorder_level } = product[0];
        const isBelowReorderLevel = stock_quantity < reorder_level;

        res.status(200).json({
            product_id,
            stock_quantity,
            reorder_level,
            is_below_reorder_level: isBelowReorderLevel
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
