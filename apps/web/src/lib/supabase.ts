import { createClient } from '@supabase/supabase-js'

// Client estático para uso geral
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

// Validar variáveis de ambiente
const hasValidConfig = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!hasValidConfig) {
  console.warn('⚠️ Variáveis do Supabase não configuradas:', {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  })
  console.warn('⚠️ Usando valores placeholder para build - Configure as variáveis no Coolify!')
}

console.log('✅ Supabase configurado:', {
  url: supabaseUrl.substring(0, 30) + '...',
  hasKey: !!supabaseAnonKey
})

// Configurações otimizadas para produção
const supabaseOptions = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    fetch: (url: RequestInfo | URL, options?: RequestInit) => {
      console.log('🔗 Supabase request:', typeof url === 'string' ? url.substring(0, 50) + '...' : url)
      return fetch(url, {
        ...options,
        headers: {
          ...options?.headers,
          'Cache-Control': 'no-cache'
        }
      })
    }
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, supabaseOptions)

// Supabase client para uso no client-side (componentes React)
export const createSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey, supabaseOptions)
}

// Helper para verificar se a configuração é válida
export const hasValidSupabaseConfig = () => hasValidConfig

// Helper para mostrar erro amigável quando não tem configuração
export const requireSupabaseConfig = (action: string) => {
  if (!hasValidConfig) {
    throw new Error(`Não é possível ${action} - Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no Coolify`)
  }
}