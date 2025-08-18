"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Share2, 
  Eye, 
  Edit, 
  Settings, 
  DollarSign, 
  Clock, 
  Users, 
  Calendar 
} from "lucide-react";

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

interface MentorshipCardProps {
  mentorship: MentorshipData;
  index: number;
}

export function MentorshipCard({ mentorship, index }: MentorshipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {mentorship.title}
                </h3>
                <Badge 
                  variant="secondary" 
                  className={`${mentorship.categoryColor} text-white text-xs`}
                >
                  {mentorship.category}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-4">{mentorship.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {mentorship.price}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {mentorship.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {mentorship.students} alunos
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {mentorship.publishDate}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Badge 
                variant={mentorship.status === 'published' ? 'default' : 'secondary'}
                className={mentorship.status === 'published' ? 'bg-green-100 text-green-700' : ''}
              >
                {mentorship.status === 'published' ? 'Publicada' : 'Rascunho'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}