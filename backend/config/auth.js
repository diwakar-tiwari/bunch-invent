// /config/auth.js
module.exports = {
    jwtSecret: process.env.JWT_SECRET.trim(),  // Secret key for signing tokens
    
    jwtExpiration: process.env.JWT_EXPIRATION || '1h',                    // Token expiration time
  };
  