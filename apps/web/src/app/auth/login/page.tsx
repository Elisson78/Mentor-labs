"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Crown, BookOpen, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createSupabaseClient } from "@/lib/supabase";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "" // "mentor" ou "student"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      userType: value
    }));
  };

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

      if (data.user) {
        // Armazenar tipo de usuário no metadata ou localStorage temporariamente
        // Em produção, isso viria de uma tabela de perfis no Supabase
        localStorage.setItem('userType', formData.userType);
        
        toast.success("Login realizado com sucesso!");
        
        // Redirecionamento baseado no tipo de usuário
        if (formData.userType === "mentor") {
          router.push("/dashboard");
        } else {
          router.push("/aluno_dashboard");
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
          <a href="/">
            <ArrowLeft className="mr-1.5 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="text-sm md:text-base">Voltar</span>
          </a>
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
              <div className="space-y-2">
                <Label htmlFor="userType" className="text-sm">Tipo de Conta</Label>
                <Select 
                  value={formData.userType} 
                  onValueChange={handleUserTypeChange}
                  required
                >
                  <SelectTrigger className="w-full h-9 md:h-10 text-sm md:text-base">
                    <SelectValue placeholder="Selecione o tipo de conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Entrar como:</SelectLabel>
                      <SelectItem value="mentor" className="flex items-center gap-2 text-sm md:text-base">
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-blue-600" />
                          <span>Mentor</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="student" className="flex items-center gap-2 text-sm md:text-base">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-purple-600" />
                          <span>Aluno</span>
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                {formData.userType === "mentor" && (
                  <p className="text-xs text-blue-600 mt-1">
                    Acesse seu painel de mentor para gerenciar suas mentorias.
                  </p>
                )}
                
                {formData.userType === "student" && (
                  <p className="text-xs text-purple-600 mt-1">
                    Acesse seu dashboard de aluno para continuar aprendendo.
                  </p>
                )}
              </div>

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
                  className="h-9 md:h-10 text-sm md:text-base"
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
                  className="h-9 md:h-10 text-sm md:text-base"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-9 md:h-10 mt-2 text-sm md:text-base"
                disabled={isLoading || !formData.userType}
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