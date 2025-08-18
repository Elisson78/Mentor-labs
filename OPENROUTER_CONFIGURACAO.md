# 🤖 Configuração OpenRouter API

## 🎯 Visão Geral

Seu projeto está configurado para usar **OpenRouter**, que oferece acesso a múltiplos modelos de IA através de uma única API:

- ✅ GPT-4, GPT-3.5 (OpenAI)
- ✅ Claude 3 (Anthropic) 
- ✅ Llama 3, Mixtral (Open Source)
- ✅ Gemini Pro (Google)
- ✅ E muitos outros!

## 🔑 Sua Configuração

**API Key**: `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`
**Base URL**: `https://openrouter.ai/api/v1`

## 🎨 Modelos Disponíveis

### **Para Análise de Vídeo** (Padrão: GPT-4 Turbo)
```typescript
// Melhor para compreensão e análise complexa
'openai/gpt-4-turbo'
```

### **Para Geração de Quiz** (Padrão: Claude 3 Sonnet)
```typescript
// Excelente para criar perguntas educacionais
'anthropic/claude-3-sonnet'
```

### **Modelos Alternativos**:
- `'openai/gpt-3.5-turbo'` - Mais rápido e barato
- `'meta-llama/llama-3-70b-instruct'` - Open source potente
- `'google/gemini-pro'` - Boa para multimodalidade
- `'anthropic/claude-3-opus'` - Mais avançado (mais caro)

## 💰 Custos Estimados

OpenRouter tem preços competitivos:
- **GPT-4 Turbo**: ~$0.01-0.03 por análise de vídeo
- **Claude 3 Sonnet**: ~$0.003-0.015 por quiz gerado
- **GPT-3.5**: ~$0.001-0.002 por operação
- **Llama 3**: ~$0.0006-0.0012 por operação

## 🛠️ Como Trocar Modelos

### 1. No código servidor (`apps/server/src/lib/openrouter.ts`):
```typescript
// Trocar modelo padrão para análise de vídeo
export const DEFAULT_VIDEO_ANALYSIS_MODEL = 'openai/gpt-3.5-turbo'; // mais barato

// Trocar modelo padrão para quiz
export const DEFAULT_QUIZ_GENERATION_MODEL = 'meta-llama/llama-3-70b-instruct'; // gratuito
```

### 2. Por requisição (dinâmico):
```typescript
// Usar modelo específico para uma análise
const result = await generateText({
  model: openrouter('anthropic/claude-3-opus'), // modelo premium
  prompt: 'Analise este vídeo...'
});
```

## 📊 Monitoramento de Uso

1. **Painel OpenRouter**: https://openrouter.ai/usage
2. **Logs no seu app**:
   ```bash
   docker-compose logs -f server | grep "AI_REQUEST"
   ```

## 🎯 Configurações Recomendadas

### **Para Produção**:
```env
# Balanceado: qualidade + custo
DEFAULT_VIDEO_MODEL=openai/gpt-4-turbo
DEFAULT_QUIZ_MODEL=anthropic/claude-3-sonnet
```

### **Para Desenvolvimento**:
```env
# Mais barato para testes
DEFAULT_VIDEO_MODEL=openai/gpt-3.5-turbo
DEFAULT_QUIZ_MODEL=meta-llama/llama-3-8b-instruct
```

### **Para Demo/Gratuito**:
```env
# Modelos gratuitos/baratos
DEFAULT_VIDEO_MODEL=meta-llama/llama-3-8b-instruct
DEFAULT_QUIZ_MODEL=meta-llama/llama-3-8b-instruct
```

## 🚨 Configuração de Segurança

**IMPORTANTE**: Sua API key está configurada, mas para produção:

1. **Não commit a chave real** no Git
2. **Use variáveis de ambiente** no Coolify
3. **Configure rate limiting** se necessário
4. **Monitor uso** para evitar gastos excessivos

## 🎉 Vantagens do OpenRouter

✅ **Acesso a múltiplos modelos** com uma API
✅ **Preços competitivos** (muitas vezes mais baratos)
✅ **Failover automático** se um modelo falha
✅ **Sem vendor lock-in** - fácil de trocar modelos
✅ **Modelos open source gratuitos** disponíveis

Sua plataforma educacional tem acesso aos melhores modelos de IA do mundo! 🎓🤖