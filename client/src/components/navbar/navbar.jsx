// Imports
import React, {useState, useEffect } from 'react';
import './navbar-style.css'
import axios from 'axios';

function Navbar() {

    // Log-in state of user
    const [isLoggedIn, setIsLoggedIn] = useState('false');
    // Loading state 
    const [isLoading, setIsLoading] = useState(true); 

    // Checks log in status
    useEffect(() => {
        async function checkLoginStatus () {
            try{
                const response = await axios.get('/dashboard');
                if (response.status === 200) {
                    setIsLoggedIn(true);
                }

            } catch (error) {
                setIsLoggedIn(false);
                console.log(error)
            } finally {
                setIsLoading(false); 
            }
        }
        checkLoginStatus();
    }, [])

    if (isLoading) {
        return <div></div>;
    }

    return (
        <nav className="nav">
            <a href="/" className="home">MLS Web App</a>
            <ul>
                <li>
                    <a href="/login">login</a>
                    <a href="/register">register</a>
                    {isLoggedIn && <a href="/dashboard">dashboard</a>}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;