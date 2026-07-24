import { Component, input } from '@angular/core';
import { StatusBarsSVGComponent } from './status-bars-svg.component';

@Component({
  selector: 'app-status-hud-item',
  standalone: true,
  imports: [StatusBarsSVGComponent],
  template: `
    <div class="relative w-full max-w-[320px] pointer-events-auto">
      <!-- Portrait behind SVG -->
      <div
        class="absolute overflow-hidden rounded-full z-0 bg-[#4E4A4E]"
        [style.top]="'19.67%'"
        [style.left]="'6.33%'"
        [style.width]="'19.53%'"
        [style.height]="'60.66%'"
      >
        @if (portraitSrc()) {
          <img
            [src]="portraitSrc()"
            alt="Portrait"
            class="w-full h-full object-cover object-top pointer-events-none"
          />
        }
      </div>

      <!-- SVG overlay -->
      <div class="relative z-10 w-full drop-shadow-md">
        <app-status-bars-svg
          [hpPercent]="hpPercent()"
          [staminaPercent]="staminaPercent()"
          [sanityPercent]="sanityPercent()"
        />
      </div>
    </div>
  `,
})
export class StatusHUDItemComponent {
  readonly hpPercent = input<number>(100);
  readonly staminaPercent = input<number>(100);
  readonly sanityPercent = input<number>(100);
  readonly portraitSrc = input<string>('');
}
