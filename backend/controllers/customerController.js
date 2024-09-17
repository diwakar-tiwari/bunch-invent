const db = require('../config/db');

// Create a new customer
exports.createCustomer = async (req, res) => {
    const { name, phone, email, address } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO customers (name, phone, email, address) VALUES (?, ?, ?, ?)',
            [name, phone, email, address]
        );
        res.status(201).json({ message: 'Customer created successfully', customerId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const [customers] = await db.execute('SELECT * FROM customers');
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
    const { id } = req.params;

    try {
        const [customer] = await db.execute('SELECT * FROM customers WHERE id = ?', [id]);
        if (customer.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, phone, email, address } = req.body;

    try {
        const [result] = await db.execute(
            'UPDATE customers SET name = ?, phone = ?, email = ?, address = ? WHERE id = ?',
            [name, phone, email, address, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ message: 'Customer updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute('DELETE FROM customers WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
