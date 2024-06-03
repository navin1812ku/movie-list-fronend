import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import '../css/CreateMovieList.css';

function CreateMovieList() {
    const { id, query } = useParams();
    const [name, setName] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://movie-list-backend-api-1812.onrender.com/movieLists', {
                name,
                isPublic
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.error) {
                setErrorMessage(response.data.error);
            } else {
                if (response.data.message === "Movie list created successfully") {
                    setSuccessMessage(response.data.message);
                    console.log(id);
                    if (id === "id" && query === "profile") {
                        setTimeout(() => {
                            navigate('/logined/profile');
                        }, 2000);
                    }
                    else {
                        setTimeout(() => {
                            navigate(`/logined/addMovieToList/${id}/${query}`);
                        }, 2000);
                    }
                }
                else {
                    setErrorMessage(response.data.message);
                }
            }
        } catch (error) {
            console.error('Failed to create movie list:', error);
        }
    };

    return (
        <div className="create-movie-list-container">
            <h1 className="create-movie-list-header">Create Movie List</h1>
            <form onSubmit={handleAdd}>
                <div className="create-movie-list-form-group">
                    <label className="create-movie-list-form-label" htmlFor="name">List Name</label>
                    <input
                        type="text"
                        id="name"
                        className="create-movie-list-form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => setIsTyping(false)}
                        required
                    />
                </div>
                <div className="create-movie-list-form-group">
                    <label className="create-movie-list-form-label">
                        <input
                            type="checkbox"
                            className="create-movie-list-form-checkbox"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                        />
                        Is Public
                    </label>
                </div>
                <button type="submit" className="create-movie-list-add-button">Add</button>
                {errorMessage && !isTyping && <div className="error-message">{errorMessage}</div>}
                {successMessage && (
                    <div className="success-message">
                        <span className="tick-symbol">&#10004;</span>
                        {successMessage}
                    </div>
                )}
            </form>
        </div>
    );
}

export default CreateMovieList;
