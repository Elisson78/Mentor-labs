"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Video, 
  Brain, 
  CheckCircle, 
  AlertCircle,
  Clock,
  BookOpen,
  Play,
  Edit,
  Eye,
  Loader2
} from "lucide-react";

interface VideoQuizCardProps {
  quiz: {
    id: string;
    title: string;
    subject: string;
    description?: string;
    videoUrl?: string;
    videoTitle?: string;
    videoThumbnail?: string;
    detectedSubject?: string;
    questionsGenerated?: boolean;
    totalQuestions: number;
    difficultyLevel: string;
    status?: 'draft' | 'processing' | 'ready' | 'failed';
    progress?: number;
    createdAt: string;
  };
  onPlay?: (quizId: string) => void;
  onEdit?: (quizId: string) => void;
  onView?: (quizId: string) => void;
}

export function VideoQuizCard({ quiz, onPlay, onEdit, onView }: VideoQuizCardProps) {
  const getVideoId = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const getThumbnailUrl = (videoId: string | null) => {
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'draft': return <Edit className="w-3 h-3" />;
      case 'processing': return <Loader2 className="w-3 h-3 animate-spin" />;
      case 'ready': return <CheckCircle className="w-3 h-3" />;
      case 'failed': return <AlertCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
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

  const videoId = getVideoId(quiz.videoUrl);
  const thumbnailUrl = getThumbnailUrl(videoId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        {/* Video Preview */}
        {thumbnailUrl && (
          <div className="relative">
            <img
              src={thumbnailUrl}
              alt={quiz.videoTitle || "Video thumbnail"}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <Badge className={getStatusColor(quiz.status)}>
                {getStatusIcon(quiz.status)}
                <span className="ml-1 text-xs capitalize">
                  {quiz.status || 'draft'}
                </span>
              </Badge>
            </div>

            {/* Play Button */}
            {quiz.status === 'ready' && quiz.totalQuestions > 0 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button
                  size="lg"
                  className="rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:bg-white/30"
                  onClick={() => onPlay?.(quiz.id)}
                >
                  <Play className="w-8 h-8 text-white" />
                </Button>
              </div>
            )}

            {/* Processing Progress */}
            {quiz.status === 'processing' && quiz.progress !== undefined && (
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="bg-black/50 backdrop-blur-sm rounded p-2">
                  <div className="flex justify-between text-xs text-white mb-1">
                    <span>Gerando perguntas...</span>
                    <span>{quiz.progress}%</span>
                  </div>
                  <Progress value={quiz.progress} className="h-1" />
                </div>
              </div>
            )}
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                {quiz.title}
              </h3>
              <Badge className={getDifficultyColor(quiz.difficultyLevel)}>
                {quiz.difficultyLevel}
              </Badge>
            </div>
            
            {quiz.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {quiz.description}
              </p>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Subject Info */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">
                  {quiz.detectedSubject || quiz.subject}
                </span>
              </div>
              
              {quiz.questionsGenerated && (
                <div className="flex items-center gap-1 text-green-600">
                  <Brain className="w-4 h-4" />
                  <span>{quiz.totalQuestions} perguntas</span>
                </div>
              )}
            </div>

            {/* Video Info */}
            {quiz.videoUrl && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Video className="w-4 h-4" />
                <span className="truncate">
                  {quiz.videoTitle || `YouTube: ${videoId}`}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              {quiz.status === 'ready' && quiz.totalQuestions > 0 ? (
                <Button 
                  className="flex-1"
                  onClick={() => onPlay?.(quiz.id)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Jogar Quiz
                </Button>
              ) : quiz.status === 'processing' ? (
                <Button className="flex-1" disabled>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processando...
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => onEdit?.(quiz.id)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => onView?.(quiz.id)}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>

            {/* Created Date */}
            <p className="text-xs text-gray-500">
              Criado em {new Date(quiz.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}