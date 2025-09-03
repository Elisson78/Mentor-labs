// Script para testar conectividade do Supabase
const { createClient } = require('@supabase/supabase-js');

console.log('🔍 Testando conectividade do Supabase...');

// URLs de teste
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://temp.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'temp_key';

console.log('📡 URL:', SUPABASE_URL);
console.log('🔑 Key (primeiros 20 chars):', SUPABASE_ANON_KEY.substring(0, 20) + '...');

// Teste 1: Criar cliente
try {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('✅ Cliente Supabase criado com sucesso');

  // Teste 2: Teste de conectividade básico
  supabase.auth.getSession()
    .then(({ data, error }) => {
      if (error) {
        console.error('❌ Erro ao testar sessão:', error.message);
      } else {
        console.log('✅ Conexão com Supabase Auth funcionando');
      }
    })
    .catch(err => {
      console.error('❌ Erro de rede:', err.message);
    });

  // Teste 3: Ping básico
  fetch(`${SUPABASE_URL}/rest/v1/`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  })
  .then(response => {
    console.log('✅ Ping REST API:', response.status);
  })
  .catch(error => {
    console.error('❌ Erro no ping:', error.message);
  });

} catch (error) {
  console.error('❌ Erro ao criar cliente:', error.message);
}

// Teste 4: Verificar variáveis do ambiente
console.log('\n🌍 Variáveis de ambiente:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NEXT_PUBLIC_SUPABASE_URL existe:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY existe:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);