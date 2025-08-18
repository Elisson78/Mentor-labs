"use client";

import { motion } from "framer-motion";
import { QuizCard } from "./QuizCard";

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

export function QuizzesList() {
  // Mock data - estes seriam os quizzes criados pelo usuário
  const quizzes: QuizData[] = [
    {
      id: "1",
      title: "Matemática Avançada",
      description: "Quiz sobre cálculo diferencial e integral",
      level: "advanced",
      levelColor: "bg-purple-500",
      subject: "mathematics",
      subjectColor: "bg-blue-500",
      questions: 2,
      timeLimit: 30,
      attempts: 0,
      averageScore: 0,
      publishDate: "03/08/2025",
      status: "published"
    },
    {
      id: "2",
      title: "História do Brasil",
      description: "Quiz sobre os principais eventos da história brasileira",
      level: "intermediate",
      levelColor: "bg-yellow-500",
      subject: "history",
      subjectColor: "bg-green-500",
      questions: 2,
      timeLimit: 20,
      attempts: 0,
      averageScore: 0,
      publishDate: "03/08/2025",
      status: "published"
    },
    {
      id: "3",
      title: "Fundamentos de Liderança",
      description: "Quiz básico sobre fundamentos de liderança empresarial",
      level: "beginner",
      levelColor: "bg-green-500",
      subject: "business",
      subjectColor: "bg-indigo-500",
      questions: 5,
      timeLimit: 15,
      attempts: 3,
      averageScore: 78,
      publishDate: "01/08/2025",
      status: "published"
    },
    {
      id: "4",
      title: "Programação Python Básica",
      description: "Quiz introdutório sobre conceitos básicos de Python",
      level: "beginner",
      levelColor: "bg-green-500",
      subject: "programming",
      subjectColor: "bg-cyan-500",
      questions: 8,
      timeLimit: 25,
      attempts: 2,
      averageScore: 65,
      publishDate: "30/07/2025",
      status: "published"
    },
    {
      id: "5",
      title: "Marketing Digital Estratégico",
      description: "Quiz sobre estratégias avançadas de marketing digital",
      level: "advanced",
      levelColor: "bg-purple-500",
      subject: "marketing",
      subjectColor: "bg-pink-500",
      questions: 12,
      timeLimit: 45,
      attempts: 1,
      averageScore: 82,
      publishDate: "28/07/2025",
      status: "published"
    },
    {
      id: "6",
      title: "Inglês Conversacional",
      description: "Quiz de conversação em inglês para nível intermediário",
      level: "intermediate",
      levelColor: "bg-yellow-500",
      subject: "languages",
      subjectColor: "bg-red-500",
      questions: 6,
      timeLimit: 20,
      attempts: 1,
      averageScore: 45,
      publishDate: "25/07/2025",
      status: "draft"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="space-y-6"
    >
      {quizzes.map((quiz, index) => (
        <QuizCard 
          key={quiz.id} 
          quiz={quiz} 
          index={index}
        />
      ))}
      
      {quizzes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-lg font-medium mb-2">Nenhum quiz criado ainda</p>
          <p className="text-sm mb-6">Comece criando seu primeiro quiz</p>
        </div>
      )}
    </motion.div>
  );
}