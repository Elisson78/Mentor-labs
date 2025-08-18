"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Brain, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Youtube,
  FileText,
  Sparkles,
  Settings,
  RefreshCw
} from "lucide-react";

interface GeneratedQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'intermediate' | 'hard';
  type: 'comprehension' | 'application' | 'analysis';
}

interface QuizGeneratorProps {
  onQuestionsGenerated: (questions: GeneratedQuestion[]) => void;
}

export function QuizGenerator({ onQuestionsGenerated }: QuizGeneratorProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [quizSettings, setQuizSettings] = useState({
    difficulty: "intermediate",
    questionCount: 5,
    includeExplanations: true,
    questionTypes: ["comprehension", "application", "analysis"]
  });

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const generateQuizFromVideo = async () => {
    if (!videoUrl) return;

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      alert("URL do YouTube inválida");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setCurrentStep("Analisando vídeo...");

    try {
      // Simular processo de geração (substituir por chamadas reais da API)
      await simulateGenerationProcess();
      
      // Gerar perguntas de exemplo baseadas no contexto
      const questions = generateSampleQuestions();
      setGeneratedQuestions(questions);
      onQuestionsGenerated(questions);
      
    } catch (error) {
      console.error("Erro ao gerar quiz:", error);
      alert("Erro ao gerar quiz. Tente novamente.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setCurrentStep("");
    }
  };

  const simulateGenerationProcess = async () => {
    const steps = [
      "Extraindo áudio do vídeo...",
      "Transcrevendo conteúdo...",
      "Analisando pontos-chave...",
      "Gerando perguntas...",
      "Finalizando quiz..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setProgress((i + 1) * 20);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const generateSampleQuestions = (): GeneratedQuestion[] => {
    return [
      {
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
        difficulty: "easy",
        type: "comprehension"
      },
      {
        id: "2",
        question: "Como você aplicaria os princípios de mentoria em uma situação de liderança de equipe?",
        options: [
          "Impondo suas ideias",
          "Criando um ambiente de aprendizado mútuo",
          "Delegando todas as responsabilidades",
          "Ignorando feedback da equipe"
        ],
        correctAnswer: "Criando um ambiente de aprendizado mútuo",
        explanation: "A mentoria efetiva em liderança envolve criar um ambiente onde todos podem aprender e crescer juntos.",
        difficulty: "intermediate",
        type: "application"
      },
      {
        id: "3",
        question: "Compare e contraste os diferentes estilos de mentoria mencionados no vídeo.",
        options: [
          "Todos os estilos são iguais",
          "Cada estilo tem abordagens únicas e benefícios específicos",
          "Apenas um estilo é eficaz",
          "Os estilos não importam"
        ],
        correctAnswer: "Cada estilo tem abordagens únicas e benefícios específicos",
        explanation: "O vídeo demonstra que diferentes estilos de mentoria podem ser igualmente eficazes dependendo do contexto e do mentorado.",
        difficulty: "hard",
        type: "analysis"
      }
    ];
  };

  const regenerateQuestions = async () => {
    if (generatedQuestions.length > 0) {
      setIsProcessing(true);
      setCurrentStep("Regenerando perguntas...");
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newQuestions = generateSampleQuestions();
      setGeneratedQuestions(newQuestions);
      onQuestionsGenerated(newQuestions);
      
      setIsProcessing(false);
      setCurrentStep("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Configurações do Quiz */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações da IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="difficulty">Dificuldade Padrão</Label>
              <Select 
                value={quizSettings.difficulty} 
                onValueChange={(value) => setQuizSettings(prev => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Fácil</SelectItem>
                  <SelectItem value="intermediate">Intermediário</SelectItem>
                  <SelectItem value="hard">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="questionCount">Número de Perguntas</Label>
              <Select 
                value={quizSettings.questionCount.toString()} 
                onValueChange={(value) => setQuizSettings(prev => ({ ...prev, questionCount: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 perguntas</SelectItem>
                  <SelectItem value="5">5 perguntas</SelectItem>
                  <SelectItem value="10">10 perguntas</SelectItem>
                  <SelectItem value="15">15 perguntas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campo de URL do Vídeo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-600" />
            URL do Vídeo do YouTube
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="videoUrl">Link do Vídeo *</Label>
            <Input
              id="videoUrl"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Cole aqui o link do vídeo do YouTube que você quer analisar
            </p>
          </div>

          <Button
            onClick={generateQuizFromVideo}
            disabled={!videoUrl || isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Gerar Quiz com IA
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Progresso da Geração */}
      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span className="font-medium">{currentStep}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <p className="text-sm text-gray-600">
                {progress}% completo
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Perguntas Geradas */}
      {generatedQuestions.length > 0 && !isProcessing && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Perguntas Geradas ({generatedQuestions.length})
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={regenerateQuestions}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedQuestions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">Pergunta {index + 1}</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {question.difficulty}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {question.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-700">{question.question}</p>
                  
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-2 rounded border ${
                          option === question.correctAnswer
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200"
                        }`}
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + optIndex)})
                        </span>
                        {option}
                        {option === question.correctAnswer && (
                          <CheckCircle className="w-4 h-4 text-green-600 inline ml-2" />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {quizSettings.includeExplanations && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Explicação:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Quiz gerado com sucesso!</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                As perguntas foram adicionadas ao seu quiz. Você pode editá-las ou adicionar mais perguntas manualmente.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dicas de Uso */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">💡 Dicas para Melhores Resultados</h4>
              <ul className="text-sm text-blue-800 mt-2 space-y-1">
                <li>• Use vídeos com áudio claro e bem pronunciado</li>
                <li>• Vídeos entre 5-20 minutos funcionam melhor</li>
                <li>• Conteúdo estruturado gera perguntas mais precisas</li>
                <li>• Você pode editar as perguntas após a geração</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
