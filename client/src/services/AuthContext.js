import { useNavigate } from 'react-router-dom'; 
import React, { createContext, useState, useEffect, useContext } from 'react';


const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('auth');
    }
  }, [auth]);


  const handleLogin = (loginData) => {
    setAuth({
      jwt: loginData.jwt,
      user: loginData.user,
    });
    navigate(`/my-posts/${loginData.user.documentId}`)
  };


  const handleLogout = () => {
    setAuth(null);
    navigate('/login')
     // Clear the auth state
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
