#!/bin/bash

# Deploy script para produção
set -e

echo "🚀 Iniciando deploy para produção..."

# Verificar se as variáveis de ambiente estão configuradas
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo "📋 Copie .env.example para .env e configure as variáveis necessárias"
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Build das aplicações
echo "🔨 Fazendo build das aplicações..."
npm run build

# Executar migrações do banco de dados
echo "🗄️  Executando migrações do banco de dados..."
npm run db:push

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando!"
    exit 1
fi

# Build das imagens Docker
echo "🐳 Construindo imagens Docker..."
docker-compose build --no-cache

# Parar containers existentes
echo "⏹️  Parando containers existentes..."
docker-compose down

# Iniciar os containers
echo "▶️  Iniciando containers..."
docker-compose up -d

# Aguardar os serviços ficarem prontos
echo "⏳ Aguardando serviços ficarem prontos..."
sleep 30

# Verificar se os serviços estão rodando
echo "🔍 Verificando status dos serviços..."
docker-compose ps

# Testar conectividade
echo "🧪 Testando conectividade..."
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ Server rodando em http://localhost:3000"
else
    echo "⚠️  Server pode não estar respondendo ainda"
fi

if curl -f http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Web app rodando em http://localhost:3001"
else
    echo "⚠️  Web app pode não estar respondendo ainda"
fi

echo "✨ Deploy concluído!"
echo ""
echo "📋 URLs disponíveis:"
echo "   Frontend: http://localhost:3001"
echo "   Backend:  http://localhost:3000"
echo "   Database: localhost:5432"
echo ""
echo "📊 Para monitorar logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Para parar:"
echo "   docker-compose down"