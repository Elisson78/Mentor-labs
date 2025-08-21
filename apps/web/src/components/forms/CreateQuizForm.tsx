"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Eye, Database, Brain, Link } from "lucide-react";
import { QuestionBuilder } from "../quiz/QuestionBuilder";
import { VideoAnalysisAI } from "./VideoAnalysisAI";
import { VideoQuizProcessor } from "../quiz/VideoQuizProcessor";
import { ClientOnlyModal } from "../ClientOnlyModal";

interface QuizFormData {
  title: string;
  subject: string;
  description: string;
  difficultyLevel: string;
  timeLimit: string;
  supportMaterialLink: string;
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options: string[];
  correctAnswer: string | string[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'link';
  points: number;
}

export function CreateQuizForm() {
  const [showQuestionBuilder, setShowQuestionBuilder] = useState(false);
  const [showVideoAnalysis, setShowVideoAnalysis] = useState(false);
  const [showVideoProcessor, setShowVideoProcessor] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | undefined>();
  const [quizId, setQuizId] = useState<string>(() => `quiz-${Date.now()}`);
  
  const [formData, setFormData] = useState<QuizFormData>({
    title: "",
    subject: "",
    description: "",
    difficultyLevel: "Intermediate",
    timeLimit: "0",
    supportMaterialLink: "",
    questions: []
  });

  const subjects = [
    "Mathematics",
    "Science", 
    "History",
    "Literature",
    "Geography",
    "Computer Science",
    "Business",
    "Languages",
    "Arts",
    "Other"
  ];

  const difficultyLevels = [
    "Beginner",
    "Intermediate",
    "Advanced"
  ];

  const updateFormData = (field: keyof QuizFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuestionSave = (question: QuizQuestion) => {
    if (editingQuestion) {
      // Update existing question
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.map(q => q.id === question.id ? question : q)
      }));
    } else {
      // Add new question
      setFormData(prev => ({
        ...prev,
        questions: [...prev.questions, question]
      }));
    }
    setShowQuestionBuilder(false);
    setEditingQuestion(undefined);
  };

  const handleQuestionDelete = (questionId: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const handleVideoAnalysisQuestions = (generatedQuestions: any[]) => {
    const timestamp = Math.floor(Math.random() * 1000000);
    const convertedQuestions = generatedQuestions.map((q, index) => ({
      id: `ai-generated-${timestamp}-${index}`,
      question: q.question,
      type: 'multiple-choice' as const,
      options: q.options || [],
      correctAnswer: q.correctAnswer.toString(),
      mediaUrl: formData.supportMaterialLink,
      mediaType: 'video' as const,
      points: 10
    }));

    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, ...convertedQuestions]
    }));

    setShowVideoAnalysis(false);
  };

  const handleQuestionEdit = (question: QuizQuestion) => {
    setEditingQuestion(question);
    setShowQuestionBuilder(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="/dashboard">
              <ArrowLeft className="w-4 h-4" />
            </a>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Quiz</h1>
            <p className="text-gray-600">Build engaging quizzes with custom questions</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Publish Quiz
          </Button>
        </div>
      </motion.div>

      {/* Quiz Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quiz Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title and Subject */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Quiz Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter quiz title"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.subject} onValueChange={(value) => updateFormData('subject', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the quiz"
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            {/* Difficulty and Time Limit */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Difficulty Level</Label>
                <Select value={formData.difficultyLevel} onValueChange={(value) => updateFormData('difficultyLevel', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeLimit">Time Limit (minutes, 0 = no limit)</Label>
                <Input
                  id="timeLimit"
                  type="number"
                  value={formData.timeLimit}
                  onChange={(e) => updateFormData('timeLimit', e.target.value)}
                />
              </div>
            </div>

            {/* Support Material Link */}
            <div className="space-y-2">
              <Label htmlFor="supportLink" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                Link do Vídeo (Opcional)
              </Label>
              <Input
                id="supportLink"
                placeholder="https://youtube.com/watch?v=... ou https://..."
                value={formData.supportMaterialLink}
                onChange={(e) => updateFormData('supportMaterialLink', e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Cole aqui o link do vídeo que será analisado pela IA para gerar perguntas
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Questions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Questions ({formData.questions.length})</CardTitle>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Question Bank
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => {
                    if (formData.supportMaterialLink) {
                      setShowVideoProcessor(true);
                    } else {
                      setShowVideoAnalysis(true);
                    }
                  }}
                >
                  <Brain className="w-4 h-4" />
                  IA + Vídeo
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {formData.questions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-lg font-medium mb-2">No questions yet</p>
                <p className="text-sm mb-6">Start building your quiz by adding questions</p>
                <div className="flex justify-center gap-3">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => setShowQuestionBuilder(true)}
                  >
                    <span>+</span>
                    Add Question
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Browse Question Bank
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.questions.map((question, index) => (
                  <Card key={question.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm text-gray-500">
                            Question {index + 1}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {question.type.replace('-', ' ')}
                          </span>
                          {question.mediaUrl && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                              📎 Media
                            </span>
                          )}
                        </div>
                        <p className="text-gray-900 mb-2">{question.question}</p>
                        {question.type === 'multiple-choice' && (
                          <div className="text-sm text-gray-600">
                            Options: {question.options?.filter(opt => opt.trim()).length || 0}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleQuestionEdit(question)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleQuestionDelete(question.id)}
                          className="text-red-500"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                <Button 
                  className="w-full flex items-center gap-2"
                  onClick={() => setShowQuestionBuilder(true)}
                >
                  <span>+</span>
                  Add Another Question
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Video Analysis Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🤖</div>
              <div>
                <h3 className="font-semibold text-purple-900 mb-1">Análise de Vídeo com IA</h3>
                <p className="text-sm text-purple-700 mb-2">
                  Cole o link de um vídeo e deixe a IA analisar o conteúdo para gerar perguntas automaticamente!
                </p>
                                  <div className="space-y-1 text-xs text-purple-600">
                    <p>✨ Suporta YouTube, Vimeo e arquivos de vídeo</p>
                    <p>🧠 Gera perguntas contextualizadas e educativas</p>
                    <p>⚡ Economiza tempo na criação de quizzes</p>
                  </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Question Builder Modal */}
      <ClientOnlyModal show={showQuestionBuilder}>
        <QuestionBuilder
          onQuestionSave={handleQuestionSave}
          onCancel={() => {
            setShowQuestionBuilder(false);
            setEditingQuestion(undefined);
          }}
          existingQuestion={editingQuestion}
        />
      </ClientOnlyModal>

      {/* Video Analysis AI Modal */}
      <ClientOnlyModal show={showVideoAnalysis}>
        <VideoAnalysisAI
          onQuestionsGenerated={handleVideoAnalysisQuestions}
          onCancel={() => setShowVideoAnalysis(false)}
        />
      </ClientOnlyModal>

      {/* Video Quiz Processor Modal */}
      <ClientOnlyModal show={showVideoProcessor}>
        <VideoQuizProcessor
          videoUrl={formData.supportMaterialLink}
          quizId={quizId}
          onQuestionsReady={(questions) => {
            setFormData(prev => ({
              ...prev,
              questions: [...prev.questions, ...questions]
            }));
            setShowVideoProcessor(false);
          }}
          onCancel={() => setShowVideoProcessor(false)}
        />
      </ClientOnlyModal>
    </div>
  );
}