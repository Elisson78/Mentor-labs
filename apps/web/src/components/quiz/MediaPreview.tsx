"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Image as ImageIcon, Link, ExternalLink, Trash2 } from "lucide-react";

interface MediaPreviewProps {
  url: string;
  type: 'image' | 'video' | 'link';
  onRemove: () => void;
  className?: string;
}

export function MediaPreview({ url, type, onRemove, className }: MediaPreviewProps) {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const getYouTubeEmbedUrl = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const renderContent = () => {
    switch (type) {
      case 'image':
        return (
          <div className="relative">
            {!imageError ? (
              <img 
                src={url} 
                alt="Question media" 
                className="w-full h-48 object-cover rounded"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Não foi possível carregar a imagem</p>
                </div>
              </div>
            )}
          </div>
        );

      case 'video':
        if (isYouTubeUrl(url)) {
          const embedUrl = getYouTubeEmbedUrl(url);
          return embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-48 rounded"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center">
              <div className="text-center">
                <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">URL do YouTube inválida</p>
              </div>
            </div>
          );
        } else if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
          return !videoError ? (
            <video 
              controls 
              className="w-full h-48 rounded"
              onError={() => setVideoError(true)}
            >
              <source src={url} type="video/mp4" />
              Seu navegador não suporta vídeo HTML5.
            </video>
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center">
              <div className="text-center">
                <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Não foi possível carregar o vídeo</p>
              </div>
            </div>
          );
        } else {
          return (
            <div className="w-full h-48 bg-blue-50 rounded flex items-center justify-center">
              <div className="text-center">
                <Video className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-blue-600">Vídeo</p>
                <p className="text-xs text-blue-500">Clique para visualizar</p>
              </div>
            </div>
          );
        }

      case 'link':
        return (
          <div className="w-full h-48 bg-purple-50 rounded flex items-center justify-center">
            <div className="text-center">
              <Link className="w-12 h-12 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-purple-600">Material de Apoio</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                asChild
              >
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Abrir Link
                </a>
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {type === 'video' && <Video className="w-4 h-4 text-blue-500" />}
            {type === 'image' && <ImageIcon className="w-4 h-4 text-green-500" />}
            {type === 'link' && <Link className="w-4 h-4 text-purple-500" />}
            <span className="text-sm font-medium capitalize">{type}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onRemove}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        
        {renderContent()}
        
        <p className="text-xs text-gray-600 mt-2 break-all">{url}</p>
      </CardContent>
    </Card>
  );
}