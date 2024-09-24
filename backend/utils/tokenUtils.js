const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration } = require('../config/auth');

console.log(jwtSecret);

// Generate JWT token
// Generate JWT token
exports.generateToken = (userId, role) => {
  console.log("Using secret:", jwtSecret); // Log the secret being used
  return jwt.sign({ userId, role }, jwtSecret, { expiresIn: jwtExpiration });
};


// Verify JWT token
exports.verifyToken = (token) => {
  try {
    // Trim the token to avoid any issues with extra spaces
    return jwt.verify(token.trim(), jwtSecret.trim());
  } catch (error) {
    console.error('Token verification error:', error.message);
    return null; // Return null if verification fails
  }
};
