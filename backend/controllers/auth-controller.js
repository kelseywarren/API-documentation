const User = require('../models/users');

function test(req, res) {
    res.json('test route working')
};

async function registerUser (req, res) {
  try {
    const {username, email, password} = req.body;
    if (!username) {
        return res.json({error: 'username is required'});
    };
    if (!email) {
        return res.json({error: 'email address is required'})
    };
    if (!password) {
        return res.json({error: 'password is required'})
    };
    if (password.length < 8) {
        return res.json({error: 'password must be at least 8 characters long'})
    };

    const exist = await User.findOne({email});
    if (exist) {
        return res.json({error: 'email address already exists'})
    };

    const user = await User.create({
        username, email, password
    });

    return res.json(user);


  } catch (error) {
    console.log(error)
  }  
};


module.exports = {
    test,
    registerUser
};