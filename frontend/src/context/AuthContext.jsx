import { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser({ ...response.data, token });
    } catch (err) {
      console.error('Failed to fetch user info');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await authAPI.login(email, password);
    const token = response.data.access_token;
    localStorage.setItem('token', token);
    await fetchUserInfo(token);
    return response;
  };

  const register = async (email, username, password) => {
    const response = await authAPI.register(email, username, password);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};