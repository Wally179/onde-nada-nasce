'use client';

import { useState, useEffect, useRef } from 'react';
import StatusHUD from '../hud/StatusHUD';
import NarrativePanel from '../narrative/NarrativePanel';
import ActionPanel from '../actions/ActionPanel';
import AIThinkingOverlay from '../actions/AIThinkingOverlay';
import { useGameStore } from '../../store/gameStore';
import storyData from '../../data/storyData.json';
import Image from 'next/image';
import { StoryNode } from '../../types/game';
import { useAuthStore } from '../../store/authStore';
import OptionsScreen from './OptionsScreen';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const MAX_FREE_ACTION_ATTEMPTS = 3;

interface GameScreenProps {
  onMenuClick: () => void;
}

export default function GameScreen({ onMenuClick }: GameScreenProps) {
  const { currentNodeId, goToNode, takeSanityDamage, drainStamina, addToInventory, removeFromInventory, stats, inventory, companion, playerProfile } = useGameStore();
  const { saveGame, customGeminiKey } = useAuthStore();
  const [node, setNode] = useState<StoryNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [narrativeLog, setNarrativeLog] = useState<string[]>([]);
  const [freeActionAttempts, setFreeActionAttempts] = useState(0);
  const [isAIThinking, setIsAIThinking] = useState(false);
  
  // Track previous node to know when to save and reset attempts
  const prevNodeRef = useRef(currentNodeId);
  const benchmarkDoneRef = useRef(false);

  // Run model benchmark once on mount
  useEffect(() => {
    if (benchmarkDoneRef.current) return;
    benchmarkDoneRef.current = true;
    
    fetch(`${API_URL}/free-action/benchmark`)
      .then(res => res.json())
      .then(data => {
        console.log('[benchmark] Models sorted:', data.sortedOrder?.join(' → '));
      })
      .catch(err => {
        console.warn('[benchmark] Failed (will use default order):', err.message);
      });
  }, []);

  // Load current node data
  const nextNode = (storyData.nodes as Record<string, StoryNode>)[currentNodeId];
  if (nextNode && (!node || node.id !== nextNode.id)) {
    setNode(nextNode);
    setNarrativeLog([nextNode.baseDescription]);
  }

  // Auto-save when node changes + reset free action attempts
  useEffect(() => {
    if (prevNodeRef.current !== currentNodeId) {
      prevNodeRef.current = currentNodeId;
      setFreeActionAttempts(0); // Reset attempts on node change
      const state = useGameStore.getState();
      saveGame(state);
    }
  }, [currentNodeId, saveGame]);

  const handleOptionClick = (nextId: string) => {
    if (isAIThinking) return; // Block during AI processing
    goToNode(nextId);
  };

  const handleFreeAction = async (text: string) => {
    if (freeActionAttempts >= MAX_FREE_ACTION_ATTEMPTS || isAIThinking) return;

    setLoading(true);
    setIsAIThinking(true);
    setFreeActionAttempts(prev => prev + 1);

    try {
      const response = await fetch(`${API_URL}/free-action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: text,
          nodeContext: node,
          playerStats: stats,
          inventory,
          companion,
          customKey: customGeminiKey,
          playerProfile,
        }),
      });

      const result = await response.json();

      // Add action attempt to narrative
      setNarrativeLog(prev => [
        ...prev,
        `> ${text}`,
        result.narrative,
      ]);

      // Apply stat effects
      if (result.sanityCost > 0) {
        takeSanityDamage(result.sanityCost);
        setNarrativeLog(prev => [
          ...prev,
          `[-${result.sanityCost} Sanidade]`,
        ]);
      }
      if (result.staminaCost > 0) {
        drainStamina(result.staminaCost);
        setNarrativeLog(prev => [
          ...prev,
          `[-${result.staminaCost} Stamina]`,
        ]);
      }

      // Handle inventory changes
      if (result.itemFound) {
        addToInventory(result.itemFound);
        setNarrativeLog(prev => [
          ...prev,
          `[Item obtido: ${result.itemFound}]`,
        ]);
      }
      if (result.itemLost) {
        removeFromInventory(result.itemLost);
        setNarrativeLog(prev => [
          ...prev,
          `[Item perdido: ${result.itemLost}]`,
        ]);
      }

      // Handle hidden path discovery
      if (result.hiddenPathFound) {
        const hiddenNodeExists = (storyData.nodes as Record<string, StoryNode>)[result.hiddenPathFound];
        if (hiddenNodeExists) {
          setTimeout(() => {
            goToNode(result.hiddenPathFound);
          }, 3000);
          setNarrativeLog(prev => [
            ...prev,
            '[Um novo caminho se revela...]',
          ]);
        }
      }
    } catch (err) {
      console.error('Free action error:', err);
      setNarrativeLog(prev => [
        ...prev,
        `> ${text}`,
        'Um silêncio opressivo responde à sua tentativa. Algo no ar parece resistir. Tente outra coisa.',
      ]);
      takeSanityDamage(2);
    } finally {
      setLoading(false);
      setIsAIThinking(false);
    }
  };

  if (!node) return <div className="p-8 text-white flex items-center justify-center h-full">Carregando dados da realidade...</div>;

  const locationSlug = node.location
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, '-');
  const locationImageSrc = node.image ? `/assets/locations/${node.image}` : `/assets/locations/${locationSlug}.png`;

  return (
    <div className="w-full h-full relative font-mono text-gray-300 left-30">
      
      {/* AI Thinking Overlay — blocks all interaction */}
      {isAIThinking && <AIThinkingOverlay />}
      
      {/* Options Overlay */}
      {showOptionsModal && (
        <OptionsScreen 
          isOverlay 
          onBack={() => setShowOptionsModal(false)} 
        />
      )}

      {/* Top Controls */}
      <div className="absolute top-4 right-6 z-50 flex gap-4">
        <button 
          onClick={() => setShowOptionsModal(true)}
          disabled={isAIThinking}
          className="bg-[#2d372b]/80 border-2 border-[#495845] px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#495845] hover:text-white transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          [ CFG ] Opções
        </button>
        <button 
          onClick={onMenuClick}
          disabled={isAIThinking}
          className="bg-[#2d372b]/80 border-2 border-[#495845] px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#495845] hover:text-white transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          [ ESC ] Sair
        </button>
      </div>

      {/* Top Left: HUDs */}
      <div className="absolute top-4 left-6 z-50">
        <StatusHUD />
      </div>

      {/* Main Content Area: Scene + Text */}
      <div className="absolute top-[15vh] left-6 bottom-[15vh] w-[75vw] max-w-[1400px] flex items-stretch z-10">
        
        {/* Left Panel: Scene Image */}
        <div className="hidden md:block w-[45%] border-[4px] border-[#2b3028] border-r-0 bg-[#0d0f0c] shadow-2xl relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[#2d372b]/20 flex flex-col items-center justify-center text-[#495845] font-bold text-xl uppercase tracking-widest text-center px-4">
            <span>[Cena do Local]</span>
            <span className="text-sm mt-2 opacity-50">{node.location}</span>
          </div>

          <Image 
            src={locationImageSrc} 
            alt={node.location} 
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover z-10"
            style={{ imageRendering: 'pixelated' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            onLoad={(e) => { e.currentTarget.style.display = 'block'; }}
          />
        </div>

        {/* Center Panel: Narrative and Actions */}
        <div className="flex-1 flex flex-col bg-[#161815]/95 border-[4px] border-[#2b3028] shadow-2xl relative backdrop-blur-sm min-w-[500px]">
          <NarrativePanel
            location={node.location}
            narrativeLog={narrativeLog}
          />

          <ActionPanel
            options={node.options}
            allowFourthOption={node.allowFourthOption}
            loading={loading}
            onOptionClick={handleOptionClick}
            onFreeAction={handleFreeAction}
            freeActionAttemptsRemaining={MAX_FREE_ACTION_ATTEMPTS - freeActionAttempts}
            freeActionMaxAttempts={MAX_FREE_ACTION_ATTEMPTS}
          />
        </div>
      </div>

      {/* Bottom Right: Character Full Body Sprites */}
      <div className="absolute bottom-0 right-[5%] z-20 pointer-events-none h-[50vh] flex gap-4 items-end">
        {node.npcsPresentes?.includes('mecanica') && (
          <div className="relative h-full w-[30vh]">
            <Image 
              src="/assets/characters/mecanica/body.png" 
              alt="Mecânica" 
              fill
              sizes="30vh"
              className="object-contain object-bottom drop-shadow-2xl opacity-90"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        )}
        {(node.npcsPresentes?.includes('muro') || node.npcsPresentes?.includes('ed_fisica')) && (
          <div className="relative h-full w-[30vh]">
            <Image 
              src="/assets/characters/muro/body.png" 
              alt="Muro" 
              fill
              sizes="30vh"
              className="object-contain object-bottom drop-shadow-2xl opacity-90"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        )}
      </div>

    </div>
  );
}
