import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../css/UserCanChangePassword.css'; // Adjust the path according to your file structure

function UserCanChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleCheckPassword = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://movie-list-backend-api-1812.onrender.com/isUserCanChangePasssword', {
                oldPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.isPasswordCorrect) {
                navigate('/logined/changePassword'); 
            } else {
                setErrorMessage("Password doesn't match");
            }
        } catch (error) {
            console.error('Failed to check password:', error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="can-password-change-container">
            <h1 className="can-password-change-header">Change Password</h1>
            <form onSubmit={handleCheckPassword}>
                <div className="can-password-change-form-group">
                    <label className="can-password-change-form-label" htmlFor="oldPassword">Old Password</label>
                    <input
                        type="password"
                        id="oldPassword"
                        className="can-password-change-form-input"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="can-password-change-check-button">Check</button>
            </form>
            {errorMessage && <div className="can-password-change-error-message">{errorMessage}</div>}
        </div>
    );
}

export default UserCanChangePassword;
