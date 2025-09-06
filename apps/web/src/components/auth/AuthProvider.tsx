
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
    const user = await authLogin(email, password)
    console.log('AuthProvider: Login result:', user)
    setUser(user)
    
    // Redirecionamento automático após login
    if (user) {
      console.log('Redirecionando usuário:', user.userType)
      if (user.userType === 'mentor') {
        router.push('/dashboard')
      } else if (user.userType === 'student') {
        router.push('/aluno_dashboard')
      }
    }
    
    return user
  }

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
