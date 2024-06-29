// Imports
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Main Component
function Login() {
  // Navigate (redirect)
  const navigate = useNavigate();
  // User data state as an object (identifier used in place of email and username to allow user option of email or username)
  const [userData, setUserData] = useState({
    identifier:"",
    password: ""
  });

  // Function to log in user
  async function loginUser(e) {
    e.preventDefault();

    const { identifier, password } = userData;
    try {
      // Destructered from userData state object. These values represent what the current value of the input fields currently are. (Holds the form input data)
      const { data } = await axios.post("/login", {
        // Request body data. Identifier and passwrod are sent to login-auth controller in the backend to perform validations, and ultimately log user in
        identifier,
        password
      });
      if (data.error) {
        // Handles any return res.json({error: }) in the backend
        toast.error(data.error);
      } else {
        setUserData({});
        toast.success("Log-in success!");
        // Redirect to dashboard upon sucessful login 
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }
// Handler function for input value change in email or username input field 
 function emailUserHandler(e) {
    const { value } = e.target;
    setUserData({ ...userData, identifier: value });
  };
// Handler function for input value change in password input field
  function passwordHandler(e) {
    const { value } = e.target;
    setUserData({ ...userData, password: value });
  }


    return (
        // Form filled out by user
        <form onSubmit={loginUser}>
            <input 
                className="enterIdentifier"
                type="text" 
                name="identifier"
                placeholder="email or username" 
                value={userData.identifier}
                onChange={emailUserHandler}>
            </input>
            <br></br>
            <input 
                className="enterPassword"
                type="text"
                name="password"
                placeholder="password"
                value={userData.password}
                onChange={passwordHandler}>
            </input>
            <br></br>
            <button className="loginButton" type="submit">log in</button>
        </form>
    )
};

export default Login;