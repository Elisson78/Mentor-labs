#!/bin/bash

# Script para enviar o projeto completo para o GitHub
# Execute este arquivo no Shell do Replit

echo "🚀 Configurando envio para GitHub..."

# Remover remote antigo se existir
git remote remove origin 2>/dev/null || true

# Adicionar o novo remote
git remote add origin https://github.com/Elisson78/mentor-labs-v2.git

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Projeto completo Mentor Labs v2 - Sistema de autenticação, dashboards e IA"

# Criar branch main
git branch -M main

# Enviar para GitHub
git push -u origin main

echo "✅ Projeto enviado para GitHub!"
echo "🔗 Acesse: https://github.com/Elisson78/mentor-labs-v2"