// Sistema de autenticação simples para Replit
interface User {
  id: string;
  email: string;
  name: string;
  userType: 'mentor' | 'student';
}

// Simulação simples de usuário logado
let currentUser: User | null = null;

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const login = async (email: string, password: string): Promise<User | null> => {
  // Simulação simples de login - em produção, seria integrado com Replit Auth
  if (email && password) {
    const user: User = {
      id: 'user_' + Date.now(),
      email,
      name: email.split('@')[0],
      userType: 'student'
    };
    currentUser = user;
    return user;
  }
  return null;
};

export const logout = () => {
  currentUser = null;
};

export const register = async (email: string, password: string, name: string, userType: 'mentor' | 'student'): Promise<User | null> => {
  // Simulação simples de registro
  if (email && password && name) {
    const user: User = {
      id: 'user_' + Date.now(),
      email,
      name,
      userType
    };
    currentUser = user;
    return user;
  }
  return null;
};