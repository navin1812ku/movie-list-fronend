import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import '../css/NavBar.css';

function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo">
                    <div className="hamburger-button" onClick={toggleDropdown}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
                        <Link className="navbar-link" to="/logined/landingPage/one piece" onClick={closeDropdown}>Search Movie</Link>
                        <Link className="navbar-link" to="/logined/searchMovieList" onClick={closeDropdown}>Search Movie List</Link>
                        <Link className="navbar-link" to="/logined/profile" onClick={closeDropdown}>Profile</Link>
                        <Link className="navbar-link" to="/logined/logout" onClick={closeDropdown}>Logout</Link>
                    </div>
                </div>
                <h1>Film Fetch</h1>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar;
