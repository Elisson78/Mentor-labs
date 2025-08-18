"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, TrendingUp, Users, Target, Lightbulb, Heart } from "lucide-react";

export function ToolsSection() {
  const tools = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Mapeamento Cognitivo",
      description: "Identifique seus padrões mentais e comportamentais através de avaliações exclusivas baseadas em neurociência.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Análise de Desempenho",
      description: "Acompanhe seu progresso com métricas objetivas e insights acionáveis para evolução contínua.",
      color: "from-green-500 to-green-600", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mentoria Personalizada",
      description: "Sessões individuais com mentores certificados especializados em desenvolvimento de alta performance.",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Planos Estratégicos",
      description: "Roadmaps personalizados com objetivos claros e marcos mensuráveis para sua evolução.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Ferramentas Exclusivas",
      description: "Acesso a metodologias proprietárias e recursos avançados de autodesenvolvimento.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Comunidade Ativa",
      description: "Conecte-se com outros profissionais em jornadas similares e expanda sua rede.",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <section id="recursos" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ferramentas para sua{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Transformação
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nossa plataforma oferece recursos exclusivos e cientificamente validados para 
            impulsionar seu crescimento pessoal e profissional de forma sistêmica.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className={`h-full ${tool.bgColor} ${tool.borderColor} border-2 hover:border-opacity-100 border-opacity-50 transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm`}>
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {tool.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}