// Import User model to check user data against database
const User = require('../models/users');

// Import password hash helper functions for authentication
const { passwordHash, comparePassword } = require("../helpers/auth");


// Test function
function test(req, res) {
    res.json('test route working')
};

// Function for registering user 
async function registerUser (req, res) {
  try {
    const {username, email, password} = req.body;

    // Email requirement variable
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Username requirement variables
    const checkUsername = /^[a-z0-9_]+$/;
    const checkUsernameLength = /(?=.{1,24})/;

    // Password requirement variables
    const lowerCaseCheck = /(?=.*[a-z])/;
    const upperCaseCheck = /(?=.*[A-Z])/;
    const numberCheck = /(?=.*[0-9])/;
    const specialCheck = /(?=.*[!@#$%^&*])/;
    const passwordLengthCheck = /(?=.{8,})/;
    
    //Check if form is empty
    if (!username && !email && !password) {
        return res.json({
            error: 'username, email, and password are required'
        });
    };
    // Check if username field is empty
    if (!username) {
        return res.json({
            error: 'username is required'
        })
    };
    // Check if email field is empty
    if (!email) {
        return res.json({
            error: 'email address is required'
        });
    };
    // Check if password field is empty
    if (!password) {
        return res.json({
            error: 'password is required, and must contain at least one of the following characters: lowercase(a-z), uppercase(A-Z), number(0-9), special(!@#$%^&*)'
        });
    };
    

    // Check if username is valid
    if (!username.match(checkUsername)) {
        return res.json({
            error:
            "username can only contain the following characters: lowercase(a-z), numbers(0-9), underscore(_)",
            });
        };
        // Check username length
        if (!username.match(checkUsernameLength)) {
        return res.json({
            error: "username cannot exceed 24 characters",
            });
        };
        // Check if email address is valid
        if (!email.match(checkEmail)) {
        return res.json({
            error: "please enter valid email address",
            });
        };
      

    // Check if password has lower case letter
    if (!password.match(lowerCaseCheck)) {
    return res.json({
        error: "password must contain a lower case letter",
    });
    }
    // Check if password has upper case letter
    if (!password.match(upperCaseCheck)) {
    return res.json({
        error: "password must contain an uppercase case letter",
    });
    }
    // Check if password has number
    if (!password.match(numberCheck)) {
    return res.json({
        error: "password must contain a number",
    });
    }
    // Check if password has special character
    if (!password.match(specialCheck)) {
    return res.json({
        error:
        "password must contain one of the following special characters: !@#$%^&*",
    });
    }
    // Check if password is 8 characters long
    if (!password.match(passwordLengthCheck)) {
    return res.json({
        error: "password must be at least 8 characters long",
    });
    }

    // Check if user name already exist
    const usernameExist = await User.findOne({username});
    if (usernameExist) {
        return res.json({
            error: 'username already exists'
        })
    };   

    // Check if email address already exist
    const emailExist = await User.findOne({email});
    if (emailExist) {
        return res.json({
            error: 'email address already exists'
        })
    };

    // Variable for hashing password before storing in database
    const hashedPassword = await passwordHash(password);
    // Create user once all conditions satisfied
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    // Send user details as response 
    return res.json(user);

  } catch (error) {
    console.log(error)
  }  
};

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

  // Get username from session stored on mongodb 
  async function getLoggedInUser(req, res)  {
    try {
      if (req.session.user) {
        // Retrieve user details from session
        const { username } = req.session.user;
        res.json({ username });
      } else {
        res.status(401).json({ error: 'user not logged in' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'server error' });
    }
  };
  
// Export controller functions to be used in routes
module.exports = {
    test,
    registerUser,
    loginUser,
    getLoggedInUser
};