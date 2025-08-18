"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface StudentsSearchProps {
  onSearchChange: (search: string) => void;
  onMentorshipFilter: (mentorshipId: string) => void;
}

export function StudentsSearch({ onSearchChange, onMentorshipFilter }: StudentsSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  const mentorships = [
    { id: "all", name: "Todas as mentorias" },
    { id: "leadership", name: "Liderança Transformacional" },
    { id: "communication", name: "Comunicação Eficaz" },
    { id: "management", name: "Gestão de Equipes Remotas" },
    { id: "productivity", name: "Produtividade para Executivos" },
    { id: "emotional", name: "Inteligência Emocional" },
    { id: "negotiation", name: "Negociação Estratégica" },
    { id: "innovation", name: "Inovação e Criatividade" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-col md:flex-row gap-4 mb-6"
    >
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Buscar alunos por nome ou email..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Mentorship Filter */}
      <div className="w-full md:w-64">
        <Select onValueChange={onMentorshipFilter} defaultValue="all">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {mentorships.map((mentorship) => (
              <SelectItem key={mentorship.id} value={mentorship.id}>
                {mentorship.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
}