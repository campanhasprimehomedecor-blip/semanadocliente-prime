import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfExportProgress {
  currentPage: number;
  totalPages: number;
  stage: string;
}

/**
 * Converts an image URL into a Base64 data URL to eliminate CORS/taint issues in html2canvas.
 */
export const convertUrlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          resolve(url);
        }
      };
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    });
  } catch {
    // Canvas fallback
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 0.95));
            return;
          }
        } catch {
          // Ignore and fallback to url
        }
        resolve(url);
      };
      img.onerror = () => resolve(url);
      img.src = url;
    });
  }
};

/**
 * Preloads and converts a list of image URLs to Base64 in parallel batches.
 */
export const preloadAllImagesAsBase64 = async (
  urls: string[],
  onProgress?: (loaded: number, total: number) => void
): Promise<Record<string, string>> => {
  const map: Record<string, string> = {};
  const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
  const total = uniqueUrls.length;
  let loaded = 0;

  // Process in chunks of 4 to avoid browser network congestion
  const chunkSize = 4;
  for (let i = 0; i < uniqueUrls.length; i += chunkSize) {
    const chunk = uniqueUrls.slice(i, i + chunkSize);
    await Promise.all(
      chunk.map(async (url) => {
        const base64 = await convertUrlToBase64(url);
        map[url] = base64;
        loaded++;
        if (onProgress) {
          onProgress(loaded, total);
        }
      })
    );
  }

  return map;
};

/**
 * Generates an interactive, pixel-perfect A4 PDF for Prime Home Decor.
 */
export const generateInteractivePdf = async (
  pageElementIds: string[],
  onProgress?: (progress: PdfExportProgress) => void
): Promise<void> => {
  const totalPages = pageElementIds.length;

  // 1. Ensure custom web fonts (Cinzel, Cormorant Garamond, Montserrat) are fully loaded
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue anyway
    }
  }

  // 2. Initialize jsPDF in A4 Portrait mode (210mm x 297mm)
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

    // Allow browser DOM to settle
    await new Promise((r) => setTimeout(r, 60));

    // Capture the exact 800px x 1131px element with high quality
    const canvas = await html2canvas(element, {
      scale: 2, // 2x gives 1600x2262px, optimal high-definition print quality
      useCORS: true,
      allowTaint: false, // CRITICAL: NEVER set allowTaint to true when calling toDataURL()
      backgroundColor: '#0c0b0a',
      logging: false,
      windowWidth: 1200, // Forces desktop layout simulation regardless of user's device
      windowHeight: 1600,
      x: 0,
      y: 0,
      width: 800,
      height: 1131,
      scrollX: 0,
      scrollY: 0,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.94);

    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }

    // Draw the page filling the standard A4 dimensions (210mm x 297mm)
    pdf.addImage(imgData, 'JPEG', 0, 0, a4Width, a4Height, undefined, 'FAST');
  }

  if (onProgress) {
    onProgress({
      currentPage: totalPages,
      totalPages,
      stage: 'Finalizando e salvando o arquivo PDF...',
    });
  }

  await new Promise((r) => setTimeout(r, 250));

  // Save the PDF file
  pdf.save('Catalogo-Prime-Home-Decor-Semana-do-Cliente.pdf');
};
