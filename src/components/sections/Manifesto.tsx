'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { animateSectionReveal } from '@/lib/animations';
import { BrandOrnament } from '@/components/ui/BrandOrnament';

const MANIFESTO_METRICS = [
  {
    index: '01',
    label: 'Nobreza do Metal',
    value: 'Ouro 18k (750)',
    detail:
      'Liga nobre de ouro branco e champagne forjada manualmente com acabamento espelhado.',
  },
  {
    index: '02',
    label: 'Pedras Preciosas',
    value: 'Safiras & Diamantes',
    detail:
      'Gemas naturais selecionadas a olho nu pela intensidade de cor, pureza e refração de luz.',
  },
  {
    index: '03',
    label: 'Trabalho de Bancada',
    value: '+40 Horas',
    detail:
      'Tempo dedicado por nossos mestres ourives e cravadores a cada peça numerada.',
  },
];

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      animateSectionReveal(sectionRef.current, '[data-manifesto-reveal]', {
        y: 28,
        duration: 1.2,
        stagger: 0.14,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      aria-labelledby="manifesto-heading"
      className="relative bg-pearl text-midnight py-24 sm:py-32 md:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden"
    >
      {/* Camada Z-0: Tipografia Monumental em Marca d'Água de Ponta a Ponta */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center overflow-hidden z-0"
      >
        <span
          className="font-serif font-light tracking-[0.08em] uppercase text-midnight/[0.045] whitespace-nowrap leading-none"
          style={{ fontSize: 'clamp(6.5rem, 18vw, 22rem)' }}
        >
          ETERNIDADE
        </span>
      </div>

      {/* Container Expandido (Max-W 1800px) com Leitura Natural Esquerda -> Direita */}
      <div className="relative z-10 max-w-[1800px] mx-auto border border-mist/80 bg-pearl/85 backdrop-blur-sm p-8 sm:p-12 lg:p-16 xl:p-20 shadow-[0_24px_70px_rgba(7,31,51,0.05)]">
        {/* Cantoneiras Champagne de Alta Joalheria */}
        <span
          aria-hidden="true"
          className="absolute -top-[1px] -left-[1px] w-6 h-6 border-t-2 border-l-2 border-champagne"
        />
        <span
          aria-hidden="true"
          className="absolute -top-[1px] -right-[1px] w-6 h-6 border-t-2 border-r-2 border-champagne"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-[1px] -left-[1px] w-6 h-6 border-b-2 border-l-2 border-champagne"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-[1px] -right-[1px] w-6 h-6 border-b-2 border-r-2 border-champagne"
        />

        {/* Barra Superior de Coordenadas Editoriais (Esquerda -> Direita) */}
        <div
          data-manifesto-reveal
          className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.24em] text-midnight/75 pb-8 mb-12 border-b border-mist/70 font-medium"
        >
          <span>N° 01 — Filosofia da Maison</span>
          <span className="text-ocean font-semibold">
            Alta Ourivesaria em Ouro 18k &amp; Safiras
          </span>
          <span className="hidden sm:inline text-midnight/75">
            Peças Feitas à Mão
          </span>
        </div>

        {/* Grid Assimétrico Esquerda -> Direita com Amplo Respiro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Coluna Esquerda: Emblema + Headline Principal */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div data-manifesto-reveal className="mb-6">
              <BrandOrnament variant="crest" theme="light" />
            </div>

            <span
              data-manifesto-reveal
              className="text-xs sm:text-sm uppercase tracking-[0.26em] text-ocean font-semibold mb-3"
            >
              Maison NÉRÉA
            </span>

            <h2
              id="manifesto-heading"
              data-manifesto-reveal
              className="font-serif text-4xl sm:text-6xl xl:text-[64px] font-light text-midnight tracking-wide leading-[1.06]"
            >
              Joias criadas para atravessar gerações.
            </h2>
          </div>

          {/* Coluna Direita: Texto Editorial Amplo e Legível */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center lg:pl-8 lg:border-l lg:border-mist/70">
            <p
              data-manifesto-reveal
              className="font-serif text-2xl sm:text-3xl xl:text-[34px] font-normal text-midnight leading-[1.48]"
            >
              Uma verdadeira joia não pertence a uma única estação. Na NÉRÉA,
              combinamos a nobreza do ouro 18k ao magnetismo das safiras azuis e
              diamantes naturais para criar peças que celebram conquistas e
              permanecem como herança.
            </p>

            <div
              data-manifesto-reveal
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              <BrandOrnament variant="divider" theme="light" />
              <span className="text-xs uppercase tracking-[0.26em] text-ocean font-semibold">
                Haute Joaillerie — Série Numerada
              </span>
            </div>
          </div>
        </div>

        {/* Tríade Inferior de Especificações da Maison (Largura Total Esquerda -> Direita) */}
        <div className="mt-14 pt-12 border-t border-mist/70 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {MANIFESTO_METRICS.map((item) => (
            <div
              key={item.index}
              data-manifesto-reveal
              className="group p-7 rounded-2xl bg-midnight/[0.03] hover:bg-midnight/[0.05] border border-mist/80 hover:border-champagne transition-all duration-500 flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em]">
                <span className="text-ocean font-semibold">{item.label}</span>
                <span className="text-midnight/70 font-semibold">
                  {item.index}
                </span>
              </div>
              <p className="font-serif text-3xl sm:text-4xl text-midnight font-normal">
                {item.value}
              </p>
              <p className="text-sm text-midnight/80 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
