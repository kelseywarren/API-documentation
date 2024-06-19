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

// Cors
const cors = require('cors');
app.use(cors());

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