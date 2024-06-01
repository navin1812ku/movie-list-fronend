import React, { useState } from 'react';
import axios from 'axios';
import "../css/LandingPage.css"
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const [query, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchMessage, setSearchMessage] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://movie-list-backend-api-1812.onrender.com/search/${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setMovies(res.data.Search);
        setSearchMessage(`Search results for "${query}"`);
    };

    const addMovieToList = async (id) => {
        navigate(`/logined/addMovieToList/${id}`)
    }

    return (
        <div className="landing-page">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies..."
                    required
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            {searchMessage && <h2 className="search-message">{searchMessage}</h2>}
            <div className="movies-container">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="movie-card">
                        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                        <h4 className="movie-title">{movie.Title}</h4>
                        <p className="movie-year">{movie.Year}</p>
                        <button className="add-list-button" onClick={() => addMovieToList(movie.imdbID)}>Add to List</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LandingPage;
