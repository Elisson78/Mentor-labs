"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Clock, 
  BookOpen, 
  PlayCircle,
  ArrowRight,
  Gamepad2 
} from "lucide-react";

interface LearningTrack {
  id: string;
  title: string;
  description: string;
  level: string;
  levelColor: string;
  duration: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  modules: number;
  xpTotal: number;
  totalLessonsInTrack: number;
  icon: string;
  iconColor: string;
}

interface LearningTrackCardProps {
  track: LearningTrack;
  index: number;
}

function LearningTrackCard({ track, index }: LearningTrackCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-3 sm:p-4 md:p-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1 mb-3 sm:mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${track.progress}%` }}
              transition={{ delay: 0.5 + (index * 0.1), duration: 1 }}
              className="bg-red-500 h-1 rounded-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4">
            {/* Icon - Hidden on XS, visible from SM up */}
            <div className={`hidden sm:flex w-10 h-10 md:w-12 md:h-12 ${track.iconColor} rounded-full items-center justify-center flex-shrink-0`}>
              <span className="text-xl md:text-2xl">{track.icon}</span>
            </div>

            {/* Content */}
            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {track.title}
                </h3>
                <Badge 
                  variant="secondary" 
                  className={`${track.levelColor} text-white text-xs`}
                >
                  {track.level}
                </Badge>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">{track.description}</p>

              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                {track.duration}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div className="text-purple-600">
                  <div className="font-bold text-base sm:text-lg">{track.modules}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">Módulos</div>
                </div>
                <div className="text-green-600">
                  <div className="font-bold text-base sm:text-lg">{track.xpTotal}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">XP Total</div>
                </div>
                <div className="text-purple-600">
                  <div className="font-bold text-base sm:text-lg">{track.totalLessonsInTrack}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">Lições</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 sm:gap-2 h-8 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Continuar</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex items-center gap-1 sm:gap-2 h-8 text-xs sm:text-sm px-2 sm:px-3"
                  asChild
                >
                  <a href="/quiz-gamificado">
                    <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Quiz Gamificado</span>
                    <span className="inline xs:hidden">Quiz</span>
                  </a>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex items-center gap-1 sm:gap-2 h-8 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Detalhes</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function LearningTracks() {
  const tracks: LearningTrack[] = [
    {
      id: "1",
      title: "Jornada da Liderança",
      description: "Desenvolva suas habilidades de liderança do básico ao avançado",
      level: "beginner",
      levelColor: "bg-green-500",
      duration: "40h",
      progress: 0,
      totalLessons: 3,
      completedLessons: 0,
      modules: 1,
      xpTotal: 250,
      totalLessonsInTrack: 3,
      icon: "⭐",
      iconColor: "bg-red-500"
    },
    {
      id: "2",
      title: "Liderança Transformadora",
      description: "Desenvolva habilidades de liderança que inspiram e transformam equipes através de técnicas comprovadas e cases reais.",
      level: "intermediate",
      levelColor: "bg-yellow-500",
      duration: "8h",
      progress: 0,
      totalLessons: 6,
      completedLessons: 0,
      modules: 2,
      xpTotal: 400,
      totalLessonsInTrack: 6,
      icon: "⭐",
      iconColor: "bg-red-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mb-6 sm:mb-8"
    >
      <Card>
        <CardHeader className="px-4 py-3 sm:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg md:text-xl">Suas Trilhas de Aprendizado</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-1 sm:gap-2 text-blue-600 h-8 text-xs sm:text-sm px-2 sm:px-3"
            >
              <span>Ver Todas</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
          {tracks.map((track, index) => (
            <LearningTrackCard key={track.id} track={track} index={index} />
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}