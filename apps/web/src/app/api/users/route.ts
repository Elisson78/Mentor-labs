import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';
import { createId } from '@paralleldrive/cuid2';

// Usar conexão otimizada para Neon/Vercel
const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString, {
  prepare: false,
  ssl: true,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

export async function POST(req: Request) {
  try {
    const { action, email, password, name, userType } = await req.json();

    if (action === 'login') {
      // Buscar usuário por email usando SQL direto
      const users = await sql`
        SELECT * FROM profiles WHERE email = ${email}
      `;

      if (users.length > 0) {
        const user = users[0];

        // Verificar senha (comparação simples para desenvolvimento)
        if (user.password === password) {
          return NextResponse.json({
            id: user.id,
            email: user.email,
            name: user.name,
            userType: user.user_type,
            avatar: user.avatar,
            bio: user.bio,
            createdAt: user.created_at,
            updatedAt: user.updated_at
          });
        } else {
          return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
        }
      } else {
        return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
      }
    }

    if (action === 'register') {
      // Verificar se usuário já existe usando SQL direto
      const existingUsers = await sql`
        SELECT * FROM profiles WHERE email = ${email}
      `;

      if (existingUsers.length > 0) {
        return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 });
      }

      // Criar novo usuário usando SQL direto
      const newUserId = createId();
      await sql`
        INSERT INTO profiles (id, email, name, user_type, password, created_at, updated_at)
        VALUES (${newUserId}, ${email}, ${name}, ${userType}, ${password}, NOW(), NOW())
      `;

      return NextResponse.json({
        id: newUserId,
        email,
        name,
        userType,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return NextResponse.json({ error: 'Ação não reconhecida' }, { status: 400 });

  } catch (error) {
    console.error('Erro na API de usuários:', error);

    // Se for erro de autenticação do banco, retornar mensagem específica
    if (error instanceof Error && error.message.includes('password authentication failed')) {
      return NextResponse.json({ 
        error: 'Erro de conexão com banco de dados. Verifique as configurações.' 
      }, { status: 503 });
    }

    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await db.select().from(profiles);

    return NextResponse.json(
      users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.user_type,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }))
    );
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json({ error: 'Erro ao buscar usuários: ' + error }, { status: 500 });
  }
}