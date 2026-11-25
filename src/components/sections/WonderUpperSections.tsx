'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PRODUCTS, type Product } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';

export interface WonderUpperSectionsProps {
  onSelectProduct: (product: Product) => void;
  onAddToBag?: (product: Product) => void;
  onNavigate?: (targetSelector: string) => void;
}

interface DepartmentItem {
  id: string;
  title: string;
  image: string;
  targetTab: string;
  targetSection: 'edit' | 'essentials';
}

const DEPARTMENTS: DepartmentItem[] = [
  {
    id: 'dept-aneis',
    title: 'Anéis',
    image: '/images/catalog/covers/capa-anel-imperial-safira-mao.jpg',
    targetTab: 'aneis',
    targetSection: 'edit',
  },
  {
    id: 'dept-colares',
    title: 'Colares',
    image: '/images/catalog/covers/capa-mulher-colar-gota-safira.jpg',
    targetTab: 'colares',
    targetSection: 'edit',
  },
  {
    id: 'dept-pulseiras',
    title: 'Pulseiras',
    image: '/images/catalog/covers/capa-pulseira-safira-ouro-pulso.jpg',
    targetTab: 'pulseiras',
    targetSection: 'edit',
  },
  {
    id: 'dept-brincos',
    title: 'Brincos',
    image: '/images/catalog/covers/capa-mulher-brincos-safira.jpg',
    targetTab: 'colares',
    targetSection: 'edit',
  },
  {
    id: 'dept-solitarios',
    title: 'Solitários',
    image: '/images/catalog/covers/capa-solitario-diamante-mao.jpg',
    targetTab: 'aneis',
    targetSection: 'edit',
  },
  {
    id: 'dept-safiras',
    title: 'Safiras',
    image: '/images/catalog/covers/capa-anel-oval-safira-veludo.jpg',
    targetTab: 'safiras',
    targetSection: 'essentials',
  },
  {
    id: 'dept-diamantes',
    title: 'Diamantes',
    image: '/images/catalog/covers/capa-solitario-diamante-e-riviera.jpg',
    targetTab: 'diamantes',
    targetSection: 'essentials',
  },
  {
    id: 'dept-alta-joalheria',
    title: 'Alta Joalheria',
    image: '/images/products/editorial-ocean.jpg',
    targetTab: 'novidades',
    targetSection: 'edit',
  },
];

const DESIGN_EDIT_TABS = [
  { id: 'novidades', label: 'Novidades' },
  { id: 'aneis', label: 'Anéis & Solitários' },
  { id: 'pulseiras', label: 'Pulseiras & Ouro 18k' },
  { id: 'colares', label: 'Colares & Brincos' },
] as const;

const ESSENTIALS_TABS = [
  { id: 'safiras', label: 'Safiras Ceylan' },
  { id: 'diamantes', label: 'Diamantes VVS' },
  { id: 'ourivesaria', label: 'Ouro 18k & Rivieras' },
] as const;

export function WonderUpperSections({
  onSelectProduct,
  onAddToBag,
}: WonderUpperSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const designEditRef = useRef<HTMLElement>(null);
  const essentialsRef = useRef<HTMLElement>(null);

  const [activeEditTab, setActiveEditTab] = useState<string>('novidades');
  const [editPageOffset, setEditPageOffset] = useState<number>(0);

  const [activeEssentialsTab, setActiveEssentialsTab] =
    useState<string>('safiras');
  const [essentialsOffset, setEssentialsOffset] = useState<number>(0);

  // Bidirectional Scroll Reveal (Entry & Exit) matching Wonder Theme's animations.js
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>('[data-wt-reveal]')
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.remove('wt-scroll-reveal--offscreen');
          } else {
            target.classList.add('wt-scroll-reveal--offscreen');
          }
        });
      },
      {
        rootMargin: '0px 0px -45px 0px',
        threshold: 0.08,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleDepartmentClick = (
    targetTab: string,
    targetSection: 'edit' | 'essentials' = 'edit'
  ) => {
    if (targetSection === 'essentials') {
      setActiveEssentialsTab(targetTab);
      setEssentialsOffset(0);
      if (essentialsRef.current) {
        essentialsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setActiveEditTab(targetTab);
    setEditPageOffset(0);
    if (designEditRef.current) {
      designEditRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter products for Section C (The Design Edit)
  const filteredEditProducts = PRODUCTS.filter((p) =>
    p.tabGroup.includes(activeEditTab)
  );
  const editPool =
    filteredEditProducts.length >= 4 ? filteredEditProducts : PRODUCTS;
  const visibleEditProducts = Array.from(
    { length: Math.min(4, editPool.length) },
    (_, idx) => {
      return editPool[(editPageOffset + idx) % editPool.length];
    }
  );

  // Filter products for Section E (Essenciais da Alta Joalheria)
  const filteredEssentials = PRODUCTS.filter((p) =>
    p.tabGroup.includes(activeEssentialsTab)
  );
  const essentialsPool =
    filteredEssentials.length >= 4 ? filteredEssentials : PRODUCTS;
  const visibleEssentialsProducts = Array.from(
    { length: Math.min(4, essentialsPool.length) },
    (_, idx) => {
      return essentialsPool[(essentialsOffset + idx) % essentialsPool.length];
    }
  );

  const editProgressPercent =
    ((DEFINE_TAB_INDEX(DESIGN_EDIT_TABS, activeEditTab) + 1) /
      DESIGN_EDIT_TABS.length) *
    100;

  const essentialsProgressPercent =
    ((DEFINE_TAB_INDEX(ESSENTIALS_TABS, activeEssentialsTab) + 1) /
      ESSENTIALS_TABS.length) *
    100;

  return (
    <div ref={containerRef} className="bg-white text-[#1e1b18]">
      {/* ======================================================================
          SEÇÃO A: SHOP BY DEPARTMENT (Compre por Categoria — 8 Colunas Desktop)
          ====================================================================== */}
      <section
        id="departments"
        aria-labelledby="departments-heading"
        className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-14"
      >
        <div
          data-wt-reveal
          style={{ '--animation-order': 0 } as React.CSSProperties}
          className="wt-scroll-reveal mb-6 sm:mb-8 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#9b9b9b] font-medium mb-1.5">
            Curadoria da Maison
          </p>
          <h2
            id="departments-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-light tracking-[0.01em] text-[#1e1b18] leading-[1.15]"
          >
            Compre por <span className="italic">Categoria</span>
          </h2>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
          {DEPARTMENTS.map((dept, idx) => (
            <li
              key={dept.id}
              data-wt-reveal
              style={{ '--animation-order': idx + 1 } as React.CSSProperties}
              className="wt-scroll-reveal"
            >
              <button
                type="button"
                onClick={() =>
                  handleDepartmentClick(dept.targetTab, dept.targetSection)
                }
                className="group w-full flex flex-col items-center text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1e1b18]"
              >
                <div className="relative w-full aspect-[4/5] bg-[#F7F6F3] overflow-hidden">
                  <Image
                    src={dept.image}
                    alt={dept.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 639px) 45vw, (max-width: 1023px) 22vw, 12vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <span className="mt-2.5 text-[14px] sm:text-[15px] font-medium text-[#1e1b18] group-hover:text-[#165D7A] transition-colors">
                  {dept.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ======================================================================
          SEÇÃO B: 3-PANEL MOSAIC COLLAGE (.wt-mosaic 1:1 Wonder Theme)
          Painel Esquerdo 66.66% + Coluna Direita 33.33% (2 painéis empilhados)
          ====================================================================== */}
      <section
        aria-label="Mosaico de Coleções NÉRÉA"
        className="wt-mosaic max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 pb-8"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-[8px] lg:h-[600px] xl:h-[650px]">
          {/* Painel Principal Esquerdo (66.66% largura) */}
          <div
            data-wt-reveal
            style={{ '--animation-order': 1 } as React.CSSProperties}
            className="wt-scroll-reveal relative w-full lg:w-[calc(66.66%-4px)] min-h-[380px] sm:min-h-[460px] lg:min-h-0 lg:h-full overflow-hidden group cursor-pointer"
            onClick={() => handleDepartmentClick('novidades')}
          >
            <Image
              src="/images/catalog/covers/capa-mao-segurando-solitario-diamante.jpg"
              alt="Alta Joalheria para Momentos Eternos — Maison NÉRÉA"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[#1e1e1c]/30 transition-opacity duration-500 group-hover:bg-[#1e1e1c]/25"
            />

            <div className="relative z-10 w-full h-full p-6 sm:p-10 lg:p-12 flex flex-col justify-start items-center sm:items-start text-center sm:text-left">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[48px] font-light text-white leading-[1.1] max-w-md">
                Alta Joalheria
                <br />
                <span className="italic">para Momentos Eternos</span>
              </h2>
              <div className="mt-4">
                <span className="wt-link-underline text-white text-[14px] tracking-[0.04em] font-light">
                  Explorar Coleção
                </span>
              </div>
            </div>
          </div>

          {/* Coluna Direita (33.33% largura com 2 painéis 50% altura) */}
          <div className="w-full lg:w-[calc(33.34%-4px)] flex flex-col sm:flex-row lg:flex-col justify-between gap-[8px] lg:h-full">
            {/* Painel Superior Direito */}
            <div
              data-wt-reveal
              style={{ '--animation-order': 2 } as React.CSSProperties}
              className="wt-scroll-reveal relative w-full sm:w-[calc(50%-4px)] lg:w-full min-h-[280px] lg:min-h-0 lg:h-[calc(50%-4px)] overflow-hidden group cursor-pointer"
              onClick={() => handleDepartmentClick('pulseiras')}
            >
              <Image
                src="/images/catalog/covers/capa-riviera-safira-pulso.jpg"
                alt="Pulseiras Riviera em Ouro 18k e Safiras"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#1e1e1c]/22 transition-opacity duration-500 group-hover:bg-[#1e1e1c]/15"
              />

              <div className="relative z-10 w-full h-full p-6 flex flex-col items-center justify-center text-center">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[36px] font-light text-white leading-[1.15]">
                  Rivieras de <span className="italic">Safira</span>
                </h2>
                <div className="mt-3">
                  <span className="wt-link-underline text-white text-[14px] tracking-[0.04em] font-light">
                    Ver Pulseiras
                  </span>
                </div>
              </div>
            </div>

            {/* Painel Inferior Direito */}
            <div
              data-wt-reveal
              style={{ '--animation-order': 3 } as React.CSSProperties}
              className="wt-scroll-reveal relative w-full sm:w-[calc(50%-4px)] lg:w-full min-h-[280px] lg:min-h-0 lg:h-[calc(50%-4px)] overflow-hidden group cursor-pointer"
              onClick={() => handleDepartmentClick('aneis')}
            >
              <Image
                src="/images/catalog/covers/capa-anel-safira-ouro-vertical.jpg"
                alt="Lapidação Real e Solitários NÉRÉA"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#1e1e1c]/20 transition-opacity duration-500 group-hover:bg-[#1e1e1c]/15"
              />

              <div className="relative z-10 w-full h-full p-6 flex flex-col items-center justify-center text-center">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[36px] font-light text-white leading-[1.15]">
                  Luz &amp; <span className="italic">Lapidação</span>
                </h2>
                <div className="mt-3">
                  <span className="wt-link-underline text-white text-[14px] tracking-[0.04em] font-light">
                    Ver Solitários
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SEÇÃO C: THE DESIGN EDIT + FEATURED COLLECTIONS TABS (4 Cards + Preços)
          ====================================================================== */}
      <section
        id="collection"
        ref={designEditRef}
        aria-labelledby="design-edit-heading"
        className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-14 sm:pb-20"
      >
        {/* Compact Rich Text Heading Left */}
        <div
          data-wt-reveal
          style={{ '--animation-order': 0 } as React.CSSProperties}
          className="wt-scroll-reveal mb-4"
        >
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#9b9b9b] font-medium mb-1.5">
            Destaques da Temporada
          </p>
          <h2
            id="design-edit-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-light text-[#222321] leading-[1.12]"
          >
            The Design <span className="italic">Edit</span>
          </h2>
        </div>

        {/* Tabs Header + Carousel Navigation Arrows */}
        <div
          data-wt-reveal
          style={{ '--animation-order': 1 } as React.CSSProperties}
          className="wt-scroll-reveal flex items-center justify-between gap-4 border-b border-[#e6e3de] pb-3 mb-6"
        >
          <div
            role="tablist"
            aria-label="Categorias em destaque"
            className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar"
          >
            {DESIGN_EDIT_TABS.map((tab) => {
              const isSelected = activeEditTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveEditTab(tab.id);
                    setEditPageOffset(0);
                  }}
                  className={`wt-tab-btn text-[15px] sm:text-[16px] whitespace-nowrap py-1 cursor-pointer transition-colors ${
                    isSelected
                      ? 'text-[#1e1b18] font-medium'
                      : 'text-[#1e1b18]/70 hover:text-[#1e1b18]'
                  }`}
                >
                  <span className="wt-tab-label">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Slider Prev / Next Arrows */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() =>
                setEditPageOffset((prev) =>
                  prev === 0 ? editPool.length - 1 : prev - 1
                )
              }
              aria-label="Produtos anteriores"
              className="wt-gallery-arrow wt-gallery-arrow--prev !rounded-full !border !border-[#e6e3de]"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12H19M10 7L5 12M10 17L5 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() =>
                setEditPageOffset((prev) => (prev + 1) % editPool.length)
              }
              aria-label="Próximos produtos"
              className="wt-gallery-arrow wt-gallery-arrow--next !rounded-full !border !border-[#e6e3de]"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M19 12H5M14 17L19 12M14 7L19 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 4-Column Product Grid with Prices Below Each Card */}
        <div
          role="tabpanel"
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10"
        >
          {visibleEditProducts.map((product, idx) => (
            <div
              key={`edit-${activeEditTab}-${product.id}-${idx}`}
              data-wt-reveal
              style={{ '--animation-order': idx + 1 } as React.CSSProperties}
              className="wt-scroll-reveal"
            >
              <ProductCard
                product={product}
                index={idx}
                onSelect={onSelectProduct}
                onQuickAdd={onAddToBag}
              />
            </div>
          ))}
        </div>

        {/* Swiper-style Scrollbar Progress Track */}
        <div
          aria-hidden="true"
          className="mt-8 sm:mt-10 w-full h-[2px] bg-black/10 relative overflow-hidden"
        >
          <div
            className="h-full bg-[#4c4a45] transition-all duration-300 ease-out"
            style={{ width: `${editProgressPercent}%` }}
          />
        </div>
      </section>

      {/* ======================================================================
          SEÇÃO D: SPLIT IMAGE WITH TEXT BANNER (50/50 — Série Numerada Lumière)
          ====================================================================== */}
      <section
        id="manifesto"
        aria-labelledby="split-banner-heading"
        className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8"
      >
        <div
          data-wt-reveal
          style={{ '--animation-order': 1 } as React.CSSProperties}
          className="wt-scroll-reveal grid grid-cols-1 lg:grid-cols-12 bg-[#F4EEDA]/55 border border-[#e6e3de] overflow-hidden"
        >
          {/* Left 50%: Campaign High-Jewelry Image */}
          <div className="lg:col-span-6 relative min-h-[360px] sm:min-h-[460px] lg:min-h-[560px] bg-[#F7F6F3] overflow-hidden group">
            <Image
              src="/images/catalog/covers/capa-bracelete-caverna-cristal.jpg"
              alt="Série Numerada Lumière — Alta Ourivesaria NÉRÉA"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
            />
          </div>

          {/* Right 50%: Editorial Typography + Fill-on-Hover Pill CTA */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-center items-start text-left">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#9b9b9b] font-medium mb-2.5">
              Série Numerada Lumière
            </span>
            <h2
              id="split-banner-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-light text-[#1e1b18] leading-[1.12] mb-5 max-w-lg"
            >
              A Nobreza do Ouro 18k <span className="italic">Forjado à Mão</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#1e1b18]/80 font-light leading-[1.65] mb-8 max-w-xl">
              Cada criação da Maison NÉRÉA nasce de dezenas de horas de bancada
              artesanal. Selecionamos safiras naturais de matiz royal,
              águas-marinhas Santa Maria e diamantes VVS para conceber joias com
              caimento de seda e brilho eterno.
            </p>
            <button
              type="button"
              onClick={() => onSelectProduct(PRODUCTS[3])}
              style={
                {
                  '--btn-hover-fill': '#165D7A',
                  '--btn-hover-text': '#ffffff',
                } as React.CSSProperties
              }
              className="wt-btn-fill px-7 py-3.5 bg-[#071F33] text-white text-[13px] uppercase tracking-[0.16em] font-medium border border-[#071F33] hover:border-[#165D7A] cursor-pointer"
            >
              <span>Conhecer a Peça Assinatura</span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SEÇÃO E: CURADORIA PERMANENTE (Segunda Featured Collections Tabs)
          ====================================================================== */}
      <section
        ref={essentialsRef}
        aria-labelledby="essentials-heading"
        className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-14 sm:pb-20"
      >
        <div
          data-wt-reveal
          style={{ '--animation-order': 0 } as React.CSSProperties}
          className="wt-scroll-reveal mb-4"
        >
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#9b9b9b] font-medium mb-1.5">
            Curadoria Permanente
          </p>
          <h2
            id="essentials-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-light text-[#222321] leading-[1.12]"
          >
            Essenciais da <span className="italic">Alta Joalheria</span>
          </h2>
        </div>

        {/* Tabs Header */}
        <div
          data-wt-reveal
          style={{ '--animation-order': 1 } as React.CSSProperties}
          className="wt-scroll-reveal flex items-center justify-between gap-4 border-b border-[#e6e3de] pb-3 mb-6"
        >
          <div
            role="tablist"
            aria-label="Abas da Curadoria Permanente"
            className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar"
          >
            {ESSENTIALS_TABS.map((tab) => {
              const isSelected = activeEssentialsTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveEssentialsTab(tab.id);
                    setEssentialsOffset(0);
                  }}
                  className={`wt-tab-btn text-[15px] sm:text-[16px] whitespace-nowrap py-1 cursor-pointer transition-colors ${
                    isSelected
                      ? 'text-[#1e1b18] font-medium'
                      : 'text-[#1e1b18]/70 hover:text-[#1e1b18]'
                  }`}
                >
                  <span className="wt-tab-label">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Slider Prev / Next Arrows */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() =>
                setEssentialsOffset((prev) =>
                  prev === 0 ? essentialsPool.length - 1 : prev - 1
                )
              }
              aria-label="Peças anteriores"
              className="wt-gallery-arrow wt-gallery-arrow--prev !rounded-full !border !border-[#e6e3de]"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12H19M10 7L5 12M10 17L5 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() =>
                setEssentialsOffset(
                  (prev) => (prev + 1) % essentialsPool.length
                )
              }
              aria-label="Próximas peças"
              className="wt-gallery-arrow wt-gallery-arrow--next !rounded-full !border !border-[#e6e3de]"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M19 12H5M14 17L19 12M14 7L19 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div
          role="tabpanel"
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10"
        >
          {visibleEssentialsProducts.map((product, idx) => (
            <div
              key={`essentials-${activeEssentialsTab}-${product.id}-${idx}`}
              data-wt-reveal
              style={{ '--animation-order': idx + 1 } as React.CSSProperties}
              className="wt-scroll-reveal"
            >
              <ProductCard
                product={product}
                index={idx}
                onSelect={onSelectProduct}
                onQuickAdd={onAddToBag}
              />
            </div>
          ))}
        </div>

        {/* Swiper-style Scrollbar Progress Track */}
        <div
          aria-hidden="true"
          className="mt-8 sm:mt-10 w-full h-[2px] bg-black/10 relative overflow-hidden"
        >
          <div
            className="h-full bg-[#4c4a45] transition-all duration-300 ease-out"
            style={{ width: `${essentialsProgressPercent}%` }}
          />
        </div>
      </section>
    </div>
  );
}

function DEFINE_TAB_INDEX(
  tabs: readonly { id: string; label: string }[],
  activeId: string
): number {
  const idx = tabs.findIndex((t) => t.id === activeId);
  return idx >= 0 ? idx : 0;
}
