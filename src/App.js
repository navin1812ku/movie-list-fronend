import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/js/Login';
import Register from './components/js/Register';
import LandingPage from './components/js/LandingPage';
import Home from './components/js/Home'
import Profile from './components/js/Profile';
import AddMovieToList from './components/js/AddMovieToList';
import NavBar from './components/js/NavBar';
import Logout from './components/js/Logout';
import MovieList from './components/js/MoviList';
import CreateMovieList from './components/js/CreateMovieList';
import UserCanChangePassword from './components/js/UserCanChangePassword';
import ChangePassword from './components/js/ChangePassword';
import {UserProvider} from './components/js/UserContext';
function App() {

  return (
    <div className="App">
      <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NavBar/>}>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:id/landingPage/:id" element={<LandingPage />} />
          <Route path="/:id/addMovieToList/:id/:query" element={<AddMovieToList />} />
          <Route path="/:id/profile" element={<Profile />} />
          <Route path="/:id/logout" element={<Logout/>}/>
          <Route path="/:id/movieList/:id" element={<MovieList/>}/>
          <Route path="/:id/createMovieList/:query" element={<CreateMovieList/>}/>
          <Route path="/:id/canChangePassword" element={<UserCanChangePassword/>}/>
          <Route path="/:id/changePassword" element={<ChangePassword/>}/>
          </Route>
        </Routes>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
