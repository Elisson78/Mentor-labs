import { NextRequest, NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';

// Base de usuários existentes no sistema (simula banco PostgreSQL)
const EXISTING_USERS = [
  {
    id: 'mentor-1',
    email: 'mentor.teste@gmail.com',
    name: 'Professor João Silva',
    userType: 'mentor',
    password: 'test123'
  },
  {
    id: 'student-1', 
    email: 'aluno.teste@gmail.com',
    name: 'Maria Santos',
    userType: 'student',
    password: 'test123'
  },
  {
    id: 'student-2',
    email: 'aluno2.teste@gmail.com', 
    name: 'Carlos Oliveira',
    userType: 'student',
    password: 'test123'
  },
  {
    id: 'student-3',
    email: 'isaac@gmail.com',
    name: 'Isaac',
    userType: 'student', 
    password: 'test123'
  }
];

export async function POST(req: Request) {
  try {
    const { action, email, password, name, userType } = await req.json();

    if (action === 'login') {
      // Buscar usuário na base existente
      const user = EXISTING_USERS.find(u => u.email === email);

      if (!user) {
        return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
      }

      if (user.password !== password) {
        return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
      }

      // Retornar dados do usuário (sem senha)
      return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType
      });
    }

    if (action === 'register') {
      // Verificar se usuário já existe
      const existingUser = EXISTING_USERS.find(u => u.email === email);
      
      if (existingUser) {
        return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 });
      }

      // Criar novo usuário
      const newUser = {
        id: createId(),
        email,
        name,
        userType,
        password
      };

      // Em produção real, salvar no banco PostgreSQL
      EXISTING_USERS.push(newUser);

      // Retornar dados do usuário (sem senha)
      return NextResponse.json({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        userType: newUser.userType
      });
    }

    return NextResponse.json({ error: 'Ação não reconhecida' }, { status: 400 });

  } catch (error) {
    console.error('Erro na API de usuários:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Retornar todos os usuários (sem senhas)
    const users = EXISTING_USERS.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.userType
    }));

    return NextResponse.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 });
  }
}