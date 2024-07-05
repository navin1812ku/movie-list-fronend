import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserstate = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isloggedIn, setLogegdIn] = useState(() => {
    // Check if the token is present in the local storage during initialization
    const token = localStorage.getItem('token');
    return !!token; // Convert token presence to boolean
  });

  const refreshOtherPages = () => {
    setLogegdIn(!isloggedIn)
  };

  return (
    <UserContext.Provider value={{ isloggedIn, refreshOtherPages }}>
      {children}
    </UserContext.Provider>
  );
};