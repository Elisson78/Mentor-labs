"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Trophy, DollarSign } from "lucide-react";

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
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
              <p className="text-3xl font-bold">{value}</p>
            </div>
            <div className="opacity-80">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function StudentsStats() {
  const stats = [
    {
      title: "Total de Alunos",
      value: 1,
      icon: <Users className="w-8 h-8" />,
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      delay: 0.1
    },
    {
      title: "Mentorias Ativas", 
      value: 7,
      icon: <Trophy className="w-8 h-8" />,
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
      delay: 0.2
    },
    {
      title: "Receita Total",
      value: "CHF 194",
      icon: <DollarSign className="w-8 h-8" />,
      bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
      delay: 0.3
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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