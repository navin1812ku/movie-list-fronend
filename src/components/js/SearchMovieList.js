import React, { useState } from 'react';
import axios from 'axios';
import '../css/SearchMovieList.css';
import { useNavigate } from 'react-router';

function SearchMovieList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movieLists, setMovieLists] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [searchMessage, setSearchMessage] = useState('');
    const navigate = useNavigate();

    const handleSearchMovieList = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://movie-list-backend-api-1812.onrender.com/searchMovieList/${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setMovieLists(response.data.movieLists);
                setErrorMessage('');
                setIsAvailable(true);
                setSearchMessage(`Search results for "${searchQuery}"`);
            } else {
                setErrorMessage(response.data.message);
                setMovieLists([]);
                setIsAvailable(true);
            }
        } catch (error) {
            console.error('Failed to search for movies:', error);
            setErrorMessage('Failed to search for movies');
            setMovieLists([]);
            setIsAvailable(true);
        }
    };

    const viewMore=(id)=>{
        try{
            console.log(id);
            navigate(`/logined/viewMovieList/${id}`);
        }
        catch(error){
            console.error('Failed to search for movies:', error);
        }
    }

    return (
        <div className="movie-search-component">
            <h1>Movie Search</h1>
            <form onSubmit={handleSearchMovieList} className="movie-search-bar">
                <input
                    type="text"
                    placeholder="Search movie by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>            
            {searchMessage && <h2 className="success-message">{searchMessage}</h2>}
            {errorMessage && isAvailable && <div className="error-message">{errorMessage}</div>}
            <div className="movie-search-movie-lists">
                {movieLists.map((movieList) => (
                    <div key={movieList._id} className="movie-search-movie-list">
                        <h2>{movieList.name}</h2>
                        <button type="submit" onClick={()=>viewMore(movieList._id)} className='movie-search-add-button'>View details</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchMovieList;
