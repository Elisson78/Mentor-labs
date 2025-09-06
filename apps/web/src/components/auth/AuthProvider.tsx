'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser, login as authLogin, logout as authLogout } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface User {
  id: string;
  email: string;
  name: string;
  userType: 'mentor' | 'student';
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User | null>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = getCurrentUser()
    console.log('AuthProvider: Checking current user:', currentUser)
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthProvider: Tentando fazer login:', email);

      // Validação simples para desenvolvimento
      if (password.length < 3) {
        throw new Error('Senha deve ter pelo menos 3 caracteres');
      }

      // Verificar se usuário já existe no banco de dados
      let userData: User;

      try {
        const response = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
        const result = await response.json();

        if (response.ok && result.user) {
          // Usuário existe no banco
          userData = {
            id: result.user.id,
            email: result.user.email,
            name: result.user.name,
            userType: result.user.userType as 'mentor' | 'student',
          };
          console.log('✅ Usuário encontrado no banco:', userData);
        } else {
          // Usuário não existe, criar no banco
          const userType = email.includes('mentor') ? 'mentor' : 'student';
          const name = email.split('@')[0];

          const createResponse = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, userType })
          });

          const createResult = await createResponse.json();

          if (!createResponse.ok) {
            throw new Error(createResult.error || 'Erro ao criar usuário');
          }

          userData = {
            id: createResult.user.id,
            email: createResult.user.email,
            name: createResult.user.name,
            userType: createResult.user.userType as 'mentor' | 'student',
          };

          console.log('✅ Usuário criado no banco:', userData);
        }
      } catch (dbError) {
        console.warn('⚠️ Erro ao acessar banco, usando fallback local:', dbError);

        // Fallback: criar usuário local se o banco não estiver disponível
        const userId = `user_${Date.now()}`;
        const userType = email.includes('mentor') ? 'mentor' : 'student';
        const name = email.split('@')[0];

        userData = {
          id: userId,
          email,
          name,
          userType,
        };
      }

      console.log('AuthProvider: Login result:', userData);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    }
  };

  const signOut = () => {
    authLogout()
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}