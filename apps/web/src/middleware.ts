import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Rotas protegidas e suas roles necessárias
  const adminRoutes = ['/admin_dashboard']
  const mentorRoutes = ['/dashboard', '/quiz/criar', '/mentoria/criar']
  const studentRoutes = ['/aluno_dashboard']
  const allProtectedRoutes = [...adminRoutes, ...mentorRoutes, ...studentRoutes]
  
  const isProtectedRoute = allProtectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )
  
  if (isProtectedRoute) {
    try {
      // Verificar token do Supabase no cookie
      const token = req.cookies.get('sb-access-token')?.value || 
                   req.cookies.get('supabase-auth-token')?.value
      
      if (!token) {
        // Redirecionar para login se não tiver token
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
      
      // Verificar se o usuário está tentando acessar rota errada baseada na role
      const userRole = req.cookies.get('userRole')?.value || req.cookies.get('userType')?.value
      
      if (userRole) {
        // Redirecionamentos baseados na role
        if (userRole === 'admin') {
          if (mentorRoutes.some(route => req.nextUrl.pathname.startsWith(route)) ||
              studentRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
            return NextResponse.redirect(new URL('/admin_dashboard', req.url))
          }
        } else if (userRole === 'mentor') {
          if (adminRoutes.some(route => req.nextUrl.pathname.startsWith(route)) ||
              studentRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
            return NextResponse.redirect(new URL('/dashboard', req.url))
          }
        } else if (userRole === 'student') {
          if (adminRoutes.some(route => req.nextUrl.pathname.startsWith(route)) ||
              mentorRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
            return NextResponse.redirect(new URL('/aluno_dashboard', req.url))
          }
        }
      }
      
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