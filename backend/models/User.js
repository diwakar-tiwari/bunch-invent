// /models/User.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {};

// Function to create a new user
User.create = async (userData) => {
  const { username, email, password } = userData;
  
  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // SQL query to insert the new user into the database
  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  await db.query(query, [username, email, hashedPassword]);
};

// Function to find a user by email
User.findByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = ? LIMIT 1`;
  const [rows] = await db.query(query, [email]);
  return rows[0];  // Return the user record
};

// Function to compare passwords (bcrypt)
User.comparePassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

module.exports = User;
