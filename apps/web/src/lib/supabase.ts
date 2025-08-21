import { createClient } from '@supabase/supabase-js'

// Client estático para uso geral
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://temp.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'temp_anon'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Supabase client para uso no client-side (componentes React)
export const createSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}