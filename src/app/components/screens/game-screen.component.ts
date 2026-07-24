import { Component, inject, computed, signal, OnInit, effect, untracked, output } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { StatusHUDComponent } from '../hud/status-hud.component';
import { NarrativePanelComponent } from '../narrative/narrative-panel.component';
import { ActionPanelComponent } from '../actions/action-panel.component';
import { AIThinkingOverlayComponent } from '../actions/ai-thinking-overlay.component';
import { SettingsDialogComponent } from './settings-dialog.component';
import storyDataRaw from '../../data/storyData.json';
import { StoryNode, StoryOption, DialogueMessage } from '../../types/game';
import { npcProfiles } from '../../data/npcProfiles';

const storyData = storyDataRaw.nodes as Record<string, StoryNode>;

@Component({
  selector: 'app-game-screen',
  standalone: true,
  imports: [
    StatusHUDComponent,
    NarrativePanelComponent,
    ActionPanelComponent,
    AIThinkingOverlayComponent,
    SettingsDialogComponent
  ],
  template: `
    <div class="w-full h-full relative font-mono text-gray-300">
      
      <!-- AI Thinking Overlay — blocks all interaction -->
      @if (isProcessingFreeAction()) {
        <app-ai-thinking-overlay />
      }

      <!-- Top Controls -->
      <div class="absolute top-4 right-6 z-50 flex gap-4">
        <button 
          (click)="isSettingsOpen.set(true)"
          class="bg-[#2d372b]/80 border-2 border-[#495845] w-9 h-9 flex items-center justify-center text-gray-300 hover:bg-[#495845] hover:text-white transition-colors"
          title="Configurações"
        >
          ⚙
        </button>
        <button 
          (click)="saveGame()"
          [disabled]="auth.isLoading() || isProcessingFreeAction()"
          class="bg-[#2d372b]/80 border-2 border-[#495845] px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#495845] hover:text-white transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          [ SALVAR ] Orelhão ({{ game.payphoneTokens() }})
        </button>
      </div>

      <!-- Top Left: HUDs -->
      <div class="absolute top-4 left-6 z-50 pointer-events-none">
        <app-status-hud />
      </div>

      <!-- Main Content Area: Scene + Text -->
      <div class="absolute top-[15vh] left-6 bottom-[15vh] w-[75vw] max-w-[1400px] flex items-stretch z-10">
        
        <!-- Left Panel: Scene Image -->
        <div class="hidden md:block w-[45%] border-[4px] border-[#2b3028] border-r-0 bg-[#0d0f0c] shadow-2xl relative overflow-hidden shrink-0">
          <div class="absolute inset-0 bg-[#2d372b]/20 flex flex-col items-center justify-center text-[#495845] font-bold text-xl uppercase tracking-widest text-center px-4">
            <span>[Cena do Local]</span>
            <span class="text-sm mt-2 opacity-50">{{ currentNode()?.location || 'Desconhecido' }}</span>
          </div>

          <img 
            [src]="locationImageSrc()" 
            [alt]="currentNode()?.location" 
            class="absolute inset-0 w-full h-full object-cover z-10"
            style="image-rendering: pixelated;"
            (error)="handleImageError($event)"
          />
        </div>

        <!-- Center Panel: Narrative and Actions -->
        <div class="flex-1 flex flex-col bg-[#161815]/95 border-[4px] border-[#2b3028] shadow-2xl relative backdrop-blur-sm min-w-[500px]">
          <app-narrative-panel
            [location]="currentNode()?.location || 'Desconhecido'"
            [narrativeLog]="narrativeLog()"
          />

          <app-action-panel
            [options]="currentOptions()"
            [allowFourthOption]="currentNode()?.allowFourthOption || false"
            [loading]="isProcessingFreeAction()"
            [freeActionAttemptsRemaining]="freeActionAttemptsRemaining()"
            [freeActionMaxAttempts]="3"
            (optionClick)="handleOptionClick($event)"
            (freeAction)="handleFreeAction($event)"
          />
        </div>
      </div>

      <!-- Bottom Right: Character Full Body Sprites -->
      <div class="absolute bottom-0 right-[5%] z-20 pointer-events-none h-[50vh] flex gap-4 items-end">
        @if (currentNode()?.npcsPresentes?.includes('mecanica')) {
          <div class="relative h-full w-[30vh]">
            <img 
              src="/assets/characters/mecanica/body.png" 
              alt="Mecânica" 
              class="absolute bottom-0 w-full h-full object-contain object-bottom drop-shadow-2xl opacity-90"
              style="image-rendering: pixelated;"
            />
          </div>
        }
        @if (currentNode()?.npcsPresentes?.includes('muro') || currentNode()?.npcsPresentes?.includes('ed_fisica')) {
          <div class="relative h-full w-[30vh]">
            <img 
              src="/assets/characters/muro/body.png" 
              alt="Muro" 
              class="absolute bottom-0 w-full h-full object-contain object-bottom drop-shadow-2xl opacity-90"
              style="image-rendering: pixelated;"
            />
          </div>
        }
      </div>

      <!-- Settings Modal -->
      @if (isSettingsOpen()) {
        <app-settings-dialog
          (close)="isSettingsOpen.set(false)"
          (onReset)="handleGameReset()"
        />
      }

    </div>
  `
})
export class GameScreenComponent implements OnInit {
  readonly game = inject(GameService);
  readonly auth = inject(AuthService);

  readonly narrativeLog = signal<string[]>([]);
  readonly isProcessingFreeAction = signal(false);
  readonly freeActionAttemptsRemaining = signal(3);
  readonly isSettingsOpen = signal(false);

  readonly returnToMenu = output<void>();

  readonly currentNode = computed<StoryNode | null>(() => {
    const id = this.game.currentNodeId();
    return storyData[id] || null;
  });

  readonly currentOptions = computed(() => {
    if (this.game.isInDialogueMode() && this.game.activeNpcDialogueId()) {
      return [{ id: 'Sair', text: 'Encerrar conversa', nextId: this.game.currentNodeId() }];
    }
    const node = this.currentNode();
    return node ? node.options : [];
  });

  readonly locationImageSrc = computed(() => {
    const node = this.currentNode();
    if (!node) return '';
    if (node.image) return '/assets/locations/' + node.image;
    
    // Fallback based on slug
    const locationSlug = node.location
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, '-');
    return '/assets/locations/' + locationSlug + '.png';
  });

  constructor() {
    effect(() => {
      const node = this.currentNode();
      const inDialogue = this.game.isInDialogueMode();
      
      untracked(() => {
        if (node && !inDialogue) {
          this.freeActionAttemptsRemaining.set(3);
          
          const log = this.narrativeLog();
          const desc = node.baseDescription;
          if (log.length === 0 || log[log.length - 1] !== desc) {
              this.narrativeLog.update(l => [...l, desc]);
          }
        }
      });
    }, { allowSignalWrites: true });
  }

  ngOnInit() {}

  handleGameReset() {
    this.isSettingsOpen.set(false);
    this.returnToMenu.emit();
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  async saveGame() {
    if (!this.game.usePayphoneToken()) {
      this.narrativeLog.update(l => [...l, '[- Você não tem fichas para ligar do orelhão.]']);
      return;
    }

    const currentLoc = this.currentNode()?.location || 'Desconhecido';
    const char = this.game.activeCharacter();
    const sum = '[' + new Date().toLocaleTimeString() + '] ' + char + ' em ' + currentLoc;
    
    this.game.setSaveSummary(sum);
    
    const success = await this.auth.saveGame(this.game.getState());
    if (success) {
      this.narrativeLog.update(l => [...l, '[+ Progresso salvo com sucesso no servidor.]']);
    } else {
      this.narrativeLog.update(l => [...l, '[- Falha na conexão do orelhão (Erro ao salvar).]']);
      this.game.payphoneTokens.update(t => t + 1);
    }
  }

  handleOptionClick(nextId: string) {
    const node = this.currentNode();
    if (node) {
      const clickedOption = node.options.find(o => o.nextId === nextId || o.id === nextId);
      if (clickedOption && !clickedOption.nextId && clickedOption.dialogueTarget) {
        this.game.enterDialogue(clickedOption.dialogueTarget);
        const profile = npcProfiles[clickedOption.dialogueTarget];
        this.narrativeLog.update(l => [...l, '[ Você se aproxima de ' + (profile?.codinome || clickedOption.dialogueTarget) + ' ]']);
        return;
      }
      
      if (this.game.isInDialogueMode() && nextId === node.id) {
        this.game.exitDialogue();
        this.narrativeLog.update(l => [...l, '[ Conversa encerrada. ]']);
        return;
      }
    }

    if (nextId === 'death') {
       this.game.updateStats({ hp: 0 }); 
       return;
    }
    
    this.game.goToNode(nextId);
  }

  async handleFreeAction(action: string) {
    if (this.game.isInDialogueMode()) {
      await this.handleDialogueChat(action);
      return;
    }

    if (this.freeActionAttemptsRemaining() <= 0) return;
    this.freeActionAttemptsRemaining.update(v => v - 1);
    this.narrativeLog.update(l => [...l, '> ' + action]);
    this.isProcessingFreeAction.set(true);

    try {
      const token = this.auth.token();
      const apiKey = this.auth.customGeminiKey();
      
      const reqBody: any = {
        action,
        nodeContext: this.currentNode(),
        playerStats: this.game.stats(),
        inventory: this.game.inventory(),
        playerProfile: this.game.playerProfile()
      };
      
      if (apiKey) reqBody.customKey = apiKey;
      
      const apiUrl = (this.auth as any).apiUrl;
      
      const res = await fetch(apiUrl + '/free-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': 'Bearer ' + token } : {})
        },
        body: JSON.stringify(reqBody)
      });
      
      if (!res.ok) throw new Error('Falha na resposta do servidor');
      const data = await res.json();
      
      const logsToAdd: string[] = [data.narrative || 'Nada acontece.'];
      
      if (data.sanityCost > 0) {
        this.game.takeSanityDamage(data.sanityCost);
        logsToAdd.push('[- ' + data.sanityCost + ' de Sanidade]');
      }
      if (data.staminaCost > 0) {
        this.game.drainStamina(data.staminaCost);
        logsToAdd.push('[- ' + data.staminaCost + ' de Fôlego]');
      }
      if (data.hpDamage > 0) {
        this.game.updateStats({ hp: Math.max(0, this.game.stats().hp - data.hpDamage) });
        logsToAdd.push('[- ' + data.hpDamage + ' de Vida]');
      }
      if (data.itemFound) {
        this.game.addToInventory(data.itemFound);
        logsToAdd.push('[+ Item obtido: ' + data.itemFound + ']');
      }
      if (data.itemLost) {
        this.game.removeFromInventory(data.itemLost);
        logsToAdd.push('[- Item perdido: ' + data.itemLost + ']');
      }
      if (data.hiddenPathFound && data.approved) {
        this.game.goToNode(data.hiddenPathFound);
      }

      this.narrativeLog.update(l => [...l, ...logsToAdd]);
    } catch (e) {
      this.narrativeLog.update(l => [...l, '[- O universo não respondeu à sua ação. (Erro de API)]']);
    } finally {
      this.isProcessingFreeAction.set(false);
    }
  }

  async handleDialogueChat(message: string) {
    const npcId = this.game.activeNpcDialogueId();
    if (!npcId) return;

    this.narrativeLog.update(l => [...l, '> ' + message]);
    this.isProcessingFreeAction.set(true);
    
    this.game.addDialogueMessage(npcId, { role: 'user', content: message });
    
    try {
      const token = this.auth.token();
      const apiKey = this.auth.customGeminiKey();
      const memory = this.game.npcMemories()[npcId];
      
      const reqBody: any = {
        npcId,
        message,
        gameContext: {
          currentNode: this.currentNode()?.location,
          playerStats: this.game.stats()
        },
        memoryContext: memory ? {
           summarizedContext: memory.summarizedContext,
           recentMessages: memory.recentMessages
        } : null
      };
      
      if (apiKey) reqBody.customApiKey = apiKey;
      
      const apiUrl = (this.auth as any).apiUrl;
      
      const res = await fetch(apiUrl + '/dialogue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': 'Bearer ' + token } : {})
        },
        body: JSON.stringify(reqBody)
      });
      
      if (!res.ok) throw new Error('Falha no servidor');
      const data = await res.json();
      
      const npcName = npcProfiles[npcId]?.codinome || npcId;
      this.narrativeLog.update(l => [...l, npcName + ': ' + data.reply]);
      this.game.addDialogueMessage(npcId, { role: 'npc', content: data.reply });
      
      if (data.newSummarizedContext) {
        this.game.updateNpcMemory(npcId, data.newSummarizedContext);
      }
    } catch (e) {
       this.narrativeLog.update(l => [...l, '[- O NPC te ignora confusamente. (Erro de API)]']);
    } finally {
      this.isProcessingFreeAction.set(false);
    }
  }
}
