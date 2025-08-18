"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles, ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  const progressData = [
    { label: "Autoconhecimento", value: 85, color: "bg-purple-500" },
    { label: "Liderança", value: 72, color: "bg-green-500" },
    { label: "Comunicação", value: 90, color: "bg-blue-500" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-20 md:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 pt-10 md:pt-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium">
                <Star className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                Transforme seu potencial em resultados
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-3 md:space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Mentorlabs com{" "}
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Mentoria de Alto Impacto
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Desbloqueie seu verdadeiro potencial através de nossa plataforma de mentoria personalizada, 
                ferramentas de autoconhecimento e metodologia comprovada para desenvolvimento.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 md:px-8 py-2.5 md:py-4 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                asChild
              >
                <a href="/auth/register" className="flex items-center justify-center">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  <span className="mr-1">Comece sua Jornada</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-purple-200 hover:border-purple-300 px-6 md:px-8 py-2.5 md:py-4 text-base md:text-lg font-semibold group"
                asChild
              >
                <a href="/auth/login" className="flex items-center justify-center">
                  <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Já tenho conta
                </a>
              </Button>
            </motion.div>

            {/* Trust indicators */}
          </div>

          {/* Right Content - Progress Widget */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl blur-xl opacity-70"></div>
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-2xl opacity-50"></div>

            <Card className="relative bg-white/80 backdrop-blur-lg border-0 shadow-2xl">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">Seu Progresso</h3>
                    <p className="text-sm md:text-base text-gray-600">Desenvolvimento Pessoal</p>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {progressData.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                      className="space-y-1.5 md:space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm md:text-base text-gray-700">{item.label}</span>
                        <span className="font-bold text-base md:text-lg text-gray-900">{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1.2, delay: 0.8 + (index * 0.2), ease: "easeOut" }}
                          className={`${item.color} h-2 md:h-3 rounded-full shadow-lg`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}