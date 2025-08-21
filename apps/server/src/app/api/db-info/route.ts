import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Query para listar todas as tabelas no schema public
    const tablesResult = await db.execute(sql`
      SELECT table_name, table_type 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    // Query para contar total de tabelas
    const countResult = await db.execute(sql`
      SELECT COUNT(*) as total_tables
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);

    // Query para verificar se as tabelas do projeto existem
    const projectTables = ['quizzes', 'questions', 'student_answers', 'quiz_sessions', 'video_processing'];
    const existingProjectTables: string[] = [];
    
    for (const tableName of projectTables) {
      const result = await db.execute(sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = ${tableName}
        );
      `);
      
      if (result[0]?.exists) {
        existingProjectTables.push(tableName);
      }
    }

    // Query para informações sobre cada tabela do projeto (se existir)
    const tableDetails = [];
    for (const tableName of existingProjectTables) {
      const columnInfo = await db.execute(sql`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = ${tableName}
        ORDER BY ordinal_position;
      `);
      
      const rowCount = await db.execute(sql`
        SELECT COUNT(*) as total_rows FROM ${sql.identifier(tableName)};
      `);
      
      tableDetails.push({
        table_name: tableName,
        columns: columnInfo,
        total_rows: Number(rowCount[0]?.total_rows || 0)
      });
    }

    return NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      database_info: {
        total_tables: Number(countResult[0]?.total_tables || 0),
        all_tables: tablesResult,
        project_tables_expected: projectTables,
        project_tables_existing: existingProjectTables,
        missing_tables: projectTables.filter(t => !existingProjectTables.includes(t)),
        table_details: tableDetails
      },
      connection_status: 'connected'
    });
    
  } catch (error) {
    console.error('Database info check failed:', error);
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      database_info: null,
      connection_status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}