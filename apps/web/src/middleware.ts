import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Rotas que requerem autenticação
  const protectedRoutes = ['/dashboard', '/aluno_dashboard', '/quiz/criar', '/mentoria/criar']
  const publicRoutes = ['/', '/auth/login', '/auth/register']
  
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )
  
  if (isProtectedRoute) {
    try {
      // Verificar token do Supabase no cookie ou header
      const token = req.cookies.get('sb-access-token')?.value || 
                   req.headers.get('authorization')?.replace('Bearer ', '')
      
      if (!token) {
        // Redirecionar para login se não tiver token
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
      
      // Aqui poderíamos verificar o token com Supabase
      // Mas para simplicidade, vamos confiar no client-side por enquanto
      
    } catch (error) {
      console.error('Auth middleware error:', error)
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
  }
  
  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}