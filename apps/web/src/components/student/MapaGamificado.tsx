"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Award, 
  Heart, 
  MessageSquare, 
  CheckCircle, 
  Lock, 
  Star,
  Trophy,
  BookOpen,
  Clock,
  Users,
  Gamepad2
} from "lucide-react";

interface NivelData {
  id: number;
  titulo: string;
  descricao: string;
  xpNecessario: number;
  recompensas: string[];
  desbloqueado: boolean;
  concluido: boolean;
  progresso: number;
}

export function MapaGamificado() {
  // Dados do usuário (simulados - devem vir de context/props)
  const [userStats] = useState({
    xp: 150,
    nivel: 2,
    pontos: 75
  });

  const niveis: NivelData[] = [
    {
      id: 1,
      titulo: "Fundamentos da Mentoria",
      descricao: "Aprenda os conceitos básicos de mentoria e desenvolvimento pessoal",
      xpNecessario: 0,
      recompensas: ["Badge de Iniciante", "10 pontos", "Acesso ao Nível 2"],
      desbloqueado: true,
      concluido: true,
      progresso: 100
    },
    {
      id: 2,
      titulo: "Técnicas de Comunicação",
      descricao: "Desenvolva habilidades de comunicação efetiva e escuta ativa",
      xpNecessario: 100,
      recompensas: ["Badge de Comunicador", "25 pontos", "Acesso ao Nível 3"],
      desbloqueado: true,
      concluido: false,
      progresso: 60
    },
    {
      id: 3,
      titulo: "Desenvolvimento de Liderança",
      descricao: "Construa competências de liderança e gestão de pessoas",
      xpNecessario: 200,
      recompensas: ["Badge de Líder", "50 pontos", "Acesso ao Nível 4"],
      desbloqueado: userStats.xp >= 200,
      concluido: false,
      progresso: 0
    },
    {
      id: 4,
      titulo: "Mentoria Avançada",
      descricao: "Torne-se um mentor expert com técnicas avançadas",
      xpNecessario: 350,
      recompensas: ["Badge de Expert", "100 pontos", "Certificação Completa"],
      desbloqueado: userStats.xp >= 350,
      concluido: false,
      progresso: 0
    },
    {
      id: 5,
      titulo: "Educador Transformador",
      descricao: "Alcance o nível máximo e torne-se um educador transformador",
      xpNecessario: 500,
      recompensas: ["Badge Dourado", "Certificado Especial", "Acesso VIP"],
      desbloqueado: userStats.xp >= 500,
      concluido: false,
      progresso: 0
    }
  ];

  const handleNivelClick = (nivel: NivelData) => {
    if (nivel.desbloqueado) {
      // Aqui você pode navegar para a página específica do nível
      // ou abrir um modal com mais detalhes
      console.log(`Acessando nível ${nivel.id}: ${nivel.titulo}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Processo da Gamificação */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block bg-purple-600 text-white px-8 py-4 rounded-2xl border-4 border-purple-800 shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold">Processo da</h1>
            <h2 className="text-3xl md:text-4xl font-black">Gamificação</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Lado Esquerdo - Regras */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-cyan-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  Regras
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Desbloquear os níveis de 1 a 5</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Concluir os cursos e caminhos de inovação satisfatoriamente</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Somar cargas horárias à jornada</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats do Usuário */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-cyan-300 mt-4">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Seu Progresso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">XP Total</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    {userStats.xp} XP
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Nível Atual</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    Nível {userStats.nivel}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pontos</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {userStats.pontos} pts
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Centro - Mapa do Caminho */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 relative"
          >
            {/* Meta no Topo */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-block bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-3 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  <div>
                    <div className="text-lg font-bold">Meta</div>
                    <div className="text-sm opacity-90">Tornar-se um</div>
                    <div className="text-lg font-bold">educador transformador</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Caminho Sinuoso */}
            <div className="relative">
              {/* SVG Path Background */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                viewBox="0 0 400 600"
                style={{ zIndex: 0 }}
              >
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e0e7ff" />
                    <stop offset="50%" stopColor="#c7d2fe" />
                    <stop offset="100%" stopColor="#a5b4fc" />
                  </linearGradient>
                </defs>
                <path
                  d="M 50 50 Q 200 100 350 150 Q 200 200 50 250 Q 200 300 350 350 Q 200 400 50 450 Q 200 500 350 550"
                  stroke="url(#pathGradient)"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                {/* Pontos decorativos ao longo do caminho */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={50 + (i * 15) % 300}
                    cy={50 + i * 25}
                    r="3"
                    fill="white"
                    opacity="0.8"
                  />
                ))}
              </svg>

              {/* Níveis */}
              <div className="relative z-10 space-y-8">
                {niveis.map((nivel, index) => (
                  <motion.div
                    key={nivel.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                    className={`flex ${
                      index % 2 === 0 ? 'justify-start ml-4' : 'justify-end mr-4'
                    }`}
                  >
                    <Card 
                      className={`w-64 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        nivel.desbloqueado 
                          ? 'bg-white border-2 border-purple-400 shadow-lg hover:shadow-xl' 
                          : 'bg-gray-100 border-2 border-gray-300 opacity-75'
                      }`}
                      onClick={() => handleNivelClick(nivel)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          {/* Número do Nível */}
                          <div 
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg ${
                              nivel.concluido 
                                ? 'bg-green-500'
                                : nivel.desbloqueado 
                                ? 'bg-purple-600' 
                                : 'bg-gray-400'
                            }`}
                          >
                            {nivel.concluido ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : nivel.desbloqueado ? (
                              nivel.id
                            ) : (
                              <Lock className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-sm font-bold text-gray-800">
                              {nivel.titulo}
                            </CardTitle>
                            {nivel.desbloqueado && (
                              <Badge 
                                variant="secondary" 
                                className="text-xs mt-1 bg-purple-100 text-purple-700"
                              >
                                {nivel.xpNecessario} XP necessário
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-gray-600 mb-3">{nivel.descricao}</p>
                        
                        {nivel.desbloqueado && (
                          <>
                            {/* Barra de Progresso */}
                            <div className="mb-3">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progresso</span>
                                <span>{nivel.progresso}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${nivel.progresso}%` }}
                                  transition={{ delay: 1 + index * 0.2, duration: 1 }}
                                  className={`h-2 rounded-full ${
                                    nivel.concluido ? 'bg-green-500' : 'bg-purple-500'
                                  }`}
                                />
                              </div>
                            </div>

                            {/* Recompensas */}
                            <div className="space-y-1">
                              <div className="text-xs font-semibold text-gray-700">Recompensas:</div>
                              {nivel.recompensas.slice(0, 2).map((recompensa, i) => (
                                <div key={i} className="text-xs text-gray-600 flex items-center gap-1">
                                  <Award className="w-3 h-3 text-yellow-500" />
                                  {recompensa}
                                </div>
                              ))}
                            </div>

                            {/* Botão de Ação */}
                            <Button 
                              size="sm" 
                              className={`w-full mt-3 ${
                                nivel.concluido 
                                  ? 'bg-green-600 hover:bg-green-700' 
                                  : 'bg-purple-600 hover:bg-purple-700'
                              }`}
                            >
                              {nivel.concluido ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Concluído
                                </>
                              ) : (
                                <>
                                  <Gamepad2 className="w-4 h-4 mr-2" />
                                  Continuar
                                </>
                              )}
                            </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Lado Direito - Participação e Feedbacks */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-4"
          >
            {/* Participação Voluntária */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-cyan-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Participação voluntária
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  O processo depende inteiramente do <strong>engajamento</strong> dos educadores
                </p>
              </CardContent>
            </Card>

            {/* Sistema de Feedbacks */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-cyan-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  Sistema de feedbacks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-3">
                  Para mantê-los motivados, <strong>selos</strong>, <strong>conquistas</strong> e <strong>recompensas</strong> são alcançados de acordo com os caminhos que decidir seguir
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs bg-yellow-50 border-yellow-300">
                    <Trophy className="w-3 h-3 mr-1" />
                    Selos
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-green-50 border-green-300">
                    <Award className="w-3 h-3 mr-1" />
                    Conquistas
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-purple-50 border-purple-300">
                    <Star className="w-3 h-3 mr-1" />
                    Recompensas
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas da Comunidade */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-cyan-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  Comunidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Educadores Ativos</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    1,234
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Certificados Emitidos</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    856
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Taxa de Conclusão</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    78%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer - Informações Extras */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-center"
        >
          <p className="text-white/80 text-sm">
            Infográfico: Plataforma de Mentoria Mentorlabs - Mentoria de Alto Impacto
          </p>
        </motion.div>
      </div>
    </div>
  );
}