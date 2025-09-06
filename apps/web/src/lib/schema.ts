
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// Tabela de perfis de usuário
export const profiles = pgTable('profiles', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  user_type: text('user_type').notNull(), // 'mentor' ou 'student'
  password: text('password').notNull(), // Campo de senha
  avatar: text('avatar'),
  bio: text('bio'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
