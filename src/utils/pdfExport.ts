import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfExportProgress {
  currentPage: number;
  totalPages: number;
  stage: string;
}

/**
 * Preloads an image into an HTMLImageElement to ensure it is in memory
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve();
    img.onerror = () => resolve(); // Resolve anyway so export doesn't crash on one image
    img.src = src;
  });
};

/**
 * Generates an interactive PDF with clickable WhatsApp links for all buttons
 */
export const generateInteractivePdf = async (
  pageElementIds: string[],
  onProgress?: (progress: PdfExportProgress) => void
): Promise<void> => {
  const totalPages = pageElementIds.length;
  // A4 dimensions in mm: 210 x 297
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const a4Width = 210;
  const a4Height = 297;

  for (let i = 0; i < totalPages; i++) {
    const elementId = pageElementIds[i];
    const element = document.getElementById(elementId);

    if (!element) {
      console.warn(`Element #${elementId} not found for PDF export.`);
      continue;
    }

    if (onProgress) {
      onProgress({
        currentPage: i + 1,
        totalPages,
        stage: `Renderizando página ${i + 1} de ${totalPages}...`,
      });
    }

    // Wait a brief tick to ensure any pending renders finish
    await new Promise((r) => setTimeout(r, 60));

    // Capture the DOM element as high-resolution canvas
    const canvas = await html2canvas(element, {
      scale: 2, // 2x scale for sharp print quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#0f0e0c',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.92);

    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }

    // Draw page background image
    pdf.addImage(imgData, 'JPEG', 0, 0, a4Width, a4Height, undefined, 'FAST');

    // Add interactive link annotations for any <a> links inside the page
    const pageRect = element.getBoundingClientRect();
    const links = element.querySelectorAll('a[href]');

    links.forEach((linkEl) => {
      const href = linkEl.getAttribute('href');
      if (!href) return;

      const linkRect = linkEl.getBoundingClientRect();
      // Calculate link position in millimeters relative to page
      const x_mm = ((linkRect.left - pageRect.left) / pageRect.width) * a4Width;
      const y_mm = ((linkRect.top - pageRect.top) / pageRect.height) * a4Height;
      const w_mm = (linkRect.width / pageRect.width) * a4Width;
      const h_mm = (linkRect.height / pageRect.height) * a4Height;

      if (w_mm > 0 && h_mm > 0) {
        pdf.link(x_mm, y_mm, w_mm, h_mm, { url: href });
      }
    });
  }

  if (onProgress) {
    onProgress({
      currentPage: totalPages,
      totalPages,
      stage: 'Finalizando arquivo PDF interativo...',
    });
  }

  await new Promise((r) => setTimeout(r, 200));

  // Save the PDF
  pdf.save('Catalogo-Prime-Home-Decor-Semana-do-Cliente.pdf');
};
