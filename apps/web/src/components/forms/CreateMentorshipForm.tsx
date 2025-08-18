"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "./FileUpload";
import { ArrowLeft, Brain, Save, Eye } from "lucide-react";

interface MentorshipFormData {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  duration: string;
  maxStudents: string;
  category: string;
  level: string;
  coverImage: File | null;
  mentorPhoto: File | null;
  mentorBio: string;
}

export function CreateMentorshipForm() {
  const [formData, setFormData] = useState<MentorshipFormData>({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "0",
    duration: "4",
    maxStudents: "50",
    category: "Desenvolvimento Pessoal",
    level: "Intermediário",
    coverImage: null,
    mentorPhoto: null,
    mentorBio: "Mentor experiente com foco em desenvolvimento profissional"
  });

  const categories = [
    "Desenvolvimento Pessoal",
    "Liderança", 
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

  const updateFormData = (field: keyof MentorshipFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            <h1 className="text-2xl font-bold text-gray-900">Criar Nova Mentoria</h1>
            <p className="text-gray-600">Crie uma página de vendas profissional para sua mentoria</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Usar IA
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Salvar Rascunho
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Publicar Mentoria
          </Button>
        </div>
      </motion.div>

      {/* Basic Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Título da Mentoria <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Ex: Liderança Transformacional em 30 Dias"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
              />
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Descrição Curta</Label>
              <Input
                id="shortDescription"
                placeholder="Resumo em uma frase para aparecer nos cards"
                value={formData.shortDescription}
                onChange={(e) => updateFormData('shortDescription', e.target.value)}
              />
            </div>

            {/* Full Description */}
            <div className="space-y-2">
              <Label htmlFor="fullDescription">
                Descrição Completa <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="fullDescription"
                placeholder="Descreva detalhadamente sua mentoria, metodologia, resultados esperados..."
                className="min-h-[120px]"
                value={formData.fullDescription}
                onChange={(e) => updateFormData('fullDescription', e.target.value)}
              />
            </div>

            {/* Price, Duration, Max Students */}
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">
                  Preço (CHF) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => updateFormData('price', e.target.value)}
                />
              </div>
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
                <Label htmlFor="maxStudents">Máx. Estudantes</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  value={formData.maxStudents}
                  onChange={(e) => updateFormData('maxStudents', e.target.value)}
                />
              </div>
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
          </CardContent>
        </Card>
      </motion.div>

      {/* Visual Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo Visual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Cover Image */}
              <FileUpload
                label="Imagem de Capa"
                description="Imagem 16:9 recomendada"
                acceptedTypes="image/*"
                onFileSelect={(file) => updateFormData('coverImage', file)}
              />

              {/* Mentor Photo */}
              <FileUpload
                label="Foto do Mentor"
                description="Foto quadrada recomendada"
                acceptedTypes="image/*"
                onFileSelect={(file) => updateFormData('mentorPhoto', file)}
              />
            </div>

            {/* Mentor Bio */}
            <div className="space-y-2">
              <Label htmlFor="mentorBio">Bio do Mentor</Label>
              <Textarea
                id="mentorBio"
                placeholder="Mentor experiente com foco em desenvolvimento profissional"
                value={formData.mentorBio}
                onChange={(e) => updateFormData('mentorBio', e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}