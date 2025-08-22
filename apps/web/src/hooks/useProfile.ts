import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthProvider'

interface UserProfile {
  id: string
  email: string
  name: string
  userType: 'mentor' | 'student'
  avatar?: string
  bio?: string
}

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

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
      // Primeiro tentar carregar do banco
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao carregar perfil:', error)
      }

      if (data) {
        setProfile(data)
      } else {
        // Se não existe, criar perfil com dados do localStorage (temporário)
        const userType = localStorage.getItem('userType') || 'student'
        const newProfile = {
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.name || user.email!.split('@')[0],
          userType: userType as 'mentor' | 'student'
        }
        
        await createProfile(newProfile)
      }
    } catch (error) {
      console.error('Erro ao gerenciar perfil:', error)
    } finally {
      setLoading(false)
    }
  }

  const createProfile = async (profileData: Omit<UserProfile, 'avatar' | 'bio'>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{
          id: profileData.id,
          email: profileData.email,
          name: profileData.name,
          user_type: profileData.userType
        }])
        .select()
        .single()

      if (error) {
        console.error('Erro ao criar perfil:', error)
        // Se erro, usar dados locais
        setProfile(profileData)
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error('Erro ao criar perfil:', error)
      setProfile(profileData)
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) {
        console.error('Erro ao atualizar perfil:', error)
      } else {
        setProfile(data)
      }
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
