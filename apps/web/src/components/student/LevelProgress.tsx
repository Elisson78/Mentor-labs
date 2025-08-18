"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Zap } from "lucide-react";

export function LevelProgress() {
  const currentLevel = 1;
  const currentXP = 10;
  const nextLevelXP = 100;
  const progressPercentage = (currentXP / nextLevelXP) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Nível {currentLevel}</h3>
                <p className="text-gray-600 text-xs md:text-sm">Continue assim para evoluir!</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="flex items-center gap-1 text-purple-600 font-semibold text-sm md:text-base">
                <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" />
                {currentXP} XP
              </div>
              <p className="text-xs text-gray-500">{nextLevelXP - currentXP} XP para o nível {currentLevel + 1}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-gray-600">Progresso do Nível</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ delay: 0.7, duration: 1 }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 md:h-3 rounded-full"
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>{currentXP} XP</span>
              <span>{nextLevelXP} XP</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}