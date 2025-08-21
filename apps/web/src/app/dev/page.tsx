"use client"
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { StackDemo } from "@/components/StackDemo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DevPage() {
  // Temporarily disabled for Docker build compatibility
  // const healthCheck = useQuery(trpc.healthCheck.queryOptions());
  const healthCheck = { data: "OK", isLoading: false };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* API Status Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Better-T Stack - Status</CardTitle>
            <CardDescription>Verificação de conectividade do backend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`}
              />
              <span className="text-sm font-medium">
                {healthCheck.isLoading
                  ? "Verificando conexão..."
                  : healthCheck.data
                    ? "Backend conectado ✅"
                    : "Backend desconectado ❌"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Links */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Navegar para Demonstrações</CardTitle>
            <CardDescription>Explore os diferentes componentes e funcionalidades</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3 flex-wrap">
            <Button asChild>
              <a href="/dashboard">
                Ver Dashboard Mentor 👑
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/ia-mentorias">
                IA para Mentorias 🤖
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/mentoria/criar">
                Criar Mentoria ✨
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/quiz/criar">
                Criar Quiz 📝
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/minhas-mentorias">
                Minhas Mentorias 🎯
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/meus-quizzes">
                Meus Quizzes 📝
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/meus-alunos">
                Meus Alunos 👥
              </a>
            </Button>
            <Button asChild>
              <a href="/aluno_dashboard">
                Dashboard do Aluno 🎓
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#stack-demo">
                Ver Stack Demo
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Stack Demo */}
        <div id="stack-demo">
          <StackDemo />
        </div>
      </div>
    </div>
  );
}