import React from 'react';
import { PdfExportProgress } from '../utils/pdfExport';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

interface PdfExportModalProps {
  isOpen: boolean;
  progress: PdfExportProgress | null;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  progress,
}) => {
  if (!isOpen) return null;

  const percent = progress
    ? Math.round((progress.currentPage / progress.totalPages) * 100)
    : 0;

  return (
    <div
      id="pdf-export-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative max-w-md w-full bg-[#14120f] border-2 border-[#d4af37]/50 rounded-2xl p-6 sm:p-8 shadow-2xl text-center text-[#f5f1ea]">
        {/* Corner accents */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#d4af37]" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#d4af37]" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#d4af37]" />

        <div className="w-12 h-12 mx-auto rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center mb-4">
          {percent >= 100 ? (
            <CheckCircle2 className="w-6 h-6 text-[#d4af37]" />
          ) : (
            <Loader2 className="w-6 h-6 text-[#d4af37] animate-spin" />
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#f5f1ea]">
            Gerando Catálogo PDF - Lista do Vendedor
          </h3>
        </div>

        <p className="text-xs text-[#a89d89] font-montserrat mb-6">
          {progress?.stage || 'Processando páginas e layout de alta resolução...'}
        </p>

        {/* Luxury Progress Bar */}
        <div className="w-full bg-[#0a0908] rounded-full h-3 p-0.5 border border-[#2e2920] mb-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#d4af37] via-[#f8ecd2] to-[#cba32d] h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(212,175,55,0.6)]"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs font-cinzel text-[#d4af37]">
          <span>Página {progress?.currentPage ?? 0} de {progress?.totalPages ?? 16}</span>
          <span className="font-bold">{percent}%</span>
        </div>

        <p className="text-[11px] text-[#786f60] font-montserrat mt-4">
          Arquivo pronto para impressão, visualização e envio de prints para os vendedores.
        </p>
      </div>
    </div>
  );
};
