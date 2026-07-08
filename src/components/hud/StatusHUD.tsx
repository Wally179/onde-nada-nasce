'use client';

import { useGameStore } from '../../store/gameStore';
import StatusHUDItem from './StatusHUDItem';
import { npcProfiles } from '../../data/npcProfiles';

/**
 * StatusHUD — Top-level HUD container.
 * Renders the player's HUD and (if present) the companion's HUD side-by-side
 * floating at the top left of the screen.
 */

const COMPANION_PORTRAITS: Record<string, string> = {
  Mecanica: '/assets/characters/mecanica/portrait.png',
  Muro: '/assets/characters/muro/portrait.png',
};

export default function StatusHUD() {
  const { stats, companion } = useGameStore();

  const hpPercent = (stats.hp / stats.maxHp) * 100;
  const sanityPercent = (stats.sanity / 100) * 100;
  const staminaPercent = (stats.stamina / 100) * 100;

  let companionHpPercent = 0;
  let companionStaminaPercent = 0;
  let companionSanityPercent = 0;

  if (companion) {
    const companionId = companion.toLowerCase(); // "Mecanica" -> "mecanica"
    const profile = npcProfiles[companionId];
    if (profile && profile.atributos) {
      companionHpPercent = (profile.atributos.hp / profile.atributos.maxHp) * 100;
      companionSanityPercent = (profile.atributos.sanity / 100) * 100;
      companionStaminaPercent = (profile.atributos.stamina / 100) * 100;
    }
  }

  return (
    <div className="flex items-start gap-8 pointer-events-none z-50">
      {/* Player HUD */}
      <StatusHUDItem
        hpPercent={hpPercent}
        staminaPercent={staminaPercent}
        sanityPercent={sanityPercent}
        portraitSrc="/assets/characters/mecanica/portrait.png" // Temporary until protagonist has their own
      />

      {/* Companion HUD */}
      {companion && (
        <StatusHUDItem
          hpPercent={companionHpPercent}
          staminaPercent={companionStaminaPercent}
          sanityPercent={companionSanityPercent}
          portraitSrc={COMPANION_PORTRAITS[companion]}
        />
      )}
    </div>
  );
}
