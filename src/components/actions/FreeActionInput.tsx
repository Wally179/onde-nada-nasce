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
}

export default function FreeActionInput({ onSubmit, loading }: FreeActionInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <span className="text-terminal-green py-2 px-1 text-sm">{'>'}</span>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
        placeholder="Descreva uma ação livre..."
        className="flex-grow bg-transparent border-b border-[#495845] focus:border-terminal-green outline-none px-2 py-2 text-sm text-white placeholder-gray-600 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="px-4 py-2 bg-[#2d372b] hover:bg-[#495845] border border-[#495845] text-white text-xs uppercase disabled:opacity-50 transition-colors"
      >
        {loading ? 'Processando...' : 'Agir'}
      </button>
    </form>
  );
}
