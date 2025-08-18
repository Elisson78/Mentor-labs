"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MentorshipStats } from "@/components/mentorships/MentorshipStats";
import { MentorshipsList } from "@/components/mentorships/MentorshipsList";
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus } from "lucide-react";

export default function MinhasMentoriasPage() {
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
              Minhas Mentorias 
              <span className="text-2xl">🎯</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie suas mentorias e acompanhe o engajamento dos alunos
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              asChild
            >
              <a href="/mentoria/criar">
                <Plus className="w-4 h-4" />
                Nova Mentoria
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <MentorshipStats />
        
        {/* Mentorships List */}
        <MentorshipsList />
      </div>
    </DashboardLayout>
  );
}