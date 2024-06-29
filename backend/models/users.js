// Import mongoose and schema 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema 
const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

// User Model 
const UserModel = mongoose.model('User', userSchema)

// Export user model 
module.exports = UserModel;