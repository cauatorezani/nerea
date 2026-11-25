'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export interface HeaderProps {
  bagCount: number;
  onOpenBag: () => void;
  onNavigate: (targetSelector: string) => void;
}

const NAV_LINKS = [
  { label: 'Coleções', href: '#collection', subtitle: 'Safiras & Diamantes' },
  { label: 'A Maison', href: '#about', subtitle: 'Alta Ourivesaria' },
  { label: 'Lapidação', href: '#editorial', subtitle: 'Savoir-Faire & Luz' },
  { label: 'Contato', href: '#newsletter', subtitle: 'Consultoria Exclusiva' },
];

export function Header({ bagCount, onOpenBag, onNavigate }: HeaderProps) {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let heroHeight = window.innerHeight;

    const updateMetrics = () => {
      const heroElement = document.getElementById('hero');
      heroHeight = heroElement ? heroElement.offsetHeight : window.innerHeight;
      setIsPastHero(window.scrollY >= heroHeight - 84);
    };

    const handleScroll = () => {
      const nextIsPast = window.scrollY >= heroHeight - 84;
      setIsPastHero((prev) => (prev !== nextIsPast ? nextIsPast : prev));
    };

    updateMetrics();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateMetrics, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMetrics);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-20 md:h-24 w-full transition-[background-color,color,border-color,box-shadow] duration-500 ease-luxury ${
          isPastHero
            ? 'bg-pearl/95 backdrop-blur-md text-midnight border-b border-mist/60 shadow-[0_8px_30px_rgb(7,31,51,0.06)]'
            : 'bg-transparent text-pearl border-b border-transparent'
        }`}
      >
        <div className="relative w-full max-w-[1920px] mx-auto h-full px-6 sm:px-10 lg:px-[4%] flex items-center justify-between">
          {/* Esquerda: Menu Mobile (< md) + Assinatura Minimalista 'Est. 2026' (Desktop) */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={isMobileMenuOpen}
              className={`md:hidden min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center transition-colors cursor-pointer ${
                isPastHero
                  ? 'text-midnight hover:text-ocean'
                  : 'text-pearl hover:text-champagne'
              }`}
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>

            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              aria-label="NÉRÉA — Voltar ao início"
              className={`select-none transition-colors duration-300 ${
                isPastHero
                  ? 'text-midnight/90 hover:text-midnight'
                  : 'text-pearl/90 hover:text-white'
              }`}
            >
              <span className="md:hidden font-serif text-xl tracking-[0.28em] font-normal">
                NÉRÉA
              </span>
              <span className="hidden md:inline-block text-[12px] lg:text-[13px] tracking-[0.02em] font-normal">
                {isPastHero ? 'NÉRÉA · Est. 2026' : 'Est. 2026'}
              </span>
            </a>
          </div>

          {/* Centro Exato: Links Editoriais Limpos */}
          <nav
            aria-label="Navegação principal"
            className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 lg:gap-11"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`group relative py-1.5 text-[12.5px] lg:text-[13px] tracking-[0.02em] font-normal transition-colors duration-300 ${
                  isPastHero
                    ? 'text-midnight/90 hover:text-midnight'
                    : 'text-pearl/90 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current origin-left scale-x-0 transition-transform duration-300 ease-luxury group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* Direita: Dois botões de texto puro lado a lado ('Buscar' e 'Sacola') */}
          <div className="flex items-center justify-end gap-7 lg:gap-9">
            <button
              type="button"
              onClick={() => onNavigate('#collection')}
              aria-label="Buscar na coleção"
              className={`hidden sm:inline-block py-1.5 text-[12.5px] lg:text-[13px] tracking-[0.02em] font-normal transition-colors duration-300 cursor-pointer ${
                isPastHero
                  ? 'text-midnight/90 hover:text-midnight'
                  : 'text-pearl/90 hover:text-white'
              }`}
            >
              Buscar
            </button>

            <button
              type="button"
              onClick={onOpenBag}
              aria-label={`Abrir sacola de compras (${bagCount} ${
                bagCount === 1 ? 'item' : 'itens'
              })`}
              className={`py-1.5 text-[12.5px] lg:text-[13px] tracking-[0.02em] font-normal tabular-nums transition-colors duration-300 cursor-pointer ${
                isPastHero
                  ? 'text-midnight/90 hover:text-midnight'
                  : 'text-pearl/90 hover:text-white'
              }`}
            >
              {bagCount > 0 ? `Sacola (${bagCount})` : 'Sacola'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação mobile"
          className="fixed inset-0 z-50 md:hidden flex"
        >
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 bg-midnight/80 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <div
            data-lenis-prevent
            className="relative z-10 w-[85%] max-w-sm bg-midnight text-pearl h-full flex flex-col justify-between p-6 border-r border-champagne/30 shadow-2xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-pearl/15">
              <span className="font-serif text-2xl tracking-[0.3em] font-normal text-pearl">
                NÉRÉA
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Fechar menu de navegação"
                className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center text-pearl/80 hover:text-champagne transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Links */}
            <nav aria-label="Menu mobile" className="my-auto py-8">
              <ul className="space-y-6">
                {NAV_LINKS.map((link, idx) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="group flex items-center justify-between py-2 border-b border-pearl/10 hover:border-champagne/60 transition-colors"
                    >
                      <div>
                        <span className="block text-xs uppercase tracking-[0.24em] text-champagne mb-1">
                          0{idx + 1} — {link.subtitle}
                        </span>
                        <span className="font-serif text-3xl text-pearl group-hover:text-champagne transition-colors">
                          {link.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        className="w-5 h-5 text-mist group-hover:text-champagne transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-pearl/15 space-y-2">
              <p className="text-xs uppercase tracking-[0.22em] text-champagne">
                The Ocean Collection
              </p>
              <p className="font-serif italic text-lg text-mist">
                “Joias que guardam o azul.”
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
