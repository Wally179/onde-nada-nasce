import { Component, input, output, signal, effect, OnDestroy, OnInit, ViewContainerRef, HostBinding } from '@angular/core';
import { NgClass } from '@angular/common';
import { CutsceneData, CutsceneSlide } from '../../types/cutscene';

interface RenderedLine {
  text: string;
  className?: string;
}

@Component({
  selector: 'app-cutscene-slide-renderer',
  standalone: true,
  imports: [],
  host: {
    '[class]': 'hostClasses()'
  },
  template: `
    <div class="flex flex-col justify-center w-full h-full px-12 py-8">
      @for (line of renderedLines(); track $index) {
        <div class="min-h-[1.4em] mb-1 {{ line.className || '' }} {{ effectClass() }}">
          {{ line.text }}
        </div>
      }
      
      @if (typingLine()) {
        <div class="min-h-[1.4em] mb-1 {{ typingLine()!.className || '' }}">
          {{ typingLine()!.text }}
          <span class="inline-block w-[2px] h-[1em] bg-white/70 ml-[2px] align-middle animate-pulse"></span>
        </div>
      }
    </div>
  `,
})
export class CutsceneSlideRendererComponent implements OnDestroy {
  readonly slide = input.required<CutsceneSlide>();
  readonly onAllTextShown = output<void>();

  readonly renderedLines = signal<RenderedLine[]>([]);
  readonly typingLine = signal<RenderedLine | null>(null);

  private activeInstance = 0;
  private isRushing = false;



  hostClasses() {
    const s = this.slide();
    const alignClass = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }[s.alignment] || 'text-center';
    
    // Include custom className from the slide (like 'cutscene-letter-slide')
    return `w-full h-full block flex flex-col justify-center ${alignClass} ${s.className || ''}`;
  }

  effectClass() {
    const eff = this.slide().effect;
    if (eff === 'fade') return 'cutscene-text-fade';
    if (eff === 'glitch') return 'cutscene-glitch';
    return '';
  }

  constructor() {
    effect(() => {
      const s = this.slide();
      
      this.activeInstance++;
      this.isRushing = false;
      this.renderedLines.set([]);
      this.typingLine.set(null);
      this.runAnimation(this.activeInstance);
    }, { allowSignalWrites: true });
  }

  ngOnDestroy() {
    this.activeInstance = -1; // Abort active loop
  }

  // Public method so the parent Engine can trigger a skip
  public forceRush() {
    this.isRushing = true;
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private rushAllRemaining(instanceId: number, fromIndex: number, completed: RenderedLine[]) {
    if (this.activeInstance !== instanceId) return;
    const s = this.slide();
    const remaining = s.lines.slice(fromIndex).map(l => ({ text: l.content, className: l.className }));
    
    this.typingLine.set(null);
    this.renderedLines.set([...completed, ...remaining]);
    this.onAllTextShown.emit();
  }

  private async runAnimation(instanceId: number) {
    const s = this.slide();
    const completed: RenderedLine[] = [];

    for (let i = 0; i < s.lines.length; i++) {
      if (this.activeInstance !== instanceId) return;
      if (this.isRushing) {
        this.rushAllRemaining(instanceId, i, completed);
        return;
      }

      const line = s.lines[i];

      // Delay before typing
      if (line.delayMs && line.delayMs > 0) {
        const start = Date.now();
        while (Date.now() - start < line.delayMs) {
          if (this.activeInstance !== instanceId) return;
          if (this.isRushing) {
            this.rushAllRemaining(instanceId, i, completed);
            return;
          }
          await this.sleep(30);
        }
      }

      if (this.activeInstance !== instanceId) return;
      if (this.isRushing) {
        this.rushAllRemaining(instanceId, i, completed);
        return;
      }

      if (s.effect === 'typewriter' && line.content.length > 0) {
        for (let j = 0; j <= line.content.length; j++) {
          if (this.activeInstance !== instanceId) return;
          if (this.isRushing) {
            this.rushAllRemaining(instanceId, i, completed);
            return;
          }

          this.typingLine.set({
            text: line.content.substring(0, j),
            className: line.className
          });

          if (j < line.content.length) {
            const char = line.content[j];
            const delay = char === ' ' ? 12 : 22;
            await this.sleep(delay);
          }
        }
        
        if (this.activeInstance !== instanceId) return;
        this.typingLine.set(null);
        completed.push({ text: line.content, className: line.className });
        this.renderedLines.set([...completed]);
      } else {
        completed.push({ text: line.content, className: line.className });
        this.renderedLines.set([...completed]);
      }
    }

    if (this.activeInstance !== instanceId) return;
    this.typingLine.set(null);
    this.onAllTextShown.emit();
  }
}
