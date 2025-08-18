"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StudentsStats } from "@/components/students/StudentsStats";
import { StudentsSearch } from "@/components/students/StudentsSearch";
import { StudentsList } from "@/components/students/StudentsList";
import { Button } from "@/components/ui/button";
import { RefreshCw, UserPlus } from "lucide-react";

export default function MeusAlunosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mentorshipFilter, setMentorshipFilter] = useState("all");

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
              Meus Alunos 
              <span className="text-2xl">👥</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Acompanhe o progresso e engajamento dos seus alunos
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Convidar Aluno
            </Button>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <StudentsStats />
        
        {/* Search and Filters */}
        <StudentsSearch 
          onSearchChange={setSearchTerm}
          onMentorshipFilter={setMentorshipFilter}
        />
        
        {/* Students List */}
        <StudentsList 
          searchTerm={searchTerm}
          mentorshipFilter={mentorshipFilter}
        />
      </div>
    </DashboardLayout>
  );
}