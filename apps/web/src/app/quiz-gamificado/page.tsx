"use client";

import { useState } from "react";
import { StudentDashboardLayout } from "@/components/student/StudentDashboardLayout";
import { QuizGamificado } from "@/components/student/QuizGamificado";

// Dados de exemplo para demonstração
const quizData = {
  id: "1",
  title: "Fundamentos de Mentoria",
  videoUrl: "https://youtube.com/watch?v=example", 
  question: "Qual é a melhor prática para mentoria?",
  options: [
    "Ouvir ativamente",
    "Dar feedback constante", 
    "Estabelecer metas claras",
    "Todas as anteriores"
  ],
  correctAnswer: 3,
  xpReward: 50,
  pointsReward: 25
};

export default function QuizGamificadoPage() {
  const [userStats, setUserStats] = useState({
    xp: 100,
    points: 50,
    level: 3,
    levelProgress: 75
  });

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  
  // Array de quizzes para demonstrar navegação
  const quizzes = [
    quizData,
    {
      ...quizData,
      id: "2", 
      title: "Técnicas de Comunicação",
      question: "Como melhorar a comunicação com o mentoreado?",
      options: [
        "Usar linguagem técnica",
        "Fazer perguntas abertas",
        "Falar mais que ouvir", 
        "Evitar feedback negativo"
      ],
      correctAnswer: 1,
      xpReward: 60,
      pointsReward: 30
    },
    {
      ...quizData,
      id: "3",
      title: "Desenvolvimento de Carreira", 
      question: "Qual é o foco principal no desenvolvimento de carreira?",
      options: [
        "Apenas habilidades técnicas",
        "Networking exclusivamente",
        "Desenvolvimento integral da pessoa",
        "Promoções rápidas"
      ],
      correctAnswer: 2,
      xpReward: 70,
      pointsReward: 35
    }
  ];

  const handleAnswer = (isCorrect: boolean, xpGained: number, pointsGained: number) => {
    setUserStats(prev => {
      const newXp = prev.xp + xpGained;
      const newPoints = prev.points + pointsGained;
      
      // Lógica simples para calcular nível e progresso
      const newLevel = Math.floor(newXp / 200) + 1;
      const xpForCurrentLevel = (newLevel - 1) * 200;
      const xpForNextLevel = newLevel * 200;
      const levelProgress = ((newXp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;
      
      return {
        xp: newXp,
        points: newPoints,
        level: newLevel,
        levelProgress: Math.min(100, Math.max(0, levelProgress))
      };
    });
  };

  const handleNext = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      // Volta para o dashboard ou mostra mensagem de conclusão
      alert("Parabéns! Você completou todos os quizzes! 🎉");
      setCurrentQuizIndex(0); // Reset para demonstração
    }
  };

  const currentQuiz = quizzes[currentQuizIndex];

  return (
    <StudentDashboardLayout>
      <div className="space-y-6">
        {/* Indicador de Progresso */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Progresso do Quiz</h2>
            <span className="text-sm text-gray-600">
              {currentQuizIndex + 1} de {quizzes.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuizIndex + 1) / quizzes.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Quiz Gamificado */}
        <QuizGamificado
          key={currentQuizIndex} // Reset component state when quiz changes
          quiz={currentQuiz}
          userStats={userStats}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />

        {/* Informações Adicionais */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Dica</h3>
          <p className="text-blue-700 text-sm">
            Assista ao vídeo completo antes de responder para maximizar seu aprendizado e garantir a resposta correta!
          </p>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}