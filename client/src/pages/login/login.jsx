import React from 'react'; 

function Login() {
    return (
        <form>
            <input className="enterEmail" type="text" placeholder="email"></input><br></br>
            <input className="enterPassword" type="text" placeholder="password"></input><br></br>
            <button className="loginButton" type="submit">log in</button>
        </form>
    )
};

export default Login;