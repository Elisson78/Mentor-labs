
# 🎓 Mentor Labs - Plataforma de Mentorias com IA

Plataforma educacional gamificada que conecta mentores e alunos, com geração automática de quizzes através de IA e análise de vídeos.

## 🚀 Tecnologias

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, tRPC
- **Database**: PostgreSQL (Replit Database)
- **ORM**: Drizzle ORM
- **IA**: OpenAI/OpenRouter
- **Autenticação**: Sistema personalizado para Replit

## 📋 Configuração no Replit

### 1. Configure o PostgreSQL Database
1. No Replit, vá para a aba "Database" 
2. Clique em "Create a database"
3. O `DATABASE_URL` será configurado automaticamente

### 2. Configure as Variáveis de Ambiente
Copie `.env.example` para `.env` e configure:

```bash
# OpenAI/OpenRouter (obrigatório para funcionalidades de IA)
OPENAI_API_KEY=sua_chave_aqui
OPENAI_BASE_URL=https://openrouter.ai/api/v1

# URLs (ajuste com sua URL do Repl)
NEXT_PUBLIC_API_URL=https://seu-repl.replit.dev
NEXT_PUBLIC_WEB_URL=https://seu-repl.replit.dev
```

### 3. Instale Dependências
```bash
npm install
```

### 4. Configure o Banco de Dados
```bash
node scripts/setup-database.js
```

### 5. Execute o Projeto
```bash
npm run dev
```

## 🎮 Funcionalidades

### Para Mentores:
- ✅ Dashboard personalizado
- ✅ Criação de quizzes com IA
- ✅ Análise automática de vídeos
- ✅ Gestão de alunos
- ✅ Mentorias com IA

### Para Alunos:
- ✅ Dashboard gamificado
- ✅ Mapa de progresso interativo
- ✅ Quizzes gamificados
- ✅ Sistema de conquistas
- ✅ Trilhas de aprendizado

## 🎯 Como Usar

1. **Registro**: Acesse `/auth/register` e crie sua conta
2. **Login**: Entre em `/auth/login`
3. **Dashboard**: Será redirecionado automaticamente baseado no seu tipo de usuário
4. **Explore**: Todas as funcionalidades estão disponíveis nos menus laterais

## 📱 Responsivo

A aplicação está totalmente otimizada para mobile e desktop.

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia ambiente de desenvolvimento
npm run build        # Build para produção
npm run dev:web      # Inicia apenas o frontend
npm run dev:server   # Inicia apenas o backend
npm run check-types  # Verifica tipos TypeScript
```

## 🌟 Deploy no Replit

A aplicação está configurada para rodar nativamente no Replit. Basta clicar no botão "Run" após a configuração inicial.

---

**Desenvolvido para o Replit** 🚀
