"use client";

import { useEffect } from "react";

export default function FixAuthPage() {
  useEffect(() => {
    // 1. LIMPAR TUDO
    localStorage.clear();

    // 2. CRIAR USUÁRIOS CORRETOS  
    const usuarios = {
      'mentor_1': {
        id: 'mentor_1',
        email: 'mentor1@gmail.com',
        name: 'Professor Mentor',
        userType: 'mentor'
      },
      'student_1': {
        id: 'student_1', 
        email: 'aluno1@gmail.com',
        name: 'Estudante',
        userType: 'student'
      }
    };

    localStorage.setItem('replit_users', JSON.stringify(usuarios));
    console.log('✅ SISTEMA CORRIGIDO!');
    console.log('🔑 Credenciais para testar:');
    console.log('MENTOR: mentor1@gmail.com (qualquer senha)');
    console.log('ALUNO: aluno1@gmail.com (qualquer senha)');

    // 3. RECARREGAR para a página de login
    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur rounded-lg p-8 text-center max-w-md">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Corrigindo Sistema de Autenticação...</h1>
        <p className="text-gray-600 mb-4">
          Limpando dados antigos e criando usuários corretos.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left text-sm">
          <p className="font-medium text-green-800 mb-2">Credenciais criadas:</p>
          <p className="text-green-700">👨‍🏫 MENTOR: mentor1@gmail.com</p>
          <p className="text-green-700">👨‍🎓 ALUNO: aluno1@gmail.com</p>
          <p className="text-xs text-green-600 mt-2">Use qualquer senha para entrar</p>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Redirecionando para login em 2 segundos...
        </p>
      </div>
    </div>
  );
}