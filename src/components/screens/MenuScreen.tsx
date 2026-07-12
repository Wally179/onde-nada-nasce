'use client';

import { useAuthStore } from '../../store/authStore';

interface MenuScreenProps {
  onPlayClick: () => void;
  onOptionsClick: () => void;
}

export default function MenuScreen({ onPlayClick, onOptionsClick }: MenuScreenProps) {
  const { username, logout } = useAuthStore();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[url('/assets/backgrounds/main-bg.svg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 flex flex-col items-center gap-12">
        <h1 className="text-6xl md:text-8xl font-black text-[#e5e5e5] tracking-[0.2em] uppercase text-center drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">
          ONDE NADA
          <br />
          <span className="text-[#4ade80]">NASCE</span>
        </h1>

        <div className="text-gray-400 font-mono tracking-widest uppercase mb-4 text-sm bg-black/50 px-4 py-1 border border-gray-800">
          Usuário: {username}
        </div>

        <div className="flex flex-col gap-4 w-64">
          <button 
            onClick={onPlayClick}
            className="group relative border-[3px] border-[#2d372b] bg-[#0d0f0c]/80 p-4 text-xl text-gray-300 font-bold uppercase tracking-widest hover:border-[#4ade80] hover:text-[#4ade80] hover:bg-[#161815] transition-all overflow-hidden"
          >
            <span className="relative z-10">Jogar</span>
            <div className="absolute inset-0 bg-[#4ade80]/10 translate-y-full group-hover:translate-y-0 transition-transform" />
          </button>

          <button 
            onClick={onOptionsClick}
            className="group relative border-[3px] border-[#2d372b] bg-[#0d0f0c]/80 p-4 text-xl text-gray-300 font-bold uppercase tracking-widest hover:border-white hover:text-white hover:bg-[#161815] transition-all"
          >
            Opções
          </button>

          <button 
            onClick={logout}
            className="mt-8 text-gray-500 hover:text-[#f87171] uppercase tracking-widest text-sm transition-colors font-mono"
          >
            Desconectar
          </button>
        </div>
      </div>
    </div>
  );
}
