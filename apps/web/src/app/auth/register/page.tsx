"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Crown, BookOpen, ArrowLeft, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { register } from "@/lib/auth";
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
    
    try {
      const user = await register(
        formData.email, 
        formData.password, 
        formData.name, 
        formData.userType as 'mentor' | 'student'
      );
      
      if (user) {
        toast.success("Conta criada com sucesso!");
        
        // Redirecionar baseado no tipo de usuário
        if (user.userType === 'mentor') {
          router.push('/dashboard');
        } else {
          router.push('/aluno_dashboard');
        }
      } else {
        toast.error("Erro ao criar conta");
      }
    } catch (error) {
      toast.error("Erro ao criar conta");
      console.error('Erro no registro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex gap-8">
        {/* Left Panel - Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-1 flex-col justify-center text-white p-8"
        >
          <div className="mb-6">
            <Crown className="w-12 h-12 text-yellow-400 mb-4" />
            <h1 className="text-4xl font-bold mb-4">Junte-se a nós!</h1>
            <p className="text-xl text-blue-100 mb-6">
              Comece sua jornada de aprendizado gamificada
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-yellow-400" />
              <span>Crie sua conta gratuita</span>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400" />
              <span>Acesse trilhas de aprendizado</span>
            </div>
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span>Ganhe pontos e conquistas</span>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Register Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1 flex items-center justify-center"
        >
          <Card className="w-full max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur">
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center mb-4">
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar ao início
                </Link>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Criar Conta</CardTitle>
              <CardDescription>
                Preencha os dados abaixo para começar
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Nome completo</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="userType" className="text-sm">Tipo de usuário</Label>
                  <Select onValueChange={handleUserTypeChange} disabled={isLoading}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Selecione seu perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Estudante</SelectItem>
                      <SelectItem value="mentor">Mentor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm">Confirmar senha</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, agreeTerms: !!checked }))
                    }
                    disabled={isLoading}
                  />
                  <Label htmlFor="agreeTerms" className="text-xs text-gray-600">
                    Aceito os <a href="#" className="text-blue-600 hover:underline">termos de uso</a> e <a href="#" className="text-blue-600 hover:underline">política de privacidade</a>
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Criando conta..." : "Criar conta"}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 pt-0">
              <div className="text-center text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
                  Faça login aqui
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}