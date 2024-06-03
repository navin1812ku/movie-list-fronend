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
import SearchMovieList from './components/js/SearchMovieList';
import ViewMovieList from './components/js/ViewMovieList';
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logined" element={<NavBar/>}>
          <Route path="/logined/landingPage/:id" element={<LandingPage />} />
          <Route path="/logined/addMovieToList/:id/:query" element={<AddMovieToList />} />
          <Route path="/logined/profile" element={<Profile />} />
          <Route path="/logined/logout" element={<Logout/>}/>
          <Route path="/logined/movieList/:id" element={<MovieList/>}/>
          <Route path="/logined/createMovieList/:id/:query" element={<CreateMovieList/>}/>
          <Route path="/logined/canChangePassword" element={<UserCanChangePassword/>}/>
          <Route path="/logined/changePassword" element={<ChangePassword/>}/>
          <Route path="/logined/searchMovieList" element={<SearchMovieList/>}/>
          <Route path="/logined/viewMovieList/:id" element={<ViewMovieList/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
