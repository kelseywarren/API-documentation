import React, { useState } from 'react';
import axios from 'axios';

function Register () {
    const [userData, setUserData] = useState({
        username: '',
        email: '', 
        password: ''
    });

        // Function to check if form meets specified requirements
        function validateForm() {
      
            // Check if username field is empty
            if (userData.username.length == 0) {
              alert('Invalid entry. Username cannot be empty')
              return
            };
            // Check if email field is empty
            if (userData.email.length == 0) {
              alert('Invalid entry. Email cannot be empty')
              return
            };
            // Check password character count
            if (userData.password.length < 8) {
              alert('Invalid entry. Password must be at least 8 characters long')
              return
            };

             //variables
            let countUpperCase = 0;
            let countLowerCase = 0;
            let countDigit = 0;
            let countSpecialChar = 0;


            // Loop to check each password
            for (let i = 0; i < userData.password.length; i++) {
      
              const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '[', '{', ']', '}', ':', ';', '<', '>']
              // Check if password contains uppercase letter
              if (userData.password[i] == userData.password[i].toUpperCase()) {
                countUpperCase++; 
              };

              // Check if password contains lowercase letter
              if (userData.password[i] == userData.password[i].toLowerCase()) {
                countLowerCase++;
              };

              // Check if password contains a number
              if (!isNaN(userData.password[i] * 1)) {
                countDigit++;
              };
              
              // Check if password contains a special character
              if (specialChars.includes(userData.password[i])) {
               countSpecialChar++;
              };

            };

            // Check if password is missing uppercase letter 
            if (countUpperCase == 0) {
              alert('Invalid entry. Password must contain at least one upper case character')
              
            };
            // Check if password is missing lowercase letter
            if (countLowerCase == 0) {
              alert('Invalid entry. Password must contain at least one lower case character')
            };

            // Check if password is missing number
            if (countDigit == 0) {
              alert('Invalid entry. Password must contain at least one numerical digit')
            };

            // Check if password is missing special character
            if (countSpecialChar == 0) {
              alert('Invalid entry. Password must contain at least one special character')   
             };
             
             if (countUpperCase >= 1 && countLowerCase >= 1 && countDigit >= 1 && countSpecialChar >= 1) {
                alert("form valid")
             };
          };

          async function registerUser(e) {
            e.preventDefault();
            const { username, email, password } = userData
            try {
              const {userData} = await axios.post('/register', {
                username, email, password
              })
              if (userData) {
                setUserData({})
              }

            } catch(error) {
                console.log(error)
            }
          };

    return (

        <div>
            <form onSubmit={registerUser}>
                <label for="username">Username</label>
                <br></br>
                    <input
                    placeholder="username..."
                    type="text"
                    value={userData.username}
                    onChange={(e) => setUserData({...userData, username: e.target.value})}
                    className="username"
                    required
                    /> 
                <br></br>
                <label for="email">Email</label>
                <br></br>
                    <input 
                    placeholder="email..."
                    type="text"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className="email"
                    required
                    />
                <br></br>
                <label for="password">Password</label>
                <br></br>
                    <input
                    placeholder="password..."
                    type="text"
                    value={userData.password}
                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                    className="password"
                    required
                    />
                <br></br><br></br>
                <button onClick={() => {
                    validateForm()
                }}>Create Account</button>
            </form>
        </div>

    )
};

export default Register;