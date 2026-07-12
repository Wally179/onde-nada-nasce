'use client';

import { useState, useEffect, useRef } from 'react';
import StatusHUD from '../hud/StatusHUD';
import NarrativePanel from '../narrative/NarrativePanel';
import ActionPanel from '../actions/ActionPanel';
import { useGameStore } from '../../store/gameStore';
import storyData from '../../data/storyData.json';
import Image from 'next/image';
import { StoryNode } from '../../types/game';
import { useAuthStore } from '../../store/authStore';

interface GameScreenProps {
  onMenuClick: () => void;
}

export default function GameScreen({ onMenuClick }: GameScreenProps) {
  const { currentNodeId, goToNode, takeSanityDamage } = useGameStore();
  const { saveGame } = useAuthStore();
  const [node, setNode] = useState<StoryNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [narrativeLog, setNarrativeLog] = useState<string[]>([]);
  
  // Track previous node to know when to save
  const prevNodeRef = useRef(currentNodeId);

  // Load current node data
  const nextNode = (storyData.nodes as Record<string, StoryNode>)[currentNodeId];
  if (nextNode && (!node || node.id !== nextNode.id)) {
    setNode(nextNode);
    setNarrativeLog([nextNode.baseDescription]);
  }

  // Auto-save when node changes
  useEffect(() => {
    if (prevNodeRef.current !== currentNodeId) {
      prevNodeRef.current = currentNodeId;
      const state = useGameStore.getState();
      saveGame(state);
    }
  }, [currentNodeId, saveGame]);

  const handleOptionClick = (nextId: string) => {
    goToNode(nextId);
  };

  const handleFreeAction = (text: string) => {
    setLoading(true);
    // TODO: Integração com Gemini API
    setTimeout(() => {
      setNarrativeLog(prev => [
        ...prev,
        `Você tentou: "${text}". Mas não parece funcionar como você esperava.`,
      ]);
      takeSanityDamage(5);
      setLoading(false);
    }, 1000);
  };

  if (!node) return <div className="p-8 text-white flex items-center justify-center h-full">Carregando dados da realidade...</div>;

  const locationSlug = node.location
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, '-');
  const locationImageSrc = `/assets/locations/${locationSlug}.png`;

  return (
    <div className="w-full h-full relative font-mono text-gray-300 left-30">
      
      {/* Top Controls */}
      <div className="absolute top-4 right-6 z-50 flex gap-4">
        <button 
          onClick={onMenuClick}
          className="bg-[#2d372b]/80 border-2 border-[#495845] px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#495845] hover:text-white transition-colors"
        >
          [ ESC ] Menu
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
          />
        </div>
      </div>

      {/* Bottom Right: Character Full Body Sprite */}
      <div className="absolute bottom-0 right-[5%] z-20 pointer-events-none h-[50vh] w-[30vh]">
        <Image 
          src="/assets/characters/mecanica/body.png" 
          alt="Protagonista" 
          fill
          sizes="30vh"
          className="object-contain object-bottom"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

    </div>
  );
}
