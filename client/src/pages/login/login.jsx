import React from 'react'; 
import axios from 'axios';

const loginUser = (e) => {
    e.preventDefault()
    axios.get('/')
};

function Login() {
    return (
        <form onSubmit={loginUser}>
            <input className="enterEmail" type="text" placeholder="email"></input><br></br>
            <input className="enterPassword" type="text" placeholder="password"></input><br></br>
            <button className="loginButton" type="submit">log in</button>
        </form>
    )
};

export default Login;