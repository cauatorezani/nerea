'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { BrandOrnament } from '@/components/ui/BrandOrnament';
import { Button } from '@/components/ui/Button';

export interface FooterProps {
  onNavigate: (targetSelector: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLink = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    event.preventDefault();
    onNavigate(target);
  };

  const handleBackToTop = () => {
    onNavigate('#hero');
  };

  return (
    <footer className="bg-midnight text-pearl border-t border-champagne/30">
      <div className="max-w-[1860px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-pearl/15">
          {/* Brand Column (Esquerda -> Direita) */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-4">
              <a
                href="#hero"
                onClick={(e) => handleLink(e, '#hero')}
                className="inline-block font-serif text-3xl sm:text-5xl tracking-[0.3em] font-normal text-pearl"
              >
                NÉRÉA
              </a>
              <BrandOrnament variant="seal" theme="dark" />
            </div>
            <p className="font-serif italic text-2xl text-champagne">
              Alta Joalheria em Ouro 18k, Safiras &amp; Diamantes.
            </p>
            <p className="text-sm sm:text-base text-pearl/85 max-w-md leading-relaxed">
              Maison de alta joalheria autoral dedicada às safiras azuis mais
              raras, águas-marinhas Santa Maria e diamantes naturais cravados à
              mão em ouro 18k certificado.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.24em] text-champagne font-semibold">
              A Maison
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm tracking-[0.18em] uppercase">
              <li>
                <a
                  href="#collection"
                  onClick={(e) => handleLink(e, '#collection')}
                  className="text-pearl/90 hover:text-champagne transition-colors"
                >
                  Coleção Lumière Bleue
                </a>
              </li>
              <li>
                <a
                  href="#manifesto"
                  onClick={(e) => handleLink(e, '#manifesto')}
                  className="text-pearl/90 hover:text-champagne transition-colors"
                >
                  Filosofia da Maison
                </a>
              </li>
              <li>
                <a
                  href="#editorial"
                  onClick={(e) => handleLink(e, '#editorial')}
                  className="text-pearl/90 hover:text-champagne transition-colors"
                >
                  Alta Lapidação
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLink(e, '#about')}
                  className="text-pearl/90 hover:text-champagne transition-colors"
                >
                  Ourivesaria &amp; Atelier
                </a>
              </li>
              <li>
                <a
                  href="#newsletter"
                  onClick={(e) => handleLink(e, '#newsletter')}
                  className="text-pearl/90 hover:text-champagne transition-colors"
                >
                  Atendimento Privé
                </a>
              </li>
            </ul>
          </div>

          {/* Atelier & Concierge Column */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.24em] text-champagne font-semibold">
              Atelier &amp; Private Concierge
            </h3>
            <p className="text-sm sm:text-base text-pearl/85 leading-relaxed">
              Atendimento exclusivo com hora marcada e consultoria gemológica
              personalizada.
            </p>
            <div className="pt-1 space-y-2 text-sm text-pearl/95">
              <p>São Paulo — Jardins | Rio de Janeiro — Ipanema</p>
              <p className="text-champagne font-medium">
                concierge@nereajoias.com.br
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs tracking-[0.16em] text-pearl/80">
            <span>
              © {new Date().getFullYear()} NÉRÉA Haute Joaillerie. Todos os
              direitos reservados.
            </span>
            <span className="hidden sm:inline text-champagne">•</span>
            <span>Ouro 18k Certificado &amp; Gemas Rastreadas</span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleBackToTop}
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp
              className="w-4 h-4 text-champagne"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </footer>
  );
}
