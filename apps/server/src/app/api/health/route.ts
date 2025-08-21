import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simplified health check for initial deployment
    // Database check temporarily disabled
    
    // Test OpenRouter API key exists
    const openaiKey = process.env.OPENAI_API_KEY;
    const hasApiKey = openaiKey && openaiKey.startsWith('sk-');
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'pending', // Temporarily marked as pending
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