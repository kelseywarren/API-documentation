// Import User model to check user data against database
const User = require('../models/users');

// Import password hash helper functions for authentication
const { comparePassword } = require("../helpers/auth");

// Function for logging in user
async function loginUser(req, res) {
    try {
      const { identifier, password } = req.body;
        
      // Checks if email or username field is empty
      if (!identifier) {
        return res.json({
          error: "email or username required",
        });
      } 
      // Check if password field is empty
      if (!password) {
        return res.json({
          error: "password is required",
        });
      }
    
      // Check if email or username is in database
      const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }]
      });
      if (!user) {
        return res.json({
          error: "login credentials not found",
        });
      } 
    // Check if password entered by user matches password stored in database
    const pwMatch = await comparePassword(password, user.password);
    if (!pwMatch) {
      res.json({
        error: "Invalid login credentials entered",
      });
    } else {
      req.session.user={
        id: user._id,
        username: user.username,
        email: user.email
      }
      return res.json("user successfully logged in!");
    }
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = {
    loginUser
  }