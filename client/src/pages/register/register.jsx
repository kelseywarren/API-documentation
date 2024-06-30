// Imports 
import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Main component 
function Register () {
    //Navigate (redirect)
    const navigate = useNavigate();
    // User data state as an object 
    const [userData, setUserData] = useState({
        username: '',
        email: '', 
        password: ''
    });


    // Function to register a user 
    async function registerUser(e) {
    e.preventDefault();
    // Destructered from userData state object. These values represent what the current value of the input fields currently are. (Holds the form input data)
    const { username, email, password } = userData;
    try {
        const {data} = await axios.post('/register', {
        // Request body data. Username, email, and password are sent to registration-auth controller in the backend to perform validation, and ultimately create a user.  
        username, email, password 
        })
        if (data.error) {
            // Handles any return res.json({error: }) in the backend
            toast.error(data.error);
        } else {
            setUserData({});
            toast.success('Account created!');
            // Redirect to login page upon successful registration 
            navigate('/login');
        }

    } catch(error) {
        console.log(error)
    }
    };

    return (
        // Form filled out by user 
        <div>
            <form onSubmit={registerUser}>
                <label htmlFor="username">Username</label>
                <br></br>
                    <input
                    placeholder="username..."
                    type="text"
                    id="username"
                    value={userData.username}
                    onChange={(e) => setUserData({...userData, username: e.target.value})}
                    className="username"
                    autoComplete="on"
                    /> 
                <br></br>
                <label htmlFor="email">Email</label>
                <br></br>
                    <input 
                    placeholder="email..."
                    type="text"
                    id="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className="email" 
                    autoComplete="on"
                    />
                <br></br>
                <label htmlFor="password">Password</label>
                <br></br>
                    <input
                    placeholder="password..."
                    type="text"
                    id="password"
                    value={userData.password}
                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                    className="password" 
                    autoComplete="on"
                    />
                <br></br><br></br>
                <button>Create Account</button>
            </form>
        </div>

    )
};

// Export Register to be used in App 
export default Register;