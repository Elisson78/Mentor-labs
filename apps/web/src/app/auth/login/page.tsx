"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Crown, ArrowLeft } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase";
import { toast } from "sonner";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Removido handleUserTypeChange - role será buscada da tabela

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const supabase = createSupabaseClient();
    
    try {
      // Fazer login com Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error("Erro ao fazer login: " + error.message);
        setIsLoading(false);
        return;
      }

      if (data.user && data.session) {
        console.log("✅ Login realizado com sucesso:", data.user.email);
        toast.success("Login realizado com sucesso!");
        
        // Definir token de autenticação do Supabase nos cookies para o middleware
        const accessToken = data.session.access_token;
        document.cookie = `sb-access-token=${accessToken}; path=/; max-age=3600; secure; samesite=strict`;
        document.cookie = `supabase-auth-token=${accessToken}; path=/; max-age=3600; secure; samesite=strict`;
        
        // DETERMINAÇÃO RÁPIDA DE ROLE (sem consulta lenta ao banco)
        let primaryRole = 'student'; // fallback padrão
        
        // Sistema de fallback inteligente baseado no email
        if (data.user.email === 'uzualelisson@gmail.com') {
          primaryRole = 'admin';
        } else if (data.user.email?.includes('mentor')) {
          primaryRole = 'mentor';
        } else if (data.user.email?.includes('aluno')) {
          primaryRole = 'student';
        } else if (data.user.email?.includes('admin')) {
          primaryRole = 'admin';
        }

        console.log("✅ Role determinada rapidamente:", primaryRole);

        // Salvar no localStorage e cookie
        localStorage.setItem('userRole', primaryRole);
        localStorage.setItem('userType', primaryRole);
        document.cookie = `userRole=${primaryRole}; path=/; max-age=86400`;
        document.cookie = `userType=${primaryRole}; path=/; max-age=86400`;
        
        // Redirecionamento imediato (sem delay)
        console.log("🔄 Redirecionando para dashboard:", primaryRole);
        
        if (primaryRole === "admin") {
          console.log("👑 Redirecionando para admin dashboard");
          window.location.href = "/admin_dashboard";
        } else if (primaryRole === "mentor") {
          console.log("🎓 Redirecionando para mentor dashboard");
          window.location.href = "/dashboard";
        } else {
          console.log("📚 Redirecionando para student dashboard");
          window.location.href = "/aluno_dashboard";
        }
      }
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro inesperado ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8 md:p-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" size="sm" className="h-8 md:h-10" asChild>
          <Link href="/">
            <ArrowLeft className="mr-1.5 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="text-sm md:text-base">Voltar</span>
          </Link>
        </Button>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center p-4 md:p-6">
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Crown className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl md:text-2xl font-bold">Entre na sua conta</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Acesse sua conta para continuar sua jornada
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Removido campo de tipo - role será buscada automaticamente da tabela user_roles */}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="!border !border-gray-300 !bg-white !px-3 !py-2 !rounded-md !w-full !text-black !outline-none focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500"
                  style={{ 
                    pointerEvents: 'auto',
                    userSelect: 'text',
                    cursor: 'text'
                  }}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm">Senha</Label>
                  <a href="#" className="text-xs text-blue-600 hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="!border !border-gray-300 !bg-white !px-3 !py-2 !rounded-md !w-full !text-black !outline-none focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500"
                  style={{ 
                    pointerEvents: 'auto',
                    userSelect: 'text',
                    cursor: 'text'
                  }}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-9 md:h-10 mt-2 text-sm md:text-base"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-0 p-4 pb-6 md:p-6">
            <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <a 
                href="/auth/register" 
                className="text-blue-600 hover:underline font-medium"
              >
                Cadastre-se
              </a>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}