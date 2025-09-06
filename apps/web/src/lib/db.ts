import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Usar apenas o PostgreSQL do Replit
const connectionString = process.env.DATABASE_URL!;

console.log('🔗 Conectando ao banco Replit:', connectionString ? 'Configurado ✅' : 'Não configurado ❌');

// Create the connection with optimized configuration for Replit
const client = postgres(connectionString, {
  max: 1, // Reduzir conexões para evitar conflitos
  idle_timeout: 20,
  connect_timeout: 10, // Reduzir timeout para falhar mais rápido
  prepare: false, // Desabilitar prepared statements para evitar conflitos
  ssl: connectionString.includes('localhost') ? false : 'require', // SSL apenas para conexões remotas
  transform: {
    undefined: null, // Transformar undefined em null
  },
});

// Create the database instance
export const db = drizzle(client);