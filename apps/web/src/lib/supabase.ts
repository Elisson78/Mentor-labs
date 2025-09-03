import { createClient } from '@supabase/supabase-js'

// Client estático para uso geral
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validar variáveis de ambiente
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variáveis do Supabase não configuradas:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey
  })
  throw new Error('Supabase environment variables are not configured')
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