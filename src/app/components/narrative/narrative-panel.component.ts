import { Component, input, ElementRef, viewChild, AfterViewInit, OnDestroy, effect, signal } from '@angular/core';
import { LocationHeaderComponent } from './location-header.component';
import { TypewriterTextComponent } from './typewriter-text.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-narrative-panel',
  standalone: true,
  imports: [LocationHeaderComponent, TypewriterTextComponent, NgClass],
  host: { class: 'flex-1 overflow-hidden flex flex-col min-h-0' },
  template: `
    <div
      #container
      class="flex-grow p-4 md:p-6 overflow-y-auto space-y-3 text-xs md:text-sm leading-normal scrollbar-thin scrollbar-thumb-[#495845] scrollbar-track-transparent font-mono"
    >
      <app-location-header [location]="location()" />

      @for (log of narrativeLog(); track $index) {
        <p [ngClass]="getColorClass(log)" class="whitespace-pre-wrap">
          <app-typewriter-text
            [text]="log"
            [animate]="$index >= prevLogLength()"
            [delayMs]="15"
          />
        </p>
      }
    </div>
  `,
})
export class NarrativePanelComponent implements AfterViewInit, OnDestroy {
  readonly location = input.required<string>();
  readonly narrativeLog = input.required<string[]>();

  readonly prevLogLength = signal(0);
  private containerEl = viewChild<ElementRef<HTMLDivElement>>('container');
  private observer: MutationObserver | null = null;

  constructor() {
    // Track previous log length for animation
    effect(() => {
      const log = this.narrativeLog();
      // Defer the update so the current render uses the old value
      setTimeout(() => this.prevLogLength.set(log.length), 0);
    });

    // Auto-scroll when log changes
    effect(() => {
      this.narrativeLog(); // subscribe
      const el = this.containerEl()?.nativeElement;
      if (el) {
        setTimeout(() => el.scrollTop = el.scrollHeight, 0);
      }
    });
  }

  ngAfterViewInit(): void {
    const el = this.containerEl()?.nativeElement;
    if (!el) return;

    this.observer = new MutationObserver(() => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollHeight - scrollTop - clientHeight < 300) {
        el.scrollTop = scrollHeight;
      }
    });

    this.observer.observe(el, { childList: true, subtree: true, characterData: true });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  getColorClass(log: string): string {
    if (!log) return 'opacity-90';
    if (log.startsWith('> ')) return 'text-terminal-blue font-bold opacity-100';
    if (log.startsWith('[-') || log.includes('Item perdido')) return 'text-terminal-red font-bold opacity-100';
    if (log.startsWith('[+') || log.includes('Item obtido') || log.includes('novo caminho')) return 'text-terminal-green font-bold opacity-100';
    if (log.startsWith('[')) return 'text-[#8b9c85] font-bold opacity-100';
    return 'opacity-90';
  }
}
