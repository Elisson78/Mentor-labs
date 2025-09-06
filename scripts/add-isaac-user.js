
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

async function addIsaacUser() {
  try {
    console.log('🔄 Adicionando usuário isaac@gmail.com...');
    
    // Verificar se o usuário já existe
    const existingUser = await sql`
      SELECT * FROM profiles WHERE email = 'isaac@gmail.com'
    `;
    
    if (existingUser.length > 0) {
      console.log('⚠️ Usuário isaac@gmail.com já existe no banco');
      console.log('Dados existentes:', existingUser[0]);
      return;
    }
    
    // Criar o usuário isaac
    const newUser = {
      id: createId(),
      email: 'isaac@gmail.com',
      name: 'Isaac',
      user_type: 'student', // Assumindo que é estudante
      password: '123456789',
      bio: 'Usuário Isaac',
      created_at: new Date(),
      updated_at: new Date()
    };
    
    await sql`
      INSERT INTO profiles (id, email, name, user_type, password, bio, created_at, updated_at)
      VALUES (${newUser.id}, ${newUser.email}, ${newUser.name}, ${newUser.user_type}, ${newUser.password}, ${newUser.bio}, NOW(), NOW())
    `;
    
    console.log(`✅ Usuário criado: ${newUser.name} (${newUser.email})`);
    
    // Verificar se foi criado
    const createdUser = await sql`
      SELECT * FROM profiles WHERE email = 'isaac@gmail.com'
    `;
    
    if (createdUser.length > 0) {
      console.log('✅ Confirmado: Usuário isaac@gmail.com foi criado com sucesso');
      console.log('Dados:', {
        id: createdUser[0].id,
        email: createdUser[0].email,
        name: createdUser[0].name,
        user_type: createdUser[0].user_type
      });
    }
    
  } catch (error) {
    console.error('❌ Erro ao criar usuário isaac:', error);
  } finally {
    await sql.end();
  }
}

addIsaacUser();
