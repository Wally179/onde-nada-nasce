'use client';

import LocationHeader from './LocationHeader';

/**
 * NarrativePanel — Scrollable panel that shows the location header
 * and narrative log entries.
 *
 * Single Responsibility: display narrative text.
 * Open/Closed: Accepts any string[] as log entries.
 */

interface NarrativePanelProps {
  location: string;
  narrativeLog: string[];
}

export default function NarrativePanel({ location, narrativeLog }: NarrativePanelProps) {
  return (
    <div className="flex-grow p-6 overflow-y-auto space-y-4 text-sm md:text-base leading-relaxed scrollbar-thin scrollbar-thumb-[#495845] scrollbar-track-transparent">
      <LocationHeader location={location} />

      {narrativeLog.map((log, index) => (
        <p key={index} className="opacity-90">
          {log}
        </p>
      ))}
    </div>
  );
}
