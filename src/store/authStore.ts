import { create } from 'zustand';
import { GameState } from '../types/game';

interface AuthState {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (token: string, username: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Save interactions
  saveGame: (gameState: GameState) => Promise<boolean>;
  loadGame: () => Promise<GameState | null>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const useAuthStore = create<AuthState>((set, get) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  username: typeof window !== 'undefined' ? localStorage.getItem('username') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  isLoading: false,
  error: null,

  login: (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    set({ token, username, isAuthenticated: true, error: null });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    set({ token: null, username: null, isAuthenticated: false });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  saveGame: async (gameState: GameState) => {
    const { token } = get();
    if (!token) return false;

    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`${API_URL}/saves`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(gameState)
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar progresso');
      }

      set({ isLoading: false });
      return true;
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Erro ao salvar', isLoading: false });
      return false;
    }
  },

  loadGame: async () => {
    const { token } = get();
    if (!token) return null;

    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`${API_URL}/saves`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 404) {
        set({ isLoading: false });
        return null; // Nenhum save encontrado (novo jogo)
      }

      if (!response.ok) {
        throw new Error('Falha ao carregar save');
      }

      const gameState = await response.json();
      set({ isLoading: false });
      return gameState as GameState;
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Erro ao carregar', isLoading: false });
      return null;
    }
  }
}));
