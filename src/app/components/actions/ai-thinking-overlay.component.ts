import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';

const THINKING_PHRASES = [
  'Processando sinais neurais...',
  'Analisando possibilidades...',
  'Consultando a realidade...',
  'Decodificando intenções...',
  'Verificando leis da física...',
  'Calculando consequências...',
  'Interpretando a ação...',
  'Simulando cenário...',
  'Mapeando variáveis...',
  'Avaliando probabilidades...',
];

@Component({
  selector: 'app-ai-thinking-overlay',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <!-- Scanline effect -->
      <div
        class="absolute inset-0 pointer-events-none opacity-20"
        style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)"
      ></div>

      <!-- Central thinking box -->
      <div
        [ngClass]="{ 'translate-x-[1px]': glitchActive() }"
        class="relative border-2 border-terminal-green/40 bg-[#0d0f0c]/95 px-8 py-6 max-w-md w-full mx-4 shadow-[0_0_30px_rgba(74,222,128,0.1),inset_0_0_30px_rgba(0,0,0,0.5)] transition-transform duration-75"
      >
        <!-- Top bar decoration -->
        <div class="flex items-center gap-2 mb-4 pb-3 border-b border-terminal-green/20">
          <div class="w-2 h-2 rounded-full bg-terminal-green animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.6)]"></div>
          <span class="text-terminal-green/60 text-[10px] uppercase tracking-[0.3em] font-mono">
            Sistema Neural Ativo
          </span>
        </div>

        <!-- Main thinking text -->
        <div class="font-mono text-center space-y-3">
          <div class="text-terminal-green text-sm tracking-wide min-h-[1.5em]">
            {{ currentPhrase() }}{{ dots() }}
          </div>

          <!-- Progress bar animation -->
          <div class="w-full h-[2px] bg-[#1a1a1a] rounded overflow-hidden">
            <div
              class="h-full bg-terminal-green/70 rounded"
              style="animation: thinkingProgress 2s ease-in-out infinite"
            ></div>
          </div>

          <!-- Binary decoration -->
          <div
            [ngClass]="{
              'text-terminal-red/30': glitchActive(),
              'text-terminal-green/20': !glitchActive()
            }"
            class="text-[9px] font-mono tracking-widest"
          >
            {{ glitchActive() ? '█▓▒░ ERR0R ░▒▓█' : '01001111 01001011' }}
          </div>
        </div>

        <!-- Corner decorations -->
        <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-terminal-green/50"></div>
        <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-terminal-green/50"></div>
        <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-terminal-green/50"></div>
        <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-terminal-green/50"></div>
      </div>
    </div>
  `,
})
export class AIThinkingOverlayComponent implements OnInit, OnDestroy {
  readonly currentPhrase = signal(THINKING_PHRASES[0]);
  readonly dots = signal('');
  readonly glitchActive = signal(false);

  private phraseInterval: ReturnType<typeof setInterval> | null = null;
  private dotsInterval: ReturnType<typeof setInterval> | null = null;
  private glitchInterval: ReturnType<typeof setInterval> | null = null;
  private phraseIndex = 0;

  ngOnInit(): void {
    // Cycle through phrases
    this.phraseInterval = setInterval(() => {
      this.phraseIndex = (this.phraseIndex + 1) % THINKING_PHRASES.length;
      this.currentPhrase.set(THINKING_PHRASES[this.phraseIndex]);
    }, 2200);

    // Animate dots
    this.dotsInterval = setInterval(() => {
      this.dots.update(d => d.length >= 3 ? '' : d + '.');
    }, 400);

    // Random glitch flicker
    this.glitchInterval = setInterval(() => {
      this.glitchActive.set(true);
      setTimeout(() => this.glitchActive.set(false), 150);
    }, 3000 + Math.random() * 2000);
  }

  ngOnDestroy(): void {
    if (this.phraseInterval) clearInterval(this.phraseInterval);
    if (this.dotsInterval) clearInterval(this.dotsInterval);
    if (this.glitchInterval) clearInterval(this.glitchInterval);
  }
}
