"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

      // Login function
  const login = async (email, password) => {
    console.log("hello");
    try {
      const res = await fetch('http://3.98.128.26/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const data = await res.json();
      
      // Store token and user info
      localStorage.setItem('authToken', data.accessToken);
      console.log(localStorage.getItem('authToken'));
      
      setToken(data.accessToken);
      
      router.push('/'); // Redirect after login
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  // Register function
  const register = async (email, password, username) => {
    console.log("hello");
    try {
      const res = await fetch('http://3.98.128.26/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });

      if (!res.ok) {
        throw new Error('Registration failed');
      }

      const data = await res.json();
      
      // Automatically log in after registration
      localStorage.setItem('authToken', data.accessToken);
      console.log(localStorage.getItem('authToken'));
      
      setToken(data.accessToken);
      
      router.push('/');
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const value = {
    token,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}