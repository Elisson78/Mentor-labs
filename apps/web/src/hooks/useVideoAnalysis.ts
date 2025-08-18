import { useState } from 'react';

interface VideoAnalysisRequest {
  videoUrl: string;
  subject: string;
  difficultyLevel: string;
  numberOfQuestions: number;
}

interface VideoAnalysisResult {
  videoContext: string;
  detectedSubject: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: string;
  }>;
}

export function useVideoAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VideoAnalysisResult | null>(null);

  const analyzeVideo = async (request: VideoAnalysisRequest): Promise<VideoAnalysisResult> => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Ler resposta como JSON diretamente
      const jsonData = await response.json();
      console.log('Response data:', jsonData);
      
      // Se for uma resposta de erro, lançar exceção
      if (jsonData.error) {
        throw new Error(jsonData.error);
      }
      
      // Verificar se tem a estrutura esperada
      if (!jsonData.questions || !Array.isArray(jsonData.questions)) {
        throw new Error('Resposta da IA não contém perguntas válidas');
      }
      
      setResult(jsonData);
      return jsonData;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setError(null);
    setResult(null);
  };

  return {
    analyzeVideo,
    isAnalyzing,
    error,
    result,
    reset,
  };
}
