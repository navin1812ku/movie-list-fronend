import { Link, Outlet } from "react-router-dom";
import { useUserstate } from '../js/UserContext'
import '../css/NavBar.css';

function NavBar() {
    const { isloggedIn } = useUserstate();

    return (
        <div>
            <nav className="navbar">
                <div className="nav-links">
                    <Link to="/" className="navbar-brand">
                        FLIM FETCH
                    </Link>
                    {isloggedIn ? (
                        <>
                            <Link className="navbar-link" to="/logined/landingPage/one piece">Search</Link>
                            <Link className="navbar-link" to="/logined/profile">Profile</Link>
                            <Link className="navbar-link" to="/loggedin/logout">Logout</Link>
                        </>
                    )
                        : (
                            <>
                                <Link className="navbar-link" to="/login">Login</Link>
                                <Link className="navbar-link" to="/register">Register</Link>
                            </>
                        )}
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;
