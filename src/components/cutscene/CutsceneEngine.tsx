'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { CutsceneData } from '../../types/cutscene';
import CutsceneSlideRenderer from './CutsceneSlideRenderer';

interface CutsceneEngineProps {
  data: CutsceneData;
  onComplete: () => void;
}

type Phase = 'animating' | 'waiting' | 'transitioning';

export default function CutsceneEngine({ data, onComplete }: CutsceneEngineProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('animating');
  const [isVisible, setIsVisible] = useState(true);

  const rushRef = useRef(false);
  const phaseRef = useRef<Phase>('animating');
  phaseRef.current = phase;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const dataRef = useRef(data);
  dataRef.current = data;

  const handleAllTextShown = useCallback(() => {
    setPhase('waiting');
    phaseRef.current = 'waiting';
  }, []);

  const advanceToNextSlide = useCallback(() => {
    setPhase('transitioning');
    phaseRef.current = 'transitioning';
    setIsVisible(false);

    setTimeout(() => {
      setCurrentSlideIndex(prev => {
        const next = prev + 1;
        if (next >= dataRef.current.slides.length) {
          onCompleteRef.current();
          return prev;
        }
        return next;
      });
      rushRef.current = false;
      setPhase('animating');
      phaseRef.current = 'animating';

      // Small delay before fade-in so React can mount the new slide
      setTimeout(() => setIsVisible(true), 50);
    }, dataRef.current.transitionDurationMs);
  }, []);

  const handleInteraction = useCallback(() => {
    const p = phaseRef.current;
    if (p === 'animating') {
      rushRef.current = true;
    } else if (p === 'waiting') {
      advanceToNextSlide();
    }
    // Ignore during 'transitioning'
  }, [advanceToNextSlide]);

  // Global click + keyboard listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // ESC is handled by CutscenePlayer for skip — don't intercept it here
      if (e.code === 'Escape') return;
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
      }
      handleInteraction();
    };
    const onClick = () => handleInteraction();

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('click', onClick);
    };
  }, [handleInteraction]);

  const currentSlide = data.slides[currentSlideIndex];

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <div
        className="w-full h-full absolute inset-0 flex items-center justify-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${data.transitionDurationMs}ms ease-in-out`,
        }}
      >
        {currentSlide && (
          <CutsceneSlideRenderer
            key={currentSlide.id}
            slide={currentSlide}
            rushRef={rushRef}
            onAllTextShown={handleAllTextShown}
          />
        )}
      </div>

      {/* "Click to continue" indicator */}
      {phase === 'waiting' && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cutscene-text-fade">
          <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Continuar</span>
          <span className="text-white/50 text-lg animate-bounce">▼</span>
        </div>
      )}
    </div>
  );
}
