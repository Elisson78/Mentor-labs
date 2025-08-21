'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { createSupabaseClient } from '@/lib/supabase'
import { useCallback } from 'react'

export function useSupabaseApi() {
  const { session } = useAuth()
  const supabase = createSupabaseClient()

  // Para chamadas diretas ao Supabase (queries simples)
  const queryDirect = useCallback(async (
    table: string,
    query?: any
  ) => {
    const { data, error } = await supabase
      .from(table)
      .select(query?.select || '*')
    
    if (error) throw error
    return data
  }, [supabase])

  // Para chamadas ao backend (dados sensíveis/lógica customizada)
  const callBackend = useCallback(async (
    endpoint: string,
    options: RequestInit = {}
  ) => {
    if (!session?.access_token) {
      throw new Error('No access token available')
    }

    const response = await fetch(`/api/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Backend call failed: ${response.statusText}`)
    }

    return response.json()
  }, [session])

  return {
    // Acesso direto ao Supabase para queries simples
    supabase,
    queryDirect,
    // Chamadas ao backend para lógica customizada
    callBackend,
    // Estado de autenticação
    isAuthenticated: !!session,
    userId: session?.user?.id,
  }
}