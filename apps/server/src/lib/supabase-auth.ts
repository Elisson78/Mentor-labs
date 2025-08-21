import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

const supabaseUrl = process.env.SUPABASE_URL || 'https://temp.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'temp_key'
const jwtSecret = process.env.SUPABASE_JWT_SECRET || 'temp_secret'

// Lazy initialization do Supabase client
let _supabaseAdmin: any = null

export const getSupabaseAdmin = () => {
  if (!_supabaseAdmin) {
    // Durante build ou sem configuração, retorna um mock
    if (!supabaseUrl || supabaseUrl === 'https://temp.supabase.co' || supabaseServiceKey === 'temp_key') {
      console.warn('Supabase não configurado, usando client mock')
      _supabaseAdmin = {
        from: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
        auth: { getUser: () => Promise.resolve({ data: { user: null }, error: null }) }
      }
    } else {
      _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
    }
  }
  return _supabaseAdmin
}

// Função para obter o client apenas quando necessário
export const supabaseAdmin = getSupabaseAdmin()

export interface SupabaseUser {
  id: string
  email: string
  role?: string
  aud: string
  exp: number
  iat: number
}

export async function verifySupabaseJWT(token: string): Promise<SupabaseUser | null> {
  try {
    // Durante o build, não tenta verificar JWT
    if (!jwtSecret || jwtSecret === 'temp_secret') {
      return null
    }

    // Verifica e decodifica o JWT do Supabase
    const decoded = jwt.verify(token, jwtSecret) as any
    
    // Verifica se o token não expirou
    if (decoded.exp < Date.now() / 1000) {
      return null
    }
    
    // Verifica se é um token válido do Supabase
    if (decoded.aud !== 'authenticated') {
      return null
    }

    return {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
      aud: decoded.aud,
      exp: decoded.exp,
      iat: decoded.iat
    }
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

export function extractTokenFromHeader(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  return authHeader.substring(7) // Remove "Bearer "
}