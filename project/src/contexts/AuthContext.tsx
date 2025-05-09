import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { users, getUserById } from '../data/users';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  register: async () => false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock implementation for demo purposes
    // In a real app, you would make an API call to your backend
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = users.find(u => u.email === email);
        if (foundUser) {
          setUser(foundUser);
          setIsAuthenticated(true);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // This is a mock implementation for demo purposes
    // In a real app, you would make an API call to your backend
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
          resolve(false);
        } else {
          // In a real app, the user would be created on the backend
          const newUser = {
            id: users.length + 1,
            name,
            email,
          };
          setUser(newUser);
          setIsAuthenticated(true);
          resolve(true);
        }
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};