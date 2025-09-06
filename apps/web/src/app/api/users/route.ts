import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { profiles } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export async function POST(req: Request) {
  try {
    console.log('📝 Criando usuário via API...');
    const { email, name, userType } = await req.json();

    if (!email || !name || !userType) {
      return NextResponse.json({ error: 'Dados obrigatórios: email, name, userType' }, { status: 400 });
    }

    console.log('📝 Dados do usuário:', { email, name, userType });

    // Verificar se usuário já existe
    try {
      const existingUser = await db
        .select()
        .from(profiles)
        .where(eq(profiles.email, email))
        .limit(1);

      if (existingUser.length > 0) {
        console.log('⚠️ Usuário já existe:', existingUser[0]);
        return NextResponse.json({ 
          success: true,
          user: existingUser[0],
          message: 'Usuário já existe'
        });
      }
    } catch (error) {
      console.warn('⚠️ Erro ao verificar usuário existente:', error);
    }

    // Criar novo usuário
    try {
      const newUser = await db
        .insert(profiles)
        .values({
          id: createId(),
          email,
          name,
          userType,
          bio: null,
          avatar: null
        })
        .returning();

      console.log('✅ Usuário criado no banco:', newUser[0]);

      return NextResponse.json({ 
        success: true, 
        user: newUser[0],
        message: 'Usuário criado com sucesso'
      });
    } catch (dbError) {
      console.error('❌ Erro ao inserir no banco:', dbError);
      throw dbError;
    }

  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
    return NextResponse.json({ 
      error: 'Erro interno do servidor: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (email) {
      // Buscar usuário específico por email
      const user = await db
        .select()
        .from(profiles)
        .where(eq(profiles.email, email))
        .limit(1);

      return NextResponse.json({ 
        success: true,
        user: user[0] || null
      });
    }

    // Buscar todos os usuários
    const users = await db.select().from(profiles);

    return NextResponse.json({ 
      success: true, 
      message: 'Usuários do banco PostgreSQL',
      users: users
    });

  } catch (error) {
    console.error('❌ Erro ao buscar usuários:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Erro ao buscar usuários: ' + (error as Error).message 
    }, { status: 500 });
  }
}