const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth'); // Import your config

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    
    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        req.userId = decoded.userId; // Attach userId to the request for use in routes
        req.role = decoded.role; // Attach role if needed
        next();
    });
};

module.exports = verifyToken;
