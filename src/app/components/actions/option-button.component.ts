import { Component, input, output } from '@angular/core';
import { StoryOption } from '../../types/game';

@Component({
  selector: 'app-option-button',
  standalone: true,
  template: `
    <button
      (click)="optionClick.emit(option().nextId ?? option().id)"
      class="text-left px-3 py-1.5 border border-[#495845] hover:bg-[#2d372b] hover:text-white transition-colors uppercase text-xs flex items-center gap-2 font-mono"
    >
      <span class="text-terminal-green font-bold">[{{ option().id }}]</span>
      {{ option().text }}
    </button>
  `,
})
export class OptionButtonComponent {
  readonly option = input.required<StoryOption>();
  readonly optionClick = output<string>();
}
