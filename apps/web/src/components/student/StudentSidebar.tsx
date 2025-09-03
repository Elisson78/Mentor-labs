"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useActiveRoute } from "@/hooks/useActiveRoute";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import {
  Crown,
  Settings,
  LayoutDashboard,
  BookOpen,
  FileQuestion,
  BarChart3,
  LogOut,
  User,
  Gamepad2,
  X
} from "lucide-react";

interface StudentSidebarProps {
  className?: string;
  onClose?: () => void;
}

// Componente para exibir informações do usuário logado
function UserInfo() {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <>
        <p className="font-semibold text-sm text-gray-900">Carregando...</p>
        <p className="text-xs text-gray-500 truncate">...</p>
      </>
    );
  }

  const displayName = user.user_metadata?.name || 
                     user.email?.split('@')[0]?.toUpperCase() || 
                     'USUÁRIO';
  
  return (
    <>
      <p className="font-semibold text-sm text-gray-900">{displayName}</p>
      <p className="text-xs text-gray-500 truncate">{user.email}</p>
    </>
  );
}

export function StudentSidebar({ className, onClose }: StudentSidebarProps) {
  const { isActive } = useActiveRoute();
  const router = useRouter();

  const handleLogout = () => {
    // Confirmar logout
    const confirmLogout = window.confirm('Tem certeza que deseja sair?');
    
    if (confirmLogout) {
      // Limpar dados de sessão
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userSession');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        sessionStorage.clear();
      }
      
      // Fechar sidebar se estiver aberta (mobile)
      if (onClose) {
        onClose();
      }
      
      // Mostrar feedback e redirecionar
      setTimeout(() => {
        router.push('/');
      }, 100);
    }
  };
  
  const menuItems = [
    {
      section: "ADMIN",
      items: [
        { icon: Settings, label: "Painel Admin", href: "/admin" }
      ]
    },
    {
      section: "APRENDIZADO",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", href: "/aluno_dashboard" },
        { icon: BookOpen, label: "Trilhas de Aprendizado", href: "/trilhas-aprendizado" },
        { icon: FileQuestion, label: "Fazer Quiz", href: "/fazer-quiz" },
        { icon: Gamepad2, label: "Quiz Gamificado", href: "/quiz-gamificado" },
        { icon: BarChart3, label: "Meus Resultados", href: "/meus-resultados" }
      ]
    }
  ];

  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`w-64 bg-white border-r border-gray-200 h-full flex flex-col ${className}`}
    >
      {/* Logo */}
      <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">Mentorlabs</h1>
            <p className="text-xs text-gray-500">Mentoria de Alto Impacto</p>
          </div>
        </div>
        
        {/* Close button (only visible on mobile) */}
        {onClose && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-3 md:py-4">
        {menuItems.map((section, sectionIndex) => (
          <div key={section.section} className="mb-4 md:mb-6">
            <h3 className="px-4 md:px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 md:mb-3">
              {section.section}
            </h3>
            <nav className="space-y-1 px-2 md:px-3">
              {section.items.map((item, itemIndex) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                    ${isActive(item.href)
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  onClick={onClose}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </motion.a>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="p-3 md:p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">E</span>
          </div>
          <div className="flex-1 min-w-0">
            <UserInfo />
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start gap-2 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </motion.aside>
  );
}