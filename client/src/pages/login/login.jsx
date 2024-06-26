// Imports
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Main Component
function Login() {
  // Navigate
  const navigate = useNavigate();
  // User data state as an object
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  // Function to log in user
  async function loginUser(e) {
    e.preventDefault();
    const { email, password } = userData;
    try {
      const { data } = await axios.post("/login", {
        email,
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

    return (
        // Form filled out by user
        <form onSubmit={loginUser}>
            <input 
                className="enterEmail"
                type="email" 
                placeholder="email" 
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}>
            </input>
            <br></br>
            <input 
                className="enterPassword"
                type="text"
                placeholder="password"
                value={userData.password}
                onChange={(e) => setUserData({...userData, password: e.target.value})}>
            </input>
            <br></br>
            <button className="loginButton" type="submit">log in</button>
        </form>
    )
};

export default Login;