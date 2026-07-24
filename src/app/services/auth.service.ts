import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameState } from '../types/game';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  // --- Signals ---
  readonly token = signal<string | null>(
    typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null
  );
  readonly username = signal<string | null>(
    typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null
  );
  readonly customGeminiKey = signal<string | null>(
    typeof localStorage !== 'undefined' ? localStorage.getItem('customGeminiKey') : null
  );
  readonly isAuthenticated = signal<boolean>(
    typeof localStorage !== 'undefined' ? !!localStorage.getItem('token') : false
  );
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  // --- Actions ---

  setCustomGeminiKey(key: string | null): void {
    if (key) {
      localStorage.setItem('customGeminiKey', key);
    } else {
      localStorage.removeItem('customGeminiKey');
    }
    this.customGeminiKey.set(key);
  }

  login(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.token.set(token);
    this.username.set(username);
    this.isAuthenticated.set(true);
    this.error.set(null);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.token.set(null);
    this.username.set(null);
    this.isAuthenticated.set(false);
  }

  setLoading(isLoading: boolean): void {
    this.isLoading.set(isLoading);
  }

  setError(error: string | null): void {
    this.error.set(error);
  }

  async saveGame(gameState: GameState): Promise<boolean> {
    const token = this.token();
    if (!token) return false;

    try {
      this.isLoading.set(true);
      this.error.set(null);

      await firstValueFrom(
        this.http.put(`${this.apiUrl}/saves`, gameState, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      );

      this.isLoading.set(false);
      return true;
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Erro ao salvar');
      this.isLoading.set(false);
      return false;
    }
  }

  async loadGame(): Promise<GameState | null> {
    const token = this.token();
    if (!token) return null;

    try {
      this.isLoading.set(true);
      this.error.set(null);

      const gameState = await firstValueFrom(
        this.http.get<GameState>(`${this.apiUrl}/saves`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      );

      this.isLoading.set(false);
      return gameState;
    } catch (err: unknown) {
      // 404 means no save found (new game)
      const httpErr = err as { status?: number };
      if (httpErr.status === 404) {
        this.isLoading.set(false);
        return null;
      }
      this.error.set(err instanceof Error ? err.message : 'Erro ao carregar');
      this.isLoading.set(false);
      return null;
    }
  }

  async deleteGame(): Promise<boolean> {
    const token = this.token();
    if (!token) return false;

    try {
      this.isLoading.set(true);
      this.error.set(null);

      await firstValueFrom(
        this.http.delete(`${this.apiUrl}/saves`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      );

      this.isLoading.set(false);
      return true;
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Erro ao apagar save');
      this.isLoading.set(false);
      return false;
    }
  }
}
