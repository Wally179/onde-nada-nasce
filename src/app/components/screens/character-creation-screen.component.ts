import { Component, inject, output, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-character-creation-screen',
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `
    <div class="w-full h-full flex flex-col items-center justify-center bg-[#0d0f0c] text-terminal-green font-mono relative overflow-hidden p-4">
      <!-- Scanline overlay -->
      <div class="absolute inset-0 pointer-events-none bg-[url('/assets/backgrounds/main-bg.svg')] bg-cover opacity-10 mix-blend-overlay"></div>
      <div class="absolute inset-0 pointer-events-none crt-scanlines opacity-20"></div>

      <div class="relative z-10 w-full max-w-xl border-[4px] border-[#2b3028] bg-[#161815]/95 p-8 shadow-2xl backdrop-blur-md flex flex-col items-center">
        <h2 class="text-3xl text-white mb-8 uppercase tracking-widest border-b border-[#2b3028] pb-4 text-center w-full">
          Registro de Sujeito
        </h2>

        <div class="w-full space-y-6 mb-8">
          
          <!-- Nome -->
          <div class="flex flex-col border border-hud-bg p-4 bg-[#0d0f0c]">
            <label class="uppercase tracking-widest text-gray-400 text-sm mb-2">
              Nome (Opcional)
            </label>
            <input 
              type="text"
              name="charName"
              [ngModel]="name()" (ngModelChange)="name.set($event)"
              placeholder="Ex: Arthur, Maria..."
              class="bg-transparent border-b border-hud-border text-white focus:outline-none focus:border-terminal-green py-2 transition-colors placeholder:text-[#495845]"
            />
          </div>

          <!-- Gênero -->
          <div class="flex flex-col border border-hud-bg p-4 bg-[#0d0f0c]">
            <span class="uppercase tracking-widest text-gray-400 text-sm mb-4">Apresentação / Gênero</span>
            <div class="flex gap-4">
              @for (opt of genderOptions; track opt) {
                <button
                  type="button"
                  (click)="gender.set(opt)"
                  class="px-4 py-2 border uppercase text-sm transition-colors"
                  [ngClass]="gender() === opt ? 'border-terminal-green bg-hud-bg text-terminal-green' : 'border-hud-border text-gray-500 hover:text-gray-300'"
                >
                  {{ opt }}
                </button>
              }
            </div>
          </div>

          <!-- Pronomes -->
          <div class="flex flex-col border border-hud-bg p-4 bg-[#0d0f0c]">
            <span class="uppercase tracking-widest text-gray-400 text-sm mb-4">Pronomes de Tratamento</span>
            <div class="flex gap-4">
              @for (opt of pronounOptions; track opt) {
                <button
                  type="button"
                  (click)="pronouns.set(opt)"
                  class="px-4 py-2 border uppercase text-sm transition-colors"
                  [ngClass]="pronouns() === opt ? 'border-terminal-green bg-hud-bg text-terminal-green' : 'border-hud-border text-gray-500 hover:text-gray-300'"
                >
                  {{ opt }}
                </button>
              }
            </div>
          </div>
          
        </div>

        <button 
          type="button"
          (click)="handleComplete()"
          class="w-full border-[2px] border-hud-border bg-hud-bg hover:bg-[#495845] p-4 uppercase tracking-widest text-white transition-colors"
        >
          Confirmar e Iniciar
        </button>

      </div>
    </div>
  `
})
export class CharacterCreationScreenComponent {
  readonly game = inject(GameService);
  readonly characterCreated = output<void>();

  readonly name = signal('');
  readonly gender = signal('Masculino');
  readonly pronouns = signal('Ele/Dele');

  readonly genderOptions = ['Masculino', 'Feminino', 'Não Binario'];
  readonly pronounOptions = ['Ele/Dele', 'Ela/Dela', 'Elu/Delu'];

  handleComplete() {
    this.game.setPlayerProfile({
      name: this.name().trim() || 'Desconhecido',
      gender: this.gender(),
      pronouns: this.pronouns()
    });
    this.game.setHasCreatedCharacter(true);
    this.characterCreated.emit();
  }
}
