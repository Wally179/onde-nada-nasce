import { Component, input } from '@angular/core';

@Component({
  selector: 'app-location-header',
  standalone: true,
  template: `
    <h2 class="text-terminal-green text-xs md:text-sm tracking-widest font-bold uppercase border-b border-terminal-green/30 pb-2 mb-3">
      Local: {{ location() }}
    </h2>
  `,
})
export class LocationHeaderComponent {
  readonly location = input.required<string>();
}
