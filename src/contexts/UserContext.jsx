import React, { createContext } from 'react';
import usePersistedState from '../hooks/usePersistedState';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = usePersistedState('user', null);
  const [token, setToken] = usePersistedState('token', null);

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log(token, userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
