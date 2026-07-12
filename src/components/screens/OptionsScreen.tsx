'use client';

interface OptionsScreenProps {
  onBack: () => void;
}

export default function OptionsScreen({ onBack }: OptionsScreenProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#0d0f0c] font-mono text-gray-300">
      <div className="absolute inset-0 bg-[url('/assets/backgrounds/main-bg.svg')] bg-cover opacity-10 mix-blend-overlay" />
      
      <div className="relative z-10 w-[600px] border-[4px] border-[#2b3028] bg-[#161815]/95 p-8 shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl text-white mb-8 uppercase tracking-widest border-b border-[#2b3028] pb-4 text-center">
          Configurações do Sistema
        </h2>

        <div className="space-y-8 mb-12">
          {/* Placeholder for future options */}
          <div className="flex justify-between items-center border border-[#2d372b] p-4 bg-[#0d0f0c]">
            <span className="uppercase tracking-widest text-gray-400">Efeito CRT (Scanlines)</span>
            <span className="text-[#4ade80] uppercase tracking-widest text-sm">[ LIGADO ]</span>
          </div>
          
          <div className="flex justify-between items-center border border-[#2d372b] p-4 bg-[#0d0f0c]">
            <span className="uppercase tracking-widest text-gray-400">Volume Principal</span>
            <div className="flex gap-1">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`w-3 h-6 ${i < 7 ? 'bg-[#4ade80]' : 'bg-[#2d372b]'}`} />
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="w-full border-[2px] border-[#495845] bg-[#2d372b] hover:bg-[#495845] p-4 uppercase tracking-widest text-white transition-colors"
        >
          Voltar ao Menu
        </button>
      </div>
    </div>
  );
}
