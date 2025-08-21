# Guia de Configuração Supabase - Arquitetura Híbrida

## 🏗️ Arquitetura Implementada

**Híbrida (SaaS Moderno)**
- Frontend fala diretamente com Supabase para Auth
- Next.js Server valida JWT do Supabase 
- Dados sensíveis → Backend (tRPC)
- Queries simples → Frontend direto ao Supabase

## 📋 Variáveis de Ambiente Necessárias

### Frontend (apps/web/.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (apps/server/.env.local)
```bash
# PostgreSQL Database
DATABASE_URL=postgresql://postgres:CSQ0OC3A0KQAwdfuxdBwKuOeZHcBZAeI@138.201.152.160:5432/postgres

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key  
SUPABASE_JWT_SECRET=your_supabase_jwt_secret
```

## 🔧 Configuração do Supabase

### 1. Criar Projeto no Supabase
- Acesse [supabase.com](https://supabase.com)
- Crie um novo projeto
- Anote as credenciais do Dashboard > Settings > API

### 2. Configurar Authentication
```sql
-- No SQL Editor do Supabase
-- Criar tabela de perfis de usuário (opcional)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas seu próprio perfil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Política para usuários atualizarem apenas seu próprio perfil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### 3. Configurar RLS para Outras Tabelas
```sql
-- Exemplo para tabela de mentorias
ALTER TABLE mentorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mentorias" ON mentorias
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own mentorias" ON mentorias
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## 🚀 Deploy com Coolify

### 1. Configuração no Coolify

**Docker Compose Location**: `/docker-compose.coolify.yml`

**Webhook URL**: `https://event-connect.app/api/v1/deploy?uuid=uwcsoowckow88g4wssgs08o8&force=false`

### 2. Variáveis de Ambiente no Coolify
No painel do Coolify, adicione as variáveis:

```bash
# Database PostgreSQL
DATABASE_URL=postgresql://postgres:CSQ0OC3A0KQAwdfuxdBwKuOeZHcBZAeI@138.201.152.160:5432/postgres

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_JWT_SECRET=your_supabase_jwt_secret

# Application URLs
NEXT_PUBLIC_API_URL=https://your-server-domain.com
NEXT_PUBLIC_WEB_URL=https://your-frontend-domain.com

# OpenAI/OpenRouter (opcional)
OPENAI_API_KEY=your_openai_api_key
OPENAI_BASE_URL=https://openrouter.ai/api/v1

# Webhook Secret
WEBHOOK_SECRET=22e830e6941533e5b0edeacb9e4f27c5ae96
```

## 📱 Como Usar no Código

### Frontend - Auth Direta
```tsx
import { useAuth } from '@/components/auth/AuthProvider'

export default function MyComponent() {
  const { user, loading, signOut } = useAuth()
  
  if (loading) return <div>Carregando...</div>
  if (!user) return <LoginForm />
  
  return (
    <div>
      Olá {user.email}!
      <button onClick={signOut}>Sair</button>
    </div>
  )
}
```

### Frontend - Queries Diretas vs Backend
```tsx
import { useSupabaseApi } from '@/hooks/useSupabaseApi'

export default function Dashboard() {
  const { supabase, callBackend, queryDirect } = useSupabaseApi()
  
  // ✅ Queries simples - direto ao Supabase
  const loadSimpleData = async () => {
    const data = await queryDirect('public_posts')
    setData(data)
  }
  
  // ✅ Lógica complexa - via backend
  const loadSensitiveData = async () => {
    const data = await callBackend('analytics/revenue')
    setAnalytics(data)
  }
  
  return <div>Dashboard content</div>
}
```

### Backend - Validação JWT
```typescript
// No tRPC router
import { publicProcedure, protectedProcedure } from '@/lib/trpc'

export const appRouter = router({
  // ✅ Rota pública
  getPublicPosts: publicProcedure
    .query(async () => {
      return await db.posts.findMany()
    }),
    
  // ✅ Rota protegida - requer auth
  getUserAnalytics: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.user!.id // JWT já validado
      return await db.analytics.findMany({
        where: { userId }
      })
    })
})
```

## 🔒 Segurança

### Row Level Security (RLS)
- **SEMPRE** ative RLS nas tabelas
- Crie políticas específicas por operação
- Use `auth.uid()` para filtrar dados do usuário

### JWT Validation
- Backend valida automaticamente JWTs do Supabase
- Token enviado no header: `Authorization: Bearer <jwt>`
- Context do tRPC inclui dados do usuário autenticado

### Dados Sensíveis
- Faturamento, relatórios, analytics → Backend
- Perfil público, posts → Frontend direto
- Operações CRUD básicas → Frontend direto com RLS

## 🎯 Vantagens desta Arquitetura

✅ **Menor dependência crítica**: Auth funciona mesmo se backend estiver fora  
✅ **Performance**: Queries simples são mais rápidas (direto ao Supabase)  
✅ **Segurança**: Dados sensíveis protegidos no backend  
✅ **Flexibilidade**: Fácil migração gradual de funcionalidades  
✅ **Escalabilidade**: Backend focado apenas em lógica de negócio  

## 🚨 Próximos Passos

1. **Configure as variáveis de ambiente** com as credenciais do seu Supabase
2. **Execute `npm install`** para instalar as dependências
3. **Configure RLS** nas suas tabelas do Supabase  
4. **Teste localmente** antes do deploy
5. **Configure as variáveis no Coolify** para produção

---

**⚠️ IMPORTANTE**: Nunca commitee as credenciais do Supabase no repositório. Use sempre arquivos `.env.local` e variáveis de ambiente do Coolify.