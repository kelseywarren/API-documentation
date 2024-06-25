// Imports 
import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Main component 
function Register () {
    //Navigate
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
    const { username, email, password } = userData;
    try {
        const {data} = await axios.post('/register', {
        username, email, password
        })
        if (data.error) {
            toast.error(data.error);
        } else {
            setUserData({});
            toast.success('Account created!');
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
                <button>Create Account</button>
            </form>
        </div>

    )
};

// Export Register to be used in App 
export default Register;