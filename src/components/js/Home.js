import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css'; // Import CSS file
import '../css/NavBar.css';


const Home = () => {
    return (
        <div >
            <div className='background'>
                <div className='home-card'>
                    <div class="home-image">
                        <img src="https://tint.creativemarket.com/ml4wuv0Bx6YYkTxNvEmgKLbMouTwX_WIH4suYxjTJdc/width:3000/height:1873/gravity:nowe/rt:fill-down/el:1/czM6Ly9maWxlcy5jcmVhdGl2ZW1hcmtldC5jb20vaW1hZ2VzL3NjcmVlbnNob3RzL3Byb2R1Y3RzLzc1MS83NTExLzc1MTExMjAvNzgwLW8uanBn" alt="Home Image" />

                    </div>
                    <div className="home-container">

                        <h1>Welcome to Our Website!</h1>
                        <p>Managing the film collection is equally streamlined. Users can organize films into custom lists, such as “Must-Watch,” “Favorites,” or “Watched,” making it easy to keep track of their movie journey. Advanced search and filter options allow users to navigate through the extensive library, helping them find specific films or explore new genres and directors.</p>

                        <div className="button-container">
                            <Link to="/login" className="login-button">Login</Link>
                            <Link to="/register" className="register-button">Register</Link>
                        </div>

                    </div>


                </div>
                <footer className="footer">
                    <div className="footer-content">
                        <p>&copy; 2024 Movie Bot. All rights reserved.</p>
                        <div className="footer-links">
                            <a href="#about">About</a>
                            <a href="#contact">Contact</a>
                            <a href="#privacy">Privacy Policy</a>
                        </div>
                    </div>
                </footer>

            </div>


        </div>


    );
};

export default Home;