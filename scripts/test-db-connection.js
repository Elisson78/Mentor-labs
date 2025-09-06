
const postgres = require('postgres');

async function testConnection() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.log('❌ DATABASE_URL não está definida');
    return;
  }
  
  console.log('🔗 Testando conexão com:', connectionString.replace(/:[^:@]*@/, ':***@'));
  
  try {
    const sql = postgres(connectionString, { max: 1 });
    
    // Teste básico de conexão
    const result = await sql`SELECT 1 as test`;
    console.log('✅ Conexão bem-sucedida:', result);
    
    // Verificar se a tabela profiles existe
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'profiles'
    `;
    
    if (tables.length > 0) {
      console.log('✅ Tabela profiles existe');
      
      // Verificar usuários existentes
      const users = await sql`SELECT email, name, user_type FROM profiles`;
      console.log('👥 Usuários no banco:', users);
    } else {
      console.log('❌ Tabela profiles não existe');
    }
    
    await sql.end();
    
  } catch (error) {
    console.error('❌ Erro de conexão:', error.message);
    
    if (error.message.includes('password authentication failed')) {
      console.log('💡 Possíveis soluções:');
      console.log('1. Verificar se DATABASE_URL está correta');
      console.log('2. Verificar se o banco PostgreSQL está ativo');
      console.log('3. Verificar credenciais de acesso');
    }
  }
}

testConnection();
