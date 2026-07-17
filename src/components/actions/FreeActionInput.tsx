'use client';

import { useState } from 'react';

/**
 * FreeActionInput — Text input + submit for the "4th option" free action.
 *
 * Single Responsibility: manages free-text input state and submission.
 * Interface Segregation: only exposes an onSubmit callback.
 */

interface FreeActionInputProps {
  onSubmit: (text: string) => void;
  loading: boolean;
  attemptsRemaining: number;
  maxAttempts: number;
}

export default function FreeActionInput({ onSubmit, loading, attemptsRemaining, maxAttempts }: FreeActionInputProps) {
  const [text, setText] = useState('');

  const isExhausted = attemptsRemaining <= 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isExhausted) return;
    onSubmit(text);
    setText('');
  };

  return (
    <div className="mt-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <span className="text-terminal-green py-2 px-1 text-sm">{'>'}</span>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading || isExhausted}
          placeholder={isExhausted ? 'Sem tentativas restantes nesta cena...' : 'Descreva uma ação livre...'}
          className="flex-grow bg-transparent border-b border-[#495845] focus:border-terminal-green outline-none px-2 py-2 text-sm text-white placeholder-gray-600 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !text.trim() || isExhausted}
          className="px-4 py-2 bg-[#2d372b] hover:bg-[#495845] border border-[#495845] text-white text-xs uppercase disabled:opacity-50 transition-colors"
        >
          {loading ? 'Processando...' : 'Agir'}
        </button>
      </form>

      {/* Attempt counter */}
      <div className="flex items-center gap-2 mt-1.5 px-1">
        <div className="flex gap-1">
          {Array.from({ length: maxAttempts }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < attemptsRemaining
                  ? 'bg-terminal-green shadow-[0_0_4px_rgba(74,222,128,0.5)]'
                  : 'bg-[#2d372b] border border-[#495845]'
              }`}
            />
          ))}
        </div>
        <span className={`text-[10px] uppercase tracking-wider ${
          isExhausted ? 'text-red-400/80' : 'text-[#495845]'
        }`}>
          {isExhausted
            ? 'Ações livres esgotadas'
            : `${attemptsRemaining}/${maxAttempts} tentativas`
          }
        </span>
      </div>
    </div>
  );
}
