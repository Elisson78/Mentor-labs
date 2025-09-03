import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('🔍 Iniciando health check do Supabase...')
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Verificar se as variáveis existem
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Variáveis de ambiente do Supabase não encontradas',
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseAnonKey,
          urlPreview: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : null
        }
      }, { status: 500 })
    }

    // Criar cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Teste de conectividade
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('❌ Erro no Supabase Auth:', error.message)
      return NextResponse.json({
        status: 'error',
        message: 'Erro na conectividade do Supabase Auth',
        error: error.message,
        supabaseUrl: supabaseUrl.substring(0, 30) + '...'
      }, { status: 500 })
    }

    console.log('✅ Supabase conectado com sucesso')
    
    return NextResponse.json({
      status: 'success',
      message: 'Supabase está funcionando corretamente',
      details: {
        supabaseUrl: supabaseUrl.substring(0, 30) + '...',
        hasValidConfig: true,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('❌ Erro no health check:', error)
    
    return NextResponse.json({
      status: 'error',
      message: 'Erro interno no health check',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}