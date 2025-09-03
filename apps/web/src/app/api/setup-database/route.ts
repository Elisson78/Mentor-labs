import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('🚀 Iniciando setup do banco de dados...')
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Variáveis de ambiente não configuradas'
      }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    console.log('🔗 Conectando ao Supabase:', supabaseUrl.substring(0, 30) + '...')

    // 1. Verificar conexão básica
    const { data: authData, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      console.error('❌ Erro de conexão:', authError.message)
      return NextResponse.json({
        status: 'error',
        step: 'connection',
        message: 'Erro de conexão com Supabase',
        error: authError.message
      }, { status: 500 })
    }

    console.log('✅ Conexão estabelecida')

    // 2. Verificar se tabelas existem
    const tables = ['roles', 'user_roles']
    const results = []

    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select('*').limit(1)
        
        if (error) {
          console.log(`⚠️ Tabela ${table} não existe:`, error.message)
          results.push({
            table,
            exists: false,
            error: error.message
          })
        } else {
          console.log(`✅ Tabela ${table} existe`)
          results.push({
            table,
            exists: true,
            count: data?.length || 0
          })
        }
      } catch (err) {
        results.push({
          table,
          exists: false,
          error: err instanceof Error ? err.message : 'Erro desconhecido'
        })
      }
    }

    // 3. Criar tabelas se necessário (só mostrar SQL por enquanto)
    const createTablesSQL = `
-- Criar tabela de roles
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  permissions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir roles padrão
INSERT INTO roles (name, display_name, permissions) VALUES 
('admin', 'Administrador', '{"full_access": true}'::jsonb),
('mentor', 'Mentor', '{"create_content": true, "manage_students": true}'::jsonb),
('student', 'Aluno', '{"view_content": true, "take_quizzes": true}'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- Criar tabela de user_roles
CREATE TABLE IF NOT EXISTS user_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  role_id INTEGER REFERENCES roles(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);
`

    return NextResponse.json({
      status: 'success',
      message: 'Diagnóstico do banco completado',
      connection: 'OK',
      tables: results,
      sqlToRun: createTablesSQL,
      instructions: [
        '1. Acesse seu Supabase Dashboard',
        '2. Vá em SQL Editor',  
        '3. Execute o SQL fornecido acima',
        '4. Volte e teste o registro novamente'
      ]
    })

  } catch (error) {
    console.error('❌ Erro no setup:', error)
    
    return NextResponse.json({
      status: 'error',
      message: 'Erro interno no setup',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}