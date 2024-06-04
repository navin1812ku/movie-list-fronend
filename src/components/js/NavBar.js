import { Link, Outlet } from "react-router-dom";
import '../css/NavBar.css';

function NavBar() {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo">
                    <div className="hamburger-button">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="dropdown-content">
                        <Link className="navbar-link" to="/logined/landingPage/one piece">Search Movie</Link>
                        <Link className="navbar-link" to="/logined/searchMovieList">Search Movie List</Link>
                        <Link className="navbar-link" to="/logined/profile">Profile</Link>
                        <Link className="navbar-link" to="/logined/logout">Logout</Link>
                    </div>
                </div>
                <h1>Film Fetch</h1>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar;
