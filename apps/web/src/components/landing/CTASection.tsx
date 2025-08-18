"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  const features = [
    "Sem compromisso inicial",
    "Cancele quando quiser", 
    "Suporte 24/7"
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600"></div>
      
      {/* Background Pattern - Simplified */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-white/5"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-16 sm:w-32 h-16 sm:h-32 bg-pink-300/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-10 sm:w-16 h-10 sm:h-16 bg-yellow-300/20 rounded-full blur-xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            Pronto para transformar sua vida?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed text-white/90 px-2"
          >
            Junte-se a milhares de profissionais que já estão evoluindo com nossa metodologia. 
            Comece sua jornada hoje mesmo.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 mb-8 sm:mb-10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                viewport={{ once: true }}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0" />
                <span className="text-white/90 text-sm sm:text-base font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mb-6 sm:mb-8"
          >
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-50 px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 md:py-6 text-sm sm:text-base md:text-xl font-bold shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-300 group hover:scale-105"
              asChild
            >
              <a href="/auth/register" className="flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform" />
                <span className="mr-1">Começar Agora</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-1 sm:ml-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          {/* Bottom Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
            className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg"
          >
            Mais de 2.500 profissionais confiam na Mentorlabs para seu desenvolvimento
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}