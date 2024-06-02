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
import ForgetPassword from './components/js/ForgetPassword';
import UserChangePasssword from './components/js/UserChangePassword';
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
          <Route path="/:id" element={<NavBar/>}>
          <Route path="/:id/landingPage" element={<LandingPage />} />
          <Route path="/:id/addMovieToList/:id" element={<AddMovieToList />} />
          <Route path="/:id/profile" element={<Profile />} />
          <Route path="/:id/logout" element={<Logout/>}/>
          <Route path="/:id/movieList/:id" element={<MovieList/>}/>
          <Route path="/:id/createMovieList" element={<CreateMovieList/>}/>
          <Route path="/:id/canChangePassword" element={<UserCanChangePassword/>}/>
          <Route path="/:id/changePassword" element={<ChangePassword/>}/>
          <Route path="/:id/searchMovieList" element={<SearchMovieList/>}/>
          <Route path="/:id/viewMovieList/:id" element={<ViewMovieList/>}/>
          </Route>
          <Route path='/forgetPassword' element={<ForgetPassword/>}/>
          <Route path='/:id/forgetPassword' element={<UserChangePasssword/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
