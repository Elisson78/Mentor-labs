
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { profiles } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    
    console.log('💾 Salvando usuário no banco PostgreSQL:', userData);
    
    // Verificar se usuário já existe
    const existingUser = await db
      .select()
      .from(profiles)
      .where(eq(profiles.email, userData.email))
      .limit(1);
    
    if (existingUser.length > 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Usuário já existe com este email' 
      }, { status: 400 });
    }
    
    // Inserir novo usuário no banco
    const [newUser] = await db.insert(profiles).values({
      email: userData.email,
      name: userData.name,
      userType: userData.userType
    }).returning();
    
    console.log('✅ Usuário salvo no PostgreSQL:', newUser);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Usuário salvo no banco de dados PostgreSQL',
      user: newUser 
    });
    
  } catch (error) {
    console.error('❌ Erro ao salvar usuário no banco:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Erro ao salvar no banco de dados: ' + (error as Error).message 
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
