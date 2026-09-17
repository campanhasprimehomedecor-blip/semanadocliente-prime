import React from 'react';
import { Product } from '../types';
import { CATALOG_CONFIG, PRODUCTS } from '../data/catalog';
import { Camera, Sparkles, Truck, ShieldCheck, CreditCard } from 'lucide-react';

interface PdfExportViewProps {
  productPages: Product[][];
  totalPages: number;
  // Resolved base64 images mapping: originalUrl -> base64DataUrl
  imageBase64Map?: Record<string, string>;
}

export const PdfExportView: React.FC<PdfExportViewProps> = ({
  productPages,
  totalPages,
  imageBase64Map = {},
}) => {
  const getImgSrc = (url: string) => imageBase64Map[url] || url;

  return (
    <div
      id="pdf-render-engine-root"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '800px',
        zIndex: -9999,
        pointerEvents: 'none',
        opacity: 1,
        backgroundColor: '#0c0b0a',
      }}
    >
      {/* ================================================================ */}
      {/* PAGE 1: CAPA (COVER) */}
      {/* ================================================================ */}
      <div
        id="pdf-export-page-1"
        style={{
          width: '800px',
          height: '1131px',
          maxHeight: '1131px',
          overflow: 'hidden',
          backgroundColor: '#0c0b0a',
          backgroundImage: 'linear-gradient(180deg, #0c0b0a 0%, #171512 50%, #0c0b0a 100%)',
          color: '#f5f1ea',
          position: 'relative',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        {/* Double Gilded Ornate Outer & Inner Borders */}
        <div style={{ position: 'absolute', inset: '16px', border: '2px solid rgba(212, 175, 55, 0.4)', borderRadius: '12px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: '24px', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '8px', pointerEvents: 'none' }} />

        {/* Corner Accents */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', width: '32px', height: '32px', borderTop: '3px solid #d4af37', borderLeft: '3px solid #d4af37' }} />
        <div style={{ position: 'absolute', top: '20px', right: '20px', width: '32px', height: '32px', borderTop: '3px solid #d4af37', borderRight: '3px solid #d4af37' }} />
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', width: '32px', height: '32px', borderBottom: '3px solid #d4af37', borderLeft: '3px solid #d4af37' }} />
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '32px', height: '32px', borderBottom: '3px solid #d4af37', borderRight: '3px solid #d4af37' }} />

        {/* Cover Header with Official Brand Logo */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '20px' }}>
          <div style={{ display: 'inline-block', padding: '16px 28px', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '14px', marginBottom: '20px' }}>
            <img
              src={getImgSrc(CATALOG_CONFIG.logoUrl)}
              alt="Prime Home Decor"
              crossOrigin="anonymous"
              style={{ width: '320px', height: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4af37', fontWeight: 600, margin: 0 }}>
              Tabela de Oportunidades • Lista do Vendedor
            </p>
            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(270deg, transparent, #d4af37)' }} />
          </div>
        </div>

        {/* Cover Centerpiece */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', margin: 'auto 0', padding: '20px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 20px', borderRadius: '9999px', backgroundColor: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.35)', color: '#f3e7c4', fontSize: '12px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>
            <Sparkles style={{ width: '14px', height: '14px', color: '#d4af37' }} />
            <span>Condições Únicas • Peças Selecionadas</span>
          </div>

          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '50px', fontWeight: 800, letterSpacing: '0.08em', lineHeight: 1.15, color: '#f8e5ad', margin: '0 0 16px 0' }}>
            SEMANA DO CLIENTE
          </h1>

          <div style={{ width: '140px', height: '2px', margin: '0 auto 24px auto', background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />

          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '24px', color: 'rgba(245,241,234,0.92)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.6 }}>
            O requinte dos móveis e decorações clássicas com valores imperdíveis para transformar seu ambiente.
          </p>

          {/* Seller print instruction callout */}
          <div style={{ marginTop: '36px', display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', borderRadius: '12px', backgroundColor: 'rgba(27,25,21,0.95)', border: '1px solid rgba(212,175,55,0.4)', color: '#f5f1ea', fontSize: '13px', fontFamily: 'Montserrat, sans-serif' }}>
            <Camera style={{ width: '18px', height: '18px', color: '#d4af37' }} />
            <span>Tire print das peças de seu interesse e envie diretamente ao seu vendedor</span>
          </div>

          <p style={{ marginTop: '20px', fontSize: '13px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.2em', color: '#a89d89', textTransform: 'uppercase' }}>
            Catálogo Oficial • {PRODUCTS.length} Peças de Destaque
          </p>
        </div>

        {/* Cover Footer */}
        <div style={{ position: 'relative', zIndex: 10, paddingTop: '20px', borderTop: '1px solid rgba(212,175,55,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '10px', fontFamily: 'Montserrat, sans-serif', color: '#8c8273', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
              Atendimento Consultivo
            </p>
            <p style={{ fontSize: '13px', fontFamily: 'Cinzel, serif', color: '#d4af37', letterSpacing: '0.05em', margin: '2px 0 0 0' }}>
              Mobiliário Clássico Sob Medida
            </p>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '8px', backgroundColor: '#1a1815', border: '1px solid rgba(212,175,55,0.4)', color: '#f3e7c4', fontSize: '12px', fontFamily: 'Montserrat, sans-serif' }}>
            <Camera style={{ width: '14px', height: '14px', color: '#d4af37' }} />
            <span>Envie o print para negociação</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '10px', fontFamily: 'Montserrat, sans-serif', color: '#686052', letterSpacing: '0.1em', margin: 0 }}>
              PRIME HOME DECOR
            </p>
            <p style={{ fontSize: '10px', fontFamily: 'Montserrat, sans-serif', color: '#686052', margin: '2px 0 0 0' }}>
              Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* PRODUCT PAGES (Pages 2 to 15, Exactly 2 products per page) */}
      {/* ================================================================ */}
      {productPages.map((products, pageIdx) => {
        const pageNumber = pageIdx + 2;
        return (
          <div
            key={`pdf-page-${pageNumber}`}
            id={`pdf-export-page-${pageNumber}`}
            style={{
              width: '800px',
              height: '1131px',
              maxHeight: '1131px',
              overflow: 'hidden',
              backgroundColor: '#0f0e0c',
              color: '#f5f1ea',
              position: 'relative',
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            {/* Gilded Inner Accent Frame */}
            <div style={{ position: 'absolute', inset: '12px', border: '1px solid rgba(212, 175, 55, 0.28)', borderRadius: '10px', pointerEvents: 'none' }} />

            {/* Corner accents */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', width: '20px', height: '20px', borderTop: '2px solid #d4af37', borderLeft: '2px solid #d4af37' }} />
            <div style={{ position: 'absolute', top: '16px', right: '16px', width: '20px', height: '20px', borderTop: '2px solid #d4af37', borderRight: '2px solid #d4af37' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', width: '20px', height: '20px', borderBottom: '2px solid #d4af37', borderLeft: '2px solid #d4af37' }} />
            <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '20px', height: '20px', borderBottom: '2px solid #d4af37', borderRight: '2px solid #d4af37' }} />

            {/* Top Page Header */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #2b2720' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={getImgSrc(CATALOG_CONFIG.logoUrl)}
                  alt="Prime Home Decor"
                  crossOrigin="anonymous"
                  style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
                />
                <div style={{ height: '18px', width: '1px', backgroundColor: 'rgba(212,175,55,0.4)' }} />
                <span style={{ fontSize: '11px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.2em', color: '#d4af37', textTransform: 'uppercase', fontWeight: 600 }}>
                  Semana do Cliente • Lista Oficial
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontFamily: 'Cinzel, serif', color: '#b3a792', letterSpacing: '0.15em', fontWeight: 600 }}>
                  PÁGINA {pageNumber.toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Page Body: Exactly 2 Product Cards (Symmetric & Spacious) */}
            <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px 0', gap: '16px' }}>
              {products.map((product) => (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: '#14120f',
                    border: '1px solid rgba(212,175,55,0.3)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    height: '460px',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                  }}
                >
                  {/* Left: Product Image Container */}
                  <div
                    style={{
                      width: '320px',
                      height: '100%',
                      backgroundColor: '#0a0908',
                      borderRadius: '10px',
                      border: '1px solid #2b2720',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px',
                      boxSizing: 'border-box',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid rgba(212,175,55,0.5)', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontFamily: 'Cinzel, serif', color: '#e5c76b', letterSpacing: '0.1em', zIndex: 5 }}>
                      ITEM #{product.id.toString().padStart(2, '0')}
                    </div>

                    <img
                      src={getImgSrc(product.image)}
                      alt={product.name}
                      crossOrigin="anonymous"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </div>

                  {/* Right: Product Details & CTA */}
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      height: '100%',
                    }}
                  >
                    {/* Top: Tag & Title */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '10px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.2em', color: '#d4af37', textTransform: 'uppercase', fontWeight: 600 }}>
                          Prime Home Decor • Oportunidade
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: 'Cinzel, serif',
                          color: '#f5f1ea',
                          fontWeight: 700,
                          fontSize: '17px',
                          lineHeight: 1.35,
                          letterSpacing: '0.02em',
                          margin: '0 0 12px 0',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {product.name}
                      </h3>
                    </div>

                    {/* Middle: Prominent Price Box */}
                    <div
                      style={{
                        backgroundColor: '#1b1915',
                        border: '1px solid #30291f',
                        borderRadius: '10px',
                        padding: '14px 16px',
                        margin: 'auto 0 14px 0',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontFamily: 'Montserrat, sans-serif', color: '#8c8273' }}>
                        <span>DE:</span>
                        <span style={{ textDecoration: 'line-through', textDecorationColor: '#c2410c', fontSize: '14px', color: '#9e9485' }}>
                          {product.originalPrice}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#d4af37', fontFamily: 'Montserrat, sans-serif' }}>
                          POR:
                        </span>
                        <span style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'Cinzel, serif', color: '#f8e5ad', letterSpacing: '-0.02em' }}>
                          {product.promotionalPrice}
                        </span>
                      </div>

                      <p style={{ margin: '4px 0 0 0', fontSize: '10px', fontFamily: 'Montserrat, sans-serif', color: '#786f60' }}>
                        Condições especiais da Semana do Cliente para negociação direta
                      </p>
                    </div>

                    {/* Bottom: QUERO ESTE PRODUTO - TIRAR PRINT P/ VENDEDOR */}
                    <div>
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '13px 18px',
                          borderRadius: '8px',
                          background: 'linear-gradient(90deg, #d4af37 0%, #f3e7c4 50%, #cba32d 100%)',
                          color: '#12100d',
                          fontFamily: 'Cinzel, serif',
                          fontWeight: 700,
                          fontSize: '12px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                          boxSizing: 'border-box',
                        }}
                      >
                        <Camera style={{ width: '16px', height: '16px', color: '#12100d', flexShrink: 0 }} />
                        <span>QUERO ESTE PRODUTO • TIRAR PRINT P/ VENDEDOR</span>
                      </div>
                      <p style={{ textAlign: 'center', fontSize: '9px', fontFamily: 'Montserrat, sans-serif', color: '#8a7f70', marginTop: '6px', margin: '6px 0 0 0' }}>
                        Envie o print deste item para seu vendedor para garantir o desconto
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* In case a page only has 1 product (clean placeholder) */}
              {products.length === 1 && (
                <div
                  style={{
                    backgroundColor: '#14120f',
                    border: '1px dashed #2d2820',
                    borderRadius: '12px',
                    height: '460px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    color: '#8c8273',
                    textAlign: 'center',
                  }}
                >
                  <Sparkles style={{ width: '28px', height: '28px', color: '#d4af37', marginBottom: '10px' }} />
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '15px', color: '#d4af37', margin: '0 0 4px 0' }}>
                    Prime Home Decor
                  </p>
                  <p style={{ fontSize: '12px', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', margin: 0 }}>
                    Consulte outras opções exclusivas com seu vendedor.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Page Footer */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #2b2720' }}>
              <span style={{ fontSize: '10px', fontFamily: 'Montserrat, sans-serif', color: '#8c8273', letterSpacing: '0.1em' }}>
                PRIME HOME DECOR • Mobiliário Clássico de Luxo Sob Medida
              </span>
              <span style={{ fontSize: '10px', fontFamily: 'Montserrat, sans-serif', color: '#d4af37', fontWeight: 600 }}>
                Tabela Oficial do Vendedor
              </span>
            </div>
          </div>
        );
      })}

      {/* ================================================================ */}
      {/* PAGE 16: CONTRACAPA (BACK COVER) */}
      {/* ================================================================ */}
      <div
        id={`pdf-export-page-${totalPages}`}
        style={{
          width: '800px',
          height: '1131px',
          maxHeight: '1131px',
          overflow: 'hidden',
          backgroundColor: '#0c0b0a',
          backgroundImage: 'linear-gradient(180deg, #14120f 0%, #0c0b0a 50%, #12100d 100%)',
          color: '#f5f1ea',
          position: 'relative',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        {/* Ornate Gilded Frames */}
        <div style={{ position: 'absolute', inset: '16px', border: '2px solid rgba(212, 175, 55, 0.4)', borderRadius: '12px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: '24px', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '8px', pointerEvents: 'none' }} />

        {/* Classical Corner Accents */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', width: '32px', height: '32px', borderTop: '3px solid #d4af37', borderLeft: '3px solid #d4af37' }} />
        <div style={{ position: 'absolute', top: '20px', right: '20px', width: '32px', height: '32px', borderTop: '3px solid #d4af37', borderRight: '3px solid #d4af37' }} />
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', width: '32px', height: '32px', borderBottom: '3px solid #d4af37', borderLeft: '3px solid #d4af37' }} />
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '32px', height: '32px', borderBottom: '3px solid #d4af37', borderRight: '3px solid #d4af37' }} />

        {/* Back Cover Header */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '20px' }}>
          <div style={{ display: 'inline-block', padding: '16px 28px', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '14px', marginBottom: '16px' }}>
            <img
              src={getImgSrc(CATALOG_CONFIG.logoUrl)}
              alt="Prime Home Decor"
              crossOrigin="anonymous"
              style={{ width: '300px', height: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </div>
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', color: '#d4af37', fontWeight: 600, margin: 0 }}>
            Semana do Cliente Prime Home Decor • Lista Oficial
          </p>
        </div>

        {/* Back Cover Message & Value Props */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', margin: 'auto 0', padding: '20px 0' }}>
          <div style={{ width: '64px', height: '2px', margin: '0 auto 20px auto', backgroundColor: '#d4af37' }} />

          <blockquote style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '28px', color: '#f5f1ea', maxWidth: '620px', margin: '0 auto 20px auto', lineHeight: 1.6 }}>
            “{CATALOG_CONFIG.footerText}”
          </blockquote>

          <div style={{ width: '64px', height: '2px', margin: '0 auto 28px auto', backgroundColor: '#d4af37' }} />

          {/* 3 Value Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '580px', margin: '0 auto 36px auto' }}>
            <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#1a1815', border: '1px solid #2d2820', textAlign: 'center' }}>
              <Truck style={{ width: '22px', height: '22px', margin: '0 auto 8px auto', color: '#d4af37' }} />
              <p style={{ fontSize: '12px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, color: '#f5f1ea', margin: '0 0 4px 0' }}>Envio Seguro</p>
              <p style={{ fontSize: '10px', color: '#8c8273', margin: 0 }}>Transporte especializado</p>
            </div>
            <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#1a1815', border: '1px solid #2d2820', textAlign: 'center' }}>
              <ShieldCheck style={{ width: '22px', height: '22px', margin: '0 auto 8px auto', color: '#d4af37' }} />
              <p style={{ fontSize: '12px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, color: '#f5f1ea', margin: '0 0 4px 0' }}>Qualidade Nobre</p>
              <p style={{ fontSize: '10px', color: '#8c8273', margin: 0 }}>Acabamentos originais</p>
            </div>
            <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#1a1815', border: '1px solid #2d2820', textAlign: 'center' }}>
              <CreditCard style={{ width: '22px', height: '22px', margin: '0 auto 8px auto', color: '#d4af37' }} />
              <p style={{ fontSize: '12px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, color: '#f5f1ea', margin: '0 0 4px 0' }}>Facilidade</p>
              <p style={{ fontSize: '10px', color: '#8c8273', margin: 0 }}>Condições personalizadas</p>
            </div>
          </div>

          {/* Prominent CTA Callout: ENVIE O PRINT AO SEU VENDEDOR */}
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '16px 36px',
                borderRadius: '12px',
                background: 'linear-gradient(90deg, #d4af37 0%, #f3e7c4 50%, #cba32d 100%)',
                color: '#12100d',
                fontFamily: 'Cinzel, serif',
                fontWeight: 700,
                fontSize: '15px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              }}
            >
              <Camera style={{ width: '22px', height: '22px', color: '#12100d' }} />
              <span>ENVIE O PRINT AO SEU VENDEDOR</span>
            </div>
            <p style={{ fontSize: '12px', color: '#e5c76b', fontFamily: 'Montserrat, sans-serif', marginTop: '10px', margin: '10px 0 0 0' }}>
              Apresente a captura de tela dos itens escolhidos para garantir as condições da campanha
            </p>
          </div>

          {/* Disclaimer text */}
          <div style={{ maxWidth: '520px', margin: '0 auto' }}>
            <p style={{ fontSize: '11px', fontFamily: 'Montserrat, sans-serif', color: '#b3a896', lineHeight: 1.6, margin: 0 }}>
              {CATALOG_CONFIG.disclaimerText}
            </p>
          </div>
        </div>

        {/* Back Cover Footer */}
        <div style={{ position: 'relative', zIndex: 10, paddingTop: '16px', borderTop: '1px solid rgba(212,175,55,0.3)', textAlign: 'center', color: '#786e5e', fontFamily: 'Montserrat, sans-serif', fontSize: '11px' }}>
          <p style={{ color: '#d4af37', fontWeight: 600, margin: '0 0 4px 0' }}>
            Tabela Interna & Exclusiva para Atendimento ao Cliente
          </p>
          <p style={{ margin: '0 0 4px 0' }}>PRIME HOME DECOR • Mobiliário e Decoração Clássica de Alto Luxo</p>
          <p style={{ fontSize: '10px', color: '#5e5649', margin: 0 }}>
            Todos os direitos reservados • Imagens oficiais do acervo
          </p>
        </div>
      </div>
    </div>
  );
};
