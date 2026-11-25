'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, ArrowUpRight, Compass, Layers } from 'lucide-react';
import {
  animateSectionReveal,
  prefersReducedMotion,
  registerGsapPlugins,
} from '@/lib/animations';
import { Button } from '@/components/ui/Button';

export interface EditorialProps {
  onExploreCollection: () => void;
}

const LAPIDATION_SPECS = [
  {
    label: 'Pureza do Metal',
    value: 'Ouro 18k (750)',
    detail: 'Branco & Champagne Nobre',
  },
  {
    label: 'Gemas Centrais',
    value: 'Safira Ceylan',
    detail: 'Seleção Natural & Brilhantes VVS',
  },
  {
    label: 'Ourivesaria',
    value: 'Feito à Mão',
    detail: 'Série Numerada & Certificada',
  },
];

const EDITORIAL_NOTES = [
  {
    num: '01',
    title: 'Lapidação de Alta Precisão',
    desc: 'Facetas calibradas para maximizar o retorno de luz e revelar o azul aveludado de cada safira.',
  },
  {
    num: '02',
    title: 'Cravação Invisível em Ouro 18k',
    desc: 'Garras esculturais rebaixadas que elevam a gema e permitem a passagem livre da luz em 360°.',
  },
];

export function Editorial({ onExploreCollection }: EditorialProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      animateSectionReveal(sectionRef.current, '[data-editorial-reveal]', {
        y: 30,
        duration: 1.2,
        stagger: 0.14,
      });

      if (!prefersReducedMotion() && sectionRef.current) {
        if (imageFrameRef.current) {
          gsap.fromTo(
            imageFrameRef.current,
            {
              clipPath: 'inset(10% 6% 10% 6%)',
              opacity: 0.85,
            },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              duration: 1.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }

        if (imageWrapRef.current) {
          gsap.fromTo(
            imageWrapRef.current,
            { yPercent: -5, scale: 1.06 },
            {
              yPercent: 5,
              scale: 1.0,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }

        if (watermarkRef.current) {
          gsap.fromTo(
            watermarkRef.current,
            { xPercent: -3 },
            {
              xPercent: 3,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        }

        if (floatingCardRef.current) {
          gsap.fromTo(
            floatingCardRef.current,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              delay: 0.25,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 76%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="editorial"
      ref={sectionRef}
      aria-labelledby="editorial-heading"
      className="relative bg-atlantic text-pearl py-28 sm:py-36 lg:py-44 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden"
    >
      {/* Monumental Watermark Typography in Background — Larger & Clearer */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 top-8 lg:top-12 flex flex-col items-center justify-center overflow-hidden z-0 will-change-transform"
      >
        <span className="text-[13.5vw] font-serif font-light uppercase leading-[0.8] tracking-[0.08em] text-pearl/[0.06] whitespace-nowrap">
          HAUTE JOAILLERIE
        </span>
        <span className="text-[13.5vw] font-serif italic font-light uppercase leading-[0.82] tracking-[0.12em] text-pearl/[0.05] whitespace-nowrap -mt-2">
          LUMIÈRE BLEUE
        </span>
      </div>

      {/* Subtle oceanic ambient glows pushed to outer edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full bg-ocean/35 blur-3xl z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 w-[540px] h-[540px] rounded-full bg-midnight/50 blur-3xl z-0"
      />

      <div className="relative z-10 max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
        {/* Left on Desktop (order-2 lg:order-1) / Bottom on Mobile: Poetic Narrative (Left-to-Right Reading Flow) */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col items-start space-y-7">
          <div
            data-editorial-reveal
            className="inline-flex items-center gap-3.5 text-xs sm:text-sm uppercase tracking-[0.28em] text-champagne font-medium"
          >
            <span className="h-[1px] w-10 bg-champagne" />
            <span>Alta Lapidação · Savoir-Faire</span>
          </div>

          <h2
            id="editorial-heading"
            data-editorial-reveal
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-light text-pearl leading-[1.06] tracking-wide"
          >
            Onde a pedra rara encontra o traço perfeito.
          </h2>

          <p
            data-editorial-reveal
            className="text-base sm:text-lg lg:text-xl text-pearl/90 leading-relaxed font-light"
          >
            O brilho de uma joia nasce do equilíbrio milimétrico entre o corte
            da gema e a arquitetura invisível do ouro 18k.
          </p>

          {/* Editorial Quote Card with High Readability */}
          <blockquote
            data-editorial-reveal
            className="w-full rounded-2xl bg-midnight/50 backdrop-blur-md border-l-2 border-champagne border-y border-r border-y-champagne/25 border-r-champagne/25 p-6 sm:p-7 font-serif italic text-2xl sm:text-[26px] text-pearl leading-snug"
          >
            “Uma grande joia deve parecer ter nascido com a luz dentro de si.
            Nosso trabalho na bancada é apenas libertar esse esplendor.”
            <footer className="mt-3 not-italic font-sans text-xs uppercase tracking-[0.24em] text-champagne font-medium">
              — Mestre Joalheiro NÉRÉA
            </footer>
          </blockquote>

          {/* Numbered Editorial Specifications */}
          <div
            data-editorial-reveal
            className="w-full pt-3 space-y-4 border-t border-champagne/25"
          >
            <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.24em] text-champagne font-medium pt-2">
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>Segredos de Lapidação &amp; Cravação</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {EDITORIAL_NOTES.map((item) => (
                <div
                  key={item.num}
                  className="rounded-2xl bg-midnight/45 border border-champagne/25 p-5 flex flex-col justify-between gap-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl text-champagne font-light leading-none">
                      {item.num}
                    </span>
                    <span className="h-[1px] w-6 bg-champagne/40" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl text-pearl font-normal leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-pearl/85 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            data-editorial-reveal
            className="pt-4 w-full sm:w-auto flex flex-col sm:flex-row sm:items-center gap-5"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onExploreCollection}
              className="rounded-full"
            >
              <span>Ver Peças da Coleção</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Button>
            <span className="text-xs uppercase tracking-[0.22em] text-pearl/80 font-medium">
              04 Criações Numeradas
            </span>
          </div>
        </div>

        {/* Right on Desktop (order-1 lg:order-2) / Top on Mobile: Expansive High-Fashion Editorial Composition */}
        <div className="order-1 lg:order-2 lg:col-span-7 relative">
          {/* Editorial Index Header Bar */}
          <div
            data-editorial-reveal
            className="mb-5 flex items-center justify-between text-xs sm:text-sm uppercase tracking-[0.24em] text-pearl/90 border-b border-champagne/30 pb-3.5"
          >
            <span className="inline-flex items-center gap-2.5 font-medium">
              <Compass className="w-4 h-4 text-champagne" aria-hidden="true" />
              <span>Atelier de Lapidação — Maison NÉRÉA</span>
            </span>
            <span className="text-champagne font-medium">
              Ouro 18k · Safiras Ceylan &amp; Diamantes
            </span>
          </div>

          {/* Main Image Frame (No dark overlay obstructing the jewelry brightness) */}
          <div className="relative">
            <div
              ref={imageFrameRef}
              className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/11] w-full overflow-hidden rounded-2xl bg-midnight border border-champagne/40 shadow-2xl will-change-[clip-path,transform]"
            >
              <div
                ref={imageWrapRef}
                className="relative w-full h-full will-change-transform"
              >
                <Image
                  src="/images/products/editorial-ocean.jpg"
                  alt="Alta joalheria NÉRÉA — Safiras azuis e diamantes em ouro 18k"
                  fill
                  loading="lazy"
                  decoding="async"
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Floating Glassmorphic Campaign Piece Card (Pushed to outer corner on Desktop, below image on Mobile) */}
            <div
              ref={floatingCardRef}
              className="mt-5 lg:mt-0 lg:absolute lg:-bottom-7 lg:right-6 z-20 rounded-2xl bg-midnight/75 backdrop-blur-md border border-champagne/40 p-5 sm:p-6 shadow-2xl max-w-full lg:max-w-[400px]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-champagne font-medium">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Destaque da Coleção</span>
                  </div>
                  <p className="font-serif text-xl sm:text-2xl text-pearl leading-snug">
                    Safira Azul Real &amp; Brilhantes em Ouro 18k
                  </p>
                  <p className="text-xs sm:text-sm text-pearl/85 leading-relaxed">
                    Facetas simétricas e cravação manual para um brilho profundo
                    e inconfundível.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onExploreCollection}
                  aria-label="Explorar peça em destaque da coleção"
                  className="shrink-0 w-10 h-10 rounded-full border border-champagne/50 bg-champagne text-midnight flex items-center justify-center hover:bg-pearl transition-colors cursor-pointer"
                >
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Technical Lapidation Specifications Bar */}
          <div
            data-editorial-reveal
            className="mt-6 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5"
          >
            {LAPIDATION_SPECS.map((spec) => (
              <div
                key={spec.label}
                className="rounded-2xl bg-midnight/55 backdrop-blur-md border border-champagne/30 px-5 py-4 flex flex-col justify-between"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-pearl/80 font-medium">
                  {spec.label}
                </span>
                <span className="mt-1.5 font-serif text-2xl sm:text-3xl text-pearl font-light">
                  {spec.value}
                </span>
                <span className="mt-1 text-xs sm:text-sm text-champagne font-medium">
                  {spec.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
