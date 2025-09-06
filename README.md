# Mentor Labs v2

Uma plataforma abrangente de gamificação educacional que conecta mentores e estudantes através de ferramentas alimentadas por IA e experiências de aprendizado interativas.

## 🚀 Funcionalidades

### Para Mentores
- **Dashboard Personalizado**: Interface intuitiva para gerenciar conteúdo e acompanhar alunos
- **Criação de Mentorias**: Sistema completo para criar e organizar programas de mentoria
- **Geração Automática de Quizzes**: IA analisa vídeos do YouTube/Vimeo e gera questionários automaticamente
- **Acompanhamento de Progresso**: Visualização detalhada do desempenho dos alunos

### Para Estudantes
- **Dashboard Gamificado**: Sistema de XP, níveis, conquistas e trilhas de aprendizado
- **Aprendizado Interativo**: Quizzes inteligentes com feedback personalizado
- **Trilhas de Progresso**: Mapa visual de aprendizado com níveis desbloqueáveis
- **Sistema de Recompensas**: Badges e marcos de celebração do progresso

## 🛠 Tecnologias

### Frontend
- **Next.js 15** com React 19 e TypeScript
- **TailwindCSS** com shadcn/ui para design system
- **Framer Motion** para animações suaves
- **Autenticação customizada** otimizada para Replit

### Backend
- **Next.js API Routes** com tRPC para APIs type-safe
- **PostgreSQL** com Drizzle ORM
- **Sistema de sessões** baseado em cookies e localStorage

### Inteligência Artificial
- **OpenAI/OpenRouter API** para análise de vídeos e geração de conteúdo
- **Google AI SDK** como alternativa para geração de conteúdo
- **AI SDK React** para interfaces de chat streaming

## 🏗 Arquitetura

```
mentor-labs-v2/
├── apps/
│   └── web/                 # Aplicação Next.js
│       ├── src/
│       │   ├── app/         # App Router (páginas)
│       │   ├── components/  # Componentes React
│       │   ├── lib/         # Utilitários e configurações
│       │   └── styles/      # Estilos globais
└── shared/                  # Código compartilhado (schemas, tipos)
```

## 🔧 Como Executar

### Desenvolvimento
```bash
npm install
npm run dev:web
```

### Produção
```bash
npm run build
npm run start
```

## 🗄 Banco de Dados

O projeto usa PostgreSQL com Drizzle ORM. A tabela principal:

```sql
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  user_type TEXT NOT NULL, -- 'mentor' ou 'student'
  password TEXT NOT NULL,
  avatar TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔐 Autenticação

Sistema de autenticação customizado com:
- Sessões baseadas em cookies para middleware
- localStorage para persistência no cliente
- Redirecionamento automático baseado em roles (mentor/student)
- Sistema de fallback robusto

## 🎮 Sistema de Gamificação

- **XP e Níveis**: Sistema progressivo de experiência
- **Conquistas**: Badges desbloqueáveis por marcos
- **Trilhas de Aprendizado**: Mapa visual com progresso
- **Recompensas**: Sistema de feedback positivo

## 🌐 Deploy

Configurado para deploy no Replit com:
- **Tipo**: Autoscale (ideal para websites)
- **Build**: `npm run build`
- **Start**: `npm start`

## 📊 Status do Projeto

✅ Sistema de autenticação funcional  
✅ Dashboard para mentores completo  
✅ Dashboard gamificado para estudantes  
✅ Integração com IA para geração de quizzes  
✅ Sistema de banco de dados PostgreSQL  
✅ Deploy configurado para produção  

## 🤝 Contribuição

Este projeto é um MVP funcional com todas as funcionalidades principais implementadas e testadas.
