# Configuração de Deploy - Servidor Hetzner

## 📋 Informações do Servidor

### Servidor Hetzner Cloud - CPX41
- **IP Público**: `138.201.152.160`
- **Sistema**: Ubuntu Linux
- **Localização**: Falkenstein, Alemanha (fsn1)
- **vCPU**: 8 cores (Shared x86)
- **RAM**: 16 GB
- **Storage**: 240 GB SSD
- **Bandwidth**: 20 TB/mês

## 🐳 Configuração Docker para Produção

### 1. Variáveis de Ambiente (.env.production)
```bash
# Database
DATABASE_URL=postgresql://postgres:your_password@postgres:5432/nentor_labs_prod
POSTGRES_PASSWORD=your_secure_password_here

# Application URLs
NEXT_PUBLIC_SERVER_URL=http://138.201.152.160:3000
NEXT_PUBLIC_WEB_URL=http://138.201.152.160:3001

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
SUPABASE_JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI APIs
OPENAI_API_KEY=your_openai_key
OPENAI_BASE_URL=https://api.openai.com/v1
GOOGLE_AI_API_KEY=your_google_ai_key

# Security
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://138.201.152.160:3001

# CORS
CORS_ORIGIN=http://138.201.152.160:3001

# Environment
NODE_ENV=production
```

### 2. Docker Compose para Hetzner
```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: nentor-postgres-prod
    restart: unless-stopped
    environment:
      POSTGRES_DB: nentor_labs_prod
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - nentor-network

  # Server (Backend API)
  server:
    build:
      context: ./apps/server
      dockerfile: Dockerfile
    container_name: nentor-server-prod
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - OPENAI_BASE_URL=${OPENAI_BASE_URL}
      - GOOGLE_AI_API_KEY=${GOOGLE_AI_API_KEY}
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - SUPABASE_JWT_SECRET=${SUPABASE_JWT_SECRET}
      - CORS_ORIGIN=${CORS_ORIGIN}
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    networks:
      - nentor-network

  # Web (Frontend)
  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile
    container_name: nentor-web-prod
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
    ports:
      - "3001:3000"
    depends_on:
      - server
    networks:
      - nentor-network

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: nentor-nginx-prod
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - web
      - server
    networks:
      - nentor-network

volumes:
  postgres_data:
    driver: local

networks:
  nentor-network:
    driver: bridge
```

## 🔧 Scripts de Deploy

### 1. Script de Deploy Automatizado (deploy-hetzner.sh)
```bash
#!/bin/bash

echo "🚀 Iniciando deploy no servidor Hetzner..."

# Definir variáveis
SERVER_IP="138.201.152.160"
SERVER_USER="root"
PROJECT_NAME="nentor-labs"

echo "📦 Fazendo build local..."
npm run build

echo "📤 Enviando arquivos para o servidor..."
rsync -avz --exclude node_modules --exclude .git . $SERVER_USER@$SERVER_IP:/opt/$PROJECT_NAME/

echo "🐳 Executando deploy no servidor..."
ssh $SERVER_USER@$SERVER_IP << 'EOF'
cd /opt/nentor-labs
docker-compose down
docker-compose pull
docker-compose up -d --build
docker system prune -f
EOF

echo "✅ Deploy concluído!"
echo "🌐 Aplicação disponível em: http://138.201.152.160"
```

### 2. Script de Configuração Inicial (setup-hetzner.sh)
```bash
#!/bin/bash

echo "🔧 Configurando servidor Hetzner..."

# Atualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Criar diretório do projeto
mkdir -p /opt/nentor-labs

# Configurar firewall
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw allow 3000  # API
ufw allow 3001  # Web
ufw --force enable

echo "✅ Servidor configurado!"
```

## 📋 Checklist de Deploy

### Antes do Deploy:
- [ ] Configurar variáveis de ambiente (.env.production)
- [ ] Configurar Supabase para produção
- [ ] Configurar OpenAI API keys
- [ ] Testar build local
- [ ] Backup do banco de dados (se existir)

### Durante o Deploy:
- [ ] Executar setup-hetzner.sh (primeira vez)
- [ ] Executar deploy-hetzner.sh
- [ ] Verificar logs dos containers
- [ ] Testar conectividade

### Após o Deploy:
- [ ] Verificar aplicação em http://138.201.152.160
- [ ] Testar todas as funcionalidades
- [ ] Configurar SSL/HTTPS (opcional)
- [ ] Configurar backup automático
- [ ] Monitoramento e logs

## 🔍 Comandos Úteis

### Verificar Status dos Containers:
```bash
ssh root@138.201.152.160
cd /opt/nentor-labs
docker-compose ps
docker-compose logs -f
```

### Atualizar Aplicação:
```bash
./deploy-hetzner.sh
```

### Backup do Banco:
```bash
docker exec nentor-postgres-prod pg_dump -U postgres nentor_labs_prod > backup.sql
```

### Restaurar Banco:
```bash
docker exec -i nentor-postgres-prod psql -U postgres nentor_labs_prod < backup.sql
```

## 🚀 URLs de Acesso

- **Frontend**: http://138.201.152.160:3001
- **Backend API**: http://138.201.152.160:3000
- **Health Check**: http://138.201.152.160:3000/api/health
- **Database**: 138.201.152.160:5432

---

**Servidor**: CPX41 Hetzner Cloud  
**Status**: ✅ Configurado e pronto para deploy  
**Custo**: €24.70/mês
