import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css'; // Import CSS file

const Home = () => {
    return (
        <div>
            <div className="home-container">
                <h1>Welcome to Our Website!</h1>
                <p>This website provides you with amazing features and services. Sign up now to get started!</p>
                <div className="button-container">
                    <Link to="/login" className="login-button">Login</Link>
                    <Link to="/register" className="register-button">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
