import { Component, inject, output } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-death-screen',
  standalone: true,
  template: `
    <div class="h-full w-full flex flex-col items-center justify-center bg-black relative text-center px-4">
      <!-- Vignette intensa -->
      <div class="absolute inset-0 shadow-[0_0_200px_rgba(255,0,0,0.2)_inset] pointer-events-none"></div>

      <div class="z-10 max-w-md w-full">
        <h1 class="text-6xl md:text-8xl font-bold text-terminal-red mb-6 tracking-widest animate-pulse opacity-80" style="font-family: serif;">
          O VAZIO
        </h1>
        <p class="text-gray-400 font-mono text-sm md:text-base mb-12 uppercase tracking-wide">
          Sua mente cedeu à escuridão.
        </p>

        <div class="flex flex-col gap-4 w-full">
          @if (canUseExtraLife()) {
            <button 
              (click)="onUseExtraLife()"
              class="w-full px-6 py-4 bg-transparent border-2 border-terminal-red/50 hover:bg-terminal-red/10 text-terminal-red font-mono uppercase tracking-widest transition-all"
            >
              [ Assumir o controle do Caçula ]
            </button>
            <p class="text-xs text-gray-500 font-mono">
              O Caçula descobre que o Protagonista desapareceu e vai atrás dele na cidade.
            </p>
          }

          <button 
            (click)="onReturnToMenu()"
            class="w-full px-6 py-3 bg-transparent border border-gray-800 hover:bg-[#1a1a1a] text-gray-500 hover:text-gray-300 font-mono uppercase tracking-widest transition-all mt-4"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DeathScreenComponent {
  readonly game = inject(GameService);
  readonly returnToMenu = output<void>();

  canUseExtraLife(): boolean {
    return this.game.activeCharacter() === 'Protagonista';
  }

  onUseExtraLife() {
    this.game.activateExtraLife();
    // Após ativar, o App Component notará a vida voltando e mudará a tela para o Jogo automaticamente (hp > 0)
  }

  onReturnToMenu() {
    this.game.resetToInitialState();
    this.returnToMenu.emit();
  }
}
