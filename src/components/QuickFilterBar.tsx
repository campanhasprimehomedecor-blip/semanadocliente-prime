import React from 'react';
import { Search, LayoutGrid, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';

interface QuickFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  viewMode: 'flip' | 'continuous';
  onViewModeChange: (mode: 'flip' | 'continuous') => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const QuickFilterBar: React.FC<QuickFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const categories = [
    { id: 'all', label: `Todos (${PRODUCTS.length})` },
    { id: 'sofas', label: 'Jogos de Sofá' },
    { id: 'poltronas', label: 'Poltronas Clássicas' },
    { id: 'mesas-decor', label: 'Mesas & Decorações' },
  ];

  return (
    <div
      id="catalog-quick-filter-bar"
      className="no-print w-full max-w-[800px] mx-auto bg-[#14120f]/90 backdrop-blur-md border border-[#2b2720] rounded-xl p-3 sm:p-4 mb-6 shadow-xl text-[#f5f1ea]"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4">
        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c8273]" />
          <input
            id="catalog-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar produto, cor, medida..."
            className="w-full bg-[#0c0b0a] border border-[#2d2820] focus:border-[#d4af37] text-xs text-[#f5f1ea] pl-9 pr-3 py-2.5 sm:py-2 rounded-lg outline-none transition-colors placeholder-[#6b6254]"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none touch-pan-x">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-2 sm:py-1.5 rounded-lg text-xs font-montserrat whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-[#d4af37] text-[#12100d] font-semibold shadow-sm'
                  : 'bg-[#1b1915] text-[#a89d89] hover:text-[#f5f1ea] hover:bg-[#25221c]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* View Mode & Page Pagination (if in flip mode) */}
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-2 md:pt-0 border-[#2d2820]">
          {viewMode === 'flip' && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                className="p-2 sm:p-1.5 rounded-lg bg-[#1c1915] border border-[#2e2820] disabled:opacity-30 hover:bg-[#2d2820] text-[#d4af37] cursor-pointer active:scale-95"
                title="Página anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-cinzel text-[#e5c76b] px-2 whitespace-nowrap">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages}
                className="p-2 sm:p-1.5 rounded-lg bg-[#1c1915] border border-[#2e2820] disabled:opacity-30 hover:bg-[#2d2820] text-[#d4af37] cursor-pointer active:scale-95"
                title="Próxima página"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* View Mode Switcher */}
          <div className="flex items-center bg-[#0c0b0a] p-1 rounded-lg border border-[#2b2720]">
            <button
              type="button"
              onClick={() => onViewModeChange('flip')}
              className={`flex items-center gap-1 px-2.5 py-1.5 sm:py-1 rounded text-xs transition-colors cursor-pointer ${
                viewMode === 'flip'
                  ? 'bg-[#d4af37]/20 text-[#d4af37] font-semibold'
                  : 'text-[#8c8273] hover:text-[#f5f1ea]'
              }`}
              title="Modo Revista (Página por página)"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">Página</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('continuous')}
              className={`flex items-center gap-1 px-2.5 py-1.5 sm:py-1 rounded text-xs transition-colors cursor-pointer ${
                viewMode === 'continuous'
                  ? 'bg-[#d4af37]/20 text-[#d4af37] font-semibold'
                  : 'text-[#8c8273] hover:text-[#f5f1ea]'
              }`}
              title="Modo Contínuo (Todas as páginas)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">Todas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
