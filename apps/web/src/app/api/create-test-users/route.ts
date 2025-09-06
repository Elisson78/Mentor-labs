
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { profiles } from '@/lib/schema';
import { createId } from '@paralleldrive/cuid2';

export async function POST() {
  try {
    console.log('🔄 Criando usuários de teste via API...');
    
    // Verificar se já existem usuários de teste
    const existingUsers = await db.select().from(profiles);
    const testEmails = ['mentor.teste@gmail.com', 'aluno.teste@gmail.com', 'aluno2.teste@gmail.com'];
    
    const existingTestUsers = existingUsers.filter(user => 
      testEmails.includes(user.email)
    );
    
    if (existingTestUsers.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Usuários de teste já existem',
        existingUsers: existingTestUsers
      });
    }
    
    // Criar usuários de teste
    const testUsers = [];
    
    // Usuário Mentor
    const mentor = await db.insert(profiles).values({
      id: createId(),
      email: 'mentor.teste@gmail.com',
      name: 'Professor João Silva',
      userType: 'mentor',
      bio: 'Mentor experiente com 10 anos de experiência em liderança e desenvolvimento profissional.',
      avatar: null
    }).returning();
    
    testUsers.push(mentor[0]);
    
    // Usuário Aluno 1
    const aluno1 = await db.insert(profiles).values({
      id: createId(),
      email: 'aluno.teste@gmail.com',
      name: 'Maria Santos',
      userType: 'student',
      bio: 'Estudante interessada em desenvolvimento pessoal e liderança.',
      avatar: null
    }).returning();
    
    testUsers.push(aluno1[0]);
    
    // Usuário Aluno 2
    const aluno2 = await db.insert(profiles).values({
      id: createId(),
      email: 'aluno2.teste@gmail.com',
      name: 'Carlos Oliveira',
      userType: 'student',
      bio: 'Profissional buscando aprimorar habilidades de comunicação.',
      avatar: null
    }).returning();
    
    testUsers.push(aluno2[0]);
    
    console.log('✅ Usuários de teste criados:', testUsers);
    
    return NextResponse.json({
      success: true,
      message: 'Usuários de teste criados com sucesso!',
      users: testUsers
    });
    
  } catch (error) {
    console.error('❌ Erro ao criar usuários de teste:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro ao criar usuários: ' + (error as Error).message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Listar todos os usuários
    const allUsers = await db.select().from(profiles);
    
    return NextResponse.json({
      success: true,
      message: 'Lista de todos os usuários',
      users: allUsers,
      count: allUsers.length
    });
    
  } catch (error) {
    console.error('❌ Erro ao buscar usuários:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro ao buscar usuários: ' + (error as Error).message
    }, { status: 500 });
  }
}
