# ⚡ Configurações Exatas para o Coolify

Baseado na sua tela, aqui estão as configurações corretas:

## 🎯 **Configurações Gerais**

### **Name**: `mentorlabs`
### **Description**: `Plataforma educacional com IA para análise de vídeos e quizzes`
### **Build Pack**: `Dockerfile` ⚠️ **MUDE DE "Dockerfile" para "Docker Compose"**

## 🏗️ **Build Configuration**

### Se usar **Docker Compose** (RECOMENDADO):
- **Base Directory**: `/`
- **Docker Compose File**: `docker-compose.coolify.yml`

### Se usar **Dockerfile** (Alternativa):
- **Base Directory**: `/`
- **Dockerfile Location**: `/Dockerfile.web` (para frontend)
- **Dockerfile Location**: `/Dockerfile.server` (para backend)

## 🌐 **Domains** 

**Substitua por seus domínios reais:**

### Frontend:
- **Domain**: `mentoriabs.com` (ou seu domínio)
- **Port**: `3001`

### Backend:
- **Domain**: `api.mentoriabs.com`
- **Port**: `3000`

## ⚙️ **Environment Variables**

Clique em "Environment Variables" e adicione:

```bash
NODE_ENV=production
DATABASE_URL=postgresql://db_mentorlabs:Hqh0ekgAUhU6XnPlFupo8yididHgLqzSTnnnyc49iUuEpQ8vTcDWl7w6pZ31IAFx@mentoriabs:5432/postgres
NEXTAUTH_SECRET=sua-super-chave-secreta-aqui-123456789
NEXTAUTH_URL=https://mentoriabs.com
OPENAI_API_KEY=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
OPENAI_BASE_URL=https://openrouter.ai/api/v1
NEXT_PUBLIC_API_URL=https://api.mentoriabs.com
NEXT_PUBLIC_WEB_URL=https://mentoriabs.com
WEBHOOK_SECRET=055f49c7632040a1f3ce05d640037e9b196f1147
```

## 🔧 **Advanced Settings**

### **Git Source**:
- Certifique-se que está conectado ao seu repositório
- Branch: `main`

### **Webhooks**:
- Auto-deploy enabled: ✅ Sim

### **Persistent Storage**: 
- Não precisa (usando PostgreSQL externo)

## ⚡ **AÇÃO IMEDIATA**

**1. MUDE o Build Pack:**
   - De: `Dockerfile`
   - Para: `Docker Compose` ⬅️ **IMPORTANTE**

**2. Configure Docker Compose File:**
   - `docker-compose.coolify.yml`

**3. Clique em "Save"**

**4. Depois clique em "Deploy"**

## 🚨 **Troubleshooting**

### Se der erro no build:
1. Verifique se todos os arquivos estão no GitHub
2. Confirme que `docker-compose.coolify.yml` existe
3. Verifique se as variáveis de ambiente estão corretas

### Se containers não iniciarem:
1. Verifique conexão com PostgreSQL
2. Confirme que a `DATABASE_URL` está correta
3. Veja logs no Coolify

---

**📋 RESUMO: Mude para "Docker Compose" e use `docker-compose.coolify.yml`!**