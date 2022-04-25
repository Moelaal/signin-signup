import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
    const intailToken = localStorage.getItem('token')
  const [token, setToken] = useState(intailToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    localStorage.setItem('token',token);
    setToken(token);
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;