"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign 
} from "lucide-react";

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

interface StudentCardProps {
  student: StudentData;
  index: number;
}

export function StudentCard({ student, index }: StudentCardProps) {
  const getAvatarInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              {/* Avatar */}
              <div className={`w-12 h-12 ${student.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-bold text-lg">
                  {getAvatarInitials(student.name)}
                </span>
              </div>

              {/* Student Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {student.name}
                  </h3>
                  <Badge 
                    variant="secondary" 
                    className={student.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                  >
                    {student.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm mb-3">{student.email}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  {student.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {student.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Inscrito em {student.joinDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {student.totalSpent}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-4">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Mensagem
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}