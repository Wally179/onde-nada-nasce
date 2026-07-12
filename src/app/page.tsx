'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';
import LoginScreen from '../components/screens/LoginScreen';
import MenuScreen from '../components/screens/MenuScreen';
import OptionsScreen from '../components/screens/OptionsScreen';
import GameScreen from '../components/screens/GameScreen';
import CutscenePlayer from '../components/cutscene/CutscenePlayer';
import { introCutscene } from '../data/cutscenes/intro';

type ScreenType = 'login' | 'menu' | 'options' | 'game' | 'cutscene';

export default function AppOrchestrator() {
  const { isAuthenticated, loadGame, isLoading } = useAuthStore();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [isInitializing, setIsInitializing] = useState(true);

  // Sync route with authentication status
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsInitializing(false);
  }, []);

  let displayedScreen = currentScreen;
  if (!isInitializing) {
    if (isAuthenticated && currentScreen === 'login') {
      displayedScreen = 'menu';
    } else if (!isAuthenticated && currentScreen !== 'login') {
      displayedScreen = 'login';
    }
  }

  const handleLoginSuccess = () => {
    setCurrentScreen('menu');
  };

  const handlePlayClick = async () => {
    // Tenta carregar o save do backend antes de iniciar
    const savedState = await loadGame();
    if (savedState) {
      useGameStore.setState(savedState);
      
      if (!savedState.hasSeenIntroCutscene) {
        setCurrentScreen('cutscene');
      } else {
        setCurrentScreen('game');
      }
    } else {
      // Novo jogo, nunca viu a cutscene
      setCurrentScreen('cutscene');
    }
  };

  const handleCutsceneComplete = () => {
    useGameStore.getState().setHasSeenIntroCutscene(true);
    setCurrentScreen('game');
  };

  if (isInitializing) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0d0f0c] text-[#4ade80] font-mono crt-flicker">
        Inicializando Sistema...
      </div>
    );
  }

  // Se está carregando dados (ex: fazendo login)
  if (isLoading && currentScreen !== 'login') {
     return (
      <div className="w-full h-full flex items-center justify-center bg-[#0d0f0c] text-[#4ade80] font-mono crt-flicker">
        Sincronizando com o terminal central...
      </div>
    );
  }

  // Render the current screen
  switch (displayedScreen) {
    case 'login':
      return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    case 'menu':
      return (
        <MenuScreen 
          onPlayClick={handlePlayClick} 
          onOptionsClick={() => setCurrentScreen('options')} 
        />
      );
    case 'options':
      return <OptionsScreen onBack={() => setCurrentScreen('menu')} />;
    case 'game':
      return <GameScreen onMenuClick={() => setCurrentScreen('menu')} />;
    case 'cutscene':
      return <CutscenePlayer data={introCutscene} onComplete={handleCutsceneComplete} />;
    default:
      return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }
}
