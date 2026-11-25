'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, Sparkles, Gem } from 'lucide-react';
import { PRODUCTS, type Product } from '@/data/products';
import { animateSectionReveal } from '@/lib/animations';
import { ProductCard } from '@/components/ui/ProductCard';

export interface FeaturedCollectionProps {
  onSelectProduct: (product: Product) => void;
}

const CURATION_TAGS = [
  'Ouro 18k (Au 750) Maciço',
  'Safiras & Águas-Marinhas Naturais',
  'Diamantes VVS Selecionados',
  'Garantia Vitalícia NÉRÉA',
];

export function FeaturedCollection({
  onSelectProduct,
}: FeaturedCollectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      animateSectionReveal(sectionRef.current, '[data-collection-header]', {
        y: 24,
        duration: 1.1,
        stagger: 0.12,
      });

      animateSectionReveal(sectionRef.current, '[data-product-card]', {
        y: 36,
        duration: 1.15,
        stagger: 0.14,
        start: 'top 78%',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="collection"
      ref={sectionRef}
      aria-labelledby="collection-heading"
      className="relative bg-pearl text-midnight pb-28 sm:pb-36 md:pb-44 pt-8 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Cabeçalho Editorial Expandido (Esquerda -> Direita) */}
        <div className="pb-12 sm:pb-16 mb-14 sm:mb-20 border-b border-mist/80 flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div
                data-collection-header
                className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.26em] text-ocean font-semibold mb-3"
              >
                <Sparkles
                  className="w-4 h-4 text-champagne"
                  aria-hidden="true"
                />
                <span>Alta Joalheria Autoral — Série Numerada</span>
                <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                <span>Maison NÉRÉA</span>
              </div>

              <h2
                id="collection-heading"
                data-collection-header
                className="font-serif text-4xl sm:text-6xl lg:text-[68px] font-light text-midnight tracking-wide leading-[1.04]"
              >
                Coleção Lumière Bleue
              </h2>
            </div>

            {/* Nota Curatorial à Direita */}
            <div
              data-collection-header
              className="lg:max-w-lg p-6 sm:p-7 rounded-2xl bg-midnight/[0.03] border border-mist/80 flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-ocean font-semibold">
                <span>Nota do Mestre Joalheiro</span>
                <span className="text-midnight/75">Au 750 • GIA</span>
              </div>
              <p className="text-sm sm:text-base text-midnight/85 leading-relaxed">
                Cada gema é escolhida individualmente pela saturação do azul e
                pureza cristalina, recebendo uma estrutura sob medida em ouro
                18k forjado à mão.
              </p>
            </div>
          </div>

          {/* Barra de Atributos & Especificações da Coleção */}
          <div
            data-collection-header
            className="flex flex-wrap items-center justify-between gap-4 pt-2"
          >
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
              {CURATION_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] bg-midnight/[0.04] text-midnight font-medium border border-mist/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="text-xs uppercase tracking-[0.2em] text-ocean font-semibold">
              Selecione uma criação para ver especificações completas
            </span>
          </div>
        </div>

        {/* Grid de Produtos Expandido com Respiro Generoso */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onSelect={onSelectProduct}
            />
          ))}
        </div>

        {/* Barra Inferior de Garantias da Alta Joalheria */}
        <div
          data-collection-header
          className="mt-16 sm:mt-24 p-7 sm:p-10 rounded-[28px] bg-midnight text-pearl border border-champagne/40 shadow-[0_20px_50px_rgba(7,31,51,0.12)] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5 text-center md:text-left flex-col sm:flex-row">
            <div className="w-14 h-14 rounded-full bg-champagne/15 border border-champagne/40 flex items-center justify-center shrink-0">
              <Gem className="w-6 h-6 text-champagne" aria-hidden="true" />
            </div>
            <div>
              <span className="block text-xs uppercase tracking-[0.24em] text-champagne font-medium">
                Certificação Gemológica Internacional
              </span>
              <p className="font-serif text-2xl sm:text-3xl text-pearl mt-1">
                Todas as joias acompanham certificado individual de
                autenticidade das gemas e estojo de couro e veludo marinho.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.2em] text-pearl font-medium shrink-0">
            <ShieldCheck
              className="w-5 h-5 text-champagne"
              aria-hidden="true"
            />
            <span>Entrega Segurada em Todo o Brasil</span>
          </div>
        </div>
      </div>
    </section>
  );
}
