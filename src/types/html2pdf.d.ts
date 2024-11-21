declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number;
    filename?: string;
    image?: {
      type: string;
      quality: number;
    };
    html2canvas?: {
      scale: number;
    };
    jsPDF?: {
      unit: string;
      format: string;
      orientation: string;
    };
  }

  function html2pdf(element: HTMLElement, options?: Html2PdfOptions): void;

  export = html2pdf;
}
