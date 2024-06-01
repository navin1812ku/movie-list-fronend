import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://movie-list-backend-api-1812.onrender.com/login', { email, password });
            if (res.data.message === "Login Successfully") {
                localStorage.setItem('token', res.data.token);
                navigate('/logined/landingPage');
            }
            else {
                setErrorMessage(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onRegister = async () => {
        navigate('/register')
    }

    const onForGetPassword = async () => {
        navigate('/forgetPassword')
    }

    return (
        <div className="body">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="form-title">Login</h2>
                {errorMessage && !isTyping && <p className="error-message">{errorMessage}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="form-input"
                    onFocus={() => setIsTyping(true)} // Set isTyping to true when input is focused
                    onBlur={() => setIsTyping(false)}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-input"
                    onFocus={() => setIsTyping(true)} // Set isTyping to true when input is focused
                    onBlur={() => setIsTyping(false)}
                    required
                />
                <button type="submit" className="form-button">Login</button>
                <button onClick={onForGetPassword} className="form-button">Forget Password</button>
                <button onClick={onRegister} className="form-button">Register</button>
            </form>
        </div>
    );
}

export default Login;
