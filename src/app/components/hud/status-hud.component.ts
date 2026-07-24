import { Component, inject, computed } from '@angular/core';
import { GameService } from '../../services/game.service';
import { StatusHUDItemComponent } from './status-hud-item.component';
import { npcProfiles } from '../../data/npcProfiles';

const COMPANION_PORTRAITS: Record<string, string> = {
  Mecanica: '/assets/characters/mecanica/portrait.png',
  Muro: '/assets/characters/muro/portrait.png',
};

@Component({
  selector: 'app-status-hud',
  standalone: true,
  imports: [StatusHUDItemComponent],
  template: `
    <div class="flex items-start gap-8 pointer-events-none z-50">
      <!-- Player HUD -->
      <app-status-hud-item
        [hpPercent]="hpPercent()"
        [staminaPercent]="staminaPercent()"
        [sanityPercent]="sanityPercent()"
        portraitSrc="/assets/characters/mecanica/portrait.png"
      />

      <!-- Companion HUD -->
      @if (game.companion()) {
        <app-status-hud-item
          [hpPercent]="companionHpPercent()"
          [staminaPercent]="companionStaminaPercent()"
          [sanityPercent]="companionSanityPercent()"
          [portraitSrc]="companionPortrait()"
        />
      }
    </div>
  `,
})
export class StatusHUDComponent {
  readonly game = inject(GameService);

  readonly hpPercent = computed(() => (this.game.stats().hp / this.game.stats().maxHp) * 100);
  readonly sanityPercent = computed(() => this.game.stats().sanity);
  readonly staminaPercent = computed(() => this.game.stats().stamina);

  readonly companionPortrait = computed(() => {
    const c = this.game.companion();
    return c ? (COMPANION_PORTRAITS[c] || '') : '';
  });

  readonly companionHpPercent = computed(() => {
    const c = this.game.companion();
    if (!c) return 0;
    const profile = npcProfiles[c.toLowerCase()];
    return profile ? (profile.atributos.hp / profile.atributos.maxHp) * 100 : 0;
  });

  readonly companionStaminaPercent = computed(() => {
    const c = this.game.companion();
    if (!c) return 0;
    const profile = npcProfiles[c.toLowerCase()];
    return profile?.atributos.stamina ?? 0;
  });

  readonly companionSanityPercent = computed(() => {
    const c = this.game.companion();
    if (!c) return 0;
    const profile = npcProfiles[c.toLowerCase()];
    return profile?.atributos.sanity ?? 0;
  });
}
