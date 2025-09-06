
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// Tipos para o usuário
export interface User {
  id: string
  email: string
  name: string
  userType: 'admin' | 'mentor' | 'student'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<User>
  register: (email: string, password: string, name: string, userType: 'mentor' | 'student') => Promise<User>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se existe usuário logado no cookie
    const checkCurrentUser = () => {
      try {
        const userData = localStorage.getItem('replit_current_user')
        if (userData) {
          const parsedUser = JSON.parse(userData)
          console.log('AuthProvider: Checking current user:', parsedUser)
          setUser(parsedUser)
        } else {
          console.log('AuthProvider: Checking current user:', null)
        }
      } catch (error) {
        console.error('Erro ao verificar usuário atual:', error)
        localStorage.removeItem('replit_current_user')
      }
      setLoading(false)
    }

    checkCurrentUser()
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, action: 'login' }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro no login')
      }

      const userData = await response.json()
      console.log('AuthProvider: Login result:', userData)
      
      // Salvar no localStorage
      localStorage.setItem('replit_current_user', JSON.stringify(userData))
      
      setUser(userData)
      return userData
    } catch (error) {
      console.error('❌ Erro no login:', error instanceof Error ? error.message : String(error))
      throw error
    }
  }

  const register = async (email: string, password: string, name: string, userType: 'mentor' | 'student'): Promise<User> => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, userType, action: 'register' }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro no registro')
      }

      const userData = await response.json()
      console.log('Registrando usuário:', userData)
      
      // Salvar no localStorage
      localStorage.setItem('replit_current_user', JSON.stringify(userData))
      
      setUser(userData)
      return userData
    } catch (error) {
      console.error('❌ Erro no registro:', error instanceof Error ? error.message : String(error))
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('replit_current_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
