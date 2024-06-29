// Imports 
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

// Main component 
function LogoutButton() {
    // Navigate (redirect)
    const navigate = useNavigate();
    // Log out function 
   async function handleLogout() {
        try {
            // Request sent to logout controller to perform log out 
            await axios.post('/logout');
            // Redirect to login pagae upon successful log out
            navigate('/login');
            toast.success('Logged out')
        } catch(error) {
            console.log(error);
        }
        
    }
    
    return (
        // Log out button rendered 
        <button onClick={handleLogout}>logout</button>
    )
}

export default LogoutButton;