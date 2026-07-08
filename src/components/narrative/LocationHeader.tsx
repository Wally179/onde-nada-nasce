'use client';

/**
 * LocationHeader — Displays the current scene location name.
 *
 * Single Responsibility: only renders the location header.
 */

interface LocationHeaderProps {
  location: string;
}

export default function LocationHeader({ location }: LocationHeaderProps) {
  return (
    <h2 className="text-terminal-green uppercase border-b border-terminal-green/30 pb-2 mb-4">
      Local: {location}
    </h2>
  );
}
