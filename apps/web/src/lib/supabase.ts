
// Sistema de auth customizado - não usa Supabase
// Este arquivo existe apenas para compatibilidade com imports antigos

export const createClient = () => {
  return {
    auth: {
      signUp: () => Promise.resolve({ error: null }),
      signIn: () => Promise.resolve({ error: null }),
      signOut: () => Promise.resolve({ error: null }),
    }
  };
};

// Client estático para uso geral (compatibilidade)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient();
