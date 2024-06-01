import { Link, Outlet } from "react-router-dom";
import '../css/NavBar.css'

function NavBar() {
    return (
        <div>
            <nav className="navbar">
                <div className="nav-links">
                    <Link className="navbar-link" to="/logined/landingPage">Search Movie</Link>
                    <Link className="navbar-link" to="/logined/searchMovieList">Search Movie List</Link>
                    <Link className="navbar-link" to="/logined/profile">Profile</Link>
                    <Link className="navbar-link" to="/user/logout">Logout</Link>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar;