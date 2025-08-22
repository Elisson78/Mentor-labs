"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Crown, BookOpen, ArrowLeft, ArrowRight, User } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createSupabaseClient } from "@/lib/supabase";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
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
    
    // Validações
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      setIsLoading(false);
      return;
    }
    
    if (!formData.agreeTerms) {
      toast.error("Você deve aceitar os termos de uso");
      setIsLoading(false);
      return;
    }
    
    if (!formData.userType) {
      toast.error("Selecione o tipo de usuário");
      setIsLoading(false);
      return;
    }
    
    const supabase = createSupabaseClient();
    
    try {
      // Criar conta com Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            user_type: formData.userType
          }
        }
      });

      if (error) {
        toast.error("Erro ao criar conta: " + error.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Armazenar tipo de usuário temporariamente
        localStorage.setItem('userType', formData.userType);
        
        if (data.user.email_confirmed_at) {
          // Email já confirmado, fazer login
          toast.success("Conta criada com sucesso!");
          
          if (formData.userType === "mentor") {
            router.push("/dashboard");
          } else {
            router.push("/aluno_dashboard");
          }
        } else {
          // Precisa confirmar email
          toast.success("Conta criada! Verifique seu email para confirmar.");
          router.push("/auth/login");
        }
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast.error("Erro inesperado ao criar conta");
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
            <CardTitle className="text-xl md:text-2xl font-bold">Crie sua conta</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Preencha seus dados para se cadastrar
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Seu nome completo"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-9 md:h-10 text-sm md:text-base"
                />
              </div>

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
                      <SelectLabel className="text-xs md:text-sm">Eu quero me cadastrar como:</SelectLabel>
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
                    Como mentor, você poderá criar e gerenciar mentorias e quizzes.
                  </p>
                )}
                
                {formData.userType === "student" && (
                  <p className="text-xs text-purple-600 mt-1">
                    Como aluno, você terá acesso a mentorias e ferramentas de aprendizado.
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
                <Label htmlFor="password" className="text-sm">Senha</Label>
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
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm">Confirme a senha</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="h-9 md:h-10 text-sm md:text-base"
                />
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">As senhas não coincidem</p>
                )}
              </div>
              
              <div className="flex items-start space-x-2 mt-3">
                <Checkbox 
                  id="terms" 
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, agreeTerms: checked === true }))
                  }
                  className="mt-0.5"
                />
                <label
                  htmlFor="terms"
                  className="text-xs md:text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Li e concordo com os{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Termos de Uso
                  </a>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-9 md:h-10 mt-4 text-sm md:text-base"
                disabled={isLoading || !formData.agreeTerms || formData.password !== formData.confirmPassword || !formData.userType}
              >
                {isLoading ? "Cadastrando..." : (
                  <div className="flex items-center justify-center">
                    <span>Finalizar Cadastro</span>
                    <ArrowRight className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pt-0 p-4 pb-6 md:p-6">
            <div className="text-center text-xs md:text-sm">
              Já possui uma conta?{" "}
              <a 
                href="/auth/login" 
                className="text-blue-600 hover:underline font-medium"
              >
                Faça login
              </a>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}