'use client';

import { useState, useEffect } from 'react';
import StatusHUD from '../components/hud/StatusHUD';
import NarrativePanel from '../components/narrative/NarrativePanel';
import ActionPanel from '../components/actions/ActionPanel';
import { useGameStore } from '../store/gameStore';
import storyData from '../data/storyData.json';
import { StoryNode } from '../types/game';

/**
 * GamePage — Main game page that orchestrates all UI sections.
 *
 * Single Responsibility: state management + composition of sub-panels.
 * The actual rendering logic is delegated to child components.
 */
export default function GamePage() {
  const { currentNodeId, goToNode, takeSanityDamage } = useGameStore();
  const [node, setNode] = useState<StoryNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [narrativeLog, setNarrativeLog] = useState<string[]>([]);

  useEffect(() => {
    const nextNode = (storyData.nodes as Record<string, StoryNode>)[currentNodeId];
    if (nextNode) {
      setNode(nextNode);
      setNarrativeLog([nextNode.baseDescription]);
    }
  }, [currentNodeId]);

  const handleOptionClick = (nextId: string) => {
    goToNode(nextId);
  };

  const handleFreeAction = (text: string) => {
    setLoading(true);
    // TODO: This will call the Gemini API in the backend to validate
    // For now, simulate a fake response:
    setTimeout(() => {
      setNarrativeLog(prev => [
        ...prev,
        `Você tentou: "${text}". Mas não parece funcionar como você esperava.`,
      ]);
      takeSanityDamage(5);
      setLoading(false);
    }, 1000);
  };

  if (!node) return <div className="p-8 text-white">Carregando...</div>;

  return (
    <div className="w-full h-full relative font-mono text-gray-300">
      
      {/* Top Left: HUDs */}
      <div className="absolute top-4 left-6 z-50">
        <StatusHUD />
      </div>

      {/* Main Content Area: Scene + Text */}
      {/* We leave space at the bottom for future inventory, and space on the right for the character */}
      <div className="absolute top-[20vh] left-6 bottom-[15vh] w-[65vw] max-w-[1100px] flex items-stretch z-10">
        
        {/* Left Panel: Scene Image */}
        <div className="hidden md:block w-[45%] border-[4px] border-[#2b3028] border-r-0 bg-[#0d0f0c] shadow-2xl relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[#2d372b]/20 flex flex-col items-center justify-center text-[#495845] font-bold text-xl uppercase tracking-widest text-center px-4">
            <span>[Cena do Local]</span>
            <span className="text-sm mt-2 opacity-50">(Adicione o bg aqui)</span>
          </div>
        </div>

        {/* Center Panel: Narrative and Actions */}
        <div className="flex-1 flex flex-col bg-[#161815]/95 border-[4px] border-[#2b3028] shadow-2xl relative backdrop-blur-sm min-w-[300px]">
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
      {/* Sprite is almost the height of the window, anchored to the bottom right */}
      <div className="absolute bottom-0 right-[5%] z-20 pointer-events-none h-[90vh]">
        <img 
          src="/assets/characters/mecanica/body.png" 
          alt="Protagonista" 
          className="h-full w-auto object-contain object-bottom"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

    </div>
  );
}
