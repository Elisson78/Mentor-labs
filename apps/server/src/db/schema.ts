import { pgTable, text, integer, real, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// Tabela de perfis de usuário (sincronizada com Supabase Auth)
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(), // UUID do Supabase Auth
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  userType: text('user_type').notNull(), // 'mentor' ou 'student'
  avatar: text('avatar'),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabela de quizzes
export const quizzes = pgTable('quizzes', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull(),
  subject: text('subject').notNull(),
  description: text('description'),
  difficultyLevel: text('difficulty_level').notNull(),
  timeLimit: integer('time_limit').default(0),
  videoUrl: text('video_url'),
  videoTitle: text('video_title'),
  videoThumbnail: text('video_thumbnail'),
  videoDuration: text('video_duration'),
  detectedSubject: text('detected_subject'),
  videoContext: text('video_context'),
  questionsGenerated: boolean('questions_generated').default(false),
  aiModel: text('ai_model'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabela de perguntas
export const questions = pgTable('questions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  quizId: text('quiz_id').references(() => quizzes.id, { onDelete: 'cascade' }).notNull(),
  question: text('question').notNull(),
  type: text('type').notNull().default('multiple-choice'),
  options: text('options').$type<string[]>(),
  correctAnswer: text('correct_answer').notNull(),
  explanation: text('explanation'),
  difficulty: text('difficulty').notNull(),
  mediaUrl: text('media_url'),
  mediaType: text('media_type'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Tabela de respostas dos alunos
export const studentAnswers = pgTable('student_answers', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  studentId: text('student_id').notNull(), // ID do usuário/aluno
  quizId: text('quiz_id').references(() => quizzes.id, { onDelete: 'cascade' }).notNull(),
  questionId: text('question_id').references(() => questions.id, { onDelete: 'cascade' }).notNull(),
  answer: text('answer').notNull(),
  isCorrect: boolean('is_correct').notNull(),
  timeSpent: integer('time_spent'), // tempo em segundos
  createdAt: timestamp('created_at').defaultNow(),
});

// Tabela de sessões de quiz
export const quizSessions = pgTable('quiz_sessions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  studentId: text('student_id').notNull(),
  quizId: text('quiz_id').references(() => quizzes.id, { onDelete: 'cascade' }).notNull(),
  score: real('score').default(0),
  totalQuestions: integer('total_questions').notNull(),
  correctAnswers: integer('correct_answers').default(0),
  timeSpent: integer('time_spent').default(0), // tempo total em segundos
  completedAt: timestamp('completed_at'),
  startedAt: timestamp('started_at').defaultNow(),
});

// Tabela de processamento de vídeos (para status assíncrono)
export const videoProcessing = pgTable('video_processing', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  quizId: text('quiz_id').references(() => quizzes.id, { onDelete: 'cascade' }).notNull(),
  videoUrl: text('video_url').notNull(),
  status: text('status').notNull().default('pending'), // pending, processing, completed, failed
  progress: integer('progress').default(0), // 0-100
  errorMessage: text('error_message'),
  questionsGenerated: integer('questions_generated').default(0),
  aiModel: text('ai_model'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Quiz = typeof quizzes.$inferSelect;
export type NewQuiz = typeof quizzes.$inferInsert;
export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;
export type StudentAnswer = typeof studentAnswers.$inferSelect;
export type QuizSession = typeof quizSessions.$inferSelect;
export type VideoProcessing = typeof videoProcessing.$inferSelect;