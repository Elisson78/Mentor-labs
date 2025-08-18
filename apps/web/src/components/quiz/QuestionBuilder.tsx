"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Trash2, 
  Video, 
  Image, 
  Link, 
  Upload,
  CheckCircle,
  Circle,
  X
} from "lucide-react";
import { MediaPreview } from "./MediaPreview";

interface QuestionData {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options: string[];
  correctAnswer: string | string[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'link';
  points: number;
}

interface QuestionBuilderProps {
  onQuestionSave: (question: QuestionData) => void;
  onCancel: () => void;
  existingQuestion?: QuestionData;
}

export function QuestionBuilder({ onQuestionSave, onCancel, existingQuestion }: QuestionBuilderProps) {
  const [question, setQuestion] = useState<QuestionData>(
    existingQuestion || {
      id: Date.now().toString(),
      question: "",
      type: 'multiple-choice',
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 1
    }
  );

  const [mediaInput, setMediaInput] = useState("");

  const updateQuestion = (field: keyof QuestionData, value: any) => {
    setQuestion(prev => ({ ...prev, [field]: value }));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    setQuestion(prev => ({ ...prev, options: [...prev.options, ""] }));
  };

  const removeOption = (index: number) => {
    if (question.options.length > 2) {
      const newOptions = question.options.filter((_, i) => i !== index);
      setQuestion(prev => ({ ...prev, options: newOptions }));
    }
  };

  const addMedia = () => {
    if (mediaInput.trim()) {
      let mediaType: 'image' | 'video' | 'link' = 'link';
      
      if (mediaInput.includes('youtube.com') || mediaInput.includes('youtu.be') || mediaInput.endsWith('.mp4')) {
        mediaType = 'video';
      } else if (mediaInput.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        mediaType = 'image';
      }

      setQuestion(prev => ({ 
        ...prev, 
        mediaUrl: mediaInput,
        mediaType 
      }));
      setMediaInput("");
    }
  };

  const removeMedia = () => {
    setQuestion(prev => ({ 
      ...prev, 
      mediaUrl: undefined,
      mediaType: undefined 
    }));
  };

  const handleSave = () => {
    if (question.question.trim() && question.options.some(opt => opt.trim())) {
      onQuestionSave(question);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {existingQuestion ? 'Edit Question' : 'Add New Question'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="questionText">
              Question <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="questionText"
              placeholder="Enter your question here..."
              value={question.question}
              onChange={(e) => updateQuestion('question', e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* Question Type and Points */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Question Type</Label>
              <Select 
                value={question.type} 
                onValueChange={(value: any) => updateQuestion('type', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min="1"
                value={question.points}
                onChange={(e) => updateQuestion('points', parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          {/* Media Section */}
          <div className="space-y-4">
            <Label>Media (Optional)</Label>
            
            {question.mediaUrl && question.mediaType ? (
              <MediaPreview
                url={question.mediaUrl}
                type={question.mediaType}
                onRemove={removeMedia}
              />
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter URL for image, video, or supporting material..."
                  value={mediaInput}
                  onChange={(e) => setMediaInput(e.target.value)}
                />
                <Button onClick={addMedia} disabled={!mediaInput.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Answer Options */}
          {question.type === 'multiple-choice' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Answer Options</Label>
                <Button variant="outline" size="sm" onClick={addOption}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>
              
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuestion('correctAnswer', option)}
                      className="p-2"
                    >
                      {question.correctAnswer === option ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </Button>
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="flex-1"
                    />
                    {question.options.length > 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(index)}
                        className="text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {question.type === 'true-false' && (
            <div className="space-y-3">
              <Label>Correct Answer</Label>
              <div className="flex gap-4">
                <Button
                  variant={question.correctAnswer === 'true' ? 'default' : 'outline'}
                  onClick={() => updateQuestion('correctAnswer', 'true')}
                >
                  True
                </Button>
                <Button
                  variant={question.correctAnswer === 'false' ? 'default' : 'outline'}
                  onClick={() => updateQuestion('correctAnswer', 'false')}
                >
                  False
                </Button>
              </div>
            </div>
          )}

          {question.type === 'short-answer' && (
            <div className="space-y-2">
              <Label htmlFor="correctAnswer">Expected Answer</Label>
              <Input
                id="correctAnswer"
                placeholder="Enter the expected answer..."
                value={question.correctAnswer as string}
                onChange={(e) => updateQuestion('correctAnswer', e.target.value)}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!question.question.trim()}>
              {existingQuestion ? 'Update Question' : 'Add Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}