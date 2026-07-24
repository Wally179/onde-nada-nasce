import { Component, input, computed } from '@angular/core';

// Constants for bar geometry
const BAR_X_START = 135.225;
const BAR_X_END = 333.296;
const BAR_WIDTH = BAR_X_END - BAR_X_START; // ~198.07

@Component({
  selector: 'app-status-bars-svg',
  standalone: true,
  templateUrl: './status-bars-svg.component.html',
  styles: [`
    .status-bar-group {
      cursor: help;
      transition: filter 0.2s ease;
    }
    .status-bar-group:hover {
      filter: brightness(1.3) drop-shadow(0 0 4px rgba(255,255,255,0.3));
    }
  `]
})
export class StatusBarsSVGComponent {
  readonly hpPercent = input<number>(100);
  readonly staminaPercent = input<number>(100);
  readonly sanityPercent = input<number>(100);

  private clamp(v: number): number {
    return Math.max(0, Math.min(100, v));
  }

  readonly hpWidth = computed(() => (this.clamp(this.hpPercent()) / 100) * BAR_WIDTH);
  readonly staWidth = computed(() => (this.clamp(this.staminaPercent()) / 100) * BAR_WIDTH);
  readonly sanWidth = computed(() => (this.clamp(this.sanityPercent()) / 100) * BAR_WIDTH);

  readonly hpText = computed(() => Math.round(this.hpPercent()));
  readonly staText = computed(() => Math.round(this.staminaPercent()));
  readonly sanText = computed(() => Math.round(this.sanityPercent()));

  readonly BAR_X_START = BAR_X_START;
}
