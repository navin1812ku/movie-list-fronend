import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';

function Profile() {

    const [userDetails, setUserDetails] = useState({});
    const [movieListDetails, setMovieListDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('https://movie-list-backend-api-1812.onrender.com/userDetails', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserDetails(res.data);
            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        };

        const fetchMovieListDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('https://movie-list-backend-api-1812.onrender.com/allMoviesList', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.data.success) {
                    setMovieListDetails(res.data.allMovieLists);
                }
                else {
                    setErrorMessage(res.data.message);
                }
            }
            catch (error) {
                console.error('Failed to fetch movie lists:', error);
            }
        }

        fetchMovieListDetails();
        fetchUserDetails();
    }, []);

    const viewMore = async (id) => {
        try {
            navigate(`/logined/movieList/${id}`);
        }
        catch (error) {
            console.error('Failed to fetch movie lists:', error);
        }
    }
    const createMovieList = () => {
        try {
            navigate(`/logined/createMovieList/new`);
        }
        catch (error) {
            console.error('Failed to show the create movie list page:', error);
        }
    }
    const changePassword = () => {
        try {
            navigate(`/logined/canChangePassword`);
        }
        catch (error) {
            console.error('Failed to show the change password page:', error);
        }
    }

    const deleteList = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://movie-list-backend-api-1812.onrender.com/moviesList/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.reload();
        }
        catch (error) {
            console.error('Failed to delete movie:', error);
        }
    }

    return (
        <div className="profile-container">
            <h1 className="profile-header">Profile</h1>
            <div className="profile-user-details">
                <div key={userDetails._id} className="profile-user-card">
                    <img
                        src='data:image/png;base64,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'
                        alt="Profile"
                        className="profile-user-photo"
                    />
                    <h4 className="profile-user-title">{userDetails.username}</h4>
                    <h4 className="profile-user-title">{userDetails.email}</h4>
                </div>
            </div>
            <div className="profile-create-list-button-container">
                <button className="profile-create-list-button" onClick={changePassword}>Change Password</button>
            </div>
            <h1 className="profile-movie-lists-header">Movie Lists</h1>
            <div className="profile-create-list-button-container">
                <button className="profile-create-list-button" onClick={createMovieList}>Create Movie List</button>
            </div>
            <div className="profile-movies-container">
                {movieListDetails && movieListDetails.length > 0 && movieListDetails.map((movie) => (
                    <div key={movie._id} className="profile-movies">
                        <h4 className="profile-movie-title">{movie.name}</h4>
                        <button className="profile-view-more-button" onClick={() => viewMore(movie._id)}>View More</button>
                        <button className="profile-view-more-button" onClick={() => deleteList(movie._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profile;
