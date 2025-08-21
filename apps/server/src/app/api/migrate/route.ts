import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST() {
  try {
    console.log('Starting database migration...');
    
    // Execute drizzle migrations
    const { stdout, stderr } = await execAsync('npm run db:migrate', {
      cwd: process.cwd(),
      timeout: 30000 // 30 seconds timeout
    });

    console.log('Migration stdout:', stdout);
    if (stderr) {
      console.warn('Migration stderr:', stderr);
    }

    return NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      message: 'Database migrations executed successfully',
      output: stdout,
      warnings: stderr || null
    });
    
  } catch (error) {
    console.error('Migration failed:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorOutput = (error as any).stdout || '';
    const errorStderr = (error as any).stderr || '';
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      message: 'Database migration failed',
      error: errorMessage,
      output: errorOutput,
      stderr: errorStderr
    }, { status: 500 });
  }
}