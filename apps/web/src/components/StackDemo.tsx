"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  CheckCircle, 
  Zap, 
  Palette, 
  Type, 
  Sparkles,
  Smartphone
} from "lucide-react";

export function StackDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Stack Frontend Nativo ✨
        </h1>
        <p className="text-lg text-muted-foreground">
          Demonstração completa da stack moderna instalada
        </p>
      </motion.div>

      {/* Stack Components Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* React + Next.js */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                React + Next.js
              </CardTitle>
              <CardDescription>Framework principal da aplicação</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Componentes reativos, SSR, e roteamento automático funcionando perfeitamente.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* shadcn/ui + Radix */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-blue-500" />
                shadcn/ui + Radix
              </CardTitle>
              <CardDescription>Biblioteca de componentes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Button size="sm">Primary</Button>
                <Button variant="outline" size="sm">Outline</Button>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="demo" />
                <Label htmlFor="demo">Exemplo checkbox</Label>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tailwind CSS */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-500" />
                Tailwind CSS
              </CardTitle>
              <CardDescription>Estilização utility-first</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                <div className="h-8 bg-red-500 rounded"></div>
                <div className="h-8 bg-blue-500 rounded"></div>
                <div className="h-8 bg-green-500 rounded"></div>
                <div className="h-8 bg-yellow-500 rounded"></div>
              </div>
              <p className="text-sm mt-2 text-muted-foreground">
                Classes utilitárias responsivas
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Inter Font */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5 text-orange-500" />
                Inter Font
              </CardTitle>
              <CardDescription>Tipografia moderna</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-light">Inter Light</p>
                <p className="font-normal">Inter Regular</p>
                <p className="font-medium">Inter Medium</p>
                <p className="font-bold">Inter Bold</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lucide Icons */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Lucide Icons
              </CardTitle>
              <CardDescription>Iconografia consistente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6" />
                <Zap className="h-6 w-6" />
                <Palette className="h-6 w-6" />
                <Type className="h-6 w-6" />
                <Sparkles className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Framer Motion */}
        <motion.div
          whileHover={{ scale: 1.02, rotate: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-pink-500" />
                Framer Motion
              </CardTitle>
              <CardDescription>Animações suaves</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Form Demo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Demonstração de Formulário</CardTitle>
            <CardDescription>
              Todos os componentes trabalhando juntos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Seu nome aqui" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
            </div>
            <Button className="w-full">
              Enviar com Animação
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Loading Demo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Skeleton Loading</CardTitle>
            <CardDescription>Componente de loading</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}