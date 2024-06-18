import React from 'react';
import './navbar-style.css'

function Navbar() {
    return (
        <nav className="nav">
            <a href="/" className="home">MLS Web App</a>
            <ul>
                <li>
                    <a href="/login">login</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;