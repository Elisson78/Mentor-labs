#!/bin/bash

# Deploy script para servidor Hetzner
# Uso: ./deploy-hetzner.sh

set -e

# Configurações
SERVER_IP="138.201.152.160"
SERVER_USER="root"
PROJECT_NAME="nentor-labs"
REMOTE_PATH="/opt/$PROJECT_NAME"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

echo_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

echo_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo_error() {
    echo -e "${RED}❌ $1${NC}"
}

echo_info "🚀 Iniciando deploy no servidor Hetzner (${SERVER_IP})..."

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo_error "package.json não encontrado. Execute este script na raiz do projeto."
    exit 1
fi

# Verificar conexão com o servidor
echo_info "🔍 Testando conexão com o servidor..."
if ! ssh -o ConnectTimeout=10 $SERVER_USER@$SERVER_IP "echo 'Conexão OK'"; then
    echo_error "Falha ao conectar com o servidor $SERVER_IP"
    exit 1
fi
echo_success "Conexão com o servidor estabelecida"

# Build local
echo_info "🔨 Fazendo build do projeto localmente..."
npm install --frozen-lockfile
npm run build
echo_success "Build local concluído"

# Sincronizar arquivos
echo_info "📤 Enviando arquivos para o servidor..."
rsync -avz --progress \
    --exclude node_modules \
    --exclude .git \
    --exclude .next \
    --exclude dist \
    --exclude "*.log" \
    --exclude .env.local \
    --exclude .env \
    . $SERVER_USER@$SERVER_IP:$REMOTE_PATH/

echo_success "Arquivos sincronizados"

# Deploy no servidor
echo_info "🐳 Executando deploy no servidor..."
ssh $SERVER_USER@$SERVER_IP << EOF
    set -e
    cd $REMOTE_PATH
    
    echo "📍 Diretório atual: \$(pwd)"
    
    # Parar containers existentes
    echo "🛑 Parando containers existentes..."
    docker-compose -f docker-compose.hetzner.yml down || true
    
    # Limpar imagens antigas
    echo "🧹 Limpando imagens antigas..."
    docker system prune -f || true
    
    # Build e iniciar containers
    echo "🚀 Iniciando containers..."
    docker-compose -f docker-compose.hetzner.yml up -d --build
    
    # Aguardar containers iniciarem
    echo "⏳ Aguardando containers iniciarem..."
    sleep 30
    
    # Verificar status
    echo "📊 Status dos containers:"
    docker-compose -f docker-compose.hetzner.yml ps
    
    # Verificar logs
    echo "📋 Últimos logs:"
    docker-compose -f docker-compose.hetzner.yml logs --tail=20
    
    echo "✅ Deploy concluído!"
EOF

# Verificar se a aplicação está funcionando
echo_info "🔍 Verificando se a aplicação está funcionando..."
sleep 10

# Testar API
if curl -f -s "http://$SERVER_IP:3000/api/health" > /dev/null; then
    echo_success "API está funcionando (porta 3000)"
else
    echo_warning "API não está respondendo na porta 3000"
fi

# Testar Frontend
if curl -f -s "http://$SERVER_IP:3001" > /dev/null; then
    echo_success "Frontend está funcionando (porta 3001)"
else
    echo_warning "Frontend não está respondendo na porta 3001"
fi

echo_success "🎉 Deploy concluído com sucesso!"
echo_info "🌐 URLs da aplicação:"
echo_info "   Frontend: http://$SERVER_IP:3001"
echo_info "   API: http://$SERVER_IP:3000"
echo_info "   Health Check: http://$SERVER_IP:3000/api/health"

echo_info "📋 Para verificar logs:"
echo_info "   ssh $SERVER_USER@$SERVER_IP"
echo_info "   cd $REMOTE_PATH"
echo_info "   docker-compose -f docker-compose.hetzner.yml logs -f"
