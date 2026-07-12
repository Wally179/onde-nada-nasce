'use client';

import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    
    if (username.length < 3 || password.length < 6) {
      setLocalError('Usuário min 3 chars, senha min 6 chars.');
      return;
    }

    setLoading(true);
    
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro na autenticação');
      }

      login(data.token, data.user.username);
      onLoginSuccess();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center font-mono relative bg-[#0d0f0c]">
      {/* Glitch overlay simple */}
      <div className="absolute inset-0 bg-[url('/assets/backgrounds/main-bg.svg')] bg-cover opacity-20 mix-blend-overlay" />
      
      <div className="relative z-10 w-[400px] border-[4px] border-[#2b3028] bg-[#161815]/95 p-8 shadow-2xl backdrop-blur-sm crt-flicker">
        <h1 className="text-3xl text-[#4ade80] text-center mb-6 uppercase tracking-widest border-b border-[#2b3028] pb-4">
          {isLogin ? 'ACESSO' : 'REGISTRO'}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1 uppercase">Identificação</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0d0f0c] border-2 border-[#2d372b] p-3 text-[#e5e5e5] focus:outline-none focus:border-[#4ade80] transition-colors"
              placeholder="Nome de usuário"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1 uppercase">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0d0f0c] border-2 border-[#2d372b] p-3 text-[#e5e5e5] focus:outline-none focus:border-[#4ade80] transition-colors tracking-widest"
              placeholder="******"
              disabled={loading}
            />
          </div>

          {localError && (
            <div className="text-[#f87171] text-sm text-center bg-[#f87171]/10 p-2 border border-[#f87171]/30">
              {localError}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-[#2d372b] hover:bg-[#495845] text-white border-[2px] border-[#495845] p-3 uppercase font-bold tracking-widest transition-all disabled:opacity-50"
          >
            {loading ? 'Processando...' : (isLogin ? 'Entrar no Sistema' : 'Criar Registro')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-500 hover:text-gray-300 text-sm uppercase transition-colors"
            disabled={loading}
          >
            {isLogin ? '> Criar novo registro' : '> Já possuo registro'}
          </button>
        </div>
      </div>
    </div>
  );
}
