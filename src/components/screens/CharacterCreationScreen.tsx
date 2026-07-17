import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';

interface CharacterCreationScreenProps {
  onComplete: () => void;
}

export default function CharacterCreationScreen({ onComplete }: CharacterCreationScreenProps) {
  const { setPlayerProfile, setHasCreatedCharacter } = useGameStore();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('Masculino');
  const [pronouns, setPronouns] = useState('Ele/Dele');
  
  const handleComplete = () => {
    setPlayerProfile({
      name: name.trim() || 'Desconhecido',
      gender,
      pronouns
    });
    setHasCreatedCharacter(true);
    onComplete();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d0f0c] text-[#4ade80] font-mono relative overflow-hidden p-4">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/assets/backgrounds/main-bg.svg')] bg-cover opacity-10 mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none crt-scanlines opacity-20" />

      <div className="relative z-10 w-full max-w-xl border-[4px] border-[#2b3028] bg-[#161815]/95 p-8 shadow-2xl backdrop-blur-md flex flex-col items-center">
        <h2 className="text-3xl text-white mb-8 uppercase tracking-widest border-b border-[#2b3028] pb-4 text-center w-full">
          Registro de Sujeito
        </h2>

        <div className="w-full space-y-6 mb-8">
          
          {/* Nome */}
          <div className="flex flex-col border border-[#2d372b] p-4 bg-[#0d0f0c]">
            <label className="uppercase tracking-widest text-gray-400 text-sm mb-2">
              Nome (Opcional)
            </label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Arthur, Maria..."
              className="bg-transparent border-b border-[#495845] text-white focus:outline-none focus:border-[#4ade80] py-2 transition-colors placeholder:text-[#495845]"
            />
          </div>

          {/* Gênero */}
          <div className="flex flex-col border border-[#2d372b] p-4 bg-[#0d0f0c]">
            <span className="uppercase tracking-widest text-gray-400 text-sm mb-4">Apresentação / Gênero</span>
            <div className="flex gap-4">
              {['Masculino', 'Feminino', 'Não Binario'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setGender(opt)}
                  className={`px-4 py-2 border ${gender === opt ? 'border-[#4ade80] bg-[#2d372b] text-[#4ade80]' : 'border-[#495845] text-gray-500 hover:text-gray-300'} uppercase text-sm transition-colors`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Pronomes */}
          <div className="flex flex-col border border-[#2d372b] p-4 bg-[#0d0f0c]">
            <span className="uppercase tracking-widest text-gray-400 text-sm mb-4">Pronomes de Tratamento</span>
            <div className="flex gap-4">
              {['Ele/Dele', 'Ela/Dela', 'Elu/Delu'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setPronouns(opt)}
                  className={`px-4 py-2 border ${pronouns === opt ? 'border-[#4ade80] bg-[#2d372b] text-[#4ade80]' : 'border-[#495845] text-gray-500 hover:text-gray-300'} uppercase text-sm transition-colors`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          
        </div>

        <button 
          onClick={handleComplete}
          className="w-full border-[2px] border-[#495845] bg-[#2d372b] hover:bg-[#495845] p-4 uppercase tracking-widest text-white transition-colors"
        >
          Confirmar e Iniciar
        </button>

      </div>
    </div>
  );
}
