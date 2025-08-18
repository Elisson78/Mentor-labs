"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  FileQuestion, 
  Users, 
  Eye, 
  Edit, 
  Trash2,
  Clock,
  DollarSign
} from "lucide-react";

interface MentorshipItem {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  students: number;
}

interface QuizItem {
  id: string;
  title: string;
  description: string;
  questions: number;
  completions: number;
}

interface StudentItem {
  id: string;
  name: string;
  email: string;
  mentorships: number;
  joinDate: string;
}

function MentorshipCard({ item }: { item: MentorshipItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {item.price}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {item.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {item.students} alunos
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function QuizCard({ item }: { item: QuizItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FileQuestion className="w-4 h-4" />
                  {item.questions} questões
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {item.completions} completados
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StudentCard({ item }: { item: StudentItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {item.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.email}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{item.mentorships} mentorias</span>
                  <span>Desde {item.joinDate}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ContentManagement() {
  // Mock data
  const mentorships: MentorshipItem[] = [
    {
      id: "1",
      title: "teste",
      description: "mentoria teste",
      price: "CHF 70",
      duration: "4 semanas",
      students: 0
    },
    {
      id: "2", 
      title: "teste",
      description: "teste mentoria",
      price: "CHF 62",
      duration: "4 semanas",
      students: 0
    }
  ];

  const quizzes: QuizItem[] = [
    {
      id: "1",
      title: "Quiz de JavaScript Básico",
      description: "Teste seus conhecimentos fundamentais em JavaScript",
      questions: 15,
      completions: 23
    },
    {
      id: "2",
      title: "React Hooks Avançado",
      description: "Quiz sobre hooks personalizados e otimização",
      questions: 12,
      completions: 18
    }
  ];

  const students: StudentItem[] = [
    {
      id: "1",
      name: "Ana Silva",
      email: "ana.silva@email.com",
      mentorships: 2,
      joinDate: "Jan 2024"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Gerenciar Conteúdo</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mentorships" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mentorships" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Minhas Mentorias (7)
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="flex items-center gap-2">
                <FileQuestion className="w-4 h-4" />
                Meus Quizzes (14)
              </TabsTrigger>
              <TabsTrigger value="students" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Meus Alunos (1)
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mentorships" className="mt-6">
              <div className="space-y-4">
                {mentorships.map((mentorship) => (
                  <MentorshipCard key={mentorship.id} item={mentorship} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="quizzes" className="mt-6">
              <div className="space-y-4">
                {quizzes.map((quiz) => (
                  <QuizCard key={quiz.id} item={quiz} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="students" className="mt-6">
              <div className="space-y-4">
                {students.map((student) => (
                  <StudentCard key={student.id} item={student} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}