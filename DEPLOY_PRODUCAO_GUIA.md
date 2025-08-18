# Guia Completo de Deploy em Produção com Coolify

## 🎯 Visão Geral

Este guia te mostra como colocar sua plataforma educacional em produção no seu VPS (91.107.237.159:8000) usando Coolify com Docker e PostgreSQL.

## 📋 Pré-requisitos

### No seu VPS:
- ✅ Coolify instalado e rodando em http://91.107.237.159:8000
- ✅ Docker e Docker Compose
- ✅ PostgreSQL (será configurado via Docker)

### Chaves de API necessárias:
- 🔑 OpenRouter API Key (já configurada)
- ✅ Sua chave: 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

## 🚀 Passo a Passo para Deploy

### 1. Preparação do Código

Seu projeto já foi preparado com:
- ✅ Dockerfiles para `apps/web` e `apps/server`
- ✅ Migração de SQLite → PostgreSQL
- ✅ Docker Compose configurado
- ✅ Variáveis de ambiente organizadas

### 2. Configuração no Coolify

#### 2.1. Acesse o Coolify
1. Vá para http://91.107.237.159:8000
2. Faça login no painel administrativo

#### 2.2. Criar Novo Projeto
1. Clique em "New Project"
2. Nome: `plataforma-educacional`
3. Escolha "Docker Compose" como tipo

#### 2.3. Configurar Repository
1. **Git Repository**: Cole a URL do seu repositório Git
2. **Branch**: `main` (ou sua branch principal)
3. **Docker Compose File**: `/docker-compose.yml`

#### 2.4. Variáveis de Ambiente
Configure estas variáveis essenciais no Coolify:

```bash
# Database (exemplo)
DATABASE_URL=${DATABASE_URL}

# Authentication
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
NEXTAUTH_URL=${NEXTAUTH_URL}

# OpenRouter API (acesso a múltiplos modelos)
OPENAI_API_KEY=${OPENAI_API_KEY}
OPENAI_BASE_URL=${OPENAI_BASE_URL}

# URLs da aplicação
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
NEXT_PUBLIC_WEB_URL=${NEXT_PUBLIC_WEB_URL}

# Produção
NODE_ENV=production
```

### 3. Configuração de Domínio

#### 3.1. No Coolify:
1. Vá para "Domains"
2. Configure:
   - **Frontend**: `seu-dominio.com` → porta `3001`
   - **Backend**: `api.seu-dominio.com` → porta `3000`

#### 3.2. SSL (Automático):
O Coolify configurará automaticamente HTTPS com Let's Encrypt.

### 4. Deploy

#### 4.1. Primeira Deploy:
1. No Coolify, clique em "Deploy"
2. Aguarde o build das imagens Docker
3. Monitor os logs para verificar se tudo está OK

#### 4.2. Verificação:
Acesse:
- Frontend: https://seu-dominio.com
- Backend: https://api.seu-dominio.com

## 🗄️ Configuração do Banco de Dados

O PostgreSQL será criado automaticamente via Docker Compose, mas você pode:

### Backup e Migração:
```bash
# Conectar no container do banco
docker exec -it teste-postgres psql -U postgres -d teste_db

# Executar migrações
npm run db:push
```

## 🔧 Configurações Avançadas

### 1. Monitoramento
```bash
# Ver logs em tempo real
docker-compose logs -f

# Status dos containers
docker-compose ps

# Reiniciar serviços
docker-compose restart
```

### 2. Performance
- **CPU**: 2+ cores recomendado
- **RAM**: 4GB+ recomendado
- **Storage**: 20GB+ recomendado

### 3. Backup Automático
Configure backup diário do PostgreSQL:
```bash
# Adicione no crontab
0 2 * * * docker exec teste-postgres pg_dump -U postgres teste_db > /backup/db_$(date +\%Y\%m\%d).sql
```

## 🔄 Atualizações

Para atualizar a aplicação:

1. **Via Coolify**: 
   - Clique em "Redeploy" no painel
   - Ou configure auto-deploy via webhooks

2. **Manual**:
   ```bash
   git pull origin main
   docker-compose down
   docker-compose up -d --build
   ```

## 🚨 Troubleshooting

### Problemas Comuns:

#### 1. Container não inicia:
```bash
docker-compose logs nome-do-servico
```

#### 2. Erro de conexão com banco:
- Verifique se `DATABASE_URL` está correto
- Confirme se PostgreSQL está rodando

#### 3. Erro 502 no Coolify:
- Verifique se os containers estão na porta correta
- Confirme configuração de proxy reverso

#### 4. Build falha:
- Verifique logs de build no Coolify
- Confirme se todas as dependências estão no package.json

### Comandos Úteis:
```bash
# Reiniciar tudo
docker-compose restart

# Limpar e rebuildar
docker-compose down -v
docker-compose up -d --build

# Ver uso de recursos
docker stats

# Acessar container
docker exec -it nome-container sh
```

## 🎉 Checklist Final

- [ ] Coolify configurado e rodando
- [ ] Repositório Git conectado
- [ ] Variáveis de ambiente configuradas
- [ ] Domínio apontando para o VPS
- [ ] SSL certificado ativo
- [ ] PostgreSQL criado e migrações executadas
- [ ] Frontend acessível em https://seu-dominio.com
- [ ] Backend acessível em https://api.seu-dominio.com
- [ ] IA funcionando com as APIs configuradas
- [ ] Upload de vídeos funcionando
- [ ] Dashboard de alunos e professores acessível

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no Coolify
2. Use `docker-compose logs -f` para debug
3. Confirme todas as variáveis de ambiente
4. Teste conectividade de rede entre containers

Sua plataforma educacional estará pronta para receber alunos! 🎓✨