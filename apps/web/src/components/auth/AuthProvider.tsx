
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser, setCurrentUser, clearCurrentUser, login as authLogin, register as authRegister } from '@/lib/auth'

export interface User {
  id: string
  email: string
  name: string
  userType: 'mentor' | 'student' | 'admin'
  avatar?: string
  bio?: string
  createdAt?: string
  updatedAt?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User | null>
  register: (email: string, password: string, name: string, userType: 'mentor' | 'student') => Promise<User | null>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    console.log('AuthProvider: Checking current user:', currentUser)
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const loggedUser = await authLogin(email, password)
      console.log('AuthProvider: Login result:', loggedUser)
      setUser(loggedUser)
      return loggedUser
    } catch (error) {
      console.error('AuthProvider: Login error:', error)
      return null
    }
  }

  const register = async (email: string, password: string, name: string, userType: 'mentor' | 'student'): Promise<User | null> => {
    try {
      const registeredUser = await authRegister(email, password, name, userType)
      setUser(registeredUser)
      return registeredUser
    } catch (error) {
      console.error('AuthProvider: Register error:', error)
      return null
    }
  }

  const logout = () => {
    clearCurrentUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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
