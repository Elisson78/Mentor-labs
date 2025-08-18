import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Test database connection
    await db.execute(sql`SELECT 1`);
    
    // Test OpenRouter API key exists
    const openaiKey = process.env.OPENAI_API_KEY;
    const hasApiKey = openaiKey && openaiKey.startsWith('sk-');
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      ai_api: hasApiKey ? 'configured' : 'missing',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    });
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 });
  }
}