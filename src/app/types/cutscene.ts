export type CutsceneEffect = 'fade' | 'typewriter' | 'glitch' | 'none';
export type CutsceneAlignment = 'left' | 'center' | 'right';

export interface CutsceneTextLine {
  content: string;
  delayMs?: number; // Tempo para esperar ANTES de exibir esta linha
  className?: string; // Classe CSS opcional para estilo específico (ex: manuscrito)
}

export interface CutsceneSlide {
  id: string;
  lines: CutsceneTextLine[];
  effect: CutsceneEffect;
  alignment: CutsceneAlignment;
  durationMs: number; // Tempo de exibição APÓS todas as linhas terminarem
  backgroundImage?: string; // Futuro: URL da imagem
  audioSrc?: string; // Futuro: narração
  ambientSrc?: string; // Futuro: som ambiente/SFX
  className?: string; // Classe CSS para o slide inteiro (ex: fundo de carta)
}

export interface CutsceneData {
  id: string;
  slides: CutsceneSlide[];
  allowSkip: boolean;
  transitionDurationMs: number;
}
