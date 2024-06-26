// import User model to check against database and create a user
const User = require('../models/users');

// test function
function test(req, res) {
    res.json('test route working')
};

// function for registering user 
async function registerUser (req, res) {
  try {
    const {username, email, password} = req.body;
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
        })
    }

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
        })
    };
    // Check if password field is empty
    if (!password) {
        return res.json({
            error: 'password is required and must contain at least one lowercase, uppercase, numerical, and special character'
        })
    };

    // Check if password has upper case letter
    if (!password.match(lowerCaseCheck)) {
    return res.json({
        error: "password must contain a lower case letter",
    });
    }
    // Check if password has lower case letter
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

    // Create user once all conditions satisfied
    const user = await User.create({
        username, 
        email, 
        password,
    });


    // Send user details as response 
    return res.json(user);

  } catch (error) {
    console.log(error)
  }  
};

// Export controller functions to be used in routes
module.exports = {
    test,
    registerUser
};