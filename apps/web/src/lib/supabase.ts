
// Sistema de autenticação customizado para Replit
// Não precisamos do Supabase para este projeto

export const createClient = () => {
  return {
    auth: {
      getUser: () => null,
      signOut: () => null
    }
  };
};
