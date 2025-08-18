"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus, PlusCircle, Menu, X, Crown } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
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
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar for Desktop - Always visible */}
      <div className="hidden md:block">
        <Sidebar />
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
                  Dashboard do Mentor 
                  <span className="text-2xl">👑</span>
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Olá, ELISSON! Gerencie seus conteúdos e acompanhe seus aprendizes.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white sm:flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1"
                asChild
              >
                <a href="/mentoria/criar">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Criar Mentoria</span>
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="sm:flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1"
                asChild
              >
                <a href="/quiz/criar">
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Criar Quiz</span>
                </a>
              </Button>
            </div>
          </div>
          
          {/* Mobile Title (only on small screens) */}
          <div className="md:hidden mt-2">
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-1">
              Dashboard do Mentor 
              <span className="text-xl">👑</span>
            </h1>
            <p className="text-xs text-gray-600">
              Olá, ELISSON! Gerencie seus conteúdos.
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