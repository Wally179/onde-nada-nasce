import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-free-action-input',
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `
    <div class="mt-2">
      <form (ngSubmit)="handleSubmit()" class="flex gap-2">
        <span class="text-terminal-green py-2 px-1 text-sm">&gt;</span>
        <input
          type="text"
          [(ngModel)]="text"
          name="freeAction"
          [disabled]="loading() || isExhausted()"
          [placeholder]="isExhausted() ? 'Sem tentativas restantes nesta cena...' : 'Descreva uma ação livre...'"
          class="flex-grow bg-transparent border-b border-[#495845] focus:border-terminal-green outline-none px-2 py-2 text-sm text-white placeholder-gray-600 disabled:opacity-50"
        />
        <button
          type="submit"
          [disabled]="loading() || !text.trim() || isExhausted()"
          class="px-4 py-2 bg-[#2d372b] hover:bg-[#495845] border border-[#495845] text-white text-xs uppercase disabled:opacity-50 transition-colors"
        >
          {{ loading() ? 'Processando...' : 'Agir' }}
        </button>
      </form>

      <!-- Attempt counter -->
      <div class="flex items-center gap-2 mt-1.5 px-1">
        <div class="flex gap-1">
          @for (dot of dotsArray(); track $index) {
            <div
              [ngClass]="{
                'bg-terminal-green shadow-[0_0_4px_rgba(74,222,128,0.5)]': $index < attemptsRemaining(),
                'bg-[#2d372b] border border-[#495845]': $index >= attemptsRemaining()
              }"
              class="w-2 h-2 rounded-full transition-all duration-300"
            ></div>
          }
        </div>
        <span
          [ngClass]="{
            'text-red-400/80': isExhausted(),
            'text-[#495845]': !isExhausted()
          }"
          class="text-[10px] uppercase tracking-wider"
        >
          {{ isExhausted() ? 'Ações livres esgotadas' : attemptsRemaining() + '/' + maxAttempts() + ' tentativas' }}
        </span>
      </div>
    </div>
  `,
})
export class FreeActionInputComponent {
  readonly loading = input<boolean>(false);
  readonly attemptsRemaining = input.required<number>();
  readonly maxAttempts = input.required<number>();
  readonly submitAction = output<string>();

  text = '';

  isExhausted(): boolean {
    return this.attemptsRemaining() <= 0;
  }

  dotsArray(): number[] {
    return Array.from({ length: this.maxAttempts() });
  }

  handleSubmit(): void {
    if (!this.text.trim() || this.isExhausted()) return;
    this.submitAction.emit(this.text);
    this.text = '';
  }
}
