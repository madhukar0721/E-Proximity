// authMiddleware.js
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });
const jwt = require('jsonwebtoken');
const db = require('../DB/conn');


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;


const authenticate = (req, res, next) => {
    
    const token1 = req.header('Authorization');
    if (!token1) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        const token = token1.split(" ")[1]
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

module.exports = authenticate;
