// Import express, router, and cors 
const express = require('express');
const router = express.Router();
const cors = require('cors');

// Import controllers 
const { registerUser } = require('../controllers/registration-auth');
const { loginUser } = require('../controllers/login -auth');
const { getLoggedInUser } = require('../controllers/user');

// Handle cors
router.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

// Routes
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/dashboard', getLoggedInUser)

// Export router
module.exports = router; 