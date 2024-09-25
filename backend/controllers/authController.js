const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const db = require('../config/db');
const { jwtSecret, jwtExpiration } = require('../config/auth'); // Import your config

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user already exists
        const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role || 'staff']
        );

        // Get the inserted user (optional, for response purposes)
        const [newUser] = await db.execute('SELECT id, name, email, role FROM users WHERE id = ?', [result.insertId]);

        // Respond with the created user's details
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser[0],  // Return user object with id, name, email, and role
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Login a user and issue a JWT
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user exists
        const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user[0].id, role: user[0].role },
            jwtSecret,
            { expiresIn: jwtExpiration }
        );

         // Send response with token and user details
        res.json({ token, user: { name: user[0].name, email: user[0].email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
