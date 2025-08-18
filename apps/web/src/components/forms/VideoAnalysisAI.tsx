"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Video, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Zap,
  Loader2
} from "lucide-react";
import { useVideoAnalysis } from "@/hooks/useVideoAnalysis";

interface VideoAnalysisAIProps {
  onQuestionsGenerated: (questions: GeneratedQuestion[]) => void;
  onCancel: () => void;
}

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
}

interface VideoAnalysisResult {
  videoContext: string;
  detectedSubject: string;
  questions: GeneratedQuestion[];
}

export function VideoAnalysisAI({ onQuestionsGenerated, onCancel }: VideoAnalysisAIProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("Intermediate");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  
  const { analyzeVideo, isAnalyzing, error, result, reset } = useVideoAnalysis();

  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

  const validateVideoUrl = (url: string): boolean => {
    // Suporte para YouTube, Vimeo, e URLs de vídeo comuns
    const videoPatterns = [
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com)/,
      /\.(mp4|webm|ogg|mov|avi|mkv)$/i
    ];
    
    return videoPatterns.some(pattern => pattern.test(url));
  };

  const handleAnalyzeVideo = async () => {
    if (!videoUrl.trim()) {
      return;
    }

    if (!validateVideoUrl(videoUrl)) {
      return;
    }

    reset();

    const analysisResult = await analyzeVideo({
      videoUrl: videoUrl.trim(),
      subject: "auto", // A IA detectará automaticamente
      difficultyLevel,
      numberOfQuestions
    });

    if (analysisResult) {
      // Sucesso - o hook já atualizou o estado
    }
  };

  const handleUseQuestions = () => {
    if (result?.questions) {
      onQuestionsGenerated(result.questions);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">🎥 Análise de Vídeo com IA</CardTitle>
                  <p className="text-blue-100 text-sm mt-1">
                    Deixe a IA analisar seu vídeo e gerar perguntas automaticamente
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCancel}
                className="text-white hover:bg-white/20"
              >
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Configuração da Análise */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="videoUrl" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  URL do Vídeo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="videoUrl"
                  placeholder="https://youtube.com/watch?v=... ou https://..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">
                  Suporta YouTube, Vimeo e arquivos de vídeo diretos
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nível de Dificuldade</Label>
                  <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyLevels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questionCount">Número de Perguntas</Label>
                  <Select value={numberOfQuestions.toString()} onValueChange={(value) => setNumberOfQuestions(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[3, 5, 8, 10, 15].map((num) => (
                        <SelectItem key={num} value={num.toString()}>{num} perguntas</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Info sobre detecção automática */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <strong>Detecção Automática:</strong> A IA analisará o vídeo e detectará automaticamente o assunto e tema para gerar perguntas contextualizadas.
                </p>
              </div>
            </div>

            {/* Botão de Análise */}
            <div className="flex justify-center">
              <Button
                onClick={handleAnalyzeVideo}
                disabled={isAnalyzing || !videoUrl.trim()}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analisando Vídeo...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analisar com IA
                  </>
                )}
              </Button>
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Erro:</span>
                  <span>{error}</span>
                </div>
              </motion.div>
            )}

            {/* Resultado da Análise */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-700 mb-3">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Análise Concluída!</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-green-600 text-sm">
                        <strong>Assunto Detectado:</strong> <span className="bg-green-100 px-2 py-1 rounded text-green-800 font-medium">{result.detectedSubject}</span>
                      </p>
                      <p className="text-green-600 text-sm">
                        <strong>Contexto:</strong> {result.videoContext}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      Perguntas Geradas ({result.questions.length})
                    </h3>
                    
                    {result.questions.map((question, index) => (
                      <Card key={index} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">
                              Pergunta {index + 1}
                            </span>
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-700">{question.question}</p>
                          
                          <div className="grid grid-cols-2 gap-2">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-2 rounded border text-sm ${
                                  optIndex === question.correctAnswer
                                    ? 'bg-green-100 border-green-300 text-green-700'
                                    : 'bg-gray-50 border-gray-200 text-gray-600'
                                }`}
                              >
                                <span className="font-medium mr-2">
                                  {String.fromCharCode(65 + optIndex)}.
                                </span>
                                {option}
                                {optIndex === question.correctAnswer && (
                                  <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />
                                )}
                              </div>
                            ))}
                          </div>
                          
                          <div className="bg-blue-50 border border-blue-200 rounded p-3">
                            <p className="text-sm text-blue-700">
                              <strong>Explicação:</strong> {question.explanation}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={onCancel}>
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleUseQuestions}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Usar Perguntas Geradas
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
