import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    
    // Verificar se o webhook é do Coolify
    const signature = headersList.get('x-coolify-signature');
    const webhookSecret = process.env.WEBHOOK_SECRET;
    
    if (webhookSecret && signature) {
      // Verificar assinatura do webhook
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');
      
      if (`sha256=${expectedSignature}` !== signature) {
        console.error('Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(body);
    
    console.log('Coolify Webhook received:', {
      type: payload.type || 'unknown',
      timestamp: new Date().toISOString(),
      data: payload
    });

    // Processar diferentes tipos de webhook
    switch (payload.type) {
      case 'deployment.success':
        console.log('✅ Deployment successful:', payload.application?.name);
        break;
      case 'deployment.failed':
        console.log('❌ Deployment failed:', payload.application?.name);
        break;
      case 'deployment.started':
        console.log('🚀 Deployment started:', payload.application?.name);
        break;
      default:
        console.log('📋 Webhook received:', payload);
    }

    return NextResponse.json({ 
      message: 'Webhook processed successfully',
      received: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Coolify Webhook endpoint is active',
    endpoint: '/api/webhook',
    methods: ['POST']
  });
}