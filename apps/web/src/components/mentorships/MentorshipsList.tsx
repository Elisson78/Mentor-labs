"use client";

import { motion } from "framer-motion";
import { MentorshipCard } from "./MentorshipCard";

interface MentorshipData {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  students: number;
  category: string;
  categoryColor: string;
  publishDate: string;
  status: 'published' | 'draft';
}

export function MentorshipsList() {
  // Mock data - estas seriam as mentorias criadas pelo usuário
  const mentorships: MentorshipData[] = [
    {
      id: "1",
      title: "Liderança Transformacional em 30 Dias",
      description: "Transforme sua liderança em 30 dias com técnicas comprovadas",
      price: "CHF 297",
      duration: "4 semanas",
      students: 0,
      category: "leadership",
      categoryColor: "bg-blue-500",
      publishDate: "03/08/2025",
      status: "published"
    },
    {
      id: "2",
      title: "Comunicação Eficaz para Executivos",
      description: "Comunique-se como um executivo de sucesso",
      price: "CHF 450",
      duration: "6 semanas",
      students: 0,
      category: "communication",
      categoryColor: "bg-green-500",
      publishDate: "03/08/2025",
      status: "published"
    },
    {
      id: "3",
      title: "Gestão de Equipes Remotas",
      description: "Lidere equipes remotas com eficiência e produtividade",
      price: "CHF 375",
      duration: "5 semanas",
      students: 2,
      category: "management",
      categoryColor: "bg-purple-500",
      publishDate: "01/08/2025",
      status: "published"
    },
    {
      id: "4",
      title: "Produtividade para Executivos",
      description: "Maximize sua produtividade e alcance melhores resultados",
      price: "CHF 225",
      duration: "3 semanas",
      students: 1,
      category: "productivity",
      categoryColor: "bg-orange-500",
      publishDate: "28/07/2025",
      status: "published"
    },
    {
      id: "5",
      title: "Inteligência Emocional no Trabalho",
      description: "Desenvolva sua inteligência emocional para o sucesso profissional",
      price: "CHF 180",
      duration: "4 semanas",
      students: 0,
      category: "emotional-intelligence",
      categoryColor: "bg-pink-500",
      publishDate: "25/07/2025",
      status: "draft"
    },
    {
      id: "6",
      title: "Negociação Estratégica",
      description: "Técnicas avançadas de negociação para líderes",
      price: "CHF 520",
      duration: "6 semanas",
      students: 3,
      category: "negotiation",
      categoryColor: "bg-red-500",
      publishDate: "20/07/2025",
      status: "published"
    },
    {
      id: "7",
      title: "Inovação e Criatividade Empresarial",
      description: "Fomente a inovação e criatividade em sua organização",
      price: "CHF 399",
      duration: "5 semanas",
      students: 1,
      category: "innovation",
      categoryColor: "bg-teal-500",
      publishDate: "15/07/2025",
      status: "published"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      {mentorships.map((mentorship, index) => (
        <MentorshipCard 
          key={mentorship.id} 
          mentorship={mentorship} 
          index={index}
        />
      ))}
      
      {mentorships.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-lg font-medium mb-2">Nenhuma mentoria criada ainda</p>
          <p className="text-sm mb-6">Comece criando sua primeira mentoria</p>
        </div>
      )}
    </motion.div>
  );
}