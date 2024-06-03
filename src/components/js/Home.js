import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css'; // Import CSS file

const Home = () => {
    return (
        <div className='home-body'>
            <div className="home-container">
                <h1 >Welcome to Flim Fetch!</h1>
                <p>A film-adding website allows users to seamlessly add, manage,
                    and explore a vast collection of films while engaging with a
                    vibrant community of movie enthusiasts through ratings, reviews,
                    and social sharing.</p>
                <div className="button-container">
                    <Link to="/login" className="login-button">Login</Link>
                    <Link to="/register" className="register-button">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
