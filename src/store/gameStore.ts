import { create } from 'zustand';
import { GameState, PlayerStats, Companion, DialogueMessage } from '../types/game';

type GameStore = GameState & {
  // Actions
  setCompanion: (companion: Companion) => void;
  updateStats: (updates: Partial<PlayerStats>) => void;
  takeSanityDamage: (amount: number) => void;
  usePayphoneToken: () => boolean;
  setSaveSummary: (summary: string) => void;
  goToNode: (nodeId: string) => void;
  activateExtraLife: () => void;
  
  // Dialogue Actions
  enterDialogue: (npcId: string) => void;
  exitDialogue: () => void;
  addDialogueMessage: (npcId: string, message: DialogueMessage) => void;
  updateNpcMemory: (npcId: string, summarizedContext: string) => void;
  
  // Cutscenes
  setHasSeenIntroCutscene: (hasSeen: boolean) => void;
};

const initialStats: PlayerStats = {
  hp: 20, // Base HP
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
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setCompanion: (companion) => set((state) => {
    let bonusHp = 0;
    if (companion === 'Muro') {
      bonusHp = 10;
    } else if (companion === 'Mecanica') {
      bonusHp = 5;
    }
    
    return {
      companion,
      stats: {
        ...state.stats,
        maxHp: 20 + bonusHp,
        hp: Math.min(state.stats.hp + bonusHp, 20 + bonusHp),
      }
    };
  }),

  updateStats: (updates) => set((state) => ({
    stats: { ...state.stats, ...updates }
  })),

  takeSanityDamage: (amount) => set((state) => {
    const newSanity = Math.max(0, state.stats.sanity - amount);
    return {
      stats: {
        ...state.stats,
        sanity: newSanity
      }
    };
  }),

  usePayphoneToken: () => {
    const { payphoneTokens } = get();
    if (payphoneTokens > 0) {
      set({ payphoneTokens: payphoneTokens - 1 });
      return true;
    }
    return false;
  },

  setSaveSummary: (summary) => set({ saveSummary: summary }),

  goToNode: (nodeId) => set({ 
    currentNodeId: nodeId,
    isInDialogueMode: false,
    activeNpcDialogueId: null
  }),

  activateExtraLife: () => set((state) => {
    if (state.activeCharacter === 'Cacula') return state;
    
    return {
      activeCharacter: 'Cacula',
      currentNodeId: 'cap1_delegacia', // Fictional fallback for now
      stats: {
        ...initialStats,
        intelligence: 3,
        agility: 5,
        strength: 5,
        charisma: 3,
      },
      companion: null,
      inventory: ['Revólver .38 raspado (6 balas)', 'Anotações do Orelhão'],
      // Keep saveSummary and npcMemories (so the brother might discover what was said if he finds a journal, or simply keep it for technical reasons)
    };
  }),

  // Dialogue Methods
  enterDialogue: (npcId) => set((state) => {
    const memories = { ...state.npcMemories };
    if (!memories[npcId]) {
      memories[npcId] = {
        npcId,
        summarizedContext: '',
        recentMessages: []
      };
    }
    return {
      isInDialogueMode: true,
      activeNpcDialogueId: npcId,
      npcMemories: memories
    };
  }),

  exitDialogue: () => set({
    isInDialogueMode: false,
    activeNpcDialogueId: null
  }),

  addDialogueMessage: (npcId, message) => set((state) => {
    const memory = state.npcMemories[npcId] || { npcId, summarizedContext: '', recentMessages: [] };
    const updatedMessages = [...memory.recentMessages, message];
    
    return {
      npcMemories: {
        ...state.npcMemories,
        [npcId]: {
          ...memory,
          recentMessages: updatedMessages
        }
      }
    };
  }),

  updateNpcMemory: (npcId, summarizedContext) => set((state) => {
    const memory = state.npcMemories[npcId];
    if (!memory) return state;

    return {
      npcMemories: {
        ...state.npcMemories,
        [npcId]: {
          ...memory,
          summarizedContext,
          // We can optionally slice recentMessages here if we only want to keep the latest 5 pairs
          recentMessages: memory.recentMessages.slice(-10) // keep last 10 messages (5 pairs)
        }
      }
    };
  }),

  setHasSeenIntroCutscene: (hasSeen) => set({ hasSeenIntroCutscene: hasSeen }),
}));
