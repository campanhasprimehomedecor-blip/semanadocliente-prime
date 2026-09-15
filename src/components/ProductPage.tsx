import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { CATALOG_CONFIG } from '../data/catalog';

interface ProductPageProps {
  pageNumber: number; // 1 to 14 (or total page index)
  totalPages: number; // 14 product pages + cover + back cover = 16 total pages
  products: Product[]; // 1 or 2 products
  onZoom?: (product: Product) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  pageNumber,
  totalPages,
  products,
  onZoom,
}) => {
  return (
    <div
      id={`catalog-page-${pageNumber}`}
      className="catalog-page relative w-full min-h-[620px] md:min-h-0 md:aspect-[1/1.414] max-w-[800px] mx-auto bg-[#0f0e0c] text-[#f5f1ea] rounded-xl border border-[#2b2720] shadow-2xl p-3 sm:p-5 md:p-7 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle outer gilded border */}
      <div className="absolute inset-1.5 sm:inset-3 border border-[#d4af37]/25 pointer-events-none rounded-lg" />

      {/* Page Header */}
      <div className="relative z-10 flex items-center justify-between pb-2.5 sm:pb-4 border-b border-[#2b2720]">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={CATALOG_CONFIG.logoUrl}
            alt="Prime Home Decor"
            className="h-6 sm:h-8 w-auto object-contain brightness-95"
          />
          <div className="hidden sm:block h-4 w-[1px] bg-[#d4af37]/40" />
          <span className="hidden sm:inline text-[11px] font-montserrat tracking-[0.2em] text-[#d4af37] uppercase font-semibold">
            Semana do Cliente
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs font-cinzel text-[#9c917f] tracking-widest">
            PÁGINA {pageNumber.toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Page Content: Max 2 Products */}
      <div className="relative z-10 flex-1 flex flex-col justify-around py-2.5 sm:py-4 gap-3 sm:gap-4">
        {products.map((product, idx) => (
          <ProductCard
            key={product.id}
            product={product}
            index={idx}
            onZoom={onZoom}
          />
        ))}

        {products.length === 1 && (
          <div className="h-full flex items-center justify-center border border-dashed border-[#2d2820] rounded-xl p-4 sm:p-6 text-center text-[#686052]">
            <p className="font-cormorant italic text-base sm:text-lg text-[#9e9485]">
              Prime Home Decor • Excelência em Mobiliário Clássico
            </p>
          </div>
        )}
      </div>

      {/* Page Footer */}
      <div className="relative z-10 pt-2 sm:pt-3 border-t border-[#2b2720] flex flex-col sm:flex-row items-center justify-between text-[9px] sm:text-[10px] text-[#736a5b] font-montserrat gap-1 sm:gap-0 text-center sm:text-left">
        <span>Prime Home Decor • Móveis e Decorações de Alto Padrão</span>
        <span className="text-[#a89d89]">Envie o print da peça ao seu vendedor</span>
      </div>
    </div>
  );
};
