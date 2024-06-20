import React, { useState } from 'react';


function Register () {
    const [username, setUsername] = useState(''); //store username
    const [email, setEmail] = useState(''); // store email
    const [password, setPassword] = useState(''); // store password

    return (
       <div>
            <form>
                <input
                placeholder="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                />
                <br></br>
                <input
                placeholder="email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>
                <input
                placeholder="password"
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                />
            </form>
       </div>

    )
};

export default Register;