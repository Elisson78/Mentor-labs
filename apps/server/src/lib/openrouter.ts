import { createOpenAI } from '@ai-sdk/openai';

// Configuração do OpenRouter
export const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Modelos disponíveis no OpenRouter
export const OPENROUTER_MODELS = {
  // GPT Models
  GPT_4_TURBO: 'openai/gpt-4-turbo',
  GPT_4: 'openai/gpt-4',
  GPT_3_5_TURBO: 'openai/gpt-3.5-turbo',
  
  // Claude Models
  CLAUDE_3_OPUS: 'anthropic/claude-3-opus',
  CLAUDE_3_SONNET: 'anthropic/claude-3-sonnet',
  CLAUDE_3_HAIKU: 'anthropic/claude-3-haiku',
  
  // Open Source Models
  LLAMA_3_8B: 'meta-llama/llama-3-8b-instruct',
  LLAMA_3_70B: 'meta-llama/llama-3-70b-instruct',
  MIXTRAL_8X7B: 'mistralai/mixtral-8x7b-instruct',
  
  // Specialized Models
  GEMINI_PRO: 'google/gemini-pro',
  COHERE_COMMAND: 'cohere/command',
} as const;

// Configuração padrão para análise de vídeo
export const DEFAULT_VIDEO_ANALYSIS_MODEL = OPENROUTER_MODELS.GPT_4_TURBO;

// Configuração para geração de quiz
export const DEFAULT_QUIZ_GENERATION_MODEL = OPENROUTER_MODELS.CLAUDE_3_SONNET;