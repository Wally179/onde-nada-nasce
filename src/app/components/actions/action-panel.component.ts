import { Component, input, output } from '@angular/core';
import { StoryOption } from '../../types/game';
import { OptionButtonComponent } from './option-button.component';
import { FreeActionInputComponent } from './free-action-input.component';

@Component({
  selector: 'app-action-panel',
  standalone: true,
  imports: [OptionButtonComponent, FreeActionInputComponent],
  host: { class: 'w-full shrink-0' },
  template: `
    <div class="p-4 bg-[#121212] border-t-2 border-[#2d372b] flex flex-col gap-4">
      <div class="grid grid-cols-1 gap-2">
        @for (opt of options(); track opt.id) {
          <app-option-button
            [option]="opt"
            (optionClick)="optionClick.emit($event)"
          />
        }
      </div>

      @if (allowFourthOption()) {
        <app-free-action-input
          [loading]="loading()"
          [attemptsRemaining]="freeActionAttemptsRemaining()"
          [maxAttempts]="freeActionMaxAttempts()"
          (submitAction)="freeAction.emit($event)"
        />
      }
    </div>
  `,
})
export class ActionPanelComponent {
  readonly options = input.required<StoryOption[]>();
  readonly allowFourthOption = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly freeActionAttemptsRemaining = input<number>(0);
  readonly freeActionMaxAttempts = input<number>(3);

  readonly optionClick = output<string>();
  readonly freeAction = output<string>();
}
