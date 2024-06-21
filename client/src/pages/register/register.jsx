import React, { useState } from 'react';


function Register () {
    const [username, setUsername] = useState(''); //store username
    const [email, setEmail] = useState(''); // store email
    const [password, setPassword] = useState(''); // store password

    return (
        <div>
        <form>
          <label for="username">Username</label>
          <br></br>
            <input
            placeholder="username..."
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="username"
            required
            /> 
            <br></br>
          <label for="email">Email</label>
          <br></br>
            <input 
            placeholder="email..."
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="email"
            required
            />
            <br></br>
          <label for="password">Password</label>
          <br></br>
            <input
            placeholder="password..."
            type="text"
            onChange={(e) => setPassword(e.target.value)}
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