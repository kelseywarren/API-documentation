// Express
const express = require('express');
const app = express();

// Mongoose
const mongoose = require('mongoose');

// Environment Vairables 
require('dotenv').config();
const mongo = process.env.MONGODB_URI;
const port = process.env.PORT || 5500;

// Models
const user = require('./models/users');

// Cors
const cors = require('cors');
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

// Parse requests
app.use(express.json());

// Routes 
app.use('/', require('./routes/auth-routes')); 

// Database and server connect 
mongoose.connect(`${mongo}`)
  .then(() => {
    console.log('Connected to Database!')
    app.listen(port, () => {
        console.log(`server running on port ${port}`);
  });
})
.catch((error) => {
    console.log("Failed to connect to database"); 
}); 

