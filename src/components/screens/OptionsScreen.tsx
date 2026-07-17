'use client';

import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useGameStore } from '../../store/gameStore';

interface OptionsScreenProps {
  onBack: () => void;
  onReset?: () => void;
  isOverlay?: boolean;
}

export default function OptionsScreen({ onBack, onReset, isOverlay = false }: OptionsScreenProps) {
  const { customGeminiKey, setCustomGeminiKey, deleteGame } = useAuthStore();
  const { resetToInitialState } = useGameStore();
  
  const [localKey, setLocalKey] = useState(customGeminiKey || '');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveKey = () => {
    setCustomGeminiKey(localKey.trim() === '' ? null : localKey.trim());
    alert('Chave atualizada com sucesso.');
  };

  const handleReset = async () => {
    if (window.confirm("ATENÇÃO: TEM CERTEZA QUE DESEJA APAGAR TODO O PROGRESSO? Essa ação é irreversível.")) {
      setIsDeleting(true);
      const success = await deleteGame();
      if (success) {
        resetToInitialState();
        if (onReset) {
          onReset();
        } else {
          // Fallback force reload if no callback is provided
          window.location.reload();
        }
      } else {
        alert('Falha ao apagar o progresso. Tente novamente.');
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center font-mono text-gray-300 ${isOverlay ? 'bg-black/80 backdrop-blur-sm z-[100] fixed inset-0' : 'relative bg-[#0d0f0c]'}`}>
      {!isOverlay && (
        <div className="absolute inset-0 bg-[url('/assets/backgrounds/main-bg.svg')] bg-cover opacity-10 mix-blend-overlay" />
      )}
      
      <div 
        className="relative z-10 w-[600px] border-[4px] border-[#2b3028] p-8 shadow-2xl backdrop-blur-md"
        style={{ backgroundColor: 'rgba(22, 24, 21, 0.95)' }}
      >
        <h2 className="text-3xl text-white mb-8 uppercase tracking-widest border-b border-[#2b3028] pb-4 text-center">
          Configurações do Sistema
        </h2>

        <div className="space-y-6 mb-8">
          <div className="flex flex-col border border-[#2d372b] p-4 bg-[#0d0f0c] space-y-2">
            <span className="uppercase tracking-widest text-gray-400 text-sm">CHAVE GEMINI PERSONALIZADA (Opcional)</span>
            <div className="flex gap-2">
              <input 
                type="password" 
                value={localKey}
                onChange={(e) => setLocalKey(e.target.value)}
                placeholder="Cole sua Gemini API Key (AIzaSy...)"
                className="flex-grow bg-transparent border-b border-[#495845] text-white p-2 focus:outline-none focus:border-[#4ade80]"
              />
              <button 
                onClick={handleSaveKey}
                className="border border-[#495845] px-4 hover:bg-[#495845] uppercase text-sm text-[#4ade80]"
                style={{ backgroundColor: '#2d372b' }}
              >
                Salvar
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-1">Se vazio, o jogo utilizará a chave global do servidor.</p>
          </div>
          
          <div className="flex justify-between items-center border border-[#2d372b] p-4 bg-[#0d0f0c]">
            <span className="uppercase tracking-widest text-gray-400">Efeito CRT (Scanlines)</span>
            <span className="text-[#4ade80] uppercase tracking-widest text-sm">[ LIGADO ]</span>
          </div>

          <div className="flex flex-col border border-red-900/50 p-4 bg-[#1a0f0f] mt-8">
             <span className="uppercase tracking-widest text-red-500 mb-2">Zona de Perigo</span>
             <button 
                onClick={handleReset}
                disabled={isDeleting}
                className="w-full border-[2px] border-red-900 hover:bg-red-900 p-3 uppercase tracking-widest text-red-200 transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#450a0a' }}
              >
                {isDeleting ? 'Apagando dados...' : 'Apagar Progresso e Reiniciar'}
              </button>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="w-full border-[2px] border-[#495845] hover:bg-[#495845] p-4 uppercase tracking-widest text-white transition-colors"
          style={{ backgroundColor: '#2d372b' }}
        >
          {isOverlay ? 'Retornar ao Jogo' : 'Voltar ao Menu'}
        </button>
      </div>
    </div>
  );
}
