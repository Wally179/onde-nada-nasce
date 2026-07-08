'use client';

import { StoryOption } from '../../types/game';
import OptionButton from './OptionButton';
import FreeActionInput from './FreeActionInput';

/**
 * ActionPanel — Container for all player action controls.
 *
 * Composes OptionButton list + FreeActionInput.
 * Single Responsibility: layout and composition of action UI.
 * Open/Closed: new action types can be added as new child components.
 */

interface ActionPanelProps {
  options: StoryOption[];
  allowFourthOption: boolean;
  loading: boolean;
  onOptionClick: (nextId: string) => void;
  onFreeAction: (text: string) => void;
}

export default function ActionPanel({
  options,
  allowFourthOption,
  loading,
  onOptionClick,
  onFreeAction,
}: ActionPanelProps) {
  return (
    <div className="p-4 bg-[#121212] border-t-2 border-[#2d372b] flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-2">
        {options.map((opt) => (
          <OptionButton
            key={opt.id}
            option={opt}
            onClick={onOptionClick}
          />
        ))}
      </div>

      {allowFourthOption && (
        <FreeActionInput
          onSubmit={onFreeAction}
          loading={loading}
        />
      )}
    </div>
  );
}
