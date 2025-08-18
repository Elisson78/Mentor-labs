"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileQuestion, Users, DollarSign } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor: string;
  delay?: number;
}

function StatCard({ title, value, icon, iconColor, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <Card className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
            <div className={`p-3 rounded-full ${iconColor}`}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function StatsCards() {
  const stats = [
    {
      title: "Mentorias Criadas",
      value: 7,
      icon: <BookOpen className="w-6 h-6 text-white" />,
      iconColor: "bg-purple-500",
      delay: 0.1
    },
    {
      title: "Quizzes Criados", 
      value: 14,
      icon: <FileQuestion className="w-6 h-6 text-white" />,
      iconColor: "bg-blue-500",
      delay: 0.2
    },
    {
      title: "Alunos Ativos",
      value: 1,
      icon: <Users className="w-6 h-6 text-white" />,
      iconColor: "bg-green-500", 
      delay: 0.3
    },
    {
      title: "Receita Total",
      value: "CHF 194",
      icon: <DollarSign className="w-6 h-6 text-white" />,
      iconColor: "bg-orange-500",
      delay: 0.4
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconColor={stat.iconColor}
          delay={stat.delay}
        />
      ))}
    </div>
  );
}