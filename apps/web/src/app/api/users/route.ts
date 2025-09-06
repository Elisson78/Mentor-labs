
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { profiles } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export async function POST(req: Request) {
  try {
    const { action, email, password, name, userType } = await req.json();

    if (action === 'login') {
      // Buscar usuário por email
      const users = await db.select().from(profiles).where(eq(profiles.email, email));
      
      if (users.length > 0) {
        const user = users[0];
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
        return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
      }
    } 
    
    if (action === 'register') {
      // Verificar se usuário já existe
      const existingUsers = await db.select().from(profiles).where(eq(profiles.email, email));
      
      if (existingUsers.length > 0) {
        return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 });
      }

      // Criar novo usuário
      const newUser = {
        id: createId(),
        email,
        name,
        user_type: userType,
        created_at: new Date(),
        updated_at: new Date()
      };

      await db.insert(profiles).values(newUser);

      return NextResponse.json({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        userType: newUser.user_type,
        createdAt: newUser.created_at,
        updatedAt: newUser.updated_at
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
