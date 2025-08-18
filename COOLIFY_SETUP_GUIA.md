# 🚀 Guia de Setup no Coolify - Passo a Passo

## 📋 Informações do seu GitHub App

✅ **GitHub App configurado**: `mentor-lab-coolify`  
✅ **Webhook Secret**: `ff0bf2616b1454e99af428823b442b95db237ca60fbde63ab7b51e5d97dd4d50`  
✅ **Servidor Coolify**: http://91.107.237.159:8000  

## 🎯 Próximos Passos

### 1. **Criar Projeto no Coolify**

1. Acesse: http://91.107.237.159:8000
2. Faça login no Coolify
3. Clique em **"New Project"**
4. Nome do projeto: `plataforma-educacional`

### 2. **Configurar Source (GitHub)**

1. **Source Type**: GitHub App
2. **GitHub App**: Selecione `mentor-lab-coolify` 
3. **Repository**: Escolha seu repositório onde está o código
4. **Branch**: `main` (ou sua branch principal)
5. **Build Pack**: Docker Compose
6. **Docker Compose File**: `docker-compose.coolify.yml`

### 3. **Configurar Variáveis de Ambiente**

No Coolify, adicione estas variáveis na seção **Environment Variables**:

```bash
NODE_ENV=production
# DATABASE_URL exemplo: postgresql://<DB_USER>:<DB_PASSWORD>@<DB_HOST>:5432/<DB_NAME>
DATABASE_URL=${DATABASE_URL}
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
NEXTAUTH_URL=${NEXTAUTH_URL}
OPENAI_API_KEY=${OPENAI_API_KEY}
OPENAI_BASE_URL=${OPENAI_BASE_URL}
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
NEXT_PUBLIC_WEB_URL=${NEXT_PUBLIC_WEB_URL}
WEBHOOK_SECRET=${WEBHOOK_SECRET}
```

**✅ Banco PostgreSQL**: Configure o banco no Coolify e use as credenciais fornecidas pelo serviço. Não comite senhas no repositório.

### 4. **Configurar Domínios**

Na seção **Domains** do Coolify:

**Frontend (Web):**
- Domain: `seu-dominio.com`
- Port: `3001`
- Container: `web`

**Backend (API):**
- Domain: `api.seu-dominio.com`  
- Port: `3000`
- Container: `server`

### 5. **Configurar DNS**

No seu provedor de DNS (Cloudflare, etc):
```
seu-dominio.com      A    91.107.237.159
api.seu-dominio.com  A    91.107.237.159
```

### 6. **Deploy Inicial**

1. No Coolify, clique em **"Deploy"**
2. Aguarde o build (pode levar 5-10 minutos)
3. Monitor os logs para ver o progresso
4. Quando concluído, teste:
   - Frontend: https://seu-dominio.com
   - Backend: https://api.seu-dominio.com

## 🔧 Configurações Avançadas

### **Health Checks**
O Coolify fará health checks automaticamente:
- `/health` para o backend
- `/` para o frontend

### **Auto Deploy**
Com o webhook configurado, deployments automáticos acontecerão quando você fizer push para `main`.

### **SSL/HTTPS**
O Coolify configurará automaticamente certificados SSL via Let's Encrypt.

## 🚨 Troubleshooting

### **Se o build falhar:**
1. Verifique os logs no Coolify
2. Confirme se o `docker-compose.prod.yml` está no repositório
3. Verifique se todas as variáveis estão configuradas

### **Se os containers não iniciarem:**
1. Verifique se o PostgreSQL está rodando
2. Confirme a `DATABASE_URL`
3. Check logs individuais de cada serviço

### **Se os domínios não funcionarem:**
1. Confirme que DNS está apontando para o servidor
2. Aguarde propagação DNS (até 24h)
3. Verifique configuração de portas

## 📊 Monitoramento

### **Ver Logs:**
No Coolify → Seu Projeto → Logs

### **Status dos Containers:**
No Coolify → Seu Projeto → Containers

### **Métricas:**
No Coolify → Seu Projeto → Metrics

## ✅ Checklist Final

- [ ] GitHub App `mentor-labs` conectado
- [ ] Repositório selecionado e branch configurada
- [ ] Docker Compose file: `docker-compose.prod.yml`
- [ ] Todas as variáveis de ambiente adicionadas
- [ ] Domínios configurados (frontend + backend)
- [ ] DNS apontando para 91.107.237.159
- [ ] Deploy executado com sucesso
- [ ] SSL certificados ativos
- [ ] Health checks passando
- [ ] Frontend acessível via HTTPS
- [ ] Backend respondendo via HTTPS
- [ ] IA funcionando (teste análise de vídeo)

## 🎉 Resultado Final

Quando tudo estiver configurado:
- ✅ **Frontend**: https://seu-dominio.com
- ✅ **Backend**: https://api.seu-dominio.com  
- ✅ **Deploy automático** via GitHub webhooks
- ✅ **SSL** configurado automaticamente
- ✅ **PostgreSQL** rodando em container
- ✅ **IA OpenRouter** funcionando
- ✅ **Monitoramento** ativo

Sua plataforma educacional estará pronta para receber usuários! 🎓✨