import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;  
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateUserContext: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const isTokenExpired = (token: string): boolean => {
  const payloadBase64 = token.split('.')[1];
  const decodedPayload = JSON.parse(atob(payloadBase64));
  const currentTime = Math.floor(Date.now() / 1000);

  return decodedPayload.exp < currentTime;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);  // Nuevo estado de carga

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token && !isTokenExpired(token)) {
      setUser(JSON.parse(storedUser));
    } else {
      logout(); 
    }
    setIsLoading(false);  // Finaliza la carga del usuario
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUserContext = (updatedUser: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return context;
};
