"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Map, Rocket, CheckCircle } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      icon: <Search className="w-8 h-8" />,
      title: "Diagnóstico Profundo",
      description: "Compreendemos suas forças, limitações e objetivos através de ferramentas avançadas de diagnóstico.",
      features: [
        "Avaliação de perfil comportamental",
        "Identificação de valores centrais",
        "Mapeamento de crenças limitantes"
      ],
      emoji: "🔍",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "2", 
      icon: <Map className="w-8 h-8" />,
      title: "Plano Estratégico",
      description: "Criamos um roteiro personalizado com metas claras e estratégias adaptadas ao seu perfil único.",
      features: [
        "Definição de objetivos SMART",
        "Roadmap de desenvolvimento",
        "Plano de ação personalizado"
      ],
      emoji: "📝",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "3",
      icon: <Rocket className="w-8 h-8" />,
      title: "Implementação Guiada",
      description: "Acompanhamos sua evolução com feedback constante, ajustes estratégicos e suporte contínuo.",
      features: [
        "Sessões regulares de mentoria",
        "Acompanhamento de progresso",
        "Ajustes e refinamentos contínuos"
      ],
      emoji: "🚀",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="como-funciona" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-blue-50/30"></div>
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>

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
            Como Funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nossa metodologia comprovada em três etapas simples para impulsionar seu desenvolvimento.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center font-bold text-2xl shadow-lg`}
                  >
                    <span className="text-3xl">{step.emoji}</span>
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  {step.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual Card */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex-1 max-w-md"
              >
                <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} text-white mb-6 shadow-lg`}>
                      {step.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                      Etapa {step.number}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}