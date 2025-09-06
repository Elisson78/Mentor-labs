// Sistema de autenticação híbrido para Replit
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
const USERS_KEY = 'replit_users';

// Função para obter usuários locais
const getLocalUsers = (): Record<string, User> => {
  if (typeof window === 'undefined') return {};
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : {};
  } catch {
    return {};
  }
};

// Função para salvar usuários locais
const saveLocalUsers = (users: Record<string, User>) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

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

// Fazer login (APENAS banco PostgreSQL real)
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
      console.log('✅ Login realizado via banco de dados PostgreSQL');
      return user;
    } else {
      const error = await response.json();
      console.error('❌ Erro no login:', error.error);
      return null;
    }
  } catch (error) {
    console.error('❌ Erro de conexão:', error);
    return null;
  }
};

// Fazer registro (APENAS banco PostgreSQL real)
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
      console.log('✅ Usuário registrado via banco de dados PostgreSQL');
      return user;
    } else {
      const error = await response.json();
      console.error('❌ Erro no registro:', error.error);
      return null;
    }
  } catch (error) {
    console.error('❌ Erro de conexão durante registro:', error);
    return null;
  }
};



// Fazer logout
export const logout = () => {
  clearCurrentUser();
  window.location.href = '/auth/login';
};