import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/LandingPage.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useUserstate } from '../js/UserContext';

function LandingPage() {
    const { id } = useParams();
    const {query,setQuery} =useUserstate();
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchMessage, setSearchMessage] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [isDefaulMovieAvailable, setIsDefaultMovieAvailable] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleDefaultMovieList = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get(`https://movie-list-backend-api-1812.onrender.com/search/${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.Search && res.data.Search.length !== 0) {
                setMovies(res.data.Search);
                setIsAvailable(false);
                setIsDefaultMovieAvailable(true);
            }
            else {
                setErrorMessage(`No movie found with the name ${query}`)
            }
        }
        handleDefaultMovieList(id);
    }, [id,query])

    const handleSearch = async (e) => {
        e.preventDefault();
        setQuery(searchQuery);
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://movie-list-backend-api-1812.onrender.com/search/${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.data.Search && res.data.Search.length !== 0) {
            setMovies(res.data.Search);
            setIsAvailable(true);
        }
        else {
            setErrorMessage(`No movie found with the name ${searchQuery}`)
        }
        setSearchMessage(`Search results for "${searchQuery}"`);
    };

    const addMovieToList = async (id) => {
        console.log(id, searchQuery);
        setQuery(query);
        navigate(`/logined/addMovieToList/${id}/${query}`)
    }

    return (
        <div className="landing-page">
            <form onSubmit={handleSearch} className="landing-page-search-form">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies..."
                    required
                    className="landing-page-search-input"
                />
                <button type="submit" className="landing-page-search-button">Search</button>
            </form>
            {isAvailable && searchMessage && <h2 className="landing-page-search-message">{searchMessage}</h2>}
            {!isAvailable && errorMessage && <h2 className="landing-page-search-message">{errorMessage}</h2>}
            <div className="landing-page-movies-container">
                {isDefaulMovieAvailable && movies.map((movie) => (
                    <div key={movie.imdbID} className="landing-page-movie-card">
                        <img src={movie.Poster} alt={movie.Title} className="landing-page-movie-poster" />
                        <h4 className="landing-page-movie-title">{movie.Title}</h4>
                        <p className="landing-page-movie-year">{movie.Year}</p>
                        <button className="landing-page-add-list-button" onClick={() => addMovieToList(movie.imdbID)}>Add to List</button>
                    </div>
                ))}
                {isAvailable && movies.map((movie) => (
                    <div key={movie.imdbID} className="landing-page-movie-card">
                        <img src={movie.Poster} alt={movie.Title} className="landing-page-movie-poster" />
                        <h4 className="landing-page-movie-title">{movie.Title}</h4>
                        <p className="landing-page-movie-year">{movie.Year}</p>
                        <button className="landing-page-add-list-button" onClick={() => addMovieToList(movie.imdbID)}>Add to List</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LandingPage;
