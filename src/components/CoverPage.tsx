import React from 'react';
import { CATALOG_CONFIG } from '../data/catalog';
import { Sparkles, Camera, ChevronDown } from 'lucide-react';

interface CoverPageProps {
  onStartBrowse?: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({ onStartBrowse }) => {
  return (
    <div
      id="catalog-cover-page"
      className="catalog-page relative w-full aspect-[1/1.414] max-w-[800px] mx-auto bg-gradient-to-b from-[#0c0b0a] via-[#151310] to-[#0c0b0a] text-[#f5f1ea] rounded-xl border-2 border-[#d4af37]/40 shadow-2xl p-6 sm:p-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Ornate Gold Border Inner Frame */}
      <div className="absolute inset-3 sm:inset-5 border border-[#d4af37]/30 pointer-events-none rounded-lg" />
      <div className="absolute inset-5 sm:inset-7 border border-[#d4af37]/20 pointer-events-none rounded-lg" />

      {/* Decorative Classical Corner Ornaments */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-8 h-8 border-t-2 border-l-2 border-[#d4af37] pointer-events-none" />
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 border-t-2 border-r-2 border-[#d4af37] pointer-events-none" />
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-8 h-8 border-b-2 border-l-2 border-[#d4af37] pointer-events-none" />
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-8 h-8 border-b-2 border-r-2 border-[#d4af37] pointer-events-none" />

      {/* Subtle Classical Watermark Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Header with Official Brand Logo */}
      <div className="relative z-10 text-center pt-2 sm:pt-6">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="p-3 sm:p-4 rounded-xl bg-black/40 border border-[#d4af37]/30 backdrop-blur-sm shadow-xl inline-block max-w-[280px] sm:max-w-[340px]">
            <img
              id="cover-brand-logo"
              src={CATALOG_CONFIG.logoUrl}
              alt="Prime Home Decor"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <p className="text-[11px] sm:text-xs tracking-[0.3em] font-montserrat uppercase text-[#d4af37] font-semibold">
            Tabela de Oportunidades • Lista do Vendedor
          </p>
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>
      </div>

      {/* Main Title Centerpiece */}
      <div className="relative z-10 text-center my-auto py-6">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#e6ca7b] text-xs font-montserrat tracking-widest uppercase mb-4 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Condições Únicas • Peças Selecionadas</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wider leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#f3e7c4] via-[#d4af37] to-[#f8ecd2] drop-shadow-sm mb-4">
          SEMANA DO CLIENTE
        </h1>

        <div className="w-24 sm:w-32 h-[2px] mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-4 sm:mb-6" />

        <p className="font-cormorant italic text-lg sm:text-2xl text-[#f5f1ea]/90 max-w-lg mx-auto font-normal leading-relaxed">
          O requinte dos móveis e decorações clássicas com valores imperdíveis para transformar seu ambiente.
        </p>

        {/* Instructions banner for seller print */}
        <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#1b1915]/90 border border-[#d4af37]/40 text-[#f5f1ea] text-xs font-montserrat">
          <Camera className="w-4 h-4 text-[#d4af37]" />
          <span>Tire print das peças de seu interesse e envie diretamente ao seu vendedor</span>
        </div>

        <p className="mt-3 text-xs sm:text-sm font-montserrat tracking-widest text-[#a89d89] uppercase">
          Catálogo Oficial • 28 Peças de Destaque
        </p>
      </div>

      {/* Footer Area */}
      <div className="relative z-10 pt-4 sm:pt-6 border-t border-[#d4af37]/30 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left hidden sm:block">
            <p className="text-[10px] font-montserrat text-[#8c8273] uppercase tracking-wider">
              Atendimento Consultivo
            </p>
            <p className="text-xs font-cinzel text-[#d4af37] tracking-wide">
              Mobiliário Clássico Sob Medida
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1a1815] border border-[#d4af37]/40 text-[#f3e7c4] text-xs font-montserrat">
            <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Envie o print para negociação</span>
          </div>

          {onStartBrowse && (
            <button
              id="cover-open-catalog-btn"
              type="button"
              onClick={onStartBrowse}
              className="text-xs font-montserrat text-[#f5f1ea] hover:text-[#d4af37] transition-colors flex items-center gap-1 cursor-pointer no-print"
            >
              <span>Ver Catálogo</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>

        <p className="text-[10px] font-montserrat text-[#686052] mt-3 tracking-wider">
          PRIME HOME DECOR • Todos os direitos reservados
        </p>
      </div>
    </div>
  );
};
