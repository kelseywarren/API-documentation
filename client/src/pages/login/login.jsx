// Imports
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Main Component
function Login() {
  // Navigate
  const navigate = useNavigate();
  // User data state as an object (identifier used in place of email and username)
  const [userData, setUserData] = useState({
    identifier:"",
    password: ""
  });

  // Function to log in user
  async function loginUser(e) {
    e.preventDefault();
    const { identifier, password } = userData;
    try {
      const { data } = await axios.post("/login", {
        identifier,
        password
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setUserData({});
        toast.success("Log-in success!");
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
// Handler function for input value change in passowrd input field
  function passwordHandler(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
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