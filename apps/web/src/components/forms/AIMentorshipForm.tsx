"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Brain, Sparkles } from "lucide-react";

interface AIMentorshipFormData {
  description: string;
  category: string;
  level: string;
  duration: string;
  suggestedPrice: string;
}

export function AIMentorshipForm() {
  const [formData, setFormData] = useState<AIMentorshipFormData>({
    description: "Ex: Quero criar uma mentoria sobre liderança digital para executivos que querem transformar suas empresas usando tecnologia. Vou ensinar frameworks de transformação digital, gestão de equipes remotas e inovação...",
    category: "Liderança",
    level: "Intermediário",
    duration: "4",
    suggestedPrice: "100"
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const categories = [
    "Liderança", 
    "Desenvolvimento Pessoal",
    "Comunicação",
    "Produtividade",
    "Inteligência Emocional",
    "Negociação",
    "Gestão",
    "Estratégia de Negócios",
    "Criatividade",
    "Outro"
  ];

  const levels = [
    "Iniciante",
    "Intermediário", 
    "Avançado"
  ];

  const updateFormData = (field: keyof AIMentorshipFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateMentorship = async () => {
    setIsGenerating(true);
    // Simular chamada para IA
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    // Aqui iria redirecionar para a página de criação com dados preenchidos
    alert("Mentoria gerada com sucesso! Redirecionando para edição...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="/dashboard">
              <ArrowLeft className="w-4 h-4" />
            </a>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              IA para Mentorias 
              <span className="text-2xl">🤖</span>
            </h1>
            <p className="text-gray-600">Use inteligência artificial para criar mentorias profissionais completas</p>
          </div>
        </div>
      </motion.div>

      {/* Main Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Descreva sua Ideia de Mentoria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Descreva sua ideia de mentoria <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Ex: Quero criar uma mentoria sobre liderança digital para executivos que querem transformar suas empresas usando tecnologia. Vou ensinar frameworks de transformação digital, gestão de equipes remotas e inovação..."
                className="min-h-[120px]"
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
              />
            </div>

            {/* Category and Level */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Nível</Label>
                <Select value={formData.level} onValueChange={(value) => updateFormData('level', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Duration and Price */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="duration">Duração (semanas)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => updateFormData('duration', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suggestedPrice">Preço Sugerido (CHF)</Label>
                <Input
                  id="suggestedPrice"
                  type="number"
                  value={formData.suggestedPrice}
                  onChange={(e) => updateFormData('suggestedPrice', e.target.value)}
                />
              </div>
            </div>

            {/* Generate Button */}
            <motion.div 
              className="pt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleGenerateMentorship}
                disabled={!formData.description.trim() || isGenerating}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-lg"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Gerando Mentoria...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Gerar Mentoria com IA
                  </div>
                )}
              </Button>
            </motion.div>

            {/* Info Text */}
            <div className="text-sm text-gray-500 text-center">
              A IA criará automaticamente título, descrição completa, estrutura do curso e materiais baseados na sua ideia.
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Benefits Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <Card className="text-center p-4">
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-semibold mb-1">Rápido</h3>
          <p className="text-sm text-gray-600">Crie uma mentoria completa em minutos</p>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="font-semibold mb-1">Personalizado</h3>
          <p className="text-sm text-gray-600">IA adapta o conteúdo ao seu nicho</p>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl mb-2">📈</div>
          <h3 className="font-semibold mb-1">Otimizado</h3>
          <p className="text-sm text-gray-600">Estrutura pensada para conversão</p>
        </Card>
      </motion.div>
    </div>
  );
}