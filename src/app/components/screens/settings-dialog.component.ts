import { Component, output, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div class="bg-[#161815] border-4 border-[#2b3028] shadow-2xl p-6 w-[90%] max-w-md font-mono text-gray-300">
        <h2 class="text-xl text-[#8b9c85] font-bold mb-4 uppercase tracking-widest">[ CONFIGURAÇÕES ]</h2>
        
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm mb-2 text-[#495845]">CHAVE API GEMINI (Opcional)</label>
            <input 
              type="password" 
              [(ngModel)]="apiKey"
              placeholder="Cole sua chave de desenvolvedor aqui..."
              class="w-full bg-[#0d0f0c] border border-[#2b3028] p-2 text-sm text-[#8b9c85] focus:outline-none focus:border-[#495845]"
            />
            <p class="text-xs text-gray-500 mt-1">Sua chave fica criptografada apenas no seu navegador.</p>
          </div>
          
          <div class="pt-4 border-t border-[#2b3028]">
            <button 
              (click)="confirmReset()"
              class="w-full bg-[#D04648]/20 border border-[#D04648]/50 text-[#D04648] p-2 hover:bg-[#D04648]/40 transition-colors uppercase text-sm font-bold"
            >
              Resetar Jogo (Apagar Save)
            </button>
          </div>
        </div>

        <div class="flex justify-end gap-3">
          <button 
            (click)="close.emit()"
            class="px-4 py-2 border border-[#495845] hover:bg-[#2b3028] transition-colors"
          >
            CANCELAR
          </button>
          <button 
            (click)="save()"
            class="px-4 py-2 bg-[#495845] text-white hover:bg-[#5a6b55] transition-colors"
          >
            SALVAR
          </button>
        </div>
      </div>
    </div>
  `
})
export class SettingsDialogComponent {
  readonly auth = inject(AuthService);
  readonly game = inject(GameService);
  
  readonly close = output<void>();
  readonly onReset = output<void>();

  apiKey = this.auth.customGeminiKey() || '';

  save() {
    this.auth.setCustomGeminiKey(this.apiKey.trim() || null);
    this.close.emit();
  }

  async confirmReset() {
    if (confirm('Tem certeza? Isso apagará seu progresso do servidor e você voltará para o menu inicial.')) {
      await this.auth.deleteGame();
      this.game.resetToInitialState();
      this.onReset.emit();
    }
  }
}
