"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Zap, Flame, Target } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
  delay?: number;
}

function StatCard({ title, value, icon, bgColor, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <Card className={`${bgColor} border-0 text-white overflow-hidden relative`}>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">{title}</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">{value}</p>
            </div>
            <div className="opacity-80">
              {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function StudentStats() {
  const stats = [
    {
      title: "Nível Atual",
      value: 1,
      icon: <Star className="w-8 h-8" />,
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      delay: 0.1
    },
    {
      title: "XP Total", 
      value: 10,
      icon: <Zap className="w-8 h-8" />,
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
      delay: 0.2
    },
    {
      title: "Sequência",
      value: "0 dias",
      icon: <Flame className="w-8 h-8" />,
      bgColor: "bg-gradient-to-br from-orange-500 to-red-500",
      delay: 0.3
    },
    {
      title: "Quizzes",
      value: 3,
      icon: <Target className="w-8 h-8" />,
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
      delay: 0.4
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          bgColor={stat.bgColor}
          delay={stat.delay}
        />
      ))}
    </div>
  );
}