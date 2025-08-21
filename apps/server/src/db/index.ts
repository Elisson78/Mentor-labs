import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:CSQ0OC3A0KQAwdfuxdBwKuOeZHcBZAeI@138.201.152.160:5432/postgres";

const client = postgres(connectionString);

export const db = drizzle({ client });

