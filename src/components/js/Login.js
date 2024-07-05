import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css'
import { useUserstate } from '../js/UserContext'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { refreshOtherPages } = useUserstate();
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://movie-list-backend-api-1812.onrender.com/login', { email, password });
            if (res.data.message === "Login Successfully") {
                localStorage.setItem('token', res.data.token);
                const query = "one piece";
                refreshOtherPages();
                navigate(`/logined/landingPage/${query}`);
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

    return (
        <div className="body"><div className='login'>
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="form-title">LOGIN</h2>
                {errorMessage && !isTyping && <p className="error-message">{errorMessage}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="form-input"
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="form-input"
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    required
                />
                <button type="submit" className="form-button">Login</button>
                <span onClick={onRegister} class="psw">Don't have an account?.. <Link to='/register'>Register now</Link></span>
            </form>
        </div>
        </div>
    );
}

export default Login;
