import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(() => localStorage.getItem('username'));

  const login = (user) => {
    localStorage.setItem('username', user);
    setUsername(user);
  };

  const logout = () => {
    localStorage.removeItem('username');
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);