// Sistema de autenticação simples para Replit
export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'mentor' | 'student' | 'admin';
  avatar?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

const CURRENT_USER_KEY = 'replit_current_user';

// Obter usuário atual
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;

  try {
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

// Definir usuário atual
export const setCurrentUser = (user: User | null) => {
  if (typeof window === 'undefined') return;

  if (user) {
    // Salvar no localStorage
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    // Salvar no cookie para o middleware
    document.cookie = `replit_current_user=${JSON.stringify(user)}; path=/; max-age=86400`;
  } else {
    // Remover localStorage e cookie
    localStorage.removeItem(CURRENT_USER_KEY);
    document.cookie = 'replit_current_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

// Limpar usuário atual
export const clearCurrentUser = () => {
  setCurrentUser(null);
};

// Fazer login
export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'login', email, password })
    });

    if (response.ok) {
      const user = await response.json();
      setCurrentUser(user);
      return user;
    }

    return null;
  } catch (error) {
    console.error('Erro no login:', error);
    return null;
  }
};

// Fazer registro
export const register = async (email: string, password: string, name: string, userType: 'mentor' | 'student'): Promise<User | null> => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'register', email, password, name, userType })
    });

    if (response.ok) {
      const user = await response.json();
      setCurrentUser(user);
      return user;
    }

    return null;
  } catch (error) {
    console.error('Erro no registro:', error);
    return null;
  }
};

// Fazer logout
export const logout = () => {
  clearCurrentUser();
  window.location.href = '/auth/login';
};