import { Link, Outlet } from "react-router-dom";
import '../css/NavBar.css';

function NavBar() {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo">MENU
                    <div className="dropdown-content">
                        <Link className="navbar-link" to="/logined/landingPage/one piece">Search Movie</Link>
                        <Link className="navbar-link" to="/logined/searchMovieList">Search Movie List</Link>
                        <Link className="navbar-link" to="/logined/profile">Profile</Link>
                        <Link className="navbar-link" to="/logined/logout">Logout</Link>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar;
