// Sistema de autenticação simples para Replit
interface User {
  id: string;
  email: string;
  name: string;
  userType: 'mentor' | 'student';
}

// Banco de dados simples em localStorage para persistência
const USERS_KEY = 'replit_users';
const CURRENT_USER_KEY = 'replit_current_user';

// Função para obter usuários do localStorage
const getUsers = (): Record<string, User> => {
  if (typeof window === 'undefined') return {};
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : {};
};

// Função para salvar usuários no localStorage
const saveUsers = (users: Record<string, User>) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Função para obter usuário atual
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Função para salvar usuário atual
const setCurrentUser = (user: User | null) => {
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

export const login = async (email: string, password: string): Promise<User | null> => {
  if (email && password) {
    // Primeiro, verificar no localStorage (cache)
    const users = getUsers();
    const localUser = Object.values(users).find(user => user.email === email);
    
    // Tentar buscar no banco de dados
    try {
      const response = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (data.success && data.user) {
        // Usuário encontrado no banco - converter para formato local
        const dbUser: User = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          userType: data.user.userType
        };
        
        // Sincronizar com localStorage
        users[dbUser.id] = dbUser;
        saveUsers(users);
        setCurrentUser(dbUser);
        
        console.log('✅ Login via banco de dados:', dbUser);
        return dbUser;
      }
    } catch (error) {
      console.error('❌ Erro ao buscar no banco, tentando localStorage:', error);
    }
    
    // Fallback para localStorage se banco não funcionar
    if (localUser) {
      setCurrentUser(localUser);
      console.log('✅ Login via localStorage:', localUser);
      return localUser;
    }
  }
  return null;
};

export const logout = () => {
  setCurrentUser(null);
};

export const register = async (email: string, password: string, name: string, userType: 'mentor' | 'student'): Promise<User | null> => {
  if (email && password && name) {
    const users = getUsers();
    
    // Verificar se usuário já existe
    const existingUser = Object.values(users).find(user => user.email === email);
    if (existingUser) {
      return null; // Usuário já existe
    }
    
    // Criar novo usuário
    const user: User = {
      id: 'user_' + Date.now(),
      email,
      name,
      userType
    };
    
    console.log('Registrando usuário:', user);
    
    // Salvar no localStorage (cache local)
    users[user.id] = user;
    saveUsers(users);
    setCurrentUser(user);
    
    // Salvar no banco de dados PostgreSQL
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      if (response.ok) {
        console.log('✅ Usuário salvo no banco de dados');
      } else {
        console.error('❌ Erro ao salvar no banco de dados');
      }
    } catch (error) {
      console.error('❌ Erro de rede ao salvar usuário:', error);
    }
    
    return user;
  }
  return null;
};

// Função para limpar todos os dados (útil para testes)
export const clearAllData = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USERS_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  console.log('Todos os dados de autenticação foram limpos');
};

// Função para criar usuários de teste corretos
export const createTestUsers = () => {
  if (typeof window === 'undefined') return;
  
  const testUsers = {
    'mentor_1': {
      id: 'mentor_1',
      email: 'mentor@gmail.com',
      name: 'mentor',
      userType: 'mentor' as const
    },
    'student_1': {
      id: 'student_1', 
      email: 'aluno@gmail.com',
      name: 'aluno',
      userType: 'student' as const
    }
  };
  
  localStorage.setItem(USERS_KEY, JSON.stringify(testUsers));
  console.log('Usuários de teste criados:', testUsers);
};