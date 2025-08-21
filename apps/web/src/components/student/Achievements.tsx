"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Zap, Clock } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  bgColor: string;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

interface WeeklyStats {
  quizzesCompleted: number;
  studyTime: string;
  xpGained: number;
}

export function Achievements() {
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Primeiro Passo",
      description: "Complete seu primeiro quiz",
      icon: <Trophy className="w-6 h-6" />,
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
      unlocked: true
    },
    {
      id: "2",
      title: "Persistente",
      description: "Mantenha uma sequência de 7 dias",
      icon: <Star className="w-6 h-6" />,
      iconColor: "text-gray-400",
      bgColor: "bg-gray-50",
      unlocked: false
    },
    {
      id: "3",
      title: "Evoluindo",
      description: "Alcance o nível 5",
      icon: <Zap className="w-6 h-6" />,
      iconColor: "text-gray-400",
      bgColor: "bg-gray-50",
      unlocked: false
    }
  ];

  const weeklyStats: WeeklyStats = {
    quizzesCompleted: 3,
    studyTime: "2h 30m",
    xpGained: 150
  };

  const nextGoals = [
    { label: "Próximo Nível", description: "Faltam apenas 90 XP" },
    { label: "Esta Semana", description: "1 de 3 conquistas" }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Conquistas */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader className="px-4 py-3 md:pb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              <CardTitle className="text-base sm:text-lg">Conquistas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-4 py-2 space-y-3 md:space-y-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + (index * 0.1) }}
                className={`
                  flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all
                  ${achievement.unlocked ? achievement.bgColor : 'bg-gray-50'}
                `}
              >
                <div className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0
                  ${achievement.unlocked ? achievement.bgColor : 'bg-gray-100'}
                `}>
                  <div className={achievement.iconColor}>
                    {React.cloneElement(achievement.icon as React.ReactElement<any>, { className: "w-4 h-4 sm:w-5 sm:h-5" })}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs sm:text-sm text-gray-900 truncate">
                    {achievement.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-600 truncate">
                    {achievement.description}
                  </p>
                </div>
                {achievement.unlocked && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                    Desbloqueado
                  </Badge>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Cards em grid para telas pequenas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
        {/* Próxima Meta */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">Próxima Meta</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Próximo Nível</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Faltam apenas 90 XP</p>
              <div className="text-[10px] sm:text-xs text-gray-500">1 de 3 conquistas</div>
              
              {/* Progress indicator */}
              <div className="w-full bg-green-200 rounded-full h-1.5 sm:h-2 mt-2 sm:mt-3">
                <div className="bg-green-500 h-1.5 sm:h-2 rounded-full w-1/3"></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Esta Semana */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader className="px-4 py-3 md:pb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <CardTitle className="text-base sm:text-lg">Esta Semana</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Quizzes Completados</span>
                    <span className="font-semibold text-xs sm:text-sm">{weeklyStats.quizzesCompleted}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Tempo Estudado</span>
                    <span className="font-semibold text-xs sm:text-sm">{weeklyStats.studyTime}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">XP Ganho</span>
                    <span className="font-semibold text-xs sm:text-sm text-purple-600">+{weeklyStats.xpGained} XP</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}