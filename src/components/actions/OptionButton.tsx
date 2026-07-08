'use client';

import { StoryOption } from '../../types/game';

/**
 * OptionButton — A single story option rendered as a styled button.
 *
 * Single Responsibility: renders one option button.
 * Interface Segregation: only needs the option data + click handler.
 */

interface OptionButtonProps {
  option: StoryOption;
  onClick: (nextId: string) => void;
}

export default function OptionButton({ option, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={() => onClick(option.nextId ?? option.id)}
      className="text-left px-4 py-2 border border-[#495845] hover:bg-[#2d372b] hover:text-white transition-colors uppercase text-xs sm:text-sm flex items-center gap-2"
    >
      <span className="text-terminal-green font-bold">[{option.id}]</span>
      {option.text}
    </button>
  );
}
