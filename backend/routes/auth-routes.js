// Import express, router, and cors 
const express = require('express');
const router = express.Router();
const cors = require('cors');

// Import controllers 
const { test, registerUser, loginUser } = require('../controllers/auth-controller');

// Handle cors
router.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

// Routes
router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)

// Export router
module.exports = router; 