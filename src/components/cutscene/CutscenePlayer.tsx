'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { CutsceneData } from '../../types/cutscene';
import CutsceneEngine from './CutsceneEngine';

interface CutscenePlayerProps {
  data: CutsceneData;
  onComplete: () => void;
}

export default function CutscenePlayer({ data, onComplete }: CutscenePlayerProps) {
  const [showSkipHint, setShowSkipHint] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const skipTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasExitedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const exit = useCallback(() => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;
    setIsFadingOut(true);
    setTimeout(() => onCompleteRef.current(), 600);
  }, []);

  // ESC to skip + mousemove to show hint
  useEffect(() => {
    if (!data.allowSkip) return;

    const showHint = () => {
      setShowSkipHint(true);
      if (skipTimerRef.current) clearTimeout(skipTimerRef.current);
      skipTimerRef.current = setTimeout(() => setShowSkipHint(false), 3000);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') exit();
      else showHint();
    };

    window.addEventListener('mousemove', showHint);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousemove', onKey);
      window.removeEventListener('keydown', onKey);
      if (skipTimerRef.current) clearTimeout(skipTimerRef.current);
    };
  }, [data.allowSkip, exit]);

  return (
    <div
      className="fixed inset-0 z-[60] bg-black text-white font-mono"
      style={{ opacity: isFadingOut ? 0 : 1, transition: 'opacity 600ms ease-out' }}
    >
      <CutsceneEngine data={data} onComplete={exit} />

      {data.allowSkip && (
        <button
          onClick={(e) => { e.stopPropagation(); exit(); }}
          className="absolute bottom-8 right-8 text-gray-500 hover:text-gray-300 text-xs tracking-widest transition-opacity duration-500 z-50"
          style={{ opacity: showSkipHint && !isFadingOut ? 0.7 : 0, pointerEvents: showSkipHint ? 'auto' : 'none' }}
        >
          [ ESC ] Pular
        </button>
      )}
    </div>
  );
}
