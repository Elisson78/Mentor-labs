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
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const user = await login(formData.email, formData.password);
      
      if (user) {
        toast.success("Login realizado com sucesso!");
        
        // Redirecionar baseado no tipo de usuário
        const targetUrl = user.userType === 'mentor' ? '/dashboard' : '/aluno_dashboard';
        router.push(targetUrl);
        
      } else {
        toast.error("Email ou senha inválidos");
      }
    } catch (error) {
      toast.error("Erro ao fazer login");
      console.error('Erro no login:', error);
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
            <h1 className="text-4xl font-bold mb-4">Bem-vindo de volta!</h1>
            <p className="text-xl text-blue-100 mb-6">
              Continue sua jornada de aprendizado gamificada
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>Trilhas de aprendizado personalizadas</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>Quizzes gamificados com IA</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>Mentoria personalizada</span>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Login Form */}
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
              <CardTitle className="text-2xl font-bold text-gray-800">Fazer Login</CardTitle>
              <CardDescription>
                Entre com sua conta para continuar
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 pt-0">
              <div className="text-center text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
                  Cadastre-se aqui
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}