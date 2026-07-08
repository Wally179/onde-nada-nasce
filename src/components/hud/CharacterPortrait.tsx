'use client';

import Image from 'next/image';

/**
 * CharacterPortrait — Displays the active character's pixel-art portrait
 * inside a styled circular frame that matches the HUD aesthetic.
 *
 * Single Responsibility: only handles portrait rendering + frame styling.
 */

interface CharacterPortraitProps {
  /** Path to the portrait image (relative to /public) */
  src: string;
  /** Character display name for alt text */
  name: string;
  /** Size of the portrait in pixels */
  size?: number;
}

export default function CharacterPortrait({
  src,
  name,
  size = 80,
}: CharacterPortraitProps) {
  return (
    <div
      className="relative bg-black rounded-full border-4 border-[#495845] overflow-hidden flex-shrink-0"
      style={{
        width: size,
        height: size,
        imageRendering: 'pixelated',
      }}
    >
      <Image
        src={src}
        alt={`Retrato de ${name}`}
        fill
        className="object-cover object-top"
        sizes={`${size}px`}
        priority
      />
    </div>
  );
}
