# Estratégia de Deploy - Coolify + Supabase

## 📋 Análise da Infraestrutura Existente

### ✅ Serviços Já Configurados no Coolify:
- **PostgreSQL**: `138.201.152.160:5432` ✅
- **Supabase Kong**: `kong:2.8.1` ✅  
- **Supabase Studio**: Interface administrativa ✅
- **Domains configurados**: 
  - `api.event-connect.app` 
  - `event-connect.app`

### 🎯 **MELHOR ESTRATÉGIA IDENTIFICADA**

## 🚀 Estratégia Recomendada: **Integração com Infraestrutura Existente**

### ✅ **Vantagens desta Abordagem:**
1. **Aproveitamento máximo** da infraestrutura existente
2. **Economia de recursos** (não duplica PostgreSQL)
3. **Consistência** com setup já funcionando
4. **Menos complexidade** de configuração
5. **Facilidade de manutenção**

---

## 🏗️ Implementação da Estratégia

### **Fase 1: Preparação dos Arquivos**

#### 1. Usar `docker-compose.coolify.yml` (já criado)
- ✅ Remove PostgreSQL (usa o existente)
- ✅ Conecta diretamente ao Supabase configurado
- ✅ Otimizado para o Coolify

#### 2. Configurar variáveis de ambiente:
```bash
# No Coolify, na aba "Environment Variables"
DATABASE_URL=postgresql://postgres:CSQ0OC3A0KQAwdfuxdBwKuOeZHcBZAeI@138.201.152.160:5432/postgres
NEXT_PUBLIC_API_URL=https://api.event-connect.app
NEXT_PUBLIC_WEB_URL=https://event-connect.app

# Supabase (configurado no Coolify)
SUPABASE_URL=http://supabase-uoocsgggcogs04w484k8ss8g:8000
SUPABASE_ANON_KEY=N1SAsPI9IjpSvk5f
SUPABASE_JWT_SECRET=gVpem5dwt2w0SC70vsXEkDZY6q3crzy5
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_SUPABASE_URL=http://138.201.152.160:8000
NEXT_PUBLIC_SUPABASE_ANON_KEY=N1SAsPI9IjpSvk5f

# ... demais variáveis do coolify.env.example
```

### **Fase 2: Configuração no Coolify**

#### 1. **Criar Novo Projeto no Coolify**
- Nome: `nentor-labs-main`
- Build Pack: `Docker Compose`
- Git Source: `https://github.com/Elisson78/Mentor-labs.git`

#### 2. **Configurar Build Settings**
- **Base Directory**: `/`
- **Docker Compose Location**: `/docker-compose.coolify.yml`
- **Custom Build Command**: `docker-compose build`
- **Custom Start Command**: `docker-compose up -d`

#### 3. **Configurar Domains**
- **Frontend**: `event-connect.app` → port `3001`
- **API**: `api.event-connect.app` → port `3000`

### **Fase 3: Configuração do Database Schema**

#### 1. **Migrar Schema para PostgreSQL Existente**
```bash
# Conectar ao PostgreSQL do Coolify
psql postgresql://postgres:CSQ0OC3A0KQAwdfuxdBwKuOeZHcBZAeI@138.201.152.160:5432/postgres

# Executar migrations do Drizzle
npm run db:push
```

#### 2. **Configurar Tabelas Necessárias**
- Usar o schema existente em `apps/server/src/db/schema.ts`
- As tabelas serão criadas automaticamente pelo Drizzle

---

## 🔧 Configurações Específicas

### **1. Ajustes no Código (Mínimos Necessários)**

#### A. Atualizar `apps/server/src/db/index.ts`:
```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Usar URL do PostgreSQL do Coolify
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client);
```

#### B. Ajustar CORS no `apps/server/src/middleware.ts`:
```typescript
res.headers.append('Access-Control-Allow-Origin', 'https://event-connect.app')
```

### **2. Configurações de Produção**

#### A. **Next.js Config** (já configurado):
- Output: `standalone`
- Otimizado para containers

#### B. **Dockerfile** (verificar se está otimizado):
- Multi-stage build ✅
- Node.js Alpine ✅
- Dependências de produção ✅

---

## 📝 Passo a Passo do Deploy

### **Pré-requisitos:**
1. ✅ GitHub atualizado (já feito)
2. ✅ Docker Compose criado
3. ✅ Variáveis de ambiente definidas

### **Deploy Steps:**

#### **1. No Coolify Dashboard:**
```
1. Ir em "Projects" → "New Project"
2. Nome: "nentor-labs-main"
3. Git Source: https://github.com/Elisson78/Mentor-labs.git
4. Build Pack: "Docker Compose"
5. Docker Compose Location: "/docker-compose.coolify.yml"
```

#### **2. Configurar Environment Variables:**
```
DATABASE_URL=postgresql://postgres:CSQ0OC3A0KQAwdfuxdBwKuOeZHcBZAeI@138.201.152.160:5432/postgres
NEXT_PUBLIC_API_URL=https://api.event-connect.app
NEXT_PUBLIC_WEB_URL=https://event-connect.app
SUPABASE_URL=https://temp.supabase.co
SUPABASE_ANON_KEY=temp_anon
SUPABASE_JWT_SECRET=temp_secret
SUPABASE_SERVICE_ROLE_KEY=temp_key
NEXT_PUBLIC_SUPABASE_URL=https://temp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=temp_anon
OPENAI_API_KEY=temp_openai
WEBHOOK_SECRET=22e830e6941533e5b0edeacb9e4f27c5ae96
```

#### **3. Configurar Domains:**
```
Service: server (port 3000) → api.event-connect.app
Service: web (port 3001) → event-connect.app
```

#### **4. Deploy:**
```
1. Save & Deploy
2. Aguardar build completar
3. Verificar logs
4. Testar aplicação
```

---

## 🔍 Monitoramento e Verificação

### **Health Checks Configurados:**
- **API**: `https://api.event-connect.app/api/health`
- **Frontend**: `https://event-connect.app`

### **Logs para Monitorar:**
```bash
# No Coolify, acessar logs de cada serviço:
- nentor-server: logs da API
- nentor-web: logs do frontend
```

### **Comandos de Troubleshooting:**
```bash
# Verificar status dos containers
docker ps | grep nentor

# Logs em tempo real
docker logs -f nentor-server
docker logs -f nentor-web

# Conectar ao banco
psql postgresql://postgres:CSQ0OC3A0KQAwdfuxdBwKuOeZHcBZAeI@138.201.152.160:5432/postgres
```

---

## ✅ Checklist Final

### **Antes do Deploy:**
- [ ] ✅ GitHub atualizado
- [ ] ✅ `docker-compose.coolify.yml` criado
- [ ] ✅ `coolify.env.example` com todas as variáveis
- [ ] 🔄 Configurar chaves reais (OpenAI, Supabase)
- [ ] 🔄 Testar conexão com PostgreSQL

### **Durante o Deploy:**
- [ ] 🔄 Criar projeto no Coolify
- [ ] 🔄 Configurar variáveis de ambiente
- [ ] 🔄 Configurar domains
- [ ] 🔄 Executar deploy

### **Após o Deploy:**
- [ ] 🔄 Testar `https://event-connect.app`
- [ ] 🔄 Testar `https://api.event-connect.app/api/health`
- [ ] 🔄 Verificar logs
- [ ] 🔄 Testar funcionalidades principais

---

## 🎯 **CONCLUSÃO DA ESTRATÉGIA**

### ✅ **Esta abordagem é IDEAL porque:**
1. **Aproveita 100%** da infraestrutura existente
2. **Minimiza mudanças** no código
3. **Reduz complexidade** de configuração
4. **Mantém consistência** com setup atual
5. **Facilita manutenção** futura

### 🚀 **Próximo Passo:**
Executar o deploy seguindo o passo a passo acima!

---

**Status**: ✅ **ESTRATÉGIA DEFINIDA E PRONTA PARA IMPLEMENTAÇÃO**  
**Infraestrutura**: Coolify + Supabase + PostgreSQL (existente)  
**Tempo estimado**: 30-60 minutos para deploy completo
