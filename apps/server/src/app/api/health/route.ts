import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    let databaseStatus = 'disconnected';
    let tableCount = 0;
    let dbError = null;
    
    // Test database connection
    try {
      const result = await db.execute(sql`SELECT COUNT(*) as total FROM information_schema.tables WHERE table_schema = 'public'`);
      tableCount = Number(result[0]?.total || 0);
      databaseStatus = 'connected';
    } catch (error) {
      dbError = error instanceof Error ? error.message : 'Connection failed';
      databaseStatus = 'disconnected';
    }
    
    // Test OpenRouter API key exists
    const openaiKey = process.env.OPENAI_API_KEY;
    const hasApiKey = openaiKey && openaiKey.startsWith('sk-');
    
    return NextResponse.json({
      status: databaseStatus === 'connected' ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      database: {
        status: databaseStatus,
        total_tables: tableCount,
        error: dbError
      },
      ai_api: hasApiKey ? 'configured' : 'missing',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    });
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: { status: 'disconnected', error: 'Health check failed' },
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 });
  }
}