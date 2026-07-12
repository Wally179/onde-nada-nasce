export type Companion = 'Mecanica' | 'Muro' | null;

export type PlayerStats = {
  hp: number;
  maxHp: number;
  sanity: number; // 0 to 100
  stamina: number; // 0 to 100
  strength: number; // 1 to 10
  agility: number; // 1 to 10
  intelligence: number; // 1 to 10
  charisma: number; // 1 to 10
};

export type NpcStats = {
  hp: number;
  maxHp: number;
  sanity: number;
  stamina: number;
  strength: number;
  agility: number;
  intelligence: number;
  charisma: number;
};

export type NpcProfile = {
  id: string;
  nomeReal: string;
  codinome: string;
  idade: number;
  aparencia: string;
  personalidade: string;
  passado: string;
  motivoCurso: string;
  relacaoProtagonista: string;
  porqueSeImporta: string;
  medos: string;
  oQueSabe: string;
  oQueNuncaFaria: string;
  estiloDeFala: string;
  atributos: NpcStats;
};

export type PlayerCharacter = 'Protagonista' | 'Cacula';

export type DialogueMessage = {
  role: 'user' | 'npc';
  content: string;
};

export type NpcMemory = {
  npcId: string;
  summarizedContext: string; // Resumo do que já foi conversado
  recentMessages: DialogueMessage[]; // Últimas mensagens (max 5 pares)
};

export type GameState = {
  activeCharacter: PlayerCharacter;
  stats: PlayerStats;
  companion: Companion;
  inventory: string[];
  payphoneTokens: number;
  saveSummary: string | null;
  currentNodeId: string;
  // Diálogo
  isInDialogueMode: boolean;
  activeNpcDialogueId: string | null;
  npcMemories: Record<string, NpcMemory>;
  // Cutscenes
  hasSeenIntroCutscene: boolean;
};

export type StoryOption = {
  id: string;
  text: string;
  nextId?: string; // Se não tiver nextId, mas tiver dialogueTarget, abre o chat
  dialogueTarget?: string; // ID do NPC para conversar (ex: 'muro')
  sanityCost?: number;
};

export type StoryNode = {
  id: string;
  location: string;
  baseDescription: string;
  orelhaoVisivel: boolean;
  options: StoryOption[];
  allowFourthOption: boolean;
  fourthOptionConstraints: string;
  npcsPresentes: string[]; // IDs dos NPCs presentes fisicamente nesta cena
};
