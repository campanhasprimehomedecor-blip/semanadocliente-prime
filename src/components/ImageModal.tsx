import React, { useState } from 'react';
import { X, Camera, Check, Copy } from 'lucide-react';
import { Product } from '../types';

interface ImageModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ product, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const handleCopyForSeller = () => {
    const text = `Prime Home Decor - Semana do Cliente | Item #${product.id.toString().padStart(2, '0')}: ${product.name} (DE: ${product.originalPrice} | POR: ${product.promotionalPrice})`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      id="product-zoom-modal"
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[92vh] overflow-y-auto bg-[#14120f] border border-[#d4af37]/40 rounded-2xl p-4 sm:p-6 shadow-2xl text-[#f5f1ea]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-zoom-modal-btn"
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-black/60 text-[#a89d89] hover:text-[#d4af37] hover:bg-black transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center">
          <div className="w-full md:w-1/2 aspect-[4/3] sm:aspect-square bg-[#0a0a09] rounded-xl overflow-hidden border border-[#2b2720] flex items-center justify-center p-2">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between space-y-3 sm:space-y-4">
            <div>
              <span className="text-[10px] sm:text-xs font-montserrat text-[#d4af37] uppercase tracking-widest">
                Semana do Cliente • Item #{product.id.toString().padStart(2, '0')}
              </span>
              <h3 className="font-cinzel text-base sm:text-xl md:text-2xl font-bold text-[#f5f1ea] mt-1.5 mb-3 sm:mb-4 leading-snug">
                {product.name}
              </h3>

              <div className="bg-[#1c1915] p-3 sm:p-4 rounded-xl border border-[#2e2920] mb-3 sm:mb-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#8c8273]">
                  <span>DE:</span>
                  <span className="line-through decoration-[#c2410c] text-sm sm:text-base">{product.originalPrice}</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xs sm:text-sm font-semibold text-[#d4af37]">POR:</span>
                  <span className="text-2xl sm:text-3xl font-bold font-cinzel text-[#f8e5ad]">
                    {product.promotionalPrice}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#736a5b] mt-1 font-montserrat">
                  Preço especial de negociação para a lista do vendedor.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                id="modal-copy-seller-btn"
                type="button"
                onClick={handleCopyForSeller}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e7c4] to-[#cba32d] text-[#12100d] font-cinzel font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#12100d]" />
                    <span>DADOS COPIADOS P/ O VENDEDOR!</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-[#12100d]" />
                    <span>TIRAR PRINT / COPIAR P/ VENDEDOR</span>
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-[#a89d89]">
                Tire print desta tela ou copie os dados para enviar ao seu vendedor.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs font-montserrat text-[#8c8273] hover:text-[#f5f1ea] transition-colors cursor-pointer"
              >
                Fechar detalhes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

