#!/bin/bash

echo "🚀 Enviando projeto para mentor-labs-v2..."

# Limpar configurações problemáticas do Git
rm -f .git/*.lock
rm -f .git/refs/remotes/origin/*.lock
rm -f .git/config.lock

# Forçar remoção do remote antigo
git remote remove origin 2>/dev/null || true

# Adicionar o novo repositório
git remote add origin https://github.com/Elisson78/mentor-labs-v2.git

# Verificar status
git status

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Projeto completo Mentor Labs v2 - Plataforma educacional com IA e gamificação"

# Definir branch main
git branch -M main

# Enviar para o repositório correto
git push -u origin main --force

echo "✅ Projeto enviado para https://github.com/Elisson78/mentor-labs-v2"
echo "🔗 Acesse o repositório para verificar!"