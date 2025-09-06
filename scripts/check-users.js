
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const { profiles } = require('../apps/web/src/lib/schema');

const connectionString = process.env.DATABASE_URL;

const sql = postgres(connectionString, {
  max: 20,
});

const db = drizzle(sql);

async function checkUsers() {
  try {
    console.log('🔍 Verificando usuários no banco...');
    
    const allUsers = await db.select().from(profiles);
    
    console.log(`📊 Total de usuários encontrados: ${allUsers.length}`);
    
    if (allUsers.length === 0) {
      console.log('❌ Nenhum usuário encontrado no banco');
    } else {
      console.log('\n👥 Lista de usuários:');
      allUsers.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email}) - Tipo: ${user.userType} - ID: ${user.id}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar usuários:', error);
  } finally {
    await sql.end();
  }
}

checkUsers();
