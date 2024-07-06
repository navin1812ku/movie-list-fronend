import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../css/NavBar.css';
import { useUserstate } from '../js/UserContext';

function NavBar() {
    const { isloggedIn } = useUserstate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLinkClick = () => {
        setDropdownOpen(false);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link className='navbar-title' to="/">FLIM FETCH</Link>
                </div>
                <button className="menu-toggle" onClick={toggleDropdown}>
                    <div className={`bar ${dropdownOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${dropdownOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${dropdownOpen ? 'open' : ''}`}></div>
                </button>
                <div className={`nav-links ${dropdownOpen ? 'show' : ''}`}>
                    {isloggedIn ? (
                        <>
                            <Link className="navbar-link" to="/logined/landingPage/one piece" onClick={handleLinkClick}>Search</Link>
                            <Link className="navbar-link" to="/logined/profile" onClick={handleLinkClick}>Profile</Link>
                            <Link className="navbar-link" to="/loggedin/logout" onClick={handleLinkClick}>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link className="navbar-link" to="/login" onClick={handleLinkClick}>Login</Link>
                            <Link className="navbar-link" to="/register" onClick={handleLinkClick}>Register</Link>
                        </>
                    )}
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;
