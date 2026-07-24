import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { AuthService } from './services/auth.service';
import { LoginScreenComponent } from './components/screens/login-screen.component';
import { MenuScreenComponent } from './components/screens/menu-screen.component';
import { CharacterCreationScreenComponent } from './components/screens/character-creation-screen.component';
import { GameScreenComponent } from './components/screens/game-screen.component';
import { DeathScreenComponent } from './components/screens/death-screen.component';
import { CutsceneEngineComponent } from './components/cutscene/cutscene-engine.component';
import { introCutscene } from './data/cutscenes/intro';

type ScreenState = 'login' | 'menu' | 'options' | 'character-creation' | 'intro' | 'game' | 'death';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoginScreenComponent,
    MenuScreenComponent,
    CharacterCreationScreenComponent,
    GameScreenComponent,
    DeathScreenComponent,
    CutsceneEngineComponent
  ],
  template: `
    @if (isInitializing()) {
      <div class="w-full h-full flex items-center justify-center bg-[#0d0f0c] text-terminal-green font-mono crt-flicker">
        Inicializando Sistema...
      </div>
    } @else if (auth.isLoading() && currentScreen() !== 'login') {
      <div class="w-full h-full flex items-center justify-center bg-[#0d0f0c] text-terminal-green font-mono crt-flicker">
        Sincronizando com o terminal central...
      </div>
    } @else {
      @switch (currentScreen()) {
        @case ('login') {
          <app-login-screen class="block w-full h-full" (loginSuccess)="handleLoginSuccess()" />
        }
        @case ('menu') {
          <app-menu-screen 
            class="block w-full h-full"
            (onPlayClick)="handlePlayClick()"
            (onOptionsClick)="handleOptionsClick()"
          />
        }
        @case ('character-creation') {
          <app-character-creation-screen class="block w-full h-full" (characterCreated)="handleCharacterCreationComplete()" />
        }
        @case ('intro') {
          <app-cutscene-engine
            class="block w-full h-full"
            [cutscene]="introCutscene"
            (cutsceneComplete)="handleCutsceneComplete()"
          />
        }
        @case ('game') {
          <app-game-screen class="block w-full h-full" (returnToMenu)="localScreen.set('menu')" />
        }
        @case ('death') {
          <app-death-screen class="block w-full h-full" (returnToMenu)="localScreen.set('menu')" />
        }
        @case ('options') {
           <!-- TODO: OptionsScreen not fully migrated yet, fallback to menu -->
          <div class="w-full h-full flex items-center justify-center bg-black text-white cursor-pointer" (click)="localScreen.set('menu')">
            [ OPÇÕES INDISPONÍVEIS NA MIGRAÇÃO ATUAL - CLIQUE PARA VOLTAR ]
          </div>
        }
      }
    }
  `,
})
export class AppComponent implements OnInit {
  readonly game = inject(GameService);
  readonly auth = inject(AuthService);
  readonly introCutscene = introCutscene;

  readonly isInitializing = signal(true);
  readonly localScreen = signal<ScreenState>('login');

  readonly currentScreen = computed<ScreenState>(() => {
    // Override por morte
    if (this.game.stats().hp <= 0 && this.game.currentNodeId() !== 'cap1_republica_start') {
      return 'death';
    }

    if (!this.auth.isAuthenticated() && this.localScreen() !== 'login') {
      return 'login';
    }
    if (this.auth.isAuthenticated() && this.localScreen() === 'login') {
      return 'menu';
    }
    
    return this.localScreen();
  });

  ngOnInit() {
    this.isInitializing.set(false);
  }

  handleLoginSuccess() {
    this.localScreen.set('menu');
  }

  async handlePlayClick() {
    const savedState = await this.auth.loadGame();
    if (savedState) {
      this.game.loadState(savedState);
      
      if (!this.game.hasCreatedCharacter()) {
        this.localScreen.set('character-creation');
      } else if (!this.game.hasSeenIntroCutscene()) {
        this.localScreen.set('intro');
      } else {
        this.localScreen.set('game');
      }
    } else {
      // Novo jogo
      this.game.resetToInitialState();
      this.localScreen.set('character-creation');
    }
  }

  handleOptionsClick() {
    this.localScreen.set('options');
  }

  handleCharacterCreationComplete() {
    if (!this.game.hasSeenIntroCutscene()) {
      this.localScreen.set('intro');
    } else {
      this.localScreen.set('game');
    }
  }

  handleCutsceneComplete() {
    this.game.setHasSeenIntroCutscene(true);
    this.localScreen.set('game');
  }
}
