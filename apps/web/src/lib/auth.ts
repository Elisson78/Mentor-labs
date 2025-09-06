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

// Fazer login (prioriza banco de dados, fallback para localStorage)
export const login = async (email: string, password: string): Promise<User | null> => {
  // PRIMEIRA PRIORIDADE: Tentar API do banco de dados
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
      
      // Salvar também localmente para cache
      const localUsers = getLocalUsers();
      localUsers[user.id] = user;
      saveLocalUsers(localUsers);
      
      console.log('✅ Login realizado via banco de dados');
      return user;
    }
  } catch (error) {
    console.log('⚠️ Banco indisponível, tentando localStorage...');
  }

  // FALLBACK: Tentar com usuários locais
  const localUsers = getLocalUsers();
  const localUser = Object.values(localUsers).find(user => user.email === email);
  
  if (localUser) {
    setCurrentUser(localUser);
    console.log('✅ Login realizado via localStorage');
    return localUser;
  }

  return null;
};

// Fazer registro (prioriza banco de dados, fallback para localStorage)  
export const register = async (email: string, password: string, name: string, userType: 'mentor' | 'student'): Promise<User | null> => {
  // PRIMEIRA PRIORIDADE: Tentar registrar no banco de dados
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
      
      // Salvar também localmente para cache
      const localUsers = getLocalUsers();
      localUsers[user.id] = user;
      saveLocalUsers(localUsers);
      
      console.log('✅ Usuário registrado via banco de dados');
      return user;
    }
  } catch (error) {
    console.log('⚠️ Banco indisponível para registro, usando localStorage...');
  }

  // FALLBACK: Verificar se usuário já existe localmente
  const localUsers = getLocalUsers();
  const existingUser = Object.values(localUsers).find(user => user.email === email);
  
  if (existingUser) {
    return null; // Usuário já existe
  }

  // Criar usuário localmente
  const newUser: User = {
    id: 'user_' + Date.now(),
    email,
    name,
    userType
  };

  localUsers[newUser.id] = newUser;
  saveLocalUsers(localUsers);
  setCurrentUser(newUser);
  
  console.log('✅ Usuário registrado via localStorage');
  return newUser;
};

// Criar usuários de teste (para desenvolvimento)
export const createTestUsers = () => {
  if (typeof window === 'undefined') return;
  
  const testUsers = {
    'mentor_1': {
      id: 'mentor_1',
      email: 'mentor1@gmail.com',
      name: 'Professor Mentor',
      userType: 'mentor' as const
    },
    'student_1': {
      id: 'student_1', 
      email: 'aluno1@gmail.com',
      name: 'Estudante',
      userType: 'student' as const
    }
  };
  
  saveLocalUsers(testUsers);
  console.log('✅ Usuários de teste criados:', testUsers);
};

// Fazer logout
export const logout = () => {
  clearCurrentUser();
  window.location.href = '/auth/login';
};