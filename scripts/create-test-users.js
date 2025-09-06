
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const { profiles } = require('../apps/web/src/lib/schema');
const { createId } = require('@paralleldrive/cuid2');

// Configuração da conexão com PostgreSQL
const connectionString = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/mentorlabs';

const sql = postgres(connectionString, {
  max: 20,
});

const db = drizzle(sql);

async function createTestUsers() {
  try {
    console.log('🔄 Criando usuários de teste...');
    
    // Usuário Mentor
    const mentor = await db.insert(profiles).values({
      id: createId(),
      email: 'mentor.teste@gmail.com',
      name: 'Professor João Silva',
      userType: 'mentor',
      bio: 'Mentor experiente com 10 anos de experiência em liderança e desenvolvimento profissional.',
      avatar: null
    }).returning();
    
    console.log('✅ Mentor criado:', mentor[0]);
    
    // Usuário Aluno 1
    const aluno1 = await db.insert(profiles).values({
      id: createId(),
      email: 'aluno.teste@gmail.com',
      name: 'Maria Santos',
      userType: 'student',
      bio: 'Estudante interessada em desenvolvimento pessoal e liderança.',
      avatar: null
    }).returning();
    
    console.log('✅ Aluno 1 criado:', aluno1[0]);
    
    // Usuário Aluno 2
    const aluno2 = await db.insert(profiles).values({
      id: createId(),
      email: 'aluno2.teste@gmail.com',
      name: 'Carlos Oliveira',
      userType: 'student',
      bio: 'Profissional buscando aprimorar habilidades de comunicação.',
      avatar: null
    }).returning();
    
    console.log('✅ Aluno 2 criado:', aluno2[0]);
    
    // Listar todos os usuários
    const allUsers = await db.select().from(profiles);
    
    console.log('\n📋 Todos os usuários no banco:');
    allUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Tipo: ${user.userType}`);
    });
    
    console.log('\n🎉 Usuários de teste criados com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao criar usuários:', error);
  } finally {
    await sql.end();
  }
}

createTestUsers();
