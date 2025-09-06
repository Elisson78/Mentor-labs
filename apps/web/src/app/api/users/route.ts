
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { profiles } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export async function POST(req: Request) {
  try {
    const { email, name, userType, bio } = await req.json();
    
    const newUser = {
      id: createId(),
      email,
      name,
      userType,
      bio: bio || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.insert(profiles).values(newUser).returning();
    
    return NextResponse.json({
      success: true,
      user: result[0]
    });
    
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await db.select().from(profiles);
    
    return NextResponse.json({
      success: true,
      users
    });
    
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}
