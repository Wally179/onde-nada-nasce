'use client';

import { useState, useEffect } from 'react';

/**
 * AIThinkingOverlay — Full-screen terminal-style loading overlay.
 * Shows while the Gemini AI is processing a free action.
 * Blocks all user interaction until the response arrives.
 */

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

export default function AIThinkingOverlay() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [dots, setDots] = useState('');
  const [glitchActive, setGlitchActive] = useState(false);

  // Cycle through phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % THINKING_PHRASES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Random glitch flicker
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)',
        }}
      />

      {/* Central thinking box */}
      <div className={`
        relative border-2 border-terminal-green/40 bg-[#0d0f0c]/95 
        px-8 py-6 max-w-md w-full mx-4
        shadow-[0_0_30px_rgba(74,222,128,0.1),inset_0_0_30px_rgba(0,0,0,0.5)]
        ${glitchActive ? 'translate-x-[1px]' : ''}
        transition-transform duration-75
      `}>
        {/* Top bar decoration */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-terminal-green/20">
          <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
          <span className="text-terminal-green/60 text-[10px] uppercase tracking-[0.3em] font-mono">
            Sistema Neural Ativo
          </span>
        </div>

        {/* Main thinking text */}
        <div className="font-mono text-center space-y-3">
          <div className="text-terminal-green text-sm tracking-wide min-h-[1.5em]">
            {THINKING_PHRASES[phraseIndex]}{dots}
          </div>

          {/* Progress bar animation */}
          <div className="w-full h-[2px] bg-[#1a1a1a] rounded overflow-hidden">
            <div
              className="h-full bg-terminal-green/70 rounded"
              style={{
                animation: 'thinkingProgress 2s ease-in-out infinite',
              }}
            />
          </div>

          {/* Binary decoration */}
          <div className={`
            text-[9px] text-terminal-green/20 font-mono tracking-widest
            ${glitchActive ? 'text-terminal-red/30' : ''}
          `}>
            {glitchActive
              ? '█▓▒░ ERR0R ░▒▓█'
              : '01001111 01001011'
            }
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-terminal-green/50" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-terminal-green/50" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-terminal-green/50" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-terminal-green/50" />
      </div>

      {/* CSS animation for progress bar */}
      <style jsx>{`
        @keyframes thinkingProgress {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
