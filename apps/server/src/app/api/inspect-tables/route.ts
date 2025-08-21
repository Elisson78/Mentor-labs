import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const results: any = {
      timestamp: new Date().toISOString(),
      tables_found: [],
      total_tables: 0
    };

    // Lista todas as tabelas no schema public
    const allTablesResult = await db.execute(sql`
      SELECT table_name, table_type, table_schema
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    results.total_tables = allTablesResult.length;
    results.all_tables = allTablesResult;

    // Para cada tabela, obter informações detalhadas
    for (const table of allTablesResult) {
      const tableName = String(table.table_name);
      
      try {
        // Estrutura da tabela (colunas)
        const columnsResult = await db.execute(sql`
          SELECT 
            column_name,
            data_type,
            is_nullable,
            column_default,
            character_maximum_length,
            numeric_precision,
            numeric_scale
          FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = ${tableName}
          ORDER BY ordinal_position;
        `);

        // Contagem de registros
        const countResult = await db.execute(sql`
          SELECT COUNT(*) as total_rows 
          FROM ${sql.identifier(tableName)};
        `);

        // Índices da tabela
        const indexesResult = await db.execute(sql`
          SELECT
            indexname,
            indexdef
          FROM pg_indexes
          WHERE tablename = ${tableName}
          AND schemaname = 'public';
        `);

        // Constraints/chaves estrangeiras
        const constraintsResult = await db.execute(sql`
          SELECT
            constraint_name,
            constraint_type
          FROM information_schema.table_constraints
          WHERE table_name = ${tableName}
          AND table_schema = 'public';
        `);

        // Se a tabela tem poucos registros, mostrar uma amostra dos dados
        let sampleData = null;
        const totalRows = Number(countResult[0]?.total_rows || 0);
        
        if (totalRows > 0 && totalRows <= 50) {
          try {
            const sampleResult = await db.execute(sql`
              SELECT * FROM ${sql.identifier(tableName)} 
              LIMIT 10;
            `);
            sampleData = sampleResult;
          } catch (error) {
            sampleData = { error: 'Could not fetch sample data' };
          }
        }

        results.tables_found.push({
          table_name: tableName,
          table_type: table.table_type,
          total_rows: totalRows,
          columns: columnsResult,
          indexes: indexesResult,
          constraints: constraintsResult,
          sample_data: sampleData
        });

      } catch (error) {
        results.tables_found.push({
          table_name: tableName,
          error: `Failed to inspect table: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }
    }

    // Informações específicas sobre as tabelas pay e teste se existirem
    const payTable = results.tables_found.find((t: any) => t.table_name === 'pay');
    const testeTable = results.tables_found.find((t: any) => t.table_name === 'teste');

    return NextResponse.json({
      status: 'success',
      ...results,
      focus_tables: {
        pay: payTable || 'Not found',
        teste: testeTable || 'Not found'
      }
    });
    
  } catch (error) {
    console.error('Table inspection failed:', error);
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to inspect database tables'
    }, { status: 500 });
  }
}