import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Register.css"

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://movie-list-backend-api-1812.onrender.com/register', { username, email, password });
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="register-body">
            <form onSubmit={handleSubmit} className="register-form">
                <h2 className="register-form-title">Register</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="register-form-input"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="register-form-input"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="register-form-input"
                    required
                />
                <button type="submit" className="register-form-button">Register</button>
            </form>
        </div>
    );
}

export default Register;
