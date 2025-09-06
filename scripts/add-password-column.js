
const postgres = require('postgres');

async function addPasswordColumn() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL não encontrada');
    return;
  }

  console.log('🔗 Conectando ao banco...');
  
  const sql = postgres(connectionString, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 60,
  });

  try {
    // Verificar se a coluna password já existe
    const columns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'profiles' AND column_name = 'password'
    `;

    if (columns.length === 0) {
      console.log('➕ Adicionando coluna password...');
      await sql`ALTER TABLE profiles ADD COLUMN password TEXT`;
      console.log('✅ Coluna password adicionada');
    } else {
      console.log('✅ Coluna password já existe');
    }

    // Atualizar usuários existentes com senhas padrão
    console.log('🔑 Definindo senhas para usuários existentes...');
    
    // Atualizar usuários de teste com senhas padrão
    await sql`
      UPDATE profiles 
      SET password = '123456789' 
      WHERE password IS NULL OR password = ''
    `;

    // Verificar usuários atualizados
    const users = await sql`SELECT email, name, password FROM profiles`;
    console.log('👥 Usuários com senhas:');
    users.forEach(user => {
      console.log(`  - ${user.email}: senha = ${user.password}`);
    });

    console.log('✅ Atualização concluída!');

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await sql.end();
  }
}

addPasswordColumn().catch(console.error);
