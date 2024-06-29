// Express
const express = require('express');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const app = express();


// Mongoose
const mongoose = require('mongoose');

// Environment Vairables 
require('dotenv').config();
const mongo = process.env.MONGODB_URI;
const secretkey = process.env.SESSIONKEY
const port = process.env.PORT || 5500;


// Models
const user = require('./models/users');

// Cors
const cors = require('cors');
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

// Configure session 
const store = new mongoDBStore({
  uri: `${mongo}`,
  collection: 'sessions'
}); 

app.use(session({
  secret: `${secretkey}`,
  resave: false,
  saveUninitalized: false,
  store: store,
}))

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

