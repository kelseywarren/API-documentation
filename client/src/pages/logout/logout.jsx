import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

function LogoutButton() {
    const navigate = useNavigate();

   async function handleLogout() {
        try {
            await axios.post('/logout');
            navigate('/login');
            toast.success('Logged out')
        } catch(error) {
            console.log(error);
        }
        
    }

    return (
        <button onClick={handleLogout}>logout</button>
    )
}

export default LogoutButton;