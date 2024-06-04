import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css'

function Profile() {

    const [userDetails, setUserDetails] = useState([]);
    const [movieListDetails, setMovieListDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAllMovieListAvailable, setIsAllMovieListAvailable] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of movie lists from the backend
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
                    setIsAllMovieListAvailable(true);
                    setMovieListDetails(res.data.allMovieLists);
                }
                else {
                    setIsAllMovieListAvailable(false);
                    setErrorMessage("Looks like your movie list is currently empty! Let's start filling it up with your favorites and discover new gems together.")
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
    const createMovieList = (userId, username) => {
        try {
            navigate(`/logined/createMovieList/${userId}/${username}`);
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
            const response = await axios.delete(`https://movie-list-backend-api-1812.onrender.com/moviesList/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                window.location.reload();
            }
            else {
                navigate("/logined/profile");
            }
        }
        catch (error) {
            console.error('Failed to delete movie:', error);
        }
    }

    return (
        <div className="profile-container">
            <h1 className="profile-header">Profile</h1>
            <div className="profile-user-details">
                <div key={userDetails._id} className="user-card">
                    <h4 className="profile-user-title">{userDetails.username}</h4>
                    <h4 className="profile-user-title">{userDetails.email}</h4>
                </div>
            </div>
            <div className="profile-create-list-button-container">
                <button className="profile-create-list-button" onClick={changePassword}>Change Password</button>
            </div>
            <h2 className="profile-movie-lists-header">Movie Lists</h2>
            <div className="profile-create-list-button-container">
                <button className="profile-create-list-button" onClick={() => createMovieList("id", "profile")}>Create Movie List</button>
            </div>
            <div className="profile-movies-container">
                {!isAllMovieListAvailable &&
                    <h2 className="success-message">{errorMessage}</h2>
                }
                {isAllMovieListAvailable && movieListDetails.map((movie) => (
                    <div key={movie._id} className="profile-movies">
                        <h4 className="profile-movie-title">{movie.name}</h4>
                        <button className="profile-view-morw-button" onClick={() => viewMore(movie._id)}>View More</button>
                        <button className="profile-view-morw-button" onClick={() => deleteList(movie._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profile;