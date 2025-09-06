import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'

interface UserProfile {
  id: string
  email: string
  name: string
  userType: 'mentor' | 'student' | 'admin'
  avatar?: string
  bio?: string
}

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadProfile()
    } else {
      setProfile(null)
      setLoading(false)
    }
  }, [user])

  const loadProfile = async () => {
    if (!user) return

    try {
      // Por enquanto, usando dados do usuário logado
      const userProfile: UserProfile = {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType
      }
      setProfile(userProfile)
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return

    try {
      // Por enquanto, apenas atualiza localmente
      setProfile({ ...profile, ...updates })
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
    }
  }

  return {
    profile,
    loading,
    updateProfile,
    refreshProfile: loadProfile
  }
}