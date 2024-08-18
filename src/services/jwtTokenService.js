const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Function to verify a JWT token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null; // Return null if verification fails
    }
};


const decodeToken = (token) => {
    try {
        return jwt.decode(token);
    } catch (err) {
        return null; // Return null if verification fails
    }
};

module.exports = {
    generateToken,
    verifyToken,
    decodeToken
    
};
