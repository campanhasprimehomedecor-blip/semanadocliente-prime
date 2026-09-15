import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Catalog:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f0e0c] text-[#f5f1ea] flex items-center justify-center p-6 font-montserrat">
          <div className="max-w-md w-full bg-[#181613] border border-[#d4af37]/40 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mx-auto mb-5 text-[#d4af37]">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h2 className="font-cinzel text-xl font-bold text-[#f5f1ea] mb-2">
              Prime Home Decor
            </h2>
            <p className="text-sm text-[#b5aa97] mb-6 leading-relaxed">
              Ocorreu um imprevisto ao carregar o catálogo digital. Clique no botão abaixo para recarregar a visualização.
            </p>

            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e7c4] to-[#cba32d] text-[#12100d] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Recarregar Catálogo</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
