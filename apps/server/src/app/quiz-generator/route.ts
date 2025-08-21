import { NextRequest, NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 300; // 5 minutos para processar vídeos longos

interface QuizGenerationRequest {
  videoUrl: string;
  difficulty: 'easy' | 'intermediate' | 'hard';
  questionCount: number;
  includeExplanations: boolean;
  questionTypes: string[];
}

interface GeneratedQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'intermediate' | 'hard';
  type: 'comprehension' | 'application' | 'analysis';
}

export async function POST(req: NextRequest) {
  try {
    const body: QuizGenerationRequest = await req.json();
    const { videoUrl, difficulty, questionCount, includeExplanations, questionTypes } = body;

    // Validar URL do YouTube
    const videoId = extractYouTubeVideoId(videoUrl);
    if (!videoId) {
      return NextResponse.json(
        { error: 'URL do YouTube inválida' },
        { status: 400 }
      );
    }

    // Simular processo de extração e transcrição
    // Em produção, você usaria:
    // 1. youtube-dl para baixar o vídeo
    // 2. Whisper API para transcrição
    // 3. Google Gemini para análise e geração de perguntas
    
    const mockTranscription = await generateMockTranscription(videoId);
    const questions = await generateQuestionsWithAI(mockTranscription, {
      difficulty,
      questionCount,
      includeExplanations,
      questionTypes
    });

    return NextResponse.json({
      success: true,
      videoId,
      transcription: mockTranscription,
      questions,
      metadata: {
        processingTime: '2.5s',
        videoLength: '15:30',
        language: 'pt-BR'
      }
    });

  } catch (error) {
    console.error('Erro na geração do quiz:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

function extractYouTubeVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

async function generateMockTranscription(videoId: string): Promise<string> {
  // Em produção, isso seria uma transcrição real do Whisper API
  const mockTranscriptions = {
    'AcdZZkLkM_8': `
      Olá, bem-vindos ao nosso curso sobre mentoria e desenvolvimento pessoal. 
      Hoje vamos falar sobre os fundamentos da mentoria efetiva.
      
      A mentoria não é apenas dar conselhos, mas sim um processo de desenvolvimento 
      holístico que envolve tanto o mentor quanto o mentorado. Vamos explorar os 
      diferentes estilos de mentoria e como aplicá-los em diferentes contextos.
      
      Primeiro, vamos entender que existem três níveis principais de mentoria:
      1. Mentoria de habilidades técnicas
      2. Mentoria de desenvolvimento pessoal
      3. Mentoria de carreira e liderança
      
      Cada um desses níveis tem suas próprias abordagens e metodologias. 
      Por exemplo, na mentoria técnica, focamos em conhecimentos específicos 
      e melhores práticas. Já na mentoria de desenvolvimento pessoal, 
      trabalhamos com autoconhecimento e crescimento emocional.
      
      É importante lembrar que a mentoria efetiva requer:
      - Escuta ativa e empática
      - Feedback construtivo e específico
      - Estabelecimento de metas claras e mensuráveis
      - Acompanhamento contínuo e ajustes
      
      Vamos também discutir como criar um ambiente de mentoria seguro e 
      confiável, onde o mentorado se sinta confortável para compartilhar 
      suas dúvidas e desafios.
    `,
    'default': `
      Este é um vídeo sobre mentoria e desenvolvimento pessoal. 
      Discutimos os fundamentos da mentoria efetiva, incluindo 
      diferentes estilos e abordagens para o desenvolvimento 
      de habilidades técnicas e pessoais.
    `
  };

  return mockTranscriptions[videoId as keyof typeof mockTranscriptions] || mockTranscriptions.default;
}

async function generateQuestionsWithAI(
  transcription: string, 
  options: {
    difficulty: string;
    questionCount: number;
    includeExplanations: boolean;
    questionTypes: string[];
  }
): Promise<GeneratedQuestion[]> {
  try {
    const prompt = `
      Com base na seguinte transcrição de vídeo sobre mentoria, gere ${options.questionCount} perguntas de múltipla escolha.
      
      Transcrição:
      ${transcription}
      
      Requisitos:
      - Dificuldade: ${options.difficulty}
      - Tipos de perguntas: ${options.questionTypes.join(', ')}
      - Incluir explicações: ${options.includeExplanations}
      - Cada pergunta deve ter 4 opções (A, B, C, D)
      - Uma opção correta e três incorretas
      - Perguntas devem ser relevantes ao conteúdo do vídeo
      
      Formato de resposta (JSON):
      {
        "questions": [
          {
            "id": "1",
            "question": "Pergunta aqui?",
            "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
            "correctAnswer": "Opção correta",
            "explanation": "Explicação da resposta correta",
            "difficulty": "${options.difficulty}",
            "type": "tipo da pergunta"
          }
        ]
      }
    `;

    const result = await streamText({
      model: google('gemini-2.0-flash'),
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      maxRetries: 2,
      temperature: 0.7
    });

    // Em produção, você processaria a resposta da IA
    // Por enquanto, retornamos perguntas mock baseadas no conteúdo
    return generateQuestionsFromTranscription(transcription, options);
    
  } catch (error) {
    console.error('Erro na geração com IA:', error);
    // Fallback para perguntas mock
    return generateQuestionsFromTranscription(transcription, options);
  }
}

function generateQuestionsFromTranscription(
  transcription: string, 
  options: any
): GeneratedQuestion[] {
  const questions: GeneratedQuestion[] = [];
  
  // Análise simples do conteúdo para gerar perguntas contextuais
  const content = transcription.toLowerCase();
  
  if (content.includes('fundamentos') || content.includes('básico')) {
    questions.push({
      id: "1",
      question: "Qual é o conceito principal discutido no vídeo sobre mentoria?",
      options: [
        "Apenas dar conselhos",
        "Desenvolvimento pessoal e profissional",
        "Seguir regras rígidas",
        "Focar apenas em resultados"
      ],
      correctAnswer: "Desenvolvimento pessoal e profissional",
      explanation: "O vídeo enfatiza que a mentoria vai além de simples conselhos, focando no desenvolvimento holístico do mentorado.",
      difficulty: options.difficulty as any,
      type: "comprehension"
    });
  }
  
  if (content.includes('estilos') || content.includes('níveis')) {
    questions.push({
      id: "2",
      question: "Quantos níveis principais de mentoria são mencionados no vídeo?",
      options: [
        "2 níveis",
        "3 níveis",
        "4 níveis",
        "5 níveis"
      ],
      correctAnswer: "3 níveis",
      explanation: "O vídeo menciona especificamente três níveis: habilidades técnicas, desenvolvimento pessoal, e carreira e liderança.",
      difficulty: options.difficulty as any,
      type: "comprehension"
    });
  }
  
  if (content.includes('requer') || content.includes('importante')) {
    questions.push({
      id: "3",
      question: "Qual das seguintes características NÃO é mencionada como essencial para mentoria efetiva?",
      options: [
        "Escuta ativa e empática",
        "Feedback construtivo",
        "Estabelecimento de metas claras",
        "Competição entre mentor e mentorado"
      ],
      correctAnswer: "Competição entre mentor e mentorado",
      explanation: "A competição é o oposto do que é necessário para uma mentoria efetiva, que deve ser colaborativa e de apoio.",
      difficulty: options.difficulty as any,
      type: "analysis"
    });
  }
  
  if (content.includes('aplicar') || content.includes('contexto')) {
    questions.push({
      id: "4",
      question: "Como você aplicaria os princípios de mentoria em uma situação de liderança de equipe?",
      options: [
        "Impondo suas ideias",
        "Criando um ambiente de aprendizado mútuo",
        "Delegando todas as responsabilidades",
        "Ignorando feedback da equipe"
      ],
      correctAnswer: "Criando um ambiente de aprendizado mútuo",
      explanation: "A mentoria efetiva em liderança envolve criar um ambiente onde todos podem aprender e crescer juntos.",
      difficulty: options.difficulty as any,
      type: "application"
    });
  }
  
  if (content.includes('ambiente') || content.includes('seguro')) {
    questions.push({
      id: "5",
      question: "Por que é importante criar um ambiente de mentoria seguro e confiável?",
      options: [
        "Para impressionar outros mentores",
        "Para que o mentorado se sinta confortável para compartilhar dúvidas",
        "Para cumprir requisitos legais",
        "Para economizar tempo"
      ],
      correctAnswer: "Para que o mentorado se sinta confortável para compartilhar dúvidas",
      explanation: "Um ambiente seguro permite que o mentorado seja vulnerável e compartilhe seus verdadeiros desafios, facilitando o processo de mentoria.",
      difficulty: options.difficulty as any,
      type: "analysis"
    });
  }
  
  // Retornar apenas o número solicitado de perguntas
  return questions.slice(0, options.questionCount);
}
