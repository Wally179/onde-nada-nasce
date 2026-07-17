'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  animate?: boolean;
  delayMs?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TypewriterText({ 
  text, 
  animate = false, 
  delayMs = 12, 
  className = "",
  onComplete
}: TypewriterTextProps) {
  // Capture initial intent to animate so we don't restart on parent re-renders
  const [shouldAnimate] = useState(animate);
  const [displayedText, setDisplayedText] = useState(shouldAnimate ? "" : text);
  const [currentIndex, setCurrentIndex] = useState(shouldAnimate ? 0 : text.length);

  // Skip animation on click or key press
  useEffect(() => {
    if (!shouldAnimate || currentIndex >= text.length) return;

    const skipAnimation = () => {
      setDisplayedText(text);
      setCurrentIndex(text.length);
      if (onComplete) onComplete();
    };

    // Small delay before attaching listeners to prevent immediate skip
    // from the click that triggered this text to appear.
    const timer = setTimeout(() => {
      document.addEventListener('click', skipAnimation);
      document.addEventListener('keydown', skipAnimation);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', skipAnimation);
      document.removeEventListener('keydown', skipAnimation);
    };
  }, [shouldAnimate, currentIndex, text, onComplete]);

  // Typing effect loop
  useEffect(() => {
    if (!shouldAnimate || currentIndex >= text.length) {
      if (currentIndex === text.length && shouldAnimate && onComplete) {
        onComplete();
      }
      return;
    }
    
    // To mimic old game styles (like Pokémon), we can type faster 
    // or type chunks of characters at once if the text is very long.
    const charsPerTick = 1;

    const timeout = setTimeout(() => {
      setDisplayedText(prev => prev + text.slice(currentIndex, currentIndex + charsPerTick));
      setCurrentIndex(prev => prev + charsPerTick);
    }, delayMs);
    
    return () => clearTimeout(timeout);
  }, [currentIndex, shouldAnimate, text, delayMs, onComplete]);

  return <span className={className}>{displayedText}</span>;
}
