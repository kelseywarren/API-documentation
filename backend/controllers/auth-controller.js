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
    if (!username) {
        return res.json({
            error: 'username is required'
        })
    };
    if (!email) {
        return res.json({
            error: 'email address is required'
        })
    };
    if (!password) {
        return res.json({
            error: 'password is required'
        })
    };
    if (password.length < 8) {
        return res.json({
            error: 'password must be at least 8 characters long'
        })
    };

    //variables
    let countUpperCase = 0;
    let countLowerCase = 0;
    let countDigit = 0;
    let countSpecialChar = 0;


    // Loop to check each password
    for (let i = 0; i < password.length; i++) {

    const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '[', '{', ']', '}', ':', ';', '<', '>']
    // Check if password contains uppercase letter
    if (password[i] == password[i].toUpperCase()) {
        countUpperCase++; 
    };

    // Check if password contains lowercase letter
    if (password[i] == password[i].toLowerCase()) {
        countLowerCase++;
    };

    // Check if password contains a number
    if (!isNaN(password[i] * 1)) {
        countDigit++;
    };
    
    // Check if password contains a special character
    if (specialChars.includes(password[i])) {
    countSpecialChar++;
    };

    }; 

    // Check if password is missing uppercase letter 
    if (countUpperCase == 0) {
    res.json({error: 'password must contain at least one upper case character'})
    };
    // Check if password is missing lowercase letter
    if (countLowerCase == 0) {
    res.json({error: 'password must contain at least one lower case character'})
    };

    // Check if password is missing number
    if (countDigit == 0) {
    res.json({error: 'password must contain at least one numerical digit'})
    };

    // Check if password is missing special character
    if (countSpecialChar == 0) {
    res.json({error: 'password must contain at least one special character'}) 
    };

    // Check if user name already exist
    const usernameExist = await User.findOne({username});
    if (usernameExist) {
        return res.json({error: 'username already exists'})
    };   

    // Check if email address already exist
    const emailExist = await User.findOne({email});
    if (emailExist) {
        return res.json({error: 'email address already exists'})
    };

    // Create user once all conditions satisfied
    const user = await User.create({
        username, email, password
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