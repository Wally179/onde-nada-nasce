'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CutsceneSlide } from '../../types/cutscene';

interface CutsceneSlideRendererProps {
  slide: CutsceneSlide;
  rushRef: React.MutableRefObject<boolean>;
  onAllTextShown: () => void;
}

let instanceCounter = 0;

export default function CutsceneSlideRenderer({ slide, rushRef, onAllTextShown }: CutsceneSlideRendererProps) {
  const [renderedLines, setRenderedLines] = useState<{ text: string; className?: string }[]>([]);
  const [typingLine, setTypingLine] = useState<{ text: string; className?: string } | null>(null);
  const activeInstanceRef = useRef<number>(0);
  const onAllTextShownRef = useRef(onAllTextShown);
  onAllTextShownRef.current = onAllTextShown;

  useEffect(() => {
    const myInstance = ++instanceCounter;
    activeInstanceRef.current = myInstance;
    rushRef.current = false;
    setRenderedLines([]);
    setTypingLine(null);

    const isStale = () => activeInstanceRef.current !== myInstance;
    const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

    // Helper: dump all remaining lines instantly
    const rushAll = (fromIndex: number, completed: { text: string; className?: string }[]) => {
      const remaining = slide.lines.slice(fromIndex).map(l => ({ text: l.content, className: l.className }));
      setTypingLine(null);
      setRenderedLines([...completed, ...remaining]);
      onAllTextShownRef.current();
    };

    const run = async () => {
      const completed: { text: string; className?: string }[] = [];

      for (let i = 0; i < slide.lines.length; i++) {
        if (isStale()) return;
        if (rushRef.current) { rushAll(i, completed); return; }

        const line = slide.lines[i];

        // Delay between lines
        if (line.delayMs && line.delayMs > 0) {
          const start = Date.now();
          while (Date.now() - start < line.delayMs) {
            if (isStale()) return;
            if (rushRef.current) { rushAll(i, completed); return; }
            await sleep(30); // Poll every 30ms to catch rush quickly
          }
        }

        if (isStale()) return;
        if (rushRef.current) { rushAll(i, completed); return; }

        if (slide.effect === 'typewriter' && line.content.length > 0) {
          // Type character by character
          for (let j = 0; j <= line.content.length; j++) {
            if (isStale()) return;
            if (rushRef.current) { rushAll(i, completed); return; }
            setTypingLine({
              text: line.content.substring(0, j),
              className: line.className,
            });
            const char = line.content[j];
            const delay = char === ' ' ? 12 : 22;
            await sleep(delay);
          }
          if (isStale()) return;
          setTypingLine(null);
          completed.push({ text: line.content, className: line.className });
          setRenderedLines([...completed]);
        } else {
          // Fade / glitch / none — show instantly
          completed.push({ text: line.content, className: line.className });
          setRenderedLines([...completed]);
        }
      }

      if (isStale()) return;
      setTypingLine(null);
      onAllTextShownRef.current();
    };

    run();

    return () => { activeInstanceRef.current = -1; };
  }, [slide.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[slide.alignment];

  const effectClass =
    slide.effect === 'fade' ? 'cutscene-text-fade'
    : slide.effect === 'glitch' ? 'cutscene-glitch'
    : '';

  return (
    <div className={`flex flex-col justify-center w-full h-full px-12 py-8 ${alignmentClass} ${slide.className || ''}`}>
      {renderedLines.map((line, i) => (
        <div key={`${slide.id}-${i}`} className={`min-h-[1.4em] mb-1 ${line.className || ''} ${effectClass}`}>
          {line.text}
        </div>
      ))}
      {typingLine && (
        <div className={`min-h-[1.4em] mb-1 ${typingLine.className || ''}`}>
          {typingLine.text}
          <span className="inline-block w-[2px] h-[1em] bg-white/70 ml-[2px] align-middle animate-pulse" />
        </div>
      )}
    </div>
  );
}
