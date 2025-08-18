"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { StudentCard } from "./StudentCard";

interface StudentData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatarColor: string;
  status: 'active' | 'inactive';
  mentorships: string[];
  joinDate: string;
  totalSpent: string;
  location?: string;
}

interface StudentsListProps {
  searchTerm?: string;
  mentorshipFilter?: string;
}

export function StudentsList({ searchTerm = "", mentorshipFilter = "all" }: StudentsListProps) {
  // Mock data - estes seriam os alunos reais
  const students: StudentData[] = [
    {
      id: "1",
      name: "ELISSON UZUAL",
      email: "uzualelisson@gmail.com",
      avatar: "E",
      avatarColor: "bg-purple-500",
      status: "active",
      mentorships: ["leadership", "communication", "management"],
      joinDate: "01/08/2025",
      totalSpent: "CHF 194",
      location: "PNS TESTE"
    },
    {
      id: "2",
      name: "Ana Silva",
      email: "ana.silva@email.com",
      avatar: "AS",
      avatarColor: "bg-blue-500",
      status: "active",
      mentorships: ["productivity", "emotional"],
      joinDate: "28/07/2025",
      totalSpent: "CHF 405",
      location: "São Paulo"
    },
    {
      id: "3",
      name: "Carlos Mendes",
      email: "carlos.mendes@company.com",
      avatar: "CM",
      avatarColor: "bg-green-500",
      status: "active",
      mentorships: ["negotiation", "innovation"],
      joinDate: "25/07/2025",
      totalSpent: "CHF 919",
      location: "Rio de Janeiro"
    },
    {
      id: "4",
      name: "Marina Costa",
      email: "marina.costa@startup.io",
      avatar: "MC",
      avatarColor: "bg-pink-500",
      status: "inactive",
      mentorships: ["leadership", "innovation"],
      joinDate: "20/07/2025",
      totalSpent: "CHF 696",
      location: "Belo Horizonte"
    },
    {
      id: "5",
      name: "Pedro Santos",
      email: "pedro.santos@tech.com",
      avatar: "PS",
      avatarColor: "bg-orange-500",
      status: "active",
      mentorships: ["productivity", "management"],
      joinDate: "15/07/2025",
      totalSpent: "CHF 600",
      location: "Porto Alegre"
    },
    {
      id: "6",
      name: "Julia Ferreira",
      email: "julia.ferreira@corp.com",
      avatar: "JF",
      avatarColor: "bg-teal-500",
      status: "active",
      mentorships: ["emotional", "communication"],
      joinDate: "12/07/2025",
      totalSpent: "CHF 630",
      location: "Recife"
    }
  ];

  // Filter students based on search and mentorship filter
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = !searchTerm || 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesMentorship = mentorshipFilter === "all" || 
        student.mentorships.includes(mentorshipFilter);

      return matchesSearch && matchesMentorship;
    });
  }, [searchTerm, mentorshipFilter, students]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="space-y-4"
    >
      {filteredStudents.map((student, index) => (
        <StudentCard 
          key={student.id} 
          student={student} 
          index={index}
        />
      ))}
      
      {filteredStudents.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">👥</div>
          <p className="text-lg font-medium mb-2">Nenhum aluno encontrado</p>
          <p className="text-sm mb-6">
            {searchTerm || mentorshipFilter !== "all" 
              ? "Tente ajustar os filtros de busca" 
              : "Quando alunos se inscreverem, eles aparecerão aqui"
            }
          </p>
        </div>
      )}
    </motion.div>
  );
}