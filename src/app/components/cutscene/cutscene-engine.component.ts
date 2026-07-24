import { Component, input, output, signal, effect, HostListener, OnInit, OnDestroy, viewChild, computed } from '@angular/core';
import { CutsceneData } from '../../types/cutscene';
import { CutsceneSlideRendererComponent } from './cutscene-slide-renderer.component';

type Phase = 'animating' | 'waiting' | 'transitioning';

@Component({
  selector: 'app-cutscene-engine',
  standalone: true,
  imports: [CutsceneSlideRendererComponent],
  template: `
    <div class="fixed inset-0 z-[60] bg-black text-white font-mono overflow-hidden flex items-center justify-center"
         [style.opacity]="isFadingOut() ? 0 : 1"
         [style.transition]="'opacity 600ms ease-out'">
      
      <!-- Slide Container -->
      <div
        class="w-full h-full absolute inset-0 flex flex-col items-center justify-center cutscene-letter-slide-container"
        [style.opacity]="isVisible() ? 1 : 0"
        [style.transition]="'opacity ' + cutscene().transitionDurationMs + 'ms ease-in-out'"
      >
        @if (currentSlide()) {
          <app-cutscene-slide-renderer
            #renderer
            [slide]="currentSlide()!"
            (onAllTextShown)="handleAllTextShown()"
          />
        }
      </div>

      <!-- "Click to continue" indicator -->
      @if (phase() === 'waiting') {
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cutscene-text-fade pointer-events-none">
          <span class="text-white/40 text-xs tracking-[0.3em] uppercase">Continuar</span>
          <span class="text-white/50 text-lg animate-bounce">▼</span>
        </div>
      }

      <!-- Skip Button Overlay -->
      @if (cutscene().allowSkip) {
        <button
          (click)="exit($event)"
          class="absolute bottom-8 right-8 text-gray-500 hover:text-gray-300 text-xs tracking-widest transition-opacity duration-500 z-50"
          [style.opacity]="showSkipHint() && !isFadingOut() ? 0.7 : 0"
          [style.pointer-events]="showSkipHint() ? 'auto' : 'none'"
        >
          [ ESC ] Pular
        </button>
      }
    </div>
  `
})
export class CutsceneEngineComponent implements OnInit, OnDestroy {
  readonly cutscene = input.required<CutsceneData>();
  readonly cutsceneComplete = output<void>();

  // Engine state
  readonly currentSlideIndex = signal(0);
  readonly phase = signal<Phase>('animating');
  readonly isVisible = signal(true);

  // Player/Skip state
  readonly showSkipHint = signal(false);
  readonly isFadingOut = signal(false);

  private skipTimer: any = null;
  private hasExited = false;

  readonly renderer = viewChild<CutsceneSlideRendererComponent>('renderer');

  readonly currentSlide = computed(() => {
    const cutscene = this.cutscene();
    if (!cutscene || !cutscene.slides) return null;
    return cutscene.slides[this.currentSlideIndex()] || null;
  });

  constructor() {}

  ngOnInit() {
    this.phase.set('animating');
  }

  ngOnDestroy() {
    if (this.skipTimer) clearTimeout(this.skipTimer);
  }

  // --- Interaction Global Listeners ---

  @HostListener('window:mousemove')
  onMouseMove() {
    if (!this.cutscene().allowSkip) return;
    this.showSkipHint.set(true);
    if (this.skipTimer) clearTimeout(this.skipTimer);
    this.skipTimer = setTimeout(() => this.showSkipHint.set(false), 3000);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.code === 'Escape' && this.cutscene().allowSkip) {
      this.exit();
      return;
    }
    
    // For skip hint
    if (this.cutscene().allowSkip) {
      this.onMouseMove();
    }

    // Advance on any key press (except Escape handled above)
    this.handleInteraction();
  }

  @HostListener('window:click', ['$event'])
  onClick(e: MouseEvent) {
    this.handleInteraction();
  }

  // --- Logic ---

  handleAllTextShown() {
    this.phase.set('waiting');
  }

  handleInteraction() {
    if (this.hasExited) return;

    const p = this.phase();
    if (p === 'animating') {
      // Force rush on the renderer
      this.renderer()?.forceRush();
    } else if (p === 'waiting') {
      this.advanceToNextSlide();
    }
  }

  advanceToNextSlide() {
    this.phase.set('transitioning');
    this.isVisible.set(false);

    setTimeout(() => {
      const next = this.currentSlideIndex() + 1;
      if (next >= this.cutscene().slides.length) {
        this.exit();
      } else {
        this.currentSlideIndex.set(next);
        this.phase.set('animating');
        
        // Small delay before fade-in to allow Angular to render the DOM changes
        setTimeout(() => this.isVisible.set(true), 50);
      }
    }, this.cutscene().transitionDurationMs);
  }

  exit(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (this.hasExited) return;
    this.hasExited = true;
    this.isFadingOut.set(true);
    setTimeout(() => {
      this.cutsceneComplete.emit();
    }, 600);
  }
}
