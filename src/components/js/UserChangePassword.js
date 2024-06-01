import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../css/UserChangePassword.css'; // Adjust the path according to your file structure

function UserChangePasssword() {
    const [email, setEmail] = useState("");
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
            const response = await axios.post('http://localhost:8081/forgetPassword', {
                email,
                newPassword
            });
            if (response.data.success) {
                setSuccessMessage("Password changed successfully");
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // Navigate after 2 seconds
            } else {
                setErrorMessage("Failed to change password. Please try again.");
            }
        } catch (error) {
            console.error('Failed to change password:', error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="user-change-password-container">
            <h1 className="user-change-password-header">Change Password</h1>
            <form onSubmit={handleChangePassword}>
                <div className="user-change-password-form-group">
                    <label className="user-change-password-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="user-change-password-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsTyping(true)} // Set isTyping to true when input is focused
                        onBlur={() => setIsTyping(false)}
                        required
                    />
                </div>
                <div className="user-change-password-form-group">
                    <label className="user-change-password-label" htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="user-change-password-input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onFocus={() => setIsTyping(true)} // Set isTyping to true when input is focused
                        onBlur={() => setIsTyping(false)}
                        required
                    />
                </div>
                <div className="user-change-password-form-group">
                    <label className="user-change-password-label" htmlFor="repeatPassword">Repeat New Password</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        className="user-change-password-input"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        onFocus={() => setIsTyping(true)} // Set isTyping to true when input is focused
                        onBlur={() => setIsTyping(false)}
                        required
                    />
                </div>
                <button type="submit" className="user-change-password-button">Change</button>
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

export default UserChangePasssword;
