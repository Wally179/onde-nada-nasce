'use client';

import { useEffect, useRef } from 'react';
import LocationHeader from './LocationHeader';
import TypewriterText from './TypewriterText';

interface NarrativePanelProps {
  location: string;
  narrativeLog: string[];
}

export default function NarrativePanel({ location, narrativeLog }: NarrativePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevLogLengthRef = useRef(narrativeLog.length);

  // Auto-scroll observer: keeps scroll at the bottom while text is being typed
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        // Ampliamos o limiar para 300px para garantir que não pare o auto-scroll à toa
        if (scrollHeight - scrollTop - clientHeight < 300) {
          containerRef.current.scrollTop = scrollHeight;
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true, characterData: true });
    }
    
    return () => observer.disconnect();
  }, []);

  // Força a descida no momento em que a nova mensagem chega (antes de animar)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [narrativeLog.length]);

  // Update previous length AFTER render
  useEffect(() => {
    prevLogLengthRef.current = narrativeLog.length;
  }, [narrativeLog]);

  return (
    <div 
      ref={containerRef} 
      className="flex-grow p-6 overflow-y-auto space-y-4 text-sm md:text-base leading-relaxed scrollbar-thin scrollbar-thumb-[#495845] scrollbar-track-transparent"
    >
      <LocationHeader location={location} />

      {narrativeLog.map((log, index) => {
        let colorClass = "opacity-90";
        
        // Estilização baseada no conteúdo da mensagem
        if (log.startsWith('> ')) {
          colorClass = "text-terminal-blue font-bold opacity-100";
        } else if (log.startsWith('[-') || log.includes('Item perdido')) {
          colorClass = "text-terminal-red font-bold opacity-100";
        } else if (log.startsWith('[+') || log.includes('Item obtido') || log.includes('novo caminho')) {
          colorClass = "text-terminal-green font-bold opacity-100";
        } else if (log.startsWith('[')) {
          colorClass = "text-[#8b9c85] font-bold opacity-100";
        }

        const isNewLog = index >= prevLogLengthRef.current;

        return (
          <p key={index} className={`${colorClass} whitespace-pre-wrap`}>
            <TypewriterText text={log} animate={isNewLog} delayMs={15} />
          </p>
        );
      })}
    </div>
  );
}
