import { Component, inject, output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-screen',
  standalone: true,
  template: `
    <div class="w-full h-full flex flex-col items-center justify-center relative bg-[url('/assets/backgrounds/main-bg.svg')] bg-cover bg-center">
      <div class="absolute inset-0 bg-black/60"></div>
      
      <div class="relative z-10 flex flex-col items-center gap-12">
        <h1 class="text-6xl md:text-8xl font-black text-[#e5e5e5] tracking-[0.2em] uppercase text-center drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">
          ONDE NADA
          <br />
          <span class="text-terminal-green">NASCE</span>
        </h1>

        <div class="text-gray-400 font-mono tracking-widest uppercase mb-4 text-sm bg-black/50 px-4 py-1 border border-gray-800">
          Usuário: {{ auth.username() }}
        </div>

        <div class="flex flex-col gap-4 w-64">
          <button 
            type="button"
            (click)="onPlayClick.emit()"
            class="group relative border-[3px] border-hud-bg bg-[#0d0f0c]/80 p-4 text-xl text-gray-300 font-bold uppercase tracking-widest hover:border-terminal-green hover:text-terminal-green hover:bg-[#161815] transition-all overflow-hidden"
          >
            <span class="relative z-10">Jogar</span>
            <div class="absolute inset-0 bg-[#4ade80]/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </button>

          <button 
            type="button"
            (click)="onOptionsClick.emit()"
            class="group relative border-[3px] border-hud-bg bg-[#0d0f0c]/80 p-4 text-xl text-gray-300 font-bold uppercase tracking-widest hover:border-white hover:text-white hover:bg-[#161815] transition-all"
          >
            Opções
          </button>

          <button 
            type="button"
            (click)="auth.logout()"
            class="mt-8 text-gray-500 hover:text-terminal-red uppercase tracking-widest text-sm transition-colors font-mono"
          >
            Desconectar
          </button>
        </div>
      </div>
    </div>
  `
})
export class MenuScreenComponent {
  readonly auth = inject(AuthService);
  
  readonly onPlayClick = output<void>();
  readonly onOptionsClick = output<void>();
}
