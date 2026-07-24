import { Component, input, output, OnInit, OnDestroy, signal, effect } from '@angular/core';

@Component({
  selector: 'app-typewriter-text',
  standalone: true,
  template: `<span>{{ displayedText() }}</span>`,
})
export class TypewriterTextComponent implements OnInit, OnDestroy {
  readonly text = input.required<string>();
  readonly animate = input<boolean>(false);
  readonly delayMs = input<number>(12);
  readonly complete = output<void>();

  readonly displayedText = signal('');

  private currentIndex = 0;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private skipClickHandler: (() => void) | null = null;
  private skipKeyHandler: (() => void) | null = null;
  private listenerTimeout: ReturnType<typeof setTimeout> | null = null;
  private shouldAnimate = false;

  ngOnInit(): void {
    this.shouldAnimate = this.animate();

    if (!this.shouldAnimate) {
      this.displayedText.set(this.text());
      return;
    }

    this.displayedText.set('');
    this.currentIndex = 0;
    this.setupSkipListeners();
    this.tick();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private tick(): void {
    if (this.currentIndex >= this.text().length) {
      this.complete.emit();
      this.removeSkipListeners();
      return;
    }

    this.timeoutId = setTimeout(() => {
      this.currentIndex++;
      this.displayedText.set(this.text().substring(0, this.currentIndex));
      this.tick();
    }, this.delayMs());
  }

  private skipAnimation = (): void => {
    this.displayedText.set(this.text());
    this.currentIndex = this.text().length;
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.complete.emit();
    this.removeSkipListeners();
  };

  private setupSkipListeners(): void {
    // Small delay before attaching listeners to prevent immediate skip
    this.listenerTimeout = setTimeout(() => {
      this.skipClickHandler = this.skipAnimation;
      this.skipKeyHandler = this.skipAnimation;
      document.addEventListener('click', this.skipClickHandler);
      document.addEventListener('keydown', this.skipKeyHandler);
    }, 100);
  }

  private removeSkipListeners(): void {
    if (this.skipClickHandler) {
      document.removeEventListener('click', this.skipClickHandler);
      this.skipClickHandler = null;
    }
    if (this.skipKeyHandler) {
      document.removeEventListener('keydown', this.skipKeyHandler);
      this.skipKeyHandler = null;
    }
  }

  private cleanup(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.listenerTimeout) clearTimeout(this.listenerTimeout);
    this.removeSkipListeners();
  }
}
