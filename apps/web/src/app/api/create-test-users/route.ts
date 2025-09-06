
import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { createId } from '@paralleldrive/cuid2';

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString);

export async function POST() {
  try {
    console.log('🔄 Criando usuários de teste via API...');
    
    // Verificar se a tabela existe
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles'
      );
    `;
    
    if (!tableExists[0].exists) {
      return NextResponse.json({
        success: false,
        error: 'Tabela profiles não existe. Execute setup-database.js primeiro'
      }, { status: 400 });
    }
    
    // Limpar usuários de teste existentes
    await sql`DELETE FROM profiles WHERE email LIKE '%teste%'`;
    
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
    
    const createdUsers = [];
    for (const user of testUsers) {
      const result = await sql`
        INSERT INTO profiles (id, email, name, user_type, bio, created_at, updated_at)
        VALUES (${user.id}, ${user.email}, ${user.name}, ${user.user_type}, ${user.bio}, NOW(), NOW())
        RETURNING *
      `;
      createdUsers.push(result[0]);
    }
    
    await sql.end();
    
    return NextResponse.json({
      success: true,
      message: 'Usuários de teste criados com sucesso',
      users: createdUsers
    });
    
  } catch (error) {
    console.error('❌ Erro ao criar usuários de teste:', error);
    await sql.end();
    
    return NextResponse.json({
      success: false,
      error: `Erro ao criar usuários: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allUsers = await sql`SELECT * FROM profiles WHERE email LIKE '%teste%'`;
    await sql.end();
    
    return NextResponse.json({
      success: true,
      users: allUsers
    });
    
  } catch (error) {
    await sql.end();
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}
