import React from 'react';
import { CATALOG_CONFIG } from '../data/catalog';
import { Camera, ShieldCheck, Truck, CreditCard } from 'lucide-react';

export const BackCoverPage: React.FC = () => {
  return (
    <div
      id="catalog-backcover-page"
      className="catalog-page relative w-full min-h-[640px] md:min-h-0 md:aspect-[1/1.414] max-w-[800px] mx-auto bg-gradient-to-b from-[#14120f] via-[#0c0b0a] to-[#12100d] text-[#f5f1ea] rounded-xl border-2 border-[#d4af37]/40 shadow-2xl p-4 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Decorative Ornate Frames */}
      <div className="absolute inset-2 sm:inset-5 border border-[#d4af37]/30 pointer-events-none rounded-lg" />
      <div className="absolute inset-3.5 sm:inset-7 border border-[#d4af37]/20 pointer-events-none rounded-lg" />

      {/* Classical Corner Accents */}
      <div className="absolute top-3 left-3 sm:top-6 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#d4af37] pointer-events-none" />
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#d4af37] pointer-events-none" />
      <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#d4af37] pointer-events-none" />
      <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#d4af37] pointer-events-none" />

      {/* Header with Brand Logo */}
      <div className="relative z-10 text-center pt-1 sm:pt-4">
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="p-2.5 sm:p-4 rounded-xl bg-black/50 border border-[#d4af37]/30 backdrop-blur-sm shadow-xl inline-block max-w-[220px] sm:max-w-[300px]">
            <img
              src={CATALOG_CONFIG.logoUrl}
              alt="Prime Home Decor"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        <p className="text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] font-montserrat uppercase text-[#d4af37] font-semibold">
          Semana do Cliente • Prime Home Decor
        </p>
      </div>

      {/* Core Editorial Message & Value Props */}
      <div className="relative z-10 text-center my-auto py-2 sm:py-4 space-y-3 sm:space-y-5">
        <div className="w-16 h-[2px] mx-auto bg-[#d4af37]" />

        <blockquote className="font-cormorant italic text-base sm:text-2xl md:text-3xl text-[#f5f1ea] max-w-xl mx-auto leading-relaxed font-normal px-2">
          “{CATALOG_CONFIG.footerText}”
        </blockquote>

        <div className="w-16 h-[2px] mx-auto bg-[#d4af37]" />

        {/* Value badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto pt-1 sm:pt-2">
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1815] border border-[#2d2820] text-center flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-0">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 sm:mx-auto text-[#d4af37] sm:mb-1.5 shrink-0" />
            <div className="text-left sm:text-center">
              <p className="text-[11px] font-montserrat font-medium text-[#f5f1ea]">Envio Seguro</p>
              <p className="text-[9px] sm:text-[10px] text-[#8c8273]">Transporte especializado</p>
            </div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1815] border border-[#2d2820] text-center flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-0">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 sm:mx-auto text-[#d4af37] sm:mb-1.5 shrink-0" />
            <div className="text-left sm:text-center">
              <p className="text-[11px] font-montserrat font-medium text-[#f5f1ea]">Qualidade Nobre</p>
              <p className="text-[9px] sm:text-[10px] text-[#8c8273]">Acabamentos originais</p>
            </div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1815] border border-[#2d2820] text-center flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-0">
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 sm:mx-auto text-[#d4af37] sm:mb-1.5 shrink-0" />
            <div className="text-left sm:text-center">
              <p className="text-[11px] font-montserrat font-medium text-[#f5f1ea]">Facilidade</p>
              <p className="text-[9px] sm:text-[10px] text-[#8c8273]">Condições personalizadas</p>
            </div>
          </div>
        </div>

        {/* Prominent CTA Callout: ENVIE O PRINT AO SEU VENDEDOR */}
        <div className="pt-1 sm:pt-2">
          <div
            id="backcover-seller-banner"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e7c4] to-[#cba32d] text-[#12100d] font-cinzel font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider shadow-2xl"
          >
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-[#12100d] shrink-0" />
            <span>ENVIE O PRINT AO SEU VENDEDOR</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#e5c76b] font-montserrat mt-1.5 sm:mt-2">
            Apresente a captura de tela dos itens escolhidos para garantir as condições da campanha
          </p>
        </div>

        {/* Required Disclaimer Information */}
        <div className="max-w-md mx-auto pt-1">
          <p className="text-[11px] sm:text-xs font-montserrat text-[#b3a896] leading-relaxed">
            {CATALOG_CONFIG.disclaimerText}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 pt-3 sm:pt-4 border-t border-[#d4af37]/30 text-center space-y-1 text-[#786e5e] font-montserrat text-[10px] sm:text-[11px]">
        <p className="text-[#d4af37] font-semibold">
          Tabela Interna & Exclusiva para Atendimento ao Cliente
        </p>
        <p>PRIME HOME DECOR • Mobiliário e Decoração Clássica de Alto Luxo</p>
        <p className="text-[9px] sm:text-[10px] text-[#5e5649]">
          Todos os direitos reservados • Imagens oficiais do acervo
        </p>
      </div>
    </div>
  );
};
