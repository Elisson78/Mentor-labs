
const postgres = require('postgres');

async function setupProfilesTable() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.log('❌ DATABASE_URL não está definida');
    return;
  }
  
  try {
    const sql = postgres(connectionString);
    
    console.log('🔄 Criando tabela profiles...');
    
    // Dropar tabela se existir
    await sql`DROP TABLE IF EXISTS profiles CASCADE`;
    
    // Criar tabela profiles
    await sql`
      CREATE TABLE profiles (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        user_type TEXT NOT NULL,
        avatar TEXT,
        bio TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    console.log('✅ Tabela profiles criada com sucesso');
    
    // Inserir usuários de teste
    const testUsers = [
      {
        id: 'mentor_test_001',
        email: 'mentor.teste@gmail.com',
        name: 'Professor João Silva',
        user_type: 'mentor',
        bio: 'Professor de Matemática com 10 anos de experiência'
      },
      {
        id: 'student_test_001', 
        email: 'aluno.teste@gmail.com',
        name: 'Maria Santos',
        user_type: 'student',
        bio: 'Estudante de Ensino Médio'
      },
      {
        id: 'student_test_002',
        email: 'aluno2.teste@gmail.com', 
        name: 'Carlos Oliveira',
        user_type: 'student',
        bio: 'Estudante universitário'
      }
    ];
    
    for (const user of testUsers) {
      await sql`
        INSERT INTO profiles (id, email, name, user_type, bio, created_at, updated_at)
        VALUES (${user.id}, ${user.email}, ${user.name}, ${user.user_type}, ${user.bio}, NOW(), NOW())
      `;
      console.log(`✅ Usuário criado: ${user.name} (${user.email})`);
    }
    
    // Verificar criação
    const users = await sql`SELECT * FROM profiles`;
    console.log(`🎉 ${users.length} usuários criados com sucesso!`);
    
    await sql.end();
    
  } catch (error) {
    console.error('❌ Erro ao configurar banco:', error);
  }
}

setupProfilesTable();
