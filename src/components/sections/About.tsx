'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Gem, Compass, Award, ShieldCheck } from 'lucide-react';
import {
  animateImageMaskReveal,
  prefersReducedMotion,
  registerGsapPlugins,
} from '@/lib/animations';

const PILLARS = [
  {
    num: '01',
    icon: Gem,
    title: 'Gemas Raras Selecionadas',
    description:
      'Safiras azuis, águas-marinhas Santa Maria e diamantes VVS escolhidos individualmente por sua pureza e brilho.',
  },
  {
    num: '02',
    icon: Compass,
    title: 'Ourivesaria de Bancada',
    description:
      'Ouro 18k maciço certificado, forjado, articulado e polido manualmente por mestres joalheiros.',
  },
  {
    num: '03',
    icon: Award,
    title: 'Design de Alta Joalheria',
    description:
      'Cravação precisa e ergonomia pensada para vestir a pele com conforto absoluto e atravessar gerações.',
  },
];

const ATELIER_METRICS = [
  {
    value: '48h',
    label: 'Bancada Artesanal',
  },
  {
    value: '100%',
    label: 'Safiras Naturais',
  },
  {
    value: '18k',
    label: 'Ouro Certificado',
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const secondaryCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (prefersReducedMotion() || !sectionRef.current) return;

      // Smooth mask + scale reveal on the craftsmanship image
      animateImageMaskReveal(
        sectionRef.current,
        imageFrameRef.current,
        imageInnerRef.current,
        {
          fromClipPath: 'inset(8% 5% 8% 5%)',
          toClipPath: 'inset(0% 0% 0% 0%)',
          fromScale: 1.08,
          toScale: 1,
          duration: 1.35,
          start: 'top 80%',
        }
      );

      // Sequential entrance for headline, narrative text, Bento pillars, and layered visual cards
      const revealTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      revealTl
        .fromTo(
          '[data-about-header]',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, stagger: 0.12 },
          0
        )
        .fromTo(
          '[data-about-text]',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.05, stagger: 0.14 },
          0.22
        )
        .fromTo(
          '[data-about-pillar]',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, stagger: 0.14 },
          0.42
        );

      if (secondaryCardRef.current) {
        gsap.fromTo(
          secondaryCardRef.current,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="relative bg-pearl text-midnight py-28 sm:py-36 lg:py-44 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden"
    >
      {/* Monumental Architectural Watermark — Larger & Clearer */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 top-8 lg:top-12 flex justify-center overflow-hidden z-0"
      >
        <span className="text-[14.5vw] font-serif font-light uppercase leading-[0.8] tracking-[0.09em] text-midnight/[0.05] whitespace-nowrap">
          SAVOIR-FAIRE
        </span>
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 xl:gap-24 items-center">
          {/* Left on Desktop (order-2 lg:order-1) / Second on Mobile: Story & Numbered Bento Pillars (Left-to-Right Flow) */}
          <div className="order-2 lg:order-1 lg:col-span-6 space-y-7">
            <div
              data-about-header
              className="inline-flex items-center gap-3.5 text-xs sm:text-sm uppercase tracking-[0.26em] text-ocean font-medium"
            >
              <span className="h-[1px] w-10 bg-champagne" />
              <span>A Maison — Atelier NÉRÉA</span>
            </div>

            <h2
              id="about-heading"
              data-about-header
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-light text-midnight leading-[1.06] tracking-wide"
            >
              A excelência silenciosa da alta ourivesaria.
            </h2>

            <p
              data-about-text
              className="text-base sm:text-lg lg:text-xl text-midnight/90 leading-relaxed"
            >
              Em nosso atelier, cada criação nasce do encontro entre o desenho
              autoral e a tradição da alta joalheria clássica — onde o metal
              nobre é moldado à mão para exaltar a luz de gemas raras.
            </p>

            <p
              data-about-text
              className="text-base sm:text-lg text-midnight/80 leading-relaxed"
            >
              Da escolha criteriosa de safiras azuis e diamantes naturais até a
              articulação invisível de cada elo e o polimento espelhado final,
              dedicamos semanas de trabalho manual para alcançar proporções
              perfeitas e conforto absoluto na pele.
            </p>

            {/* Three Numbered Bento Craftsmanship Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    data-about-pillar
                    className="group rounded-2xl bg-white/85 backdrop-blur-sm border border-champagne/45 p-5 sm:p-6 shadow-sm hover:border-champagne hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl sm:text-3xl text-champagne font-light leading-none">
                        {pillar.num}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-midnight/5 border border-champagne/50 flex items-center justify-center text-atlantic">
                        <Icon className="w-4 h-4 text-champagne" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-xl sm:text-2xl text-midnight font-medium leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-midnight/80 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right on Desktop (order-1 lg:order-2) / First on Mobile: Expansive Layered Craftsmanship Composition */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <div className="relative w-full max-w-2xl mx-auto lg:ml-auto">
              {/* Top Certification Badge */}
              <div
                data-about-header
                className="mb-4 flex items-center justify-between px-5 py-3 rounded-full bg-midnight text-pearl border border-champagne/45 shadow-md"
              >
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.22em] text-champagne font-medium">
                  <ShieldCheck className="w-4 h-4 text-champagne" aria-hidden="true" />
                  <span>Au 750 · RJC Certified</span>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-pearl/90 font-medium">
                  Lote N° 018-A
                </span>
              </div>

              {/* Primary Portrait Frame (No dark gradient overlay obstructing the jewelry) */}
              <div className="relative">
                <div
                  ref={imageFrameRef}
                  className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/4.3] w-full overflow-hidden rounded-2xl bg-midnight border border-champagne/45 shadow-2xl will-change-[clip-path,transform]"
                >
                  <div
                    ref={imageInnerRef}
                    className="relative w-full h-full will-change-transform"
                  >
                    <Image
                      src="/images/products/about-craft.jpg"
                      alt="Detalhe artesanal da pulseira Abyss Bracelet em ouro 18k NÉRÉA"
                      fill
                      loading="lazy"
                      decoding="async"
                      quality={90}
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Peripheral Savoir-Faire Caption Card at bottom-left edge */}
                  <div className="absolute bottom-5 left-5 right-5 sm:right-52 p-4 sm:p-5 rounded-2xl bg-midnight/85 backdrop-blur-md border border-champagne/40 text-pearl">
                    <span className="block text-xs uppercase tracking-[0.24em] text-champagne font-medium mb-1">
                      Savoir-Faire
                    </span>
                    <p className="font-serif text-lg sm:text-xl text-pearl leading-snug">
                      Articulação manual elo por elo em Ouro 18k Certificado.
                    </p>
                  </div>
                </div>

                {/* Secondary Framed Miniature Card Overlaid at outer right corner */}
                <div
                  ref={secondaryCardRef}
                  className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-4 z-20 w-full sm:w-48 rounded-2xl bg-midnight/95 backdrop-blur-md border border-champagne/45 p-3 shadow-2xl text-pearl"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-champagne/30">
                    <Image
                      src="/images/products/eclat-necklace.jpg"
                      alt="Detalhe do colar Éclat Necklace em ouro 18k e safira NÉRÉA"
                      fill
                      loading="lazy"
                      decoding="async"
                      quality={85}
                      sizes="192px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="pt-2.5 px-1">
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-champagne font-medium">
                      Estudo de Luz
                    </span>
                    <p className="font-serif text-base text-pearl leading-tight mt-0.5">
                      Éclat · Cravação Calibrada
                    </p>
                  </div>
                </div>
              </div>

              {/* Atelier Metrics Row */}
              <div
                data-about-pillar
                className="mt-6 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-4"
              >
                {ATELIER_METRICS.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl bg-midnight text-pearl border border-champagne/40 px-4 py-4 text-center shadow-md"
                  >
                    <span className="block font-serif text-2xl sm:text-3xl lg:text-4xl text-champagne font-light leading-none">
                      {metric.value}
                    </span>
                    <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-pearl/90 font-medium">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
