import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Usar apenas o PostgreSQL do Replit
const connectionString = process.env.DATABASE_URL!;

console.log('🔗 Conectando ao banco Replit:', connectionString ? 'Configurado ✅' : 'Não configurado ❌');

// Create the connection
const client = postgres(connectionString, {
  max: 20,
  idle_timeout: 20,
  connect_timeout: 60,
});

// Create the database instance
export const db = drizzle(client);