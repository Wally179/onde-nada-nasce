import { Injectable, signal, computed } from '@angular/core';
import {
  GameState, PlayerStats, Companion, DialogueMessage, PlayerProfile, PlayerCharacter
} from '../types/game';

const initialStats: PlayerStats = {
  hp: 20,
  maxHp: 20,
  sanity: 100,
  stamina: 100,
  strength: 3,
  agility: 3,
  intelligence: 10,
  charisma: 3,
};

const initialState: GameState = {
  activeCharacter: 'Protagonista',
  stats: initialStats,
  companion: null,
  inventory: ['Carta da Tia Maria', '300 Cruzeiros Reais'],
  payphoneTokens: 3,
  saveSummary: null,
  currentNodeId: 'cap1_republica_start',
  isInDialogueMode: false,
  activeNpcDialogueId: null,
  npcMemories: {},
  hasSeenIntroCutscene: false,
  hasCreatedCharacter: false,
  playerProfile: null,
};

@Injectable({ providedIn: 'root' })
export class GameService {
  // --- Signals ---
  readonly activeCharacter = signal<PlayerCharacter>(initialState.activeCharacter);
  readonly stats = signal<PlayerStats>({ ...initialStats });
  readonly companion = signal<Companion | null>(initialState.companion);
  readonly inventory = signal<string[]>([...initialState.inventory]);
  readonly payphoneTokens = signal<number>(initialState.payphoneTokens);
  readonly saveSummary = signal<string | null>(initialState.saveSummary);
  readonly currentNodeId = signal<string>(initialState.currentNodeId);
  readonly isInDialogueMode = signal<boolean>(initialState.isInDialogueMode);
  readonly activeNpcDialogueId = signal<string | null>(initialState.activeNpcDialogueId);
  readonly npcMemories = signal<Record<string, { npcId: string; summarizedContext: string; recentMessages: DialogueMessage[] }>>(
    {}
  );
  readonly hasSeenIntroCutscene = signal<boolean>(initialState.hasSeenIntroCutscene);
  readonly hasCreatedCharacter = signal<boolean>(initialState.hasCreatedCharacter);
  readonly playerProfile = signal<PlayerProfile | null>(initialState.playerProfile);

  // --- Computed ---
  readonly hpPercent = computed(() => (this.stats().hp / this.stats().maxHp) * 100);
  readonly sanityPercent = computed(() => this.stats().sanity);
  readonly staminaPercent = computed(() => this.stats().stamina);

  // --- Actions ---

  resetToInitialState(): void {
    this.activeCharacter.set(initialState.activeCharacter);
    this.stats.set({ ...initialStats });
    this.companion.set(initialState.companion);
    this.inventory.set([...initialState.inventory]);
    this.payphoneTokens.set(initialState.payphoneTokens);
    this.saveSummary.set(initialState.saveSummary);
    this.currentNodeId.set(initialState.currentNodeId);
    this.isInDialogueMode.set(initialState.isInDialogueMode);
    this.activeNpcDialogueId.set(initialState.activeNpcDialogueId);
    this.npcMemories.set({});
    this.hasSeenIntroCutscene.set(initialState.hasSeenIntroCutscene);
    this.hasCreatedCharacter.set(initialState.hasCreatedCharacter);
    this.playerProfile.set(initialState.playerProfile);
  }

  setCompanion(companion: Companion): void {
    let bonusHp = 0;
    if (companion === 'Muro') bonusHp = 10;
    else if (companion === 'Mecanica') bonusHp = 5;

    this.companion.set(companion);
    this.stats.update(s => ({
      ...s,
      maxHp: 20 + bonusHp,
      hp: Math.min(s.hp + bonusHp, 20 + bonusHp),
    }));
  }

  updateStats(updates: Partial<PlayerStats>): void {
    this.stats.update(s => ({ ...s, ...updates }));
  }

  takeSanityDamage(amount: number): void {
    this.stats.update(s => ({
      ...s,
      sanity: Math.max(0, s.sanity - amount),
    }));
  }

  drainStamina(amount: number): void {
    this.stats.update(s => ({
      ...s,
      stamina: Math.max(0, s.stamina - amount),
    }));
  }

  usePayphoneToken(): boolean {
    if (this.payphoneTokens() > 0) {
      this.payphoneTokens.update(t => t - 1);
      return true;
    }
    return false;
  }

  setSaveSummary(summary: string): void {
    this.saveSummary.set(summary);
  }

  addToInventory(item: string): void {
    this.inventory.update(inv =>
      inv.includes(item) ? inv : [...inv, item]
    );
  }

  removeFromInventory(item: string): void {
    this.inventory.update(inv => inv.filter(i => i !== item));
  }

  goToNode(nodeId: string): void {
    this.currentNodeId.set(nodeId);
    this.isInDialogueMode.set(false);
    this.activeNpcDialogueId.set(null);
  }

  activateExtraLife(): void {
    if (this.activeCharacter() === 'Cacula') return;

    this.activeCharacter.set('Cacula');
    this.currentNodeId.set('cap1_delegacia');
    this.stats.set({
      ...initialStats,
      intelligence: 3,
      agility: 5,
      strength: 5,
      charisma: 3,
    });
    this.companion.set(null);
    this.inventory.set(['Revólver .38 raspado (6 balas)', 'Anotações do Orelhão']);
  }

  // --- Dialogue ---

  enterDialogue(npcId: string): void {
    this.npcMemories.update(memories => {
      const updated = { ...memories };
      if (!updated[npcId]) {
        updated[npcId] = { npcId, summarizedContext: '', recentMessages: [] };
      }
      return updated;
    });
    this.isInDialogueMode.set(true);
    this.activeNpcDialogueId.set(npcId);
  }

  exitDialogue(): void {
    this.isInDialogueMode.set(false);
    this.activeNpcDialogueId.set(null);
  }

  addDialogueMessage(npcId: string, message: DialogueMessage): void {
    this.npcMemories.update(memories => {
      const memory = memories[npcId] || { npcId, summarizedContext: '', recentMessages: [] };
      return {
        ...memories,
        [npcId]: {
          ...memory,
          recentMessages: [...memory.recentMessages, message],
        },
      };
    });
  }

  updateNpcMemory(npcId: string, summarizedContext: string): void {
    this.npcMemories.update(memories => {
      const memory = memories[npcId];
      if (!memory) return memories;
      return {
        ...memories,
        [npcId]: {
          ...memory,
          summarizedContext,
          recentMessages: memory.recentMessages.slice(-10),
        },
      };
    });
  }

  setHasSeenIntroCutscene(hasSeen: boolean): void {
    this.hasSeenIntroCutscene.set(hasSeen);
  }

  setHasCreatedCharacter(hasCreated: boolean): void {
    this.hasCreatedCharacter.set(hasCreated);
  }

  setPlayerProfile(profile: PlayerProfile): void {
    this.playerProfile.set(profile);
  }

  // --- Snapshot for save/load ---

  getState(): GameState {
    return {
      activeCharacter: this.activeCharacter(),
      stats: this.stats(),
      companion: this.companion(),
      inventory: this.inventory(),
      payphoneTokens: this.payphoneTokens(),
      saveSummary: this.saveSummary(),
      currentNodeId: this.currentNodeId(),
      isInDialogueMode: this.isInDialogueMode(),
      activeNpcDialogueId: this.activeNpcDialogueId(),
      npcMemories: this.npcMemories(),
      hasSeenIntroCutscene: this.hasSeenIntroCutscene(),
      hasCreatedCharacter: this.hasCreatedCharacter(),
      playerProfile: this.playerProfile(),
    };
  }

  loadState(state: GameState): void {
    this.activeCharacter.set(state.activeCharacter);
    this.stats.set(state.stats);
    this.companion.set(state.companion);
    this.inventory.set(state.inventory);
    this.payphoneTokens.set(state.payphoneTokens);
    this.saveSummary.set(state.saveSummary);
    this.currentNodeId.set(state.currentNodeId);
    this.isInDialogueMode.set(state.isInDialogueMode);
    this.activeNpcDialogueId.set(state.activeNpcDialogueId);
    this.npcMemories.set(state.npcMemories);
    this.hasSeenIntroCutscene.set(state.hasSeenIntroCutscene);
    this.hasCreatedCharacter.set(state.hasCreatedCharacter);
    this.playerProfile.set(state.playerProfile);
  }
}
