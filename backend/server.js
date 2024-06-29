// Express
const express = require('express');

// Express session
const session = require('express-session');

// Session store in mongoDB 
const MongoDBStore = require('connect-mongodb-session')(session);

// Execute express function 
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
const store = new MongoDBStore({
  uri: `${mongo}`,
  collection: 'sessions'
}); 

// Express session middleware 
app.use(session({
  secret: `${secretkey}`,
  resave: false,
  saveUninitalized: false,
  store: store,
  cookie: {
    expires: new Date(Date.now() + (1000 * 60 * 60 * 24))
  }
}))

// Handle mongoDB store errors 
store.on('error', function(error) {
  console.error(error);
})

// Parse requests middleware 
app.use(express.json());

// Routes 
app.use('/', require('./routes/auth-routes')); 

// Database and server connect 
mongoose.connect(`${mongo}`)
  // Handle successful connection to database 
  .then(() => {
    console.log('Connected to Database!')
    app.listen(port, () => {
        console.log(`server running on port ${port}`);
  });
})
  // Handle failure to connect to database 
    .catch((error) => {
      console.log("Failed to connect to database"); 
}); 
