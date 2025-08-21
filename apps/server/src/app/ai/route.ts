import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

// Função para extrair informações do vídeo do YouTube
async function extractVideoInfo(videoUrl: string): Promise<string> {
  try {
    // Extrair ID do vídeo do YouTube
    const videoIdMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    if (!videoIdMatch) {
      throw new Error('URL do YouTube inválida');
    }
    
    const videoId = videoIdMatch[1];
    
    // Para agora, vamos simular informações básicas
    // Em uma implementação completa, você usaria a YouTube API
    const mockInfo = `
    ID do vídeo: ${videoId}
    Plataforma: YouTube
    URL: ${videoUrl}
    Análise: Este vídeo será analisado para gerar perguntas educativas baseadas em seu conteúdo.
    `;
    
    return mockInfo.trim();
    
  } catch (error) {
    console.error('Erro ao extrair informações do vídeo:', error);
    throw error;
  }
}

export const maxDuration = 60;

interface VideoAnalysisRequest {
  videoUrl: string;
  subject: string;
  difficultyLevel: string;
  numberOfQuestions: number;
}

interface ChatRequest {
  messages: any[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Verificar se é uma requisição de análise de vídeo
    if (body.videoUrl && body.subject && body.difficultyLevel && body.numberOfQuestions) {
      return await handleVideoAnalysis(body as VideoAnalysisRequest);
    }
    
    // Verificar se é uma requisição de chat
    if (body.messages) {
      return await handleChat(body as ChatRequest);
    }
    
    return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    
  } catch (error) {
    console.error('Error in AI route:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

async function handleVideoAnalysis(request: VideoAnalysisRequest) {
  const { videoUrl, subject, difficultyLevel, numberOfQuestions } = request;

  if (!videoUrl) {
    return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
  }

  // Verificar se a API key está configurada
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  console.log('API Key exists:', !!apiKey);
  console.log('API Key length:', apiKey?.length || 0);
  
  if (!apiKey) {
    return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 });
  }

  // Prompt para análise do vídeo e geração de perguntas
  const systemPrompt = `Você é um especialista em educação e criação de quizzes. Sua tarefa é analisar o contexto de um vídeo e gerar perguntas de quiz relevantes e educativas.

REGRAS IMPORTANTES:
1. PRIMEIRO: Analise o título e URL do vídeo para identificar automaticamente o assunto/tema
2. Detecte se é sobre: Matemática, Ciências, História, Literatura, Geografia, Programação, Negócios, Idiomas, Artes, ou outro tema
3. Gere perguntas que testem compreensão, aplicação e análise crítica do conteúdo do vídeo
4. As perguntas devem ser apropriadas para o nível de dificuldade especificado
5. Cada pergunta deve ter 4 opções de resposta (A, B, C, D)
6. Apenas uma opção deve estar correta
7. Inclua explicações para as respostas corretas
8. Base as perguntas no conteúdo REAL do vídeo, não em suposições genéricas

FORMATO DE RESPOSTA OBRIGATÓRIO:
Você DEVE responder APENAS com um JSON válido, sem texto adicional antes ou depois.
Estrutura exata obrigatória:

{
  "videoContext": "Breve resumo do contexto e assunto detectado do vídeo",
  "detectedSubject": "Assunto/tema detectado automaticamente",
  "questions": [
    {
      "question": "Texto da pergunta baseada no conteúdo do vídeo",
      "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
      "correctAnswer": 0,
      "explanation": "Explicação da resposta correta",
      "difficulty": "beginner"
    }
  ]
}

IMPORTANTE: Responda APENAS com o JSON, sem backticks ou qualquer outro texto.`;

  const userPrompt = `VÍDEO PARA ANÁLISE: ${videoUrl}

TAREFA:
1. Analise o URL e título do vídeo
2. Identifique automaticamente o assunto/tema (ex: Matemática, Programação, História, Ciências, etc.)
3. Gere ${numberOfQuestions} pergunta(s) no nível ${difficultyLevel}
4. Base as perguntas no conteúdo que você pode inferir do título/URL

CONFIGURAÇÕES:
- Nível: ${difficultyLevel}
- Quantidade: ${numberOfQuestions} pergunta(s)

IMPORTANTE: Retorne APENAS o JSON, sem explicações adicionais.`;

  try {
    console.log('Iniciando análise de vídeo:', videoUrl);
    console.log('Configurações:', { difficultyLevel, numberOfQuestions });
    
    // Tentar extrair informações do vídeo primeiro
    let videoInfo = '';
    try {
      videoInfo = await extractVideoInfo(videoUrl);
    } catch (err) {
      console.log('Não foi possível extrair informações do vídeo:', err);
    }

    // Atualizar prompt com informações do vídeo
    const enhancedPrompt = videoInfo 
      ? `${userPrompt}\n\nINFORMAÇÕES DO VÍDEO:\n${videoInfo}`
      : userPrompt;

    // Lista de modelos gratuitos para tentar
    const freeModels = [
      'meta-llama/llama-3.2-3b-instruct:free',
      'microsoft/phi-3-mini-128k-instruct:free', 
      'google/gemma-2-9b-it:free',
      'qwen/qwen-2-7b-instruct:free'
    ];

    for (const model of freeModels) {
      try {
        console.log(`Tentando modelo: ${model}`);
        
        const openaiClient = createOpenAI({
          baseURL: 'https://openrouter.ai/api/v1',
          apiKey: apiKey,
        });
        
        const result = await streamText({
          model: openaiClient(model),
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: enhancedPrompt }
          ],
          maxTokens: 2000,
          temperature: 0.7,
        });

        console.log(`Modelo ${model} executado com sucesso`);
        
        // Aguardar o texto completo
        const fullText = await result.text;
        console.log('Resposta bruta da IA:', fullText);
        
        // Tentar extrair JSON da resposta
        let jsonText = fullText.trim();
        
        // Remover possíveis marcações de código
        jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
        
        // Tentar encontrar o JSON
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('IA não retornou JSON válido');
        }
        
        const parsedResult = JSON.parse(jsonMatch[0]);
        console.log('Resultado parseado:', parsedResult);
        
        // Validar estrutura
        if (!parsedResult.questions || !Array.isArray(parsedResult.questions)) {
          throw new Error('Resposta da IA não contém perguntas válidas');
        }
        
        return NextResponse.json(parsedResult);
        
      } catch (modelError) {
        console.log(`Modelo ${model} falhou:`, modelError);
        continue; // Tentar próximo modelo
      }
    }
    
    // Se todos os modelos falharam, gerar erro para fallback
    throw new Error('Todos os modelos de IA falharam');
  } catch (error) {
    console.error('Erro na análise de vídeo:', error);
    
    // Fallback: gerar resposta baseada no URL se a IA falhar
    console.log('Usando fallback devido ao erro:', error);
    
    let detectedSubject = 'Conteúdo Geral';
    let contextDescription = `Análise do vídeo: ${videoUrl}`;
    
    // Análise inteligente do URL para detectar assunto
    const url = videoUrl.toLowerCase();
    const urlParts = url.split(/[\/\-_=&?]/);
    const keywords = urlParts.join(' ');
    
    if (keywords.match(/(math|matematica|algebra|geometry|calculus|equation)/)) {
      detectedSubject = 'Matemática';
    } else if (keywords.match(/(programming|code|javascript|python|java|react|nodejs|tutorial|dev)/)) {
      detectedSubject = 'Programação';
    } else if (keywords.match(/(science|ciencia|physics|chemistry|biology|quimica|fisica)/)) {
      detectedSubject = 'Ciências';
    } else if (keywords.match(/(history|historia|war|ancient|medieval)/)) {
      detectedSubject = 'História';
    } else if (keywords.match(/(english|language|grammar|speaking|pronunciation)/)) {
      detectedSubject = 'Idiomas';
    } else if (keywords.match(/(business|marketing|finance|economy|management)/)) {
      detectedSubject = 'Negócios';
    } else if (keywords.match(/(music|art|design|drawing|painting)/)) {
      detectedSubject = 'Artes';
    } else if (keywords.match(/(cooking|recipe|chef|kitchen)/)) {
      detectedSubject = 'Culinária';
    }
    
    const fallbackResponse = {
      "videoContext": `${contextDescription}. Assunto identificado como ${detectedSubject} baseado na análise do URL.`,
      "detectedSubject": detectedSubject,
      "questions": []
    };
    
    // Gerar perguntas específicas por assunto
    const questionsBank = {
      'Matemática': [
        {
          question: 'Qual é a aplicação prática dos conceitos matemáticos apresentados no vídeo?',
          options: ['Resolução de problemas do cotidiano', 'Apenas teoria acadêmica', 'Decorar fórmulas', 'Cálculos mentais'],
          correctAnswer: 0,
          explanation: 'A matemática tem diversas aplicações práticas no dia a dia, desde cálculos básicos até modelagem de problemas complexos.'
        },
        {
          question: 'Que estratégia é recomendada para resolver os exercícios mostrados?',
          options: ['Análise passo a passo', 'Decorar a resposta', 'Chutar alternativas', 'Ignorar o contexto'],
          correctAnswer: 0,
          explanation: 'A resolução sistemática e passo a passo permite melhor compreensão e aplicação dos conceitos.'
        }
      ],
      'Programação': [
        {
          question: 'Qual boa prática de programação é destacada no vídeo?',
          options: ['Código limpo e organizado', 'Código rápido sem comentários', 'Usar só uma linguagem', 'Evitar documentação'],
          correctAnswer: 0,
          explanation: 'Código limpo e bem documentado é fundamental para manutenibilidade e trabalho em equipe.'
        },
        {
          question: 'Que conceito fundamental é abordado na programação apresentada?',
          options: ['Lógica e estruturas de dados', 'Apenas sintaxe', 'Decorar comandos', 'Copiar código pronto'],
          correctAnswer: 0,
          explanation: 'Entender lógica e estruturas de dados é essencial para se tornar um bom programador.'
        }
      ],
      'Ciências': [
        {
          question: 'Qual método científico é aplicado no conteúdo apresentado?',
          options: ['Observação e experimentação', 'Apenas teorias', 'Opinião pessoal', 'Tradição popular'],
          correctAnswer: 0,
          explanation: 'O método científico baseia-se na observação, hipóteses e experimentação para validar conhecimento.'
        },
        {
          question: 'Como os conceitos científicos se relacionam com o mundo real?',
          options: ['Através de aplicações práticas', 'Só em laboratórios', 'Apenas na teoria', 'Sem relação clara'],
          correctAnswer: 0,
          explanation: 'A ciência busca compreender e explicar fenômenos naturais que observamos no dia a dia.'
        }
      ]
    };

    const defaultQuestions = [
      {
        question: `Qual é o objetivo principal do conteúdo apresentado sobre ${detectedSubject}?`,
        options: ['Transmitir conhecimento de forma clara', 'Apenas entreter', 'Promover produtos', 'Gerar polêmica'],
        correctAnswer: 0,
        explanation: `O principal objetivo de conteúdo educativo sobre ${detectedSubject} é transmitir conhecimento de forma acessível e compreensível.`
      },
      {
        question: `Como o conhecimento sobre ${detectedSubject} pode ser aplicado?`,
        options: ['Em situações práticas da vida', 'Apenas em provas', 'Só para especialistas', 'Nunca é útil'],
        correctAnswer: 0,
        explanation: `O conhecimento em ${detectedSubject} tem aplicações práticas que beneficiam nosso desenvolvimento pessoal e profissional.`
      }
    ];

    const subjectQuestions = questionsBank[detectedSubject] || defaultQuestions;
    
    for (let i = 0; i < numberOfQuestions; i++) {
      const questionIndex = i % subjectQuestions.length;
      const baseQuestion = subjectQuestions[questionIndex];
      
      fallbackResponse.questions.push({
        ...baseQuestion,
        difficulty: difficultyLevel.toLowerCase()
      });
    }
    
    return NextResponse.json(fallbackResponse);
  }
}

async function handleChat(request: ChatRequest) {
  const { messages } = request;

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 });
  }

  const openaiClient = createOpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
  });
  
  const result = await streamText({
    model: openaiClient('gpt-3.5-turbo'),
    messages,
  });

  return result.toTextStreamResponse();
}
