const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration } = require('../config/auth');

// Generate JWT token
// Generate JWT token
exports.generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, jwtSecret, { expiresIn: jwtExpiration });
};


// Verify JWT token
exports.verifyToken = (token) => {
  try {
    // Trim the token to avoid any issues with extra spaces
    return jwt.verify(token.trim(), jwtSecret.trim());
  } catch (error) {
    return null; // Return null if verification fails
  }
};
