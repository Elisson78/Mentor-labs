import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function POST() {
  try {
    console.log('Creating database tables directly...');
    
    // SQL das migrações do arquivo 0000_fancy_marten_broadcloak.sql
    const migrationSQL = `
      CREATE TABLE IF NOT EXISTS "questions" (
        "id" text PRIMARY KEY NOT NULL,
        "quiz_id" text NOT NULL,
        "question" text NOT NULL,
        "type" text DEFAULT 'multiple-choice' NOT NULL,
        "options" text,
        "correct_answer" text NOT NULL,
        "explanation" text,
        "difficulty" text NOT NULL,
        "media_url" text,
        "media_type" text,
        "created_at" timestamp DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS "quiz_sessions" (
        "id" text PRIMARY KEY NOT NULL,
        "student_id" text NOT NULL,
        "quiz_id" text NOT NULL,
        "score" real DEFAULT 0,
        "total_questions" integer NOT NULL,
        "correct_answers" integer DEFAULT 0,
        "time_spent" integer DEFAULT 0,
        "completed_at" timestamp,
        "started_at" timestamp DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS "quizzes" (
        "id" text PRIMARY KEY NOT NULL,
        "title" text NOT NULL,
        "subject" text NOT NULL,
        "description" text,
        "difficulty_level" text NOT NULL,
        "time_limit" integer DEFAULT 0,
        "video_url" text,
        "video_title" text,
        "video_thumbnail" text,
        "video_duration" text,
        "detected_subject" text,
        "video_context" text,
        "questions_generated" boolean DEFAULT false,
        "ai_model" text,
        "created_at" timestamp DEFAULT now(),
        "updated_at" timestamp DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS "student_answers" (
        "id" text PRIMARY KEY NOT NULL,
        "student_id" text NOT NULL,
        "quiz_id" text NOT NULL,
        "question_id" text NOT NULL,
        "answer" text NOT NULL,
        "is_correct" boolean NOT NULL,
        "time_spent" integer,
        "created_at" timestamp DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS "video_processing" (
        "id" text PRIMARY KEY NOT NULL,
        "quiz_id" text NOT NULL,
        "video_url" text NOT NULL,
        "status" text DEFAULT 'pending' NOT NULL,
        "progress" integer DEFAULT 0,
        "error_message" text,
        "questions_generated" integer DEFAULT 0,
        "ai_model" text,
        "created_at" timestamp DEFAULT now(),
        "updated_at" timestamp DEFAULT now()
      );
    `;

    // Executar o SQL de criação das tabelas
    await db.execute(sql.raw(migrationSQL));

    // Agora criar as foreign keys
    const foreignKeysSQL = `
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'questions_quiz_id_quizzes_id_fk'
        ) THEN
          ALTER TABLE "questions" ADD CONSTRAINT "questions_quiz_id_quizzes_id_fk" 
          FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'quiz_sessions_quiz_id_quizzes_id_fk'
        ) THEN
          ALTER TABLE "quiz_sessions" ADD CONSTRAINT "quiz_sessions_quiz_id_quizzes_id_fk" 
          FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'student_answers_quiz_id_quizzes_id_fk'
        ) THEN
          ALTER TABLE "student_answers" ADD CONSTRAINT "student_answers_quiz_id_quizzes_id_fk" 
          FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'student_answers_question_id_questions_id_fk'
        ) THEN
          ALTER TABLE "student_answers" ADD CONSTRAINT "student_answers_question_id_questions_id_fk" 
          FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'video_processing_quiz_id_quizzes_id_fk'
        ) THEN
          ALTER TABLE "video_processing" ADD CONSTRAINT "video_processing_quiz_id_quizzes_id_fk" 
          FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
        END IF;
      END $$;
    `;

    await db.execute(sql.raw(foreignKeysSQL));

    // Verificar se as tabelas foram criadas
    const tablesResult = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('quizzes', 'questions', 'student_answers', 'quiz_sessions', 'video_processing')
      ORDER BY table_name;
    `);

    return NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      message: 'Database tables created successfully',
      tables_created: tablesResult.map(t => t.table_name),
      total_tables: tablesResult.length
    });
    
  } catch (error) {
    console.error('Table creation failed:', error);
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      message: 'Failed to create database tables',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}