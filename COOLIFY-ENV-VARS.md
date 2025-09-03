# Variáveis de Ambiente para Coolify

## ⚠️ CONFIGURAÇÃO OBRIGATÓRIA

Para o projeto funcionar no Coolify, você DEVE configurar as seguintes variáveis de ambiente:

### 📋 Variáveis Necessárias:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

### 🛠️ Como Configurar no Coolify:

1. **Acesse o painel do Coolify**
2. **Vá para seu projeto**
3. **Clique em "Environment Variables"**
4. **Adicione as variáveis acima**
5. **Salve e faça redeploy**

### 🔍 Como Obter os Valores:

1. **Acesse seu projeto no Supabase Dashboard**
2. **Vá em Settings > API**
3. **Copie:**
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### ✅ Verificar se Funcionou:

Após configurar, acesse: `http://138.201.152.160:3001/api/health-supabase`

Se retornar `"status": "success"`, está funcionando!

### ❌ Sem essas variáveis:

- ✅ Build vai funcionar (usando placeholders)
- ❌ Login/registro não vai funcionar
- ❌ Funcionalidades que usam Supabase falharão

## 🚀 Após configurar, teste:

- Registro: `http://138.201.152.160:3001/auth/register`
- Login: `http://138.201.152.160:3001/auth/login`