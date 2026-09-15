export interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice: string; // "DE: R$ ..."
  promotionalPrice: string; // "POR: R$ ..."
}

export interface CatalogConfig {
  logoUrl: string;
  themeTitle: string;
  brandName: string;
  subtitle: string;
  footerText: string;
  disclaimerText: string;
  sellerNotice: string;
}

export interface PdfExportProgress {
  currentPage: number;
  totalPages: number;
  stage: string;
}
