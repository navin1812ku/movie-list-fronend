import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/AddMovieToList.css';
import { useNavigate } from 'react-router-dom';

function AddMovieToList() {
    const { id } = useParams();
    const [movieLists, setMovieLists] = useState([]);
    const [movieListId, setSelectedList] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of movie lists from the backend
        const fetchMovieLists = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('https://movie-list-backend-api-1812.onrender.com/allMoviesList', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMovieLists(res.data);
            } catch (error) {
                console.error('Failed to fetch movie lists:', error);
            }
        };

        fetchMovieLists();
    }, []);

    const handleAddMovie = async () => {
        try {
            const JWTToken = localStorage.getItem('token');
            console.log(id, movieListId, JWTToken);
            const list = await axios.post(`https://movie-list-backend-api-1812.onrender.com/movieLists/${id}/${movieListId}`, { token: JWTToken }, {
                headers: {
                    Authorization: `Bearer ${JWTToken}`,
                },
            });
            console.log(list);
            setSuccessMessage('Movie added to list successfully!');
            setTimeout(() => {
                navigate('/logined/landingPage');
            }, 2000);
        } catch (error) {
            console.error('Failed to add movie to list:', error);
        }
    };

    const handleCreatMovieList= async(id)=>{
        navigate(`/${id}/createMovieList`);
    }

    return (
        <div className="add-movie-to-list">
            <h2>Add Movie to List</h2>
            <p>Movie ID: {id}</p>
            <div className="form-group">
                <label htmlFor="movieList">Select List:</label>
                <select
                    id="movieList"
                    value={movieListId}
                    onChange={(e) => setSelectedList(e.target.value)}
                    className="select-input"
                >
                    <option value="">Select a list</option>
                    {movieLists.map((list) => (
                        <option key={list._id} value={list._id}>
                            {list.name}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleAddMovie} className="add-button">Add</button><br></br>
            <button onClick={()=>handleCreatMovieList(id)} className="add-button">Create new list</button>
            {successMessage && (
                <div className="success-message">
                    <span className="tick-symbol">&#10004;</span>
                    {successMessage}
                </div>
            )}
        </div>
    );
}

export default AddMovieToList;
