import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, CATALOG_CONFIG } from './data/catalog';
import { Product, PdfExportProgress } from './types';
import { Header } from './components/Header';
import { CoverPage } from './components/CoverPage';
import { ProductPage } from './components/ProductPage';
import { BackCoverPage } from './components/BackCoverPage';
import { QuickFilterBar } from './components/QuickFilterBar';
import { ImageModal } from './components/ImageModal';
import { PdfExportModal } from './components/PdfExportModal';
import { PdfExportView } from './components/PdfExportView';
import { ChevronLeft, ChevronRight, Share2, Check, Download } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'flip' | 'continuous'>('continuous');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfProgress, setPdfProgress] = useState<PdfExportProgress | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [imageBase64Map, setImageBase64Map] = useState<Record<string, string>>({});

  // Group products into pages with maximum 2 products per page
  const productPages = useMemo(() => {
    const pages: Product[][] = [];
    for (let i = 0; i < PRODUCTS.length; i += 2) {
      pages.push(PRODUCTS.slice(i, i + 2));
    }
    return pages;
  }, []);

  // Total pages: Cover (1) + 14 Product Pages + Back Cover (1) = 16
  const totalPages = 1 + productPages.length + 1;

  // Filtered products for quick search
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.promotionalPrice.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === 'sofas') return p.id >= 1 && p.id <= 8;
      if (selectedCategory === 'poltronas') return p.id >= 9 && p.id <= 19;
      if (selectedCategory === 'mesas-decor') return p.id >= 20 && p.id <= 24;

      return true;
    });
  }, [searchTerm, selectedCategory]);

  // Keyboard navigation for flip mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'flip') return;
      if (e.key === 'ArrowLeft') {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, totalPages]);

  // Handle PDF Export
  const handleExportPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      setPdfProgress({
        currentPage: 0,
        totalPages: totalPages,
        stage: 'Carregando imagens e preparando layout de alta resolução...',
      });

      // Dynamically load PDF export bundle only when requested
      const { generateInteractivePdf, preloadAllImagesAsBase64 } = await import('./utils/pdfExport');

      // 1. Gather all unique image URLs to convert to Base64 (eliminates any CORS/taint)
      const allImageUrls = [
        CATALOG_CONFIG.logoUrl,
        ...PRODUCTS.map((p) => p.image),
      ];

      // Convert images to Base64 if not already cached
      let currentMap = imageBase64Map;
      if (Object.keys(currentMap).length < allImageUrls.length) {
        currentMap = await preloadAllImagesAsBase64(allImageUrls, (loaded, total) => {
          setPdfProgress({
            currentPage: 0,
            totalPages: totalPages,
            stage: `Otimizando imagens em alta definição (${loaded}/${total})...`,
          });
        });
        setImageBase64Map(currentMap);
        // Wait brief tick for React state to update the PDF export template DOM with base64 images
        await new Promise((r) => setTimeout(r, 150));
      }

      // Collect IDs of all 16 pages from the dedicated PDF Export template
      const pageIds: string[] = ['pdf-export-page-1'];
      for (let i = 0; i < productPages.length; i++) {
        pageIds.push(`pdf-export-page-${i + 2}`);
      }
      pageIds.push(`pdf-export-page-${totalPages}`);

      await generateInteractivePdf(pageIds, (progress) => {
        setPdfProgress(progress);
      });
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      alert('Houve um problema ao gerar o PDF. Você também pode utilizar o botão "Imprimir" e selecionar "Salvar como PDF".');
    } finally {
      setIsGeneratingPdf(false);
      setPdfProgress(null);
    }
  };

  // Handle Native Print
  const handlePrint = () => {
    window.print();
  };

  // Share Catalog Link
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Catálogo Prime Home Decor - Semana do Cliente',
          text: 'Confira as condições exclusivas da Semana do Cliente Prime Home Decor!',
          url: window.location.href,
        });
        return;
      } catch (e) {
        // User cancelled or not supported
      }
    }
    // Fallback: Copy link
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0f0e0c] text-[#f5f1ea] font-montserrat flex flex-col">
      {/* Top Header */}
      <div className="no-print">
        <Header
          onExportPdf={handleExportPdf}
          isGeneratingPdf={isGeneratingPdf}
          onPrint={handlePrint}
        />
      </div>

      {/* Main Catalog Viewer Container */}
      <main className="no-print flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-6 py-4 sm:py-8 flex flex-col items-center">
        {/* Filter and Navigation Toolbar */}
        <QuickFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* Filter Alert if user is searching */}
        {(searchTerm || selectedCategory !== 'all') && (
          <div className="no-print w-full max-w-[800px] mb-4 p-3 bg-[#1b1915] border border-[#383228] rounded-xl flex items-center justify-between text-xs">
            <span className="text-[#a89d89]">
              Mostrando <strong className="text-[#d4af37]">{filteredProducts.length}</strong> produtos correspondentes ao filtro.
            </span>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-[#d4af37] underline hover:text-[#f8ecd2] cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* Interactive View Area */}
        <div className="w-full flex flex-col items-center no-print">
          {viewMode === 'flip' ? (
            /* Flip Mode: One page at a time */
            <div className="w-full flex flex-col items-center">
              <div className="relative w-full max-w-[800px]">
                {currentPage === 1 && (
                  <CoverPage onStartBrowse={() => setCurrentPage(2)} />
                )}

                {currentPage > 1 && currentPage <= 1 + productPages.length && (
                  <ProductPage
                    pageNumber={currentPage}
                    totalPages={totalPages}
                    products={productPages[currentPage - 2]}
                    onZoom={setSelectedProduct}
                  />
                )}

                {currentPage === totalPages && <BackCoverPage />}
              </div>

              {/* Bottom Flip Navigation Buttons */}
              <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-4 mt-6 w-full max-w-[800px] px-1 sm:px-0">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="min-h-[44px] flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#181613] border border-[#2e2820] text-xs font-montserrat text-[#e5c76b] disabled:opacity-30 hover:bg-[#25211a] transition-all cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <span className="font-cinzel text-xs sm:text-sm text-[#d4af37] px-2 sm:px-3 text-center whitespace-nowrap">
                  Pág. {currentPage} de {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="min-h-[44px] flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#181613] border border-[#2e2820] text-xs font-montserrat text-[#e5c76b] disabled:opacity-30 hover:bg-[#25211a] transition-all cursor-pointer active:scale-95"
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Continuous Mode: All pages stacked sequentially */
            <div className="w-full max-w-[800px] flex flex-col gap-6 sm:gap-10">
              {/* Cover Page */}
              <div className="relative">
                <div className="text-right text-[11px] font-cinzel text-[#8c8273] mb-2 pr-2">
                  Capa • Semana do Cliente
                </div>
                <CoverPage
                  onStartBrowse={() => {
                    const el = document.getElementById('catalog-page-2');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>

              {/* 14 Product Pages (2 products each) */}
              {productPages.map((pageProducts, index) => {
                const pageNum = index + 2;
                return (
                  <div key={pageNum} className="relative">
                    <div className="text-right text-[11px] font-cinzel text-[#8c8273] mb-2 pr-2">
                      Página {pageNum.toString().padStart(2, '0')} de {totalPages}
                    </div>
                    <ProductPage
                      pageNumber={pageNum}
                      totalPages={totalPages}
                      products={pageProducts}
                      onZoom={setSelectedProduct}
                    />
                  </div>
                );
              })}

              {/* Back Cover / Rodapé */}
              <div className="relative">
                <div className="text-right text-[11px] font-cinzel text-[#8c8273] mb-2 pr-2">
                  Contracapa & Atendimento • Página {totalPages}
                </div>
                <BackCoverPage />
              </div>
            </div>
          )}
        </div>

        {/* Action Callout Bar */}
        <div className="no-print mt-8 sm:mt-12 w-full max-w-[800px] p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#181613] via-[#201d18] to-[#181613] border border-[#d4af37]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#f5f1ea]">
              Lista Oficial para Atendimento e Vendas
            </h4>
            <p className="text-xs text-[#a89d89] mt-1">
              Baixe o catálogo completo em PDF ou tire print das peças para enviar diretamente ao seu vendedor.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 sm:flex-initial min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#27241e] border border-[#3d372b] hover:border-[#d4af37] text-xs text-[#e5c76b] transition-all cursor-pointer active:scale-95"
            >
              {copiedLink ? <Check className="w-4 h-4 text-[#25D366]" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copiado!' : 'Compartilhar'}</span>
            </button>

            <button
              type="button"
              onClick={handleExportPdf}
              disabled={isGeneratingPdf}
              className="flex-1 sm:flex-initial min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e7c4] to-[#cba32d] text-[#12100d] font-cinzel font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Baixar PDF</span>
            </button>
          </div>
        </div>
      </main>

      {/* Dedicated A4 Pixel-Perfect Render Engine for PDF Export & Print */}
      <PdfExportView
        productPages={productPages}
        totalPages={totalPages}
        imageBase64Map={imageBase64Map}
      />

      {/* Product Image Modal */}
      <ImageModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* PDF Export Progress Modal */}
      <PdfExportModal
        isOpen={isGeneratingPdf}
        progress={pdfProgress}
      />
    </div>
  );
}
