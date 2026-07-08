'use client';

import Image from 'next/image';

/**
 * CompanionPortrait — Smaller portrait for the companion character.
 * Shown only when a companion is active.
 *
 * Single Responsibility: only handles companion portrait rendering.
 */

interface CompanionPortraitProps {
  /** Path to the companion portrait image (relative to /public) */
  src: string;
  /** Companion display name for alt text */
  name: string;
  /** Size of the portrait in pixels */
  size?: number;
}

export default function CompanionPortrait({
  src,
  name,
  size = 64,
}: CompanionPortraitProps) {
  return (
    <div
      className="relative bg-black rounded-full border-4 border-[#495845] overflow-hidden flex-shrink-0 opacity-80"
      style={{
        width: size,
        height: size,
        imageRendering: 'pixelated',
      }}
    >
      <Image
        src={src}
        alt={`Companheiro: ${name}`}
        fill
        className="object-cover object-top"
        sizes={`${size}px`}
      />
    </div>
  );
}
