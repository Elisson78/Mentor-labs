'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, setCurrentUser, clearCurrentUser, login, register, logout, type User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (email: string, password: string, name: string, userType: 'mentor' | 'student') => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado
    const currentUser = getCurrentUser();
    console.log('AuthProvider: Checking current user:', currentUser);
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login(email, password);
      console.log('AuthProvider: Login result:', result);
      if (result) {
        setUser(result);
        return result;
      }
      return null;
    } catch (error) {
      console.error('Erro no login:', error);
      return null;
    }
  };

  const handleRegister = async (email: string, password: string, name: string, userType: 'mentor' | 'student') => {
    try {
      const result = await register(email, password, name, userType);
      if (result) {
        setUser(result);
        return result;
      }
      return null;
    } catch (error) {
      console.error('Erro no registro:', error);
      return null;
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;