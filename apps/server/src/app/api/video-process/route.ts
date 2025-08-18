import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { videoProcessing, quizzes, questions } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface VideoProcessRequest {
  quizId: string;
  videoUrl: string;
  difficultyLevel: string;
  numberOfQuestions: number;
}

export async function POST(req: NextRequest) {
  try {
    const { quizId, videoUrl, difficultyLevel, numberOfQuestions }: VideoProcessRequest = await req.json();

    // Criar registro de processamento
    const [processingRecord] = await db.insert(videoProcessing).values({
      quizId,
      videoUrl,
      status: 'pending',
      progress: 0,
    }).returning();

    // Iniciar processamento assíncrono (não aguardar)
    processVideoAsync(processingRecord.id, quizId, videoUrl, difficultyLevel, numberOfQuestions)
      .catch(error => console.error('Erro no processamento assíncrono:', error));

    return NextResponse.json({ 
      processingId: processingRecord.id,
      status: 'started' 
    });

  } catch (error) {
    console.error('Erro ao iniciar processamento:', error);
    return NextResponse.json({ 
      error: 'Erro ao iniciar processamento do vídeo' 
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const processingId = searchParams.get('id');
    const quizId = searchParams.get('quizId');

    if (processingId) {
      // Buscar status de um processamento específico
      const [processing] = await db
        .select()
        .from(videoProcessing)
        .where(eq(videoProcessing.id, processingId))
        .limit(1);

      if (!processing) {
        return NextResponse.json({ error: 'Processamento não encontrado' }, { status: 404 });
      }

      return NextResponse.json(processing);
    }

    if (quizId) {
      // Buscar processamento por quiz ID
      const [processing] = await db
        .select()
        .from(videoProcessing)
        .where(eq(videoProcessing.quizId, quizId))
        .limit(1);

      return NextResponse.json(processing || null);
    }

    return NextResponse.json({ error: 'ID do processamento ou quiz é obrigatório' }, { status: 400 });

  } catch (error) {
    console.error('Erro ao buscar status:', error);
    return NextResponse.json({ 
      error: 'Erro ao buscar status do processamento' 
    }, { status: 500 });
  }
}

// Função de processamento assíncrono
async function processVideoAsync(
  processingId: string, 
  quizId: string, 
  videoUrl: string, 
  difficultyLevel: string, 
  numberOfQuestions: number
) {
  try {
    // Atualizar status para processando
    await db.update(videoProcessing)
      .set({ status: 'processing', progress: 10 })
      .where(eq(videoProcessing.id, processingId));

    // Chamar a API de análise de vídeo
    const analysisResponse = await fetch('http://localhost:3000/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        videoUrl,
        subject: 'auto',
        difficultyLevel,
        numberOfQuestions
      })
    });

    if (!analysisResponse.ok) {
      throw new Error('Falha na análise do vídeo');
    }

    const analysisResult = await analysisResponse.json();
    
    // Atualizar progresso
    await db.update(videoProcessing)
      .set({ progress: 50 })
      .where(eq(videoProcessing.id, processingId));

    // Salvar perguntas no banco
    for (const q of analysisResult.questions) {
      await db.insert(questions).values({
        quizId,
        question: q.question,
        type: 'multiple-choice',
        options: q.options,
        correctAnswer: q.correctAnswer.toString(),
        explanation: q.explanation,
        difficulty: q.difficulty,
        mediaUrl: videoUrl,
        mediaType: 'video'
      });
    }

    // Atualizar quiz com informações do vídeo
    await db.update(quizzes)
      .set({
        videoContext: analysisResult.videoContext,
        detectedSubject: analysisResult.detectedSubject,
        questionsGenerated: true,
        aiModel: 'multiple-models'
      })
      .where(eq(quizzes.id, quizId));

    // Finalizar processamento
    await db.update(videoProcessing)
      .set({ 
        status: 'completed', 
        progress: 100,
        questionsGenerated: analysisResult.questions.length
      })
      .where(eq(videoProcessing.id, processingId));

    console.log(`Processamento ${processingId} concluído com sucesso`);

  } catch (error) {
    console.error('Erro no processamento:', error);
    
    // Marcar como falha
    await db.update(videoProcessing)
      .set({ 
        status: 'failed',
        errorMessage: error instanceof Error ? error.message : 'Erro desconhecido'
      })
      .where(eq(videoProcessing.id, processingId));
  }
}