'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PRODUCTS, type Product } from '@/data/products';
import { prefersReducedMotion, registerGsapPlugins } from '@/lib/animations';

export interface HeroProps {
  onExploreClick: () => void;
  onSelectProduct?: (product: Product) => void;
}

export function Hero({ onExploreClick, onSelectProduct }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Camada 1 (z-0 Oceano): Scroll Wrapper -> Cursor Wrapper -> Intro Wrapper
  const bgScrollRef = useRef<HTMLDivElement>(null);
  const bgCursorRef = useRef<HTMLDivElement>(null);
  const bgIntroRef = useRef<HTMLDivElement>(null);

  // Camada 2 (z-10 Tipografia Monumental): Scroll Wrapper -> Cursor Wrapper -> [data-hero-back-text] Intro
  const backTitleScrollRef = useRef<HTMLDivElement>(null);
  const backTitleCursorRef = useRef<HTMLDivElement>(null);

  // Camada 3 (z-20 Mão + Pulseira): Scroll Wrapper -> Cursor Wrapper -> Intro Wrapper
  const handDesktopScrollRef = useRef<HTMLDivElement>(null);
  const handDesktopCursorRef = useRef<HTMLDivElement>(null);
  const handDesktopIntroRef = useRef<HTMLDivElement>(null);

  const handMobileScrollRef = useRef<HTMLDivElement>(null);
  const handMobileIntroRef = useRef<HTMLDivElement>(null);

  // Camada 4 (z-30 Blocos Editoriais Flutuantes): Cursor Wrappers (Top / Bottom) -> Scroll Wrappers -> Intro Wrappers
  const floatingUiRef = useRef<HTMLDivElement>(null);
  const topCornersCursorRef = useRef<HTMLDivElement>(null);
  const bottomCornersCursorRef = useRef<HTMLDivElement>(null);

  const braceletProduct = PRODUCTS[3]; // Pulseira Riviera Lumière

  useGSAP(
    () => {
      registerGsapPlugins();
      const sectionEl = sectionRef.current;
      if (prefersReducedMotion() || !sectionEl) return;

      // ========================================================================
      // 1. ENTRADA CINEMATOGRÁFICA EM CAMADAS (No carregamento da página)
      // ========================================================================
      const entranceTl = gsap.timeline({
        defaults: { ease: 'expo.out' },
      });

      const cornerInitialVectors: Record<string, { x: number; y: number }> = {
        tl: { x: -44, y: -24 },
        tr: { x: 44, y: -24 },
        bl: { x: -44, y: 32 },
        br: { x: 44, y: 32 },
      };

      const cornerNodes = gsap.utils.toArray<HTMLElement>('[data-hero-corner]');

      entranceTl
        // Camada 1 (z-0 Oceano): scale 1.15, y: 25 -> scale 1.05, y: 0 (mantém 1.05 p/ margem do cursor)
        .fromTo(
          bgIntroRef.current,
          { scale: 1.15, y: 25 },
          { scale: 1.05, y: 0, duration: 2.2, ease: 'expo.out' },
          0
        )
        // Camada 2 (z-10 'A arte da alta' + 'Joalheria'): emerge detrás da água
        .fromTo(
          '[data-hero-back-text]',
          { y: 85, scale: 0.93, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.75,
            stagger: 0.14,
            ease: 'expo.out',
          },
          0.06
        )
        // Camada 3 (z-20 Mão + Pulseira Riviera): sobe do 1º plano na frente de 'Joalheria'
        .fromTo(
          handDesktopIntroRef.current,
          {
            y: 135,
            x: -14,
            rotate: -1.8,
            scale: 1.06,
            opacity: 0,
            transformOrigin: '15% 100%',
          },
          {
            y: 0,
            x: 0,
            rotate: 0,
            scale: 1.02,
            opacity: 1,
            transformOrigin: '15% 100%',
            duration: 1.85,
            ease: 'power4.out',
          },
          0.12
        )
        .fromTo(
          handMobileIntroRef.current,
          {
            y: 115,
            x: -14,
            rotate: -1.5,
            scale: 1.05,
            opacity: 0,
            transformOrigin: '0% 100%',
          },
          {
            y: 0,
            x: 0,
            rotate: 0,
            scale: 1.02,
            opacity: 1,
            transformOrigin: '0% 100%',
            duration: 1.85,
            ease: 'power4.out',
          },
          0.12
        )
        // Camada 4 (z-30 Os 4 Blocos dos Cantos): convergência periférica
        .fromTo(
          cornerNodes,
          {
            x: (i, el: HTMLElement) =>
              cornerInitialVectors[el.dataset.heroCorner || 'tl']?.x ?? 0,
            y: (i, el: HTMLElement) =>
              cornerInitialVectors[el.dataset.heroCorner || 'tl']?.y ?? 0,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.09,
            ease: 'expo.out',
          },
          0.26
        );

      // ========================================================================
      // 2. SAÍDA E RE-ENTRADA EM CAMADAS NO SCROLL + 3. CURSOR PARALLAX 60FPS
      // ========================================================================
      const mm = gsap.matchMedia();

      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          // Garante o pivô anatômico do pulso (15% 100%) em todos os wrappers da mão desktop
          gsap.set(
            [
              handDesktopScrollRef.current,
              handDesktopCursorRef.current,
              handDesktopIntroRef.current,
            ],
            { transformOrigin: '15% 100%' }
          );

          // 2A. ScrollTrigger Desktop (scrub: 0.65, reversível ao subir)
          const desktopScrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.65,
            },
          });

          desktopScrollTl
            // Camada 1 (z-0 Oceano): desce lentamente em parallax profundo
            .to(
              bgScrollRef.current,
              {
                yPercent: 18,
                scale: 1.12,
                ease: 'none',
                duration: 1,
              },
              0
            )
            // Camada 2 (z-10 'A arte da alta' + 'Joalheria'): sobe por trás da mão
            .to(
              backTitleScrollRef.current,
              {
                yPercent: -30,
                scale: 0.95,
                opacity: 0.12,
                ease: 'none',
                duration: 1,
              },
              0
            )
            // Camada 3 (z-20 Mão + Pulseira): move-se em sentido oposto ao texto (sempre descendo de 0 a 16%)
            .fromTo(
              handDesktopScrollRef.current,
              {
                yPercent: 0,
                scale: 1,
                rotate: 0,
                transformOrigin: '15% 100%',
              },
              {
                yPercent: 16,
                scale: 1.07,
                rotate: 1.2,
                transformOrigin: '15% 100%',
                ease: 'none',
                duration: 1,
              },
              0
            )
            // Camada 4 (z-30 Cantos Editoriais TL, TR, BL e BR): saída radial em camadas
            .to(
              '[data-hero-scroll-corner="tl"]',
              {
                y: -110,
                x: -28,
                opacity: 0,
                ease: 'power1.inOut',
                duration: 0.85,
              },
              0.05
            )
            .to(
              '[data-hero-scroll-corner="tr"]',
              {
                y: -105,
                x: 28,
                opacity: 0,
                ease: 'power1.inOut',
                duration: 0.85,
              },
              0.06
            )
            .to(
              '[data-hero-scroll-corner="bl"]',
              {
                y: -85,
                x: -24,
                opacity: 0,
                ease: 'power1.inOut',
                duration: 0.9,
              },
              0.1
            )
            .to(
              '[data-hero-scroll-corner="br"]',
              {
                y: -95,
                x: 24,
                opacity: 0,
                ease: 'power1.inOut',
                duration: 0.9,
              },
              0.1
            );

          // 3. Interação 3D Fluida com o Cursor (gsap.quickTo 60fps em wrappers dedicados)
          const bgX = gsap.quickTo(bgCursorRef.current, 'x', {
            duration: 1.35,
            ease: 'power3.out',
          });
          const bgY = gsap.quickTo(bgCursorRef.current, 'y', {
            duration: 1.35,
            ease: 'power3.out',
          });

          const titleX = gsap.quickTo(backTitleCursorRef.current, 'x', {
            duration: 1.05,
            ease: 'power3.out',
          });
          const titleY = gsap.quickTo(backTitleCursorRef.current, 'y', {
            duration: 1.05,
            ease: 'power3.out',
          });

          const handX = gsap.quickTo(handDesktopCursorRef.current, 'x', {
            duration: 0.9,
            ease: 'power3.out',
          });
          const handY = gsap.quickTo(handDesktopCursorRef.current, 'y', {
            duration: 0.9,
            ease: 'power3.out',
          });
          const handRot = gsap.quickTo(
            handDesktopCursorRef.current,
            'rotation',
            {
              duration: 0.9,
              ease: 'power3.out',
            }
          );

          const topCornersX = gsap.quickTo(topCornersCursorRef.current, 'x', {
            duration: 0.8,
            ease: 'power3.out',
          });
          const topCornersY = gsap.quickTo(topCornersCursorRef.current, 'y', {
            duration: 0.8,
            ease: 'power3.out',
          });

          const bottomCornersX = gsap.quickTo(
            bottomCornersCursorRef.current,
            'x',
            {
              duration: 0.85,
              ease: 'power3.out',
            }
          );
          const bottomCornersY = gsap.quickTo(
            bottomCornersCursorRef.current,
            'y',
            {
              duration: 0.85,
              ease: 'power3.out',
            }
          );

          const handleMouseMove = (e: MouseEvent) => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;

            // Camada 1 (z-0 Oceano)
            bgX(nx * -16);
            bgY(ny * -12);

            // Camada 2 (z-10 'A arte da alta' + 'Joalheria') — desliza em sentido inverso atrás da mão
            titleX(nx * -32);
            titleY(ny * -20);

            // Camada 3 (z-20 Mão + Pulseira) — move-se em direção oposta ao texto com pivô no pulso (15% 100%) e sangria de 56px
            handX(nx * 22);
            handY(ny * 12);
            handRot(nx * 1.05);

            // Camada 4 (z-30 Cards Flutuantes)
            topCornersX(nx * 12);
            topCornersY(ny * 9);
            bottomCornersX(nx * 16);
            bottomCornersY(ny * 12);
          };

          const handleMouseLeave = () => {
            bgX(0);
            bgY(0);
            titleX(0);
            titleY(0);
            handX(0);
            handY(0);
            handRot(0);
            topCornersX(0);
            topCornersY(0);
            bottomCornersX(0);
            bottomCornersY(0);
          };

          sectionEl.addEventListener('mousemove', handleMouseMove, {
            passive: true,
          });
          sectionEl.addEventListener('mouseleave', handleMouseLeave, {
            passive: true,
          });

          return () => {
            sectionEl.removeEventListener('mousemove', handleMouseMove);
            sectionEl.removeEventListener('mouseleave', handleMouseLeave);
          };
        }
      );

      mm.add(
        '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
        () => {
          const mobileScrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.65,
            },
          });

          mobileScrollTl
            .to(
              bgScrollRef.current,
              {
                yPercent: 10,
                scale: 1.08,
                ease: 'none',
                duration: 1,
              },
              0
            )
            .to(
              backTitleScrollRef.current,
              {
                yPercent: -18,
                opacity: 0.18,
                ease: 'none',
                duration: 1,
              },
              0
            )
            .to(
              handMobileScrollRef.current,
              {
                yPercent: 10,
                scale: 1.04,
                transformOrigin: 'left bottom',
                ease: 'none',
                duration: 1,
              },
              0
            )
            .to(
              '[data-hero-scroll-corner]',
              {
                y: -60,
                opacity: 0,
                ease: 'power1.inOut',
                duration: 0.85,
              },
              0.1
            );
        }
      );

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Destaque The Ocean Collection"
      className="relative w-full h-[100svh] min-h-[720px] md:min-h-[820px] max-h-[1240px] overflow-hidden bg-midnight text-pearl select-none"
    >
      {/* ==========================================================================
          CAMADA 1 (z-0): Background Oceânico PURO (SEM nenhum overlay escuro!)
          Wrappers separados: Scroll -> Cursor -> Intro (scale 1.05 em repouso)
          ========================================================================== */}
      <div
        ref={bgScrollRef}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform"
      >
        <div
          ref={bgCursorRef}
          className="relative w-full h-full will-change-transform"
        >
          <div
            ref={bgIntroRef}
            className="relative w-full h-full will-change-transform"
          >
            {/* Desktop Background (1920x1080) */}
            <div className="hidden md:block relative w-full h-full">
              <Image
                src="/images/hero/hero-bg-desktop.png"
                alt="Superfície oceânica profunda NÉRÉA"
                fill
                priority
                quality={100}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {/* Mobile Background (1080x1920) */}
            <div className="block md:hidden relative w-full h-full">
              <Image
                src="/images/hero/hero-bg-mobile.png"
                alt="Superfície oceânica profunda NÉRÉA"
                fill
                priority
                quality={100}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================================
          CAMADA 2 (z-10): Duas Palavras Monumentais Escalonadas ATRÁS da Mão/Joia
          Wrappers separados: Scroll -> Cursor -> [data-hero-back-text] Intro
          ========================================================================== */}
      <div
        ref={backTitleScrollRef}
        className="absolute inset-0 z-10 pointer-events-none will-change-transform"
      >
        <div
          ref={backTitleCursorRef}
          className="relative w-full h-full max-w-[1920px] mx-auto will-change-transform"
        >
          {/* Palavra Superior Esquerda (Desktop): 'nerea' em left-[10%], top-[11%] */}
          <div
            data-hero-back-text
            aria-hidden="true"
            className="hidden md:block absolute left-[10%] top-[11%] leading-[0.72] select-none will-change-transform"
            style={{
              fontSize: 'clamp(7rem, 21vw, 25.5rem)',
              lineHeight: 0.72,
            }}
          >
            <span className="block font-serif font-light lowercase tracking-[-0.02em] leading-[0.72] text-[#F5F2EB]/80">
              nerea
            </span>
          </div>

          {/* Palavra Inferior Direita (Desktop): 'atelier' em right-[10%], top-[42%] */}
          <div
            data-hero-back-text
            aria-hidden="true"
            className="hidden md:block absolute right-[10%] top-[42%] leading-[0.72] select-none will-change-transform"
            style={{
              fontSize: 'clamp(7rem, 21vw, 25.5rem)',
              lineHeight: 0.72,
            }}
          >
            <span className="block font-serif font-light lowercase tracking-[-0.025em] leading-[0.72] text-[#F5F2EB]/80">
              atelier
            </span>
          </div>

          {/* Mobile (< 768px): 'nerea' e 'atelier' escalonadas */}
          <div
            data-hero-back-text
            aria-hidden="true"
            className="md:hidden absolute left-6 top-[16%] leading-[0.72] select-none will-change-transform"
            style={{ fontSize: 'clamp(4.6rem, 22vw, 7.5rem)', lineHeight: 0.72 }}
          >
            <span className="block font-serif font-light lowercase tracking-[0.01em] leading-[0.72] text-[#F5F2EB]/80">
              nerea
            </span>
          </div>
          <div
            data-hero-back-text
            aria-hidden="true"
            className="md:hidden absolute right-6 top-[45%] leading-[0.72] select-none will-change-transform"
            style={{ fontSize: 'clamp(4.6rem, 22vw, 7.5rem)', lineHeight: 0.72 }}
          >
            <span className="block font-serif font-light lowercase tracking-[-0.025em] leading-[0.72] text-[#F5F2EB]/80">
              atelier
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================================================
          CAMADA 2.5 (z-[15]): Callout SVG 'Ouro 18k · Safiras & Diamantes'
          Fica NA FRENTE do texto monumental (z-10) e POR BAIXO dos dedos da mão (z-20),
          permitindo que a linha diagonal desça até a pulseira sem cruzar por cima da pele!
          ========================================================================== */}
      <div
        data-hero-scroll-corner="tr"
        style={{
          left: '57.5%',
          top: '23.5%',
          width: '300px',
          height: '27%',
        }}
        className="hidden md:block absolute z-[15] pointer-events-auto will-change-transform"
      >
        <div
          data-hero-corner="tr"
          className="relative w-full h-full will-change-transform"
        >
          <button
            type="button"
            onClick={() =>
              onSelectProduct
                ? onSelectProduct(braceletProduct)
                : onExploreClick()
            }
            aria-label={`Especificação técnica: ${braceletProduct.name} — Ouro 18k, Safiras e Diamantes`}
            className="group block w-full h-full text-left bg-transparent border-0 p-0 cursor-pointer focus-visible:outline-none"
          >
            <span className="block pl-[78px] pb-1.5 text-[12px] lg:text-[13px] font-sans font-normal tracking-[0.01em] text-white group-hover:text-champagne transition-colors whitespace-nowrap">
              Ouro 18k · Safiras &amp; Diamantes
            </span>
            <svg
              viewBox="0 0 300 260"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="w-full h-[calc(100%-26px)] overflow-visible"
            >
              <polyline
                points="0,260 78,2 295,2"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.15"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ==========================================================================
          CAMADA 3 (z-20): Mão + Joia Recortada NA FRENTE da Tipografia Monumental
          Sangria inferior de 56px + pivô anatômico no pulso (15% 100%)
          ========================================================================== */}
      {/* Desktop (>= 768px): bleed inferior de -56px esconde qualquer corte reto do pulso */}
      <div
        ref={handDesktopScrollRef}
        style={{
          left: '25.5%',
          top: '23%',
          bottom: '-56px',
          width: '40.5%',
          height: 'calc(77% + 56px)',
          transformOrigin: '15% 100%',
        }}
        className="hidden md:block absolute z-20 pointer-events-none will-change-transform"
      >
        <div
          ref={handDesktopCursorRef}
          style={{ transformOrigin: '15% 100%' }}
          className="relative w-full h-full will-change-transform"
        >
          <div
            ref={handDesktopIntroRef}
            style={{ transformOrigin: '15% 100%' }}
            className="relative w-full h-full will-change-transform"
          >
            <Image
              src="/images/hero/hero-hand-desktop.png"
              alt="Mão apresentando a Pulseira Riviera Lumière em ouro 18k e safiras NÉRÉA"
              fill
              priority
              quality={100}
              sizes="50vw"
              className="object-contain object-bottom origin-[15%_100%]"
            />
          </div>
        </div>
      </div>

      {/* Mobile (< 768px): sangria à esquerda (left: -4%) evita exposição do corte do antebraço */}
      <div
        ref={handMobileScrollRef}
        style={{
          left: '-4%',
          top: '34.53%',
          width: '89%',
          height: '50.05%',
          transformOrigin: '0% 100%',
        }}
        className="block md:hidden absolute z-20 pointer-events-none will-change-transform"
      >
        <div
          ref={handMobileIntroRef}
          style={{ transformOrigin: '0% 100%' }}
          className="relative w-full h-full will-change-transform"
        >
          <Image
            src="/images/hero/hero-hand-mobile.png"
            alt="Mão apresentando a Pulseira Riviera Lumière em ouro 18k e safiras NÉRÉA"
            fill
            priority
            quality={100}
            sizes="90vw"
            className="object-contain object-left origin-[0%_100%]"
          />
        </div>
      </div>

      {/* ==========================================================================
          CAMADA 4 (z-30): Layout Espacial 1:1 'velora atelier' (Imagens + Callout SVG + Textos)
          Wrappers separados: Cursor (Top/Bottom) -> Scroll ([data-hero-scroll-corner]) -> Intro ([data-hero-corner])
          ========================================================================== */}
      <div
        ref={floatingUiRef}
        className="relative z-30 w-full max-w-[1920px] mx-auto h-full pointer-events-none"
      >
        <h1 className="sr-only">
          NÉRÉA Atelier — A arte da alta joalheria. Safiras de azul profundo e
          diamantes de pureza extraordinária em ouro 18k.
        </h1>

        {/* ========================================================================
            GRUPO SUPERIOR (Cursor Wrapper: topCornersCursorRef)
            Inclui: (B) Imagem Horizontal Direita, (C) Texto 1 Esquerda
            ======================================================================== */}
        <div
          ref={topCornersCursorRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
        >
          {/* (B) IMAGEM HORIZONTAL NA DIREITA EM CIMA (top: '14.5%', right: '4%') */}
          <div
            data-hero-scroll-corner="tr"
            style={{ top: '14.5%', right: '4%' }}
            className="hidden md:block absolute will-change-transform"
          >
            <div
              data-hero-corner="tr"
              className="pointer-events-auto will-change-transform"
            >
              <button
                type="button"
                onClick={onExploreClick}
                aria-label="Explorar Coleção NÉRÉA"
                className="group relative block w-[165px] lg:w-[195px] xl:w-[215px] aspect-[16/10] overflow-visible cursor-pointer"
              >
                {/* Filho 1: Moldura horizontal com overflow-hidden que recorta apenas o fundo ancorado pela base */}
                <div className="relative w-full h-full overflow-hidden bg-midnight/40 shadow-lg">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out origin-center group-hover:scale-105">
                    <div
                      style={{
                        left: '0%',
                        top: '-19.4667%',
                        width: '100%',
                        height: '119.4667%',
                      }}
                      className="absolute"
                    >
                      <Image
                        src="/images/catalog/covers/capa-mulher-brincos-safira.jpg"
                        alt="Alta Joalheria NÉRÉA — Safiras e Diamantes"
                        fill
                        priority
                        sizes="240px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Filho 2: Pop-out 3D Out-of-Bounds (Camada 2: 1857x2308 px ancorada pela base, saindo 53.87% pela borda superior) */}
                <div className="pointer-events-none absolute inset-0 z-10 overflow-visible">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out origin-center group-hover:scale-105">
                    <div
                      style={{
                        left: '9.7917%',
                        top: '-53.8667%',
                        width: '77.375%',
                        height: '153.8667%',
                      }}
                      className="absolute"
                    >
                      <Image
                        src="/images/hero/camada-2.png"
                        alt=""
                        aria-hidden="true"
                        fill
                        priority
                        unoptimized
                        sizes="240px"
                        quality={100}
                        className="object-contain object-left-top"
                      />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* (C) TEXTO 1 NA ESQUERDA (Abaixo da linha de base de 'nerea' e acima da foto vertical — top: '46%', left: '4%') */}
          <div
            data-hero-scroll-corner="tl"
            style={{ top: '46%', left: '4%' }}
            className="hidden md:block absolute will-change-transform"
          >
            <div
              data-hero-corner="tl"
              className="pointer-events-auto will-change-transform"
            >
              <p className="text-[10.5px] lg:text-[11px] uppercase tracking-[0.04em] leading-[1.3] font-medium text-white/90">
                JOIAS QUE SE
                <br />
                TORNAM PARTE DA
                <br />
                SUA HISTÓRIA
              </p>
            </div>
          </div>

          {/* Header Editorial Mobile (< 768px) */}
          <div
            data-hero-scroll-corner="tl"
            className="md:hidden pt-24 px-6 flex flex-col items-start text-left will-change-transform"
          >
            <div data-hero-corner="tl" className="pointer-events-auto">
              <p className="text-[10.5px] uppercase tracking-[0.04em] leading-[1.3] font-medium text-white/90">
                JOIAS QUE SE
                <br />
                TORNAM PARTE DA
                <br />
                SUA HISTÓRIA
              </p>
              <p className="mt-2 text-xs text-pearl/80 font-light tracking-[0.02em]">
                Ouro 18k · Safiras &amp; Diamantes
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================
            GRUPO INFERIOR (Cursor Wrapper: bottomCornersCursorRef)
            Inclui: (D) Imagem Vertical Esquerda + Texto 2 ao lado direito, (E) 'néréa / 01' + 'EXPLORAR COLEÇÃO'
            ======================================================================== */}
        <div
          ref={bottomCornersCursorRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
        >
          {/* (D) IMAGEM VERTICAL NA ESQUERDA + TEXTO 2 AO LADO DIREITO DELA (bottom: '8%', left: '4%') */}
          <div
            data-hero-scroll-corner="bl"
            style={{ bottom: '8%', left: '4%' }}
            className="hidden md:block absolute will-change-transform"
          >
            <div
              data-hero-corner="bl"
              className="pointer-events-auto flex items-start gap-12 lg:gap-14 xl:gap-16 will-change-transform"
            >
              {/* 1) Imagem VERTICAL à esquerda com efeito 3D Out-of-Bounds (pontas dos dedos saindo 24.48% para fora pela direita) */}
              <button
                type="button"
                onClick={() =>
                  onSelectProduct
                    ? onSelectProduct(braceletProduct)
                    : onExploreClick()
                }
                aria-label={`Ver detalhes de ${braceletProduct.name}`}
                className="group relative block w-[125px] lg:w-[144px] xl:w-[156px] aspect-[4/5] shrink-0 cursor-pointer overflow-visible"
              >
                {/* Filho 1: Quadro vertical com overflow-hidden que corta o fundo */}
                <div className="relative w-full h-full overflow-hidden bg-midnight/40 shadow-lg">
                  <div
                    style={{
                      left: '-28%',
                      top: '0%',
                      width: '167.4107%',
                      height: '100%',
                    }}
                    className="absolute transition-transform duration-700 ease-out origin-center group-hover:scale-105"
                  >
                    <Image
                      src="/images/catalog/covers/capa-pulseira-safira-ouro-pulso.jpg"
                      alt={braceletProduct.name}
                      fill
                      priority
                      sizes="260px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Filho 2: Wrapper com clipPath inset(0 -100% 0 0) que corta a esquerda em 0 e deixa só as pontas dos dedos saírem 24.48% pela direita */}
                <div
                  style={{ clipPath: 'inset(0 -100% 0 0)' }}
                  className="pointer-events-none absolute inset-0 z-10"
                >
                  <div
                    style={{
                      left: '-28%',
                      top: '13.0022%',
                      width: '152.4833%',
                      height: '71.3728%',
                    }}
                    className="absolute transition-transform duration-700 ease-out origin-center group-hover:scale-105"
                  >
                    <Image
                      src="/images/hero/camada-1.png"
                      alt=""
                      aria-hidden="true"
                      fill
                      priority
                      unoptimized
                      sizes="260px"
                      quality={100}
                      className="object-contain object-left-top"
                    />
                  </div>
                </div>
              </button>

              {/* 2) Texto 2 de descrição ao lado direito da foto vertical (alinhado pelo topo da foto vertical) */}
              <p className="max-w-[190px] lg:max-w-[205px] text-[11.5px] lg:text-[12px] leading-[1.5] font-light text-white/65 pt-0.5">
                Desenhada com precisão. Forjada para durar{' '}
                <strong className="font-semibold text-white">
                  além das tendências
                </strong>
                , acompanhando cada capítulo da{' '}
                <strong className="font-semibold text-white">sua vida.</strong>
              </p>
            </div>
          </div>

          {/* (E) BLOCO INFERIOR DIREITO (bottom: '8%', left: '63.5%', right: '4%'): 'néréa / 01' + 'EXPLORAR COLEÇÃO' */}
          <div
            data-hero-scroll-corner="br"
            style={{ bottom: '8%', left: '63.5%', right: '4%' }}
            className="hidden md:block absolute will-change-transform"
          >
            <div
              data-hero-corner="br"
              className="pointer-events-auto flex items-end justify-between w-full will-change-transform"
            >
              <span className="text-[12px] lg:text-[12.5px] font-sans font-normal tracking-[0.03em] text-pearl/85">
                néréa / 01
              </span>
              <button
                type="button"
                onClick={onExploreClick}
                className="text-[11.5px] lg:text-[12px] uppercase tracking-[0.12em] font-medium text-white pb-1 border-b border-white/75 hover:text-champagne hover:border-champagne transition-colors cursor-pointer"
              >
                EXPLORAR COLEÇÃO
              </button>
            </div>
          </div>

          {/* Base Mobile (< 768px) */}
          <div
            data-hero-scroll-corner="bl"
            className="md:hidden absolute bottom-8 inset-x-6 will-change-transform"
          >
            <div
              data-hero-corner="bl"
              className="pointer-events-auto flex items-end justify-between gap-10"
            >
              <button
                type="button"
                onClick={() =>
                  onSelectProduct
                    ? onSelectProduct(braceletProduct)
                    : onExploreClick()
                }
                aria-label={`Ver detalhes de ${braceletProduct.name}`}
                className="group relative block w-[96px] aspect-[4/5] shrink-0 overflow-visible"
              >
                <div className="relative w-full h-full overflow-hidden bg-midnight/40 shadow-lg">
                  <div
                    style={{
                      left: '-28%',
                      top: '0%',
                      width: '167.4107%',
                      height: '100%',
                    }}
                    className="absolute"
                  >
                    <Image
                      src="/images/catalog/covers/capa-pulseira-safira-ouro-pulso.jpg"
                      alt={braceletProduct.name}
                      fill
                      priority
                      sizes="170px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div
                  style={{ clipPath: 'inset(0 -100% 0 0)' }}
                  className="pointer-events-none absolute inset-0 z-10"
                >
                  <div
                    style={{
                      left: '-28%',
                      top: '13.0022%',
                      width: '152.4833%',
                      height: '71.3728%',
                    }}
                    className="absolute"
                  >
                    <Image
                      src="/images/hero/camada-1.png"
                      alt=""
                      aria-hidden="true"
                      fill
                      priority
                      unoptimized
                      sizes="170px"
                      quality={100}
                      className="object-contain object-left-top"
                    />
                  </div>
                </div>
              </button>

              <p className="text-[11.5px] leading-[1.5] font-light text-pearl/70 max-w-[195px]">
                Desenhada com precisão. Forjada para durar{' '}
                <strong className="font-semibold text-white">
                  além das tendências
                </strong>
                , acompanhando cada capítulo da{' '}
                <strong className="font-semibold text-white">sua vida.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
