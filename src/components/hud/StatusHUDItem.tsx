'use client';

import Image from 'next/image';
import StatusBarsSVG from './StatusBarsSVG';

/**
 * StatusHUDItem — A single character's HUD panel.
 * Composes the pixel-art StatusBarsSVG overlay with an HTML Image underneath
 * for the character portrait.
 */

interface StatusHUDItemProps {
  hpPercent: number;
  staminaPercent: number;
  sanityPercent: number;
  portraitSrc?: string; // Optional — if not provided, just shows gray background
}

export default function StatusHUDItem({
  hpPercent,
  staminaPercent,
  sanityPercent,
  portraitSrc,
}: StatusHUDItemProps) {
  return (
    <div className="relative w-full max-w-[320px]">
      {/* 
        The portrait sits BEHIND the SVG.
        SVG viewBox is 379x122.
        Portrait frame is a circle at cx=61, cy=61 with r=37.
        Using exact percentages relative to the container for perfect scaling.
        Left: (61-37) / 379 = 6.33%
        Top: (61-37) / 122 = 19.67%
        Size: (37*2) / 379 = 19.53% width, (37*2)/122 = 60.66% height
      */}
      <div 
        className="absolute overflow-hidden rounded-full z-0 bg-[#4E4A4E]"
        style={{
          top: '19.67%',
          left: '6.33%',
          width: '19.53%',
          height: '60.66%',
        }}
      >
        {portraitSrc && (
          <Image 
            src={portraitSrc} 
            alt="Portrait" 
            fill 
            className="object-cover object-top pointer-events-none" 
            sizes="(max-width: 768px) 64px, 128px"
          />
        )}
      </div>

      {/* The pixel art frame and bars (transparent hole where the portrait goes) */}
      <div className="relative z-10 w-full pointer-events-none drop-shadow-md">
        <StatusBarsSVG
          hpPercent={hpPercent}
          staminaPercent={staminaPercent}
          sanityPercent={sanityPercent}
        />
      </div>
    </div>
  );
}
