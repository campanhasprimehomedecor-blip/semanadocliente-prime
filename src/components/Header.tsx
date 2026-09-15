import React from 'react';
import { CATALOG_CONFIG } from '../data/catalog';
import { FileDown, Printer, Sparkles } from 'lucide-react';

interface HeaderProps {
  onExportPdf: () => void;
  isGeneratingPdf: boolean;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onExportPdf,
  isGeneratingPdf,
  onPrint,
}) => {
  return (
    <header
      id="catalog-main-header"
      className="no-print sticky top-0 z-40 w-full bg-[#0a0908]/95 backdrop-blur-md border-b border-[#2b2720] shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="/"
            className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-90"
            title="Prime Home Decor"
          >
            <div className="p-1 sm:p-1.5 rounded-lg bg-black/40 border border-[#d4af37]/30">
              <img
                src={CATALOG_CONFIG.logoUrl}
                alt="Prime Home Decor"
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </div>
          </a>

          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4af37]" />
              <span className="text-[10px] sm:text-xs font-montserrat tracking-[0.15em] sm:tracking-[0.2em] text-[#d4af37] font-semibold uppercase">
                Semana do Cliente
              </span>
            </div>
            <p className="hidden sm:block text-[11px] font-cormorant italic text-[#a89d89]">
              Catálogo Digital Interativo Premium
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Browser Print / Native PDF */}
          <button
            id="header-print-btn"
            type="button"
            onClick={onPrint}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#181613] border border-[#3b3429] hover:border-[#a89d89] text-xs font-montserrat text-[#c4b9a7] hover:text-[#f5f1ea] transition-all cursor-pointer"
            title="Imprimir catálogo ou salvar via navegador"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir</span>
          </button>

          {/* Download PDF Button */}
          <button
            id="header-download-pdf-btn"
            type="button"
            onClick={onExportPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e7c4] to-[#cba32d] text-[#12100d] font-cinzel font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
            title="Baixar Catálogo Completo em PDF"
          >
            <FileDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{isGeneratingPdf ? 'Gerando...' : 'Baixar PDF'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
