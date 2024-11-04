import './Navbar.css';
import React, { useState } from 'react';
import chef_logo from '../Assets/chef_logo.png'

function Navbar() {

    return (
        <nav>
            <div className="nav-container">
                <a href="/homepage">
                    <img src={chef_logo} alt="logo" className='logo'/>
                    <h2>MT's Kitchen</h2>
                </a>
            </div>

            <ul>
                <li><a href="/homepage">Home</a></li>
                <li><a href="/recipes">Recipes</a></li>
                <li><a href="/user">User Profile</a></li>
                <li><a href="/aboutus">About Us</a></li>
                <li><a href="/">Sign Out</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;