"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Star, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  XCircle,
  PlayCircle,
  Volume2,
  VolumeX
} from "lucide-react";

interface QuizGamificadoProps {
  quiz: {
    id: string;
    title: string;
    videoUrl?: string;
    question: string;
    options: string[];
    correctAnswer: number;
    xpReward: number;
    pointsReward: number;
  };
  userStats: {
    xp: number;
    points: number;
    level: number;
    levelProgress: number;
  };
  onAnswer: (isCorrect: boolean, xpGained: number, pointsGained: number) => void;
  onNext: () => void;
}

export function QuizGamificado({ quiz, userStats, onAnswer, onNext }: QuizGamificadoProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    if (!isAnswered) {
      setSelectedAnswer(optionIndex);
    }
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === quiz.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);
    setShowResult(true);
    
    const xpGained = correct ? quiz.xpReward : Math.floor(quiz.xpReward * 0.3);
    const pointsGained = correct ? quiz.pointsReward : Math.floor(quiz.pointsReward * 0.3);
    
    onAnswer(correct, xpGained, pointsGained);
  };

  const getOptionClass = (index: number) => {
    if (!isAnswered) {
      return selectedAnswer === index 
        ? "bg-blue-100 border-blue-500 text-blue-700"
        : "bg-white border-gray-200 hover:bg-gray-50";
    }
    
    if (index === quiz.correctAnswer) {
      return "bg-green-100 border-green-500 text-green-700";
    }
    
    if (index === selectedAnswer && index !== quiz.correctAnswer) {
      return "bg-red-100 border-red-500 text-red-700";
    }
    
    return "bg-gray-50 border-gray-200 text-gray-500";
  };

  const getOptionIcon = (index: number) => {
    if (!isAnswered) return null;
    
    if (index === quiz.correctAnswer) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    
    if (index === selectedAnswer && index !== quiz.correctAnswer) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
    
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Gamificado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* XP */}
            <div className="flex items-center gap-2">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs opacity-80">XP</div>
                <div className="font-bold text-lg">{userStats.xp}</div>
              </div>
            </div>

            {/* Pontos */}
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs opacity-80">PONTOS</div>
                <div className="font-bold text-lg">{userStats.points}</div>
              </div>
            </div>

            {/* Nível */}
            <div className="flex items-center gap-2">
              <div className="bg-green-500 p-2 rounded-lg">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs opacity-80">NÍVEL</div>
                <div className="font-bold text-lg">{userStats.level}</div>
              </div>
            </div>
          </div>


        </div>

        {/* Barra de Progresso do Nível */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm opacity-80">Progresso do Nível</span>
            <span className="text-sm opacity-80">{userStats.levelProgress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${userStats.levelProgress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-white rounded-full h-2"
            />
          </div>
        </div>
      </motion.div>

      {/* Vídeo Explicativo */}
      {quiz.videoUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                <div className="aspect-video flex items-center justify-center">
                  {!videoPlaying ? (
                    <div className="text-center">
                      <Button
                        onClick={() => setVideoPlaying(true)}
                        className="bg-white/20 hover:bg-white/30 text-white border-0 p-4"
                      >
                        <PlayCircle className="w-12 h-12" />
                      </Button>
                      <p className="text-white mt-4">Clique para reproduzir o vídeo explicativo</p>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <Button
                            onClick={() => setIsMuted(!isMuted)}
                            className="bg-white/20 hover:bg-white/30 text-white border-0"
                          >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                          </Button>
                        </div>
                        <p className="text-lg">🎥 Vídeo Explicativo Reproduzindo...</p>
                        <p className="text-sm opacity-75 mt-2">
                          URL: {quiz.videoUrl}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-center text-gray-600">
                Assista ao vídeo e responda o quiz abaixo.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quiz */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              {quiz.title}
              <Badge variant="secondary" className="ml-auto">
                +{quiz.xpReward} XP
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pergunta */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Pergunta:</h3>
              <p className="text-gray-700">{quiz.question}</p>
            </div>

            {/* Opções */}
            <div className="space-y-3">
              {quiz.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 flex items-center justify-between ${getOptionClass(index)}`}
                  whileHover={!isAnswered ? { scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                  {getOptionIcon(index)}
                </motion.button>
              ))}
            </div>

            {/* Botão Confirmar */}
            {!isAnswered && (
              <Button
                onClick={handleConfirmAnswer}
                disabled={selectedAnswer === null}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
              >
                Confirmar Resposta
              </Button>
            )}

            {/* Resultado */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg text-center ${
                  isCorrect 
                    ? "bg-green-100 border border-green-300" 
                    : "bg-red-100 border border-red-300"
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <span className={`font-bold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                    {isCorrect ? "Correto!" : "Incorreto!"}
                  </span>
                </div>
                <p className={`text-sm ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                  {isCorrect 
                    ? `Parabéns! Você ganhou ${quiz.xpReward} XP e ${quiz.pointsReward} pontos!`
                    : `Você ganhou ${Math.floor(quiz.xpReward * 0.3)} XP e ${Math.floor(quiz.pointsReward * 0.3)} pontos pela tentativa.`
                  }
                </p>
              </motion.div>
            )}

            {/* Botão Avançar - Posicionado abaixo da resposta */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-6"
              >
                <Button 
                  onClick={onNext}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 flex items-center justify-center gap-2"
                >
                  Avançar para Próxima Pergunta
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}