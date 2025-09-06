
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const { createId } = require('@paralleldrive/cuid2');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL não está configurado');
  process.exit(1);
}

const sql = postgres(connectionString, {
  max: 20,
  idle_timeout: 20,
  connect_timeout: 60,
});

const db = drizzle(sql);

async function createTestUsers() {
  try {
    console.log('🔄 Criando usuários de teste...');
    
    // Verificar se a tabela profiles existe
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles'
      );
    `;
    
    if (!tableExists[0].exists) {
      console.log('❌ Tabela profiles não existe. Execute setup-database.js primeiro');
      return;
    }
    
    // Limpar usuários de teste existentes
    await sql`DELETE FROM profiles WHERE email LIKE '%teste%'`;
    console.log('🧹 Usuários de teste anteriores removidos');
    
    // Criar usuários de teste
    const testUsers = [
      {
        id: createId(),
        email: 'mentor.teste@gmail.com',
        name: 'Professor João Silva',
        user_type: 'mentor',
        bio: 'Professor experiente em matemática e física'
      },
      {
        id: createId(),
        email: 'aluno.teste@gmail.com',
        name: 'Maria Santos',
        user_type: 'student',
        bio: 'Estudante dedicada'
      },
      {
        id: createId(),
        email: 'aluno2.teste@gmail.com',
        name: 'Carlos Oliveira',
        user_type: 'student',
        bio: 'Apaixonado por tecnologia'
      }
    ];
    
    for (const user of testUsers) {
      await sql`
        INSERT INTO profiles (id, email, name, user_type, bio, created_at, updated_at)
        VALUES (${user.id}, ${user.email}, ${user.name}, ${user.user_type}, ${user.bio}, NOW(), NOW())
      `;
      console.log(`✅ Usuário criado: ${user.name} (${user.email})`);
    }
    
    console.log('🎉 Usuários de teste criados com sucesso!');
    
    // Verificar se foram criados
    const createdUsers = await sql`SELECT * FROM profiles WHERE email LIKE '%teste%'`;
    console.log(`📊 Total de usuários de teste: ${createdUsers.length}`);
    
  } catch (error) {
    console.error('❌ Erro ao criar usuários:', error);
  } finally {
    await sql.end();
  }
}

createTestUsers();
