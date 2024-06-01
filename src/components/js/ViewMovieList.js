import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../css/MovieList.css';  // Import the CSS file

function ViewMovieList() {
    const { id } = useParams();
    const [movieList, setMovieList] = useState([]);
    const [movieName, setMovieName] = useState('');
    const [isMovieAvailable, setMovieAvailable] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchMovieListDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`https://movie-list-backend-api-1812.onrender.com/movieListById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                if (res.data.success) {
                    setMovieName(res.data.movieList.name);
                    if (res.data.movieList.movies.length!==0) {
                        setMovieList(res.data.movieList.movies);
                        setMovieAvailable(true);
                    }
                    else {
                        setErrorMessage("No movie added yet");
                    }
                    console.log(movieName, movieList, isMovieAvailable);
                }
                else {
                    setMovieName(res.data.movieList.name);
                    setErrorMessage(res.data.movieList.message);
                }
            } catch (error) {
                console.error('Failed to fetch movie lists:', error);
            }
        };

        fetchMovieListDetails();
    }, [id]);

    return (
        <div className="movie-list-container">
            <h1 className="movie-list-title">{movieName}</h1>
            {errorMessage && !isMovieAvailable &&
                <h2 className="movie-list-search-message">{errorMessage}</h2>
            }
            {isMovieAvailable && movieList.map((m) => (
                <div key={m.imdbID} className="movie-card">
                    <img src={m.poster} alt={m.title} />
                    <h4>{m.title}</h4>
                    <p>{m.year}</p>
                </div>
            ))}
        </div>
    );
}

export default ViewMovieList;
