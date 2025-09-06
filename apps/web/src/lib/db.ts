
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Configuração da conexão com PostgreSQL
const connectionString = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/mentorlabs';

const sql = postgres(connectionString, {
  max: 20, // máximo de conexões no pool
});

export const db = drizzle(sql);
