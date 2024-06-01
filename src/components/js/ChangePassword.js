import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../css/ChangePassword.css'; // Adjust the path according to your file structure

function ChangePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== repeatPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response=await axios.post('https://movie-list-backend-api-1812.onrender.com/userChangePasssword', {
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.error) {
                setErrorMessage(response.data.error);
            } else {
                if (response.data.message === "Password changed") {
                    setSuccessMessage(response.data.message);
                    setTimeout(() => {
                        navigate('/logined/profile');
                    }, 2000);
                }
                else{
                    setErrorMessage(response.data.message);
                }
            }
        } catch (error) {
            console.error('Failed to change password:', error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="change-password-container">
            <h1 className="change-password-header">Change Password</h1>
            <form onSubmit={handleChangePassword}>
                <div className="form-group">
                    <label className="form-label" htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="form-input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onFocus={() => setIsTyping(true)} 
                        onBlur={() => setIsTyping(false)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="repeatPassword">Repeat New Password</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        className="form-input"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        onFocus={() => setIsTyping(true)} 
                        onBlur={() => setIsTyping(false)}
                        required
                    />
                </div>
                <button type="submit" className="change-button">Change</button>
            </form>
            {errorMessage && !isTyping && <div className="error-message">{errorMessage}</div>}
                {successMessage && (
                    <div className="success-message">
                        <span className="tick-symbol">&#10004;</span>
                        {successMessage}
                    </div>
                )}
        </div>
    );
}

export default ChangePassword;
