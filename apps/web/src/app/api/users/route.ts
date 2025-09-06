import { NextRequest, NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';
import { db } from '@/lib/db';
import { profiles } from '@/lib/schema';
import { eq } from 'drizzle-orm';

// Base de usuários existentes no sistema (backup - será migrado para PostgreSQL)
const FALLBACK_USERS = [
  {
    id: 'mentor-1',
    email: 'mentor.teste@gmail.com',
    name: 'Professor João Silva',
    user_type: 'mentor',
    password: 'test123'
  },
  {
    id: 'student-1', 
    email: 'aluno.teste@gmail.com',
    name: 'Maria Santos',
    user_type: 'student',
    password: 'test123'
  },
  {
    id: 'student-2',
    email: 'aluno2.teste@gmail.com', 
    name: 'Carlos Oliveira',
    user_type: 'student',
    password: 'test123'
  },
  {
    id: 'student-3',
    email: 'isaac@gmail.com',
    name: 'Isaac',
    user_type: 'student', 
    password: 'test123'
  }
];

export async function POST(req: Request) {
  try {
    const { action, email, password, name, userType } = await req.json();

    if (action === 'login') {
      try {
        // Tentar primeiro o banco PostgreSQL
        const [user] = await db.select()
          .from(profiles)
          .where(eq(profiles.email, email))
          .limit(1);

        if (user) {
          if (user.password !== password) {
            return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
          }

          // Usuário encontrado no PostgreSQL
          console.log('✅ Login realizado via PostgreSQL');
          return NextResponse.json({
            id: user.id,
            email: user.email,
            name: user.name,
            userType: user.user_type
          });
        }

        // Se não encontrou no PostgreSQL, tentar fallback
        const fallbackUser = FALLBACK_USERS.find(u => u.email === email);
        if (!fallbackUser) {
          return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
        }
        
        if (fallbackUser.password !== password) {
          return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
        }

        // Login via fallback
        console.log('✅ Login realizado via fallback');
        return NextResponse.json({
          id: fallbackUser.id,
          email: fallbackUser.email,
          name: fallbackUser.name,
          userType: fallbackUser.user_type
        });

      } catch (error) {
        console.error('❌ Erro PostgreSQL, usando fallback:', error.message);
        
        // Em caso de erro, usar fallback
        const fallbackUser = FALLBACK_USERS.find(u => u.email === email);
        if (!fallbackUser) {
          return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
        }
        
        if (fallbackUser.password !== password) {
          return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
        }

        console.log('✅ Login realizado via fallback (erro PostgreSQL)');
        return NextResponse.json({
          id: fallbackUser.id,
          email: fallbackUser.email,
          name: fallbackUser.name,
          userType: fallbackUser.user_type
        });
      }
    }

    if (action === 'register') {
      try {
        // Verificar se usuário já existe no PostgreSQL
        const [existingUser] = await db.select()
          .from(profiles)
          .where(eq(profiles.email, email))
          .limit(1);
        
        if (existingUser) {
          return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 });
        }

        // Criar novo usuário no banco PostgreSQL
        const [newUser] = await db.insert(profiles)
          .values({
            email,
            name,
            user_type: userType,
            password
          })
          .returning();

        console.log('✅ Usuário criado no PostgreSQL:', newUser.email);

        // Retornar dados do usuário (sem senha)
        return NextResponse.json({
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          userType: newUser.user_type
        });
      } catch (error) {
        console.error('❌ Erro ao criar usuário no PostgreSQL:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
      }
    }

    return NextResponse.json({ error: 'Ação não reconhecida' }, { status: 400 });

  } catch (error) {
    console.error('Erro na API de usuários:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Buscar todos os usuários do PostgreSQL
    const users = await db.select({
      id: profiles.id,
      email: profiles.email,
      name: profiles.name,
      userType: profiles.user_type
    }).from(profiles);

    console.log(`📊 ${users.length} usuários encontrados no PostgreSQL`);
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('❌ Erro ao buscar usuários no PostgreSQL:', error);
    
    // Fallback: retornar usuários de exemplo se o banco não estiver acessível
    console.log('🔄 Usando dados de fallback...');
    const fallbackUsers = FALLBACK_USERS.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.user_type
    }));
    
    return NextResponse.json(fallbackUsers);
  }
}