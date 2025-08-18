"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Edit, 
  Trash2, 
  FileQuestion, 
  Clock, 
  Users, 
  Calendar,
  TrendingUp
} from "lucide-react";

interface QuizData {
  id: string;
  title: string;
  description: string;
  level: string;
  levelColor: string;
  subject: string;
  subjectColor: string;
  questions: number;
  timeLimit: number;
  attempts: number;
  averageScore: number;
  publishDate: string;
  status: 'published' | 'draft';
}

interface QuizCardProps {
  quiz: QuizData;
  index: number;
}

export function QuizCard({ quiz, index }: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {quiz.title}
                </h3>
                <div className="flex gap-2">
                  <Badge 
                    variant="secondary" 
                    className={`${quiz.levelColor} text-white text-xs`}
                  >
                    {quiz.level}
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className={`${quiz.subjectColor} text-white text-xs`}
                  >
                    {quiz.subject}
                  </Badge>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FileQuestion className="w-4 h-4" />
                  {quiz.questions} questões
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {quiz.timeLimit} min
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {quiz.attempts} tentativas
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {quiz.averageScore}% média
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {quiz.publishDate}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Badge 
                variant={quiz.status === 'published' ? 'default' : 'secondary'}
                className={quiz.status === 'published' ? 'bg-green-100 text-green-700' : ''}
              >
                {quiz.status === 'published' ? 'Publicado' : 'Rascunho'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}