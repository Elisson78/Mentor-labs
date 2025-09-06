
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, setCurrentUser, clearCurrentUser } from '@/lib/auth';

interface User {
  id: string;
  email: string;
  name: string;
  userType: 'mentor' | 'student';
  bio?: string;
  avatar?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: RegisterData) => Promise<User>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  userType: 'mentor' | 'student';
  bio?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    console.log('AuthProvider: Checking current user:', currentUser);
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      // Simulação de login - em produção, fazer chamada real para API
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        userType: email.includes('mentor') ? 'mentor' : 'student'
      };
      
      setCurrentUser(mockUser);
      setUser(mockUser);
      console.log('AuthProvider: Login result:', mockUser);
      return mockUser;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Falha no login');
    }
  };

  const register = async (userData: RegisterData): Promise<User> => {
    try {
      // Simulação de registro - em produção, fazer chamada real para API
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: userData.email,
        name: userData.name,
        userType: userData.userType,
        bio: userData.bio,
        createdAt: new Date().toISOString()
      };
      
      console.log('Registrando usuário:', newUser);
      
      setCurrentUser(newUser);
      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error('Register error:', error);
      throw new Error('Falha no registro');
    }
  };

  const logout = () => {
    clearCurrentUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
