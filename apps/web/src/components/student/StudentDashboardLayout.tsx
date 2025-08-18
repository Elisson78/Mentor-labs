"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StudentSidebar } from "./StudentSidebar";
import { Button } from "@/components/ui/button";
import { RefreshCw, User, Menu, Crown } from "lucide-react";

interface StudentDashboardLayoutProps {
  children: React.ReactNode;
}

export function StudentDashboardLayout({ children }: StudentDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar for Mobile - Drawer Style */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            className="fixed top-0 left-0 z-30 h-full md:hidden"
          >
            <StudentSidebar onClose={() => setSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar for Desktop - Always visible */}
      <div className="hidden md:block">
        <StudentSidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden" 
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              {/* Mobile Logo (visible on small screens) */}
              <div className="flex md:hidden items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">Mentorlabs</span>
              </div>
              
              {/* Dashboard Title */}
              <div className="hidden md:block">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  Olá, ELISSON 
                  <span className="text-xl sm:text-2xl">👋</span>
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Continue sua jornada de desenvolvimento. Você está indo muito bem!
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                <div>
                  <div className="text-xs opacity-80">SEQUÊNCIA</div>
                  <div className="font-bold">0 dias</div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
              >
                <User className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Ver Perfil</span>
              </Button>
            </div>
          </div>

          {/* Mobile Title (only on small screens) */}
          <div className="md:hidden mt-2">
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-1">
              Olá, ELISSON 
              <span className="text-lg">👋</span>
            </h1>
            <p className="text-xs text-gray-600">
              Continue sua jornada de desenvolvimento.
            </p>
          </div>
        </motion.header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-3 sm:p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}