"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { QuizStats } from "@/components/quizzes/QuizStats";
import { QuizzesList } from "@/components/quizzes/QuizzesList";
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus } from "lucide-react";

export default function MeusQuizzesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Meus Quizzes 
              <span className="text-2xl">📝</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie seus quizzes e acompanhe o desempenho dos estudantes
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
              asChild
            >
              <a href="/quiz/criar">
                <Plus className="w-4 h-4" />
                Novo Quiz
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <QuizStats />
        
        {/* Quizzes List */}
        <QuizzesList />
      </div>
    </DashboardLayout>
  );
}