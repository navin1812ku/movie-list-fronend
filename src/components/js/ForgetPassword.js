import React, { useState } from "react";
import axios from "axios";
import '../css/ForgetPassword.css'; // Adjust the path according to your file structure

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://movie-list-backend-api-1812.onrender.com/isUserExists/${email}`);
            if (response.data.userExists) {
                setSuccessMessage("Password reset link sent to your email");
            } else {
                setErrorMessage("User not found. Please enter a valid email.");
            }
        } catch (error) {
            console.error('Failed to check user:', error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="forget-password-container">
            <h1 className="forget-password-header">Forget Password</h1>
            <form onSubmit={handleForgetPassword}>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsTyping(true)} // Set isTyping to true when input is focused
                        onBlur={() => setIsTyping(false)}
                        required
                    />
                </div>
                <button type="submit" className="forget-button">Submit</button>
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

export default ForgetPassword;
