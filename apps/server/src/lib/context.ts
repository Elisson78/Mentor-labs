import type { NextRequest } from "next/server";
import { verifySupabaseJWT, extractTokenFromHeader, type SupabaseUser } from './supabase-auth';

export async function createContext(req: NextRequest) {
  // Extract JWT token from Authorization header
  const authHeader = req.headers.get('authorization');
  const token = extractTokenFromHeader(authHeader || '');
  
  let user: SupabaseUser | null = null;
  
  if (token) {
    user = await verifySupabaseJWT(token);
  }

  return {
    user,
    session: user ? { user } : null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
