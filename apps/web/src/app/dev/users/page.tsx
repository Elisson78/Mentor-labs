
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Eye, RefreshCw } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  userType: 'mentor' | 'student';
  bio?: string;
  createdAt: string;
}

export default function UsersDevPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-test-users');
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTestUsers = async () => {
    setCreating(true);
    try {
      const response = await fetch('/api/create-test-users', {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.success) {
        await fetchUsers(); // Recarregar lista
        alert('Usuários de teste criados com sucesso!');
      } else {
        alert(data.message || 'Erro ao criar usuários');
      }
    } catch (error) {
      console.error('Erro ao criar usuários:', error);
      alert('Erro ao criar usuários');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>
          <p className="text-gray-600">Página de desenvolvimento para criar e visualizar usuários</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={fetchUsers} 
            disabled={loading}
            variant="outline"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          
          <Button 
            onClick={createTestUsers} 
            disabled={creating}
          >
            <Plus className="w-4 h-4 mr-2" />
            {creating ? 'Criando...' : 'Criar Usuários de Teste'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Usuários no Sistema ({users.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum usuário encontrado</p>
                <p className="text-sm">Clique em "Criar Usuários de Teste" para começar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge variant={user.userType === 'mentor' ? 'default' : 'secondary'}>
                          {user.userType === 'mentor' ? 'Mentor' : 'Aluno'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      {user.bio && (
                        <p className="text-xs text-gray-500 mt-1">{user.bio}</p>
                      )}
                    </div>
                    
                    <div className="text-right text-sm text-gray-500">
                      <p>ID: {user.id.slice(0, 8)}...</p>
                      <p>Criado: {new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credenciais de Teste</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900">Mentor</h4>
                <p className="text-sm text-blue-700">Email: mentor.teste@gmail.com</p>
                <p className="text-sm text-blue-700">Nome: Professor João Silva</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900">Aluno 1</h4>
                <p className="text-sm text-green-700">Email: aluno.teste@gmail.com</p>
                <p className="text-sm text-green-700">Nome: Maria Santos</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900">Aluno 2</h4>
                <p className="text-sm text-purple-700">Email: aluno2.teste@gmail.com</p>
                <p className="text-sm text-purple-700">Nome: Carlos Oliveira</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
