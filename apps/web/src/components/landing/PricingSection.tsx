"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Settings, Zap, Crown } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Gratuito",
      subtitle: "Para quem quer começar sua jornada",
      price: "Grátis",
      period: "para sempre",
      icon: <Settings className="w-8 h-8" />,
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      buttonVariant: "outline" as const,
      buttonText: "Começar Grátis",
      popular: false,
      features: [
        "Avaliação inicial de perfil comportamental",
        "Acesso a 3 trilhas básicas",
        "Dashboard de progresso básico",
        "Até 5 quizzes por mês",
        "Comunidade de suporte"
      ]
    },
    {
      name: "Essencial",
      subtitle: "Para desenvolvimento consistente",
      price: "19,90",
      period: "CHF/mês",
      icon: <Zap className="w-8 h-8" />,
      color: "from-purple-500 to-blue-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      buttonVariant: "default" as const,
      buttonText: "Escolher Plano",
      popular: true,
      features: [
        "Tudo do plano Gratuito",
        "1 sessão mensal de mentoria individual",
        "Quizzes ilimitados",
        "Acesso a todas as trilhas",
        "Acesso ao assistente IA (básico)",
        "Suporte por email",
        "Download de certificados"
      ]
    },
    {
      name: "Premium",
      subtitle: "Para transformação completa",
      price: "39,90",
      period: "CHF/mês",
      icon: <Crown className="w-8 h-8" />,
      color: "from-pink-500 to-purple-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      buttonVariant: "default" as const,
      buttonText: "Escolher Plano",
      popular: false,
      features: [
        "Tudo do plano Essencial",
        "3 sessões mensais de mentoria individual",
        "Sessões mensais em grupo",
        "Análise avançada com IA",
        "Assistente IA completo",
        "Suporte prioritário 24h",
        "Networking exclusivo"
      ]
    }
  ];

  return (
    <section id="planos" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>

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
            Planos{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Flexíveis
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Escolha o plano ideal para sua jornada de desenvolvimento. Todos os planos incluem 
            garantia de satisfação de 30 dias.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`relative group ${plan.popular ? 'md:-mt-8' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-sm font-medium shadow-lg">
                    Mais Popular
                  </Badge>
                </div>
              )}

              <Card className={`
                h-full ${plan.bgColor} ${plan.borderColor} border-2 
                ${plan.popular ? 'border-purple-300 shadow-2xl scale-105' : 'border-opacity-50 shadow-xl'}
                hover:border-opacity-100 transition-all duration-300 hover:shadow-2xl bg-white/90 backdrop-blur-sm
                ${plan.popular ? 'md:py-8' : ''}
              `}>
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {plan.icon}
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.subtitle}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {plan.price}
                      {plan.period !== "para sempre" && (
                        <span className="text-lg text-gray-600 font-normal ml-1">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    {plan.period === "para sempre" && (
                      <p className="text-gray-600">Para sempre</p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.2 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={plan.buttonVariant}
                    size="lg"
                    className={`w-full py-3 font-semibold transition-all duration-300 ${
                      plan.buttonVariant === 'default' 
                        ? `bg-gradient-to-r ${plan.color} hover:shadow-lg text-white` 
                        : 'hover:bg-gray-50'
                    }`}
                    asChild
                  >
                    <a href="/dev">
                      {plan.buttonText}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">Precisa de algo personalizado para sua empresa?</p>
          <Button variant="outline" size="lg" className="border-2 border-purple-200 hover:border-purple-300" asChild>
            <a href="/dev">
              Falar com Especialista
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}