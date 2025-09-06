import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Usar a URL do banco do Replit diretamente
const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_ysPaE1qfCOlh@ep-withered-wood-a2w8bx90.eu-central-1.aws.neon.tech/neondb?sslmode=require";

console.log('🔗 Conectando ao banco:', connectionString.substring(0, 50) + '...');

// Create the connection
const client = postgres(connectionString, {
  max: 20,
  idle_timeout: 20,
  connect_timeout: 60,
});

// Create the database instance
export const db = drizzle(client);