import { Component, inject, output, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="w-full h-full flex items-center justify-center font-mono relative bg-[#0d0f0c]">
      <!-- Glitch overlay simple -->
      <div class="absolute inset-0 bg-[url('/assets/backgrounds/main-bg.svg')] bg-cover opacity-20 mix-blend-overlay"></div>
      
      <div class="relative z-10 w-[400px] border-[4px] border-[#2b3028] bg-[#161815]/95 p-8 shadow-2xl backdrop-blur-sm crt-flicker">
        <h1 class="text-3xl text-terminal-green text-center mb-6 uppercase tracking-widest border-b border-[#2b3028] pb-4">
          {{ isLogin() ? 'ACESSO' : 'REGISTRO' }}
        </h1>

        <form (ngSubmit)="handleSubmit($event)" class="flex flex-col gap-4">
          <div>
            <label class="block text-gray-400 text-sm mb-1 uppercase">Identificação</label>
            <input 
              type="text" 
              name="username"
              [ngModel]="username()" (ngModelChange)="username.set($event)"
              class="w-full bg-[#0d0f0c] border-2 border-hud-bg p-3 text-[#e5e5e5] focus:outline-none focus:border-terminal-green transition-colors"
              placeholder="Nome de usuário"
              [disabled]="loading()"
            />
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-1 uppercase">Senha</label>
            <input 
              type="password"
              name="password"
              [ngModel]="password()" (ngModelChange)="password.set($event)"
              class="w-full bg-[#0d0f0c] border-2 border-hud-bg p-3 text-[#e5e5e5] focus:outline-none focus:border-terminal-green transition-colors tracking-widest"
              placeholder="******"
              [disabled]="loading()"
            />
          </div>

          @if (localError()) {
            <div class="text-terminal-red text-sm text-center bg-[#f87171]/10 p-2 border border-[#f87171]/30">
              {{ localError() }}
            </div>
          }

          <button 
            type="submit"
            [disabled]="loading()"
            class="mt-4 w-full bg-hud-bg hover:bg-hud-border text-white border-[2px] border-hud-border p-3 uppercase font-bold tracking-widest transition-all disabled:opacity-50"
          >
            {{ loading() ? 'Processando...' : (isLogin() ? 'Entrar no Sistema' : 'Criar Registro') }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <button 
            type="button"
            (click)="toggleLogin()"
            class="text-gray-500 hover:text-gray-300 text-sm uppercase transition-colors"
            [disabled]="loading()"
          >
            {{ isLogin() ? '> Criar novo registro' : '> Já possuo registro' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class LoginScreenComponent {
  readonly auth = inject(AuthService);
  readonly loginSuccess = output<void>();

  readonly isLogin = signal(true);
  readonly username = signal('');
  readonly password = signal('');
  readonly localError = signal('');
  readonly loading = signal(false);

  toggleLogin() {
    this.isLogin.set(!this.isLogin());
  }

  async handleSubmit(e: Event) {
    e.preventDefault();
    this.localError.set('');
    
    const user = this.username();
    const pass = this.password();

    if (user.length < 3 || pass.length < 6) {
      this.localError.set('Usuário min 3 chars, senha min 6 chars.');
      return;
    }

    this.loading.set(true);
    
    try {
      const endpoint = this.isLogin() ? '/auth/login' : '/auth/register';
      const apiUrl = (this.auth as any).apiUrl;
      
      const response = await fetch(apiUrl + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro na autenticação');
      }

      this.auth.login(data.token, data.user.username);
      this.loginSuccess.emit();
    } catch (err: any) {
      this.localError.set(err.message || 'Erro desconhecido');
    } finally {
      this.loading.set(false);
    }
  }
}
