"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Video, 
  Brain, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Sparkles,
  Loader2,
  Eye,
  BookOpen
} from "lucide-react";

interface VideoInfo {
  url: string;
  title: string;
  thumbnail: string;
  duration: string;
  id: string;
}

interface ProcessingStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  questionsGenerated: number;
  errorMessage?: string;
  aiModel?: string;
}

interface VideoQuizProcessorProps {
  videoUrl: string;
  quizId: string;
  onQuestionsReady: (questions: any[]) => void;
  onCancel: () => void;
}

export function VideoQuizProcessor({ 
  videoUrl, 
  quizId, 
  onQuestionsReady, 
  onCancel 
}: VideoQuizProcessorProps) {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [processing, setProcessing] = useState<ProcessingStatus | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  // Extrair informações do vídeo do YouTube
  useEffect(() => {
    if (videoUrl) {
      const videoIdMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
      if (videoIdMatch) {
        const videoId = videoIdMatch[1];
        setVideoInfo({
          id: videoId,
          url: videoUrl,
          title: `Vídeo YouTube ${videoId}`,
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          duration: "Analisando..."
        });
      }
    }
  }, [videoUrl]);

  // Polling para verificar status do processamento
  useEffect(() => {
    if (!processing?.id) return;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/video-process?id=${processing.id}`);
        const status = await response.json();
        
        setProcessing(status);

        if (status.status === 'completed') {
          // Buscar perguntas geradas
          // Implementar busca das perguntas do quiz
          onQuestionsReady([]);
        }
      } catch (error) {
        console.error('Erro ao verificar status:', error);
      }
    };

    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, [processing?.id, onQuestionsReady]);

  const startProcessing = async () => {
    try {
      setIsStarted(true);
      
      const response = await fetch('/api/video-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId,
          videoUrl,
          difficultyLevel: 'Intermediate',
          numberOfQuestions: 5
        })
      });

      const result = await response.json();
      
      if (result.processingId) {
        setProcessing({
          id: result.processingId,
          status: 'pending',
          progress: 0,
          questionsGenerated: 0
        });
      }
    } catch (error) {
      console.error('Erro ao iniciar processamento:', error);
      setIsStarted(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">🎥 Processamento de Vídeo com IA</CardTitle>
                  <p className="text-blue-100 text-sm mt-1">
                    A IA está analisando o vídeo para gerar perguntas educativas
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

          <CardContent className="p-6">
            {/* Preview do Vídeo */}
            {videoInfo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="relative">
                    <img
                      src={videoInfo.thumbnail}
                      alt="Video thumbnail"
                      className="w-32 h-20 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${videoInfo.id}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{videoInfo.title}</h3>
                    <div className="flex gap-2 text-sm text-gray-600">
                      <span>📺 YouTube</span>
                      <span>•</span>
                      <span>🆔 {videoInfo.id}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Status do Processamento */}
            <AnimatePresence>
              {processing ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Status do Processamento</h3>
                    <Badge className={getStatusColor(processing.status)}>
                      {getStatusIcon(processing.status)}
                      <span className="ml-1 capitalize">{processing.status}</span>
                    </Badge>
                  </div>

                  {processing.status === 'processing' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{processing.progress}%</span>
                      </div>
                      <Progress value={processing.progress} className="h-2" />
                    </div>
                  )}

                  {processing.status === 'completed' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-700 mb-2">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Processamento Concluído!</span>
                      </div>
                      <p className="text-green-600 text-sm">
                        ✨ {processing.questionsGenerated} perguntas foram geradas com sucesso!
                      </p>
                    </div>
                  )}

                  {processing.status === 'failed' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-red-700 mb-2">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-medium">Erro no Processamento</span>
                      </div>
                      <p className="text-red-600 text-sm">
                        {processing.errorMessage || 'Ocorreu um erro inesperado'}
                      </p>
                    </div>
                  )}

                  {processing.status === 'processing' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-blue-700 mb-2">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-medium">IA Trabalhando...</span>
                      </div>
                      <p className="text-blue-600 text-sm">
                        A inteligência artificial está analisando o conteúdo do vídeo e gerando perguntas educativas contextualizadas.
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : !isStarted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-lg font-semibold mb-2">Pronto para Processar</h3>
                  <p className="text-gray-600 mb-6">
                    A IA vai analisar este vídeo e gerar perguntas educativas automaticamente.
                    Este processo pode levar alguns minutos.
                  </p>
                  
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" onClick={onCancel}>
                      Cancelar
                    </Button>
                    <Button 
                      onClick={startProcessing}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Iniciar Processamento
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                  <p>Iniciando processamento...</p>
                </div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}