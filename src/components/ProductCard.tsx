import React, { useState } from 'react';
import { Camera, ZoomIn, Check, Copy } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onZoom?: (product: Product) => void;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onZoom, index }) => {
  const [copied, setCopied] = useState(false);

  const handlePrintClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const productSummary = `Prime Home Decor - Semana do Cliente | Item #${product.id.toString().padStart(2, '0')}: ${product.name} (DE: ${product.originalPrice} | POR: ${product.promotionalPrice})`;
    
    // Copy summary to clipboard for quick pasting to seller
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(productSummary).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col sm:flex-row bg-[#151412] border border-[#38332a] hover:border-[#d4af37]/70 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,175,55,0.12)] p-4 sm:p-5 gap-4 sm:gap-6 items-center"
    >
      {/* Subtle corner ornament */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10px] right-[-10px] w-5 h-5 bg-[#d4af37]/20 rotate-45 border border-[#d4af37]/40" />
      </div>

      {/* Product Image Container */}
      <div className="relative w-full sm:w-[200px] md:w-[240px] shrink-0 aspect-[4/3] bg-[#0c0b0a] rounded-lg overflow-hidden border border-[#2b2720] flex items-center justify-center group-hover:border-[#d4af37]/40 transition-colors">
        <img
          id={`product-img-${product.id}`}
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />
        {onZoom && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onZoom(product);
            }}
            title="Ampliar imagem do produto"
            className="absolute bottom-2 right-2 p-2 rounded-full bg-black/80 text-[#d4af37] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-[#d4af37] hover:text-black transition-all cursor-pointer backdrop-blur-sm no-print shadow-md"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        )}
        <div className="absolute top-2 left-2 bg-black/80 border border-[#d4af37]/40 px-2 py-0.5 rounded text-[10px] font-cinzel text-[#e5c76b] tracking-wider">
          ITEM #{product.id.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Product Information & Price */}
      <div className="flex flex-col justify-between flex-1 w-full text-left">
        <div>
          {/* Subtle category or tag */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] sm:text-[11px] font-montserrat tracking-widest text-[#a89d89] uppercase">
              Lista de Vendas • Prime Home Decor
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-cinzel text-[#f5f1ea] font-semibold text-sm sm:text-base md:text-lg leading-snug tracking-wide line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-3 group-hover:text-[#f8e5ad] transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Pricing & CTA Section */}
        <div className="pt-2 border-t border-[#2d2820] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs text-[#8c8273] font-montserrat flex items-center gap-2">
              <span>DE:</span>
              <span className="line-through decoration-[#c2410c] decoration-1.5 text-[#9e9485] font-medium text-xs sm:text-sm">
                {product.originalPrice}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xs font-semibold text-[#d4af37] font-montserrat">POR:</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold font-cinzel text-[#f8e5ad] tracking-tight">
                {product.promotionalPrice}
              </span>
            </div>
            <p className="text-[10px] text-[#786f60] font-montserrat">
              Condições exclusivas de negociação
            </p>
          </div>

          {/* CTA Button: TIRAR PRINT P/ O VENDEDOR */}
          <div className="w-full sm:w-auto flex flex-col items-stretch sm:items-end gap-1">
            <button
              id={`btn-order-${product.id}`}
              type="button"
              onClick={handlePrintClick}
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e7c4] to-[#cba32d] text-[#12100d] font-cinzel font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-105 active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#12100d]" />
                  <span>DADOS COPIADOS!</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 text-[#12100d]" />
                  <span>TIRAR PRINT P/ VENDEDOR</span>
                </>
              )}
            </button>
            <span className="text-[9px] text-[#a89d89] font-montserrat tracking-tight text-center sm:text-right">
              {copied ? 'Cole a mensagem na conversa com o vendedor' : 'Envie o print desta peça ao seu vendedor'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
