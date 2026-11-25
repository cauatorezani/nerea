'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion, registerGsapPlugins } from '@/lib/animations';

export type BrandOrnamentVariant = 'crest' | 'divider' | 'seal';
export type BrandOrnamentTheme = 'light' | 'dark';

export interface BrandOrnamentProps {
  variant?: BrandOrnamentVariant;
  theme?: BrandOrnamentTheme;
  className?: string;
  animateOnScroll?: boolean;
  start?: string;
  ariaLabel?: string;
}

/**
 * BrandOrnament — Emblema e ornamento vetorial autoral da NÉRÉA Haute Joaillerie.
 * Combina geometria de lapidação (facetas octogonais/marquise em Champagne #B9A16B)
 * e arcos cáusticos de refração da luz sobre a superfície da água (Blue Mist #B7CDD8).
 */
export function BrandOrnament({
  variant = 'crest',
  theme = 'light',
  className = '',
  animateOnScroll = true,
  start = 'top 86%',
  ariaLabel,
}: BrandOrnamentProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      registerGsapPlugins();
      const container = rootRef.current;
      if (!container) return;

      const strokes = container.querySelectorAll<SVGGeometryElement>(
        '[data-ornament-stroke]'
      );
      const fills = container.querySelectorAll<SVGElement>(
        '[data-ornament-fill]'
      );
      const coreGroup = container.querySelector<SVGGElement>(
        '[data-ornament-core]'
      );

      if (prefersReducedMotion() || !animateOnScroll) {
        strokes.forEach((el) => {
          gsap.set(el, { clearProps: 'strokeDasharray,strokeDashoffset', opacity: 1 });
        });
        gsap.set(fills, { opacity: 1, scale: 1 });
        return;
      }

      strokes.forEach((el) => {
        const length = typeof el.getTotalLength === 'function' ? el.getTotalLength() : 240;
        gsap.set(el, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        });
      });

      gsap.set(fills, {
        opacity: 0,
        scale: 0.65,
        transformOrigin: '50% 50%',
      });

      if (coreGroup) {
        gsap.set(coreGroup, {
          scale: 0.94,
          transformOrigin: '50% 50%',
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none none',
          once: true,
        },
      });

      tl.to(
        strokes,
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.45,
          stagger: {
            each: 0.08,
            from: 'center',
          },
          ease: 'power3.out',
        },
        0
      );

      if (coreGroup) {
        tl.to(
          coreGroup,
          {
            scale: 1,
            duration: 1.5,
            ease: 'expo.out',
          },
          0.1
        );
      }

      if (fills.length > 0) {
        tl.to(
          fills,
          {
            opacity: 1,
            scale: 1,
            duration: 0.95,
            stagger: 0.06,
            ease: 'back.out(1.7)',
          },
          0.42
        );
      }
    },
    { scope: rootRef, dependencies: [variant, animateOnScroll, start] }
  );

  const handleMouseEnter = contextSafe(() => {
    if (prefersReducedMotion() || !rootRef.current) return;
    const star = rootRef.current.querySelector<SVGElement>('[data-ornament-star]');
    const rings = rootRef.current.querySelectorAll<SVGElement>('[data-ornament-caustic]');

    if (star) {
      gsap.to(star, {
        scale: 1.14,
        rotation: 45,
        transformOrigin: '50% 50%',
        duration: 0.75,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
    if (rings.length > 0) {
      gsap.to(rings, {
        scaleX: 1.03,
        scaleY: 1.05,
        transformOrigin: '50% 50%',
        duration: 0.85,
        ease: 'sine.out',
        overwrite: 'auto',
      });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (prefersReducedMotion() || !rootRef.current) return;
    const star = rootRef.current.querySelector<SVGElement>('[data-ornament-star]');
    const rings = rootRef.current.querySelectorAll<SVGElement>('[data-ornament-caustic]');

    if (star) {
      gsap.to(star, {
        scale: 1,
        rotation: 0,
        transformOrigin: '50% 50%',
        duration: 0.85,
        ease: 'expo.out',
        overwrite: 'auto',
      });
    }
    if (rings.length > 0) {
      gsap.to(rings, {
        scaleX: 1,
        scaleY: 1,
        transformOrigin: '50% 50%',
        duration: 0.9,
        ease: 'expo.out',
        overwrite: 'auto',
      });
    }
  });

  const mistStrokeOpacity = theme === 'light' ? 0.85 : 0.65;
  const secondaryStrokeColor = theme === 'light' ? '#165D7A' : '#B7CDD8';

  if (variant === 'seal') {
    return (
      <div
        ref={rootRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : 'true'}
        className={`inline-flex items-center justify-center select-none ${className}`}
      >
        <svg
          viewBox="0 0 88 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 sm:w-14 sm:h-14 overflow-visible"
        >
          <g data-ornament-core>
            {/* Anel cáustico externo em Blue Mist */}
            <circle
              data-ornament-stroke
              data-ornament-caustic
              cx="44"
              cy="44"
              r="38"
              stroke="#B7CDD8"
              strokeOpacity={mistStrokeOpacity}
              strokeWidth="0.75"
            />

            {/* Arcos de refração de superfície */}
            <path
              data-ornament-stroke
              data-ornament-caustic
              d="M 12 44 C 24 24, 64 24, 76 44"
              stroke={secondaryStrokeColor}
              strokeOpacity="0.7"
              strokeWidth="0.85"
              strokeLinecap="round"
            />
            <path
              data-ornament-stroke
              data-ornament-caustic
              d="M 12 44 C 24 64, 64 64, 76 44"
              stroke={secondaryStrokeColor}
              strokeOpacity="0.7"
              strokeWidth="0.85"
              strokeLinecap="round"
            />

            {/* Lapidação octogonal de alta joalheria em Champagne */}
            <polygon
              data-ornament-stroke
              points="44,10 68,20 78,44 68,68 44,78 20,68 10,44 20,20"
              stroke="#B9A16B"
              strokeOpacity="0.55"
              strokeWidth="0.75"
              strokeLinejoin="round"
            />

            {/* Lapidação losango principal */}
            <path
              data-ornament-stroke
              d="M 44 12 L 76 44 L 44 76 L 12 44 Z"
              stroke="#B9A16B"
              strokeWidth="1.05"
              strokeLinejoin="round"
            />

            {/* Mesa interna da gema (Step-cut Table) */}
            <path
              data-ornament-stroke
              d="M 44 23 L 65 44 L 44 65 L 23 44 Z"
              stroke="#B9A16B"
              strokeOpacity="0.85"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />

            {/* Arestas de coroa conectando facetas */}
            <line
              data-ornament-stroke
              x1="44"
              y1="12"
              x2="44"
              y2="23"
              stroke="#B9A16B"
              strokeWidth="0.8"
            />
            <line
              data-ornament-stroke
              x1="76"
              y1="44"
              x2="65"
              y2="44"
              stroke="#B9A16B"
              strokeWidth="0.8"
            />
            <line
              data-ornament-stroke
              x1="44"
              y1="76"
              x2="44"
              y2="65"
              stroke="#B9A16B"
              strokeWidth="0.8"
            />
            <line
              data-ornament-stroke
              x1="12"
              y1="44"
              x2="23"
              y2="44"
              stroke="#B9A16B"
              strokeWidth="0.8"
            />

            {/* Estrela especular central (Brilho da água) */}
            <path
              data-ornament-stroke
              data-ornament-star
              d="M 44 29 Q 44 44 59 44 Q 44 44 44 59 Q 44 44 29 44 Q 44 44 44 29 Z"
              stroke="#B9A16B"
              strokeWidth="1"
              fill="#B9A16B"
              fillOpacity="0.16"
            />

            {/* Ponto de luz central e cardeais */}
            <circle
              data-ornament-fill
              cx="44"
              cy="44"
              r="2"
              fill="#B9A16B"
            />
            <circle
              data-ornament-fill
              cx="44"
              cy="6"
              r="1.2"
              fill="#B7CDD8"
            />
            <circle
              data-ornament-fill
              cx="44"
              cy="82"
              r="1.2"
              fill="#B7CDD8"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'divider') {
    return (
      <div
        ref={rootRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : 'true'}
        className={`flex items-center justify-center w-full select-none ${className}`}
      >
        <svg
          viewBox="0 0 360 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[340px] sm:max-w-[400px] h-auto overflow-visible"
        >
          <g data-ornament-core>
            {/* Raios horizontais de horizonte */}
            <line
              data-ornament-stroke
              x1="8"
              y1="22"
              x2="122"
              y2="22"
              stroke="#B9A16B"
              strokeOpacity="0.65"
              strokeWidth="0.85"
              strokeLinecap="round"
            />
            <line
              data-ornament-stroke
              x1="238"
              y1="22"
              x2="352"
              y2="22"
              stroke="#B9A16B"
              strokeOpacity="0.65"
              strokeWidth="0.85"
              strokeLinecap="round"
            />

            {/* Arcos cáusticos de luz em Blue Mist */}
            <path
              data-ornament-stroke
              data-ornament-caustic
              d="M 106 22 Q 180 5 254 22"
              stroke={secondaryStrokeColor}
              strokeOpacity={mistStrokeOpacity}
              strokeWidth="0.85"
              strokeLinecap="round"
            />
            <path
              data-ornament-stroke
              data-ornament-caustic
              d="M 106 22 Q 180 39 254 22"
              stroke={secondaryStrokeColor}
              strokeOpacity={mistStrokeOpacity}
              strokeWidth="0.85"
              strokeLinecap="round"
            />

            {/* Lapidação Navette / Marquise central */}
            <path
              data-ornament-stroke
              d="M 148 22 L 180 6 L 212 22 L 180 38 Z"
              stroke="#B9A16B"
              strokeWidth="1.05"
              strokeLinejoin="round"
            />
            <path
              data-ornament-stroke
              d="M 160 22 L 180 12 L 200 22 L 180 32 Z"
              stroke="#B9A16B"
              strokeOpacity="0.75"
              strokeWidth="0.75"
              strokeLinejoin="round"
            />

            {/* Estrela central */}
            <path
              data-ornament-stroke
              data-ornament-star
              d="M 180 13 Q 180 22 189 22 Q 180 22 180 31 Q 180 22 171 22 Q 180 22 180 13 Z"
              stroke="#B9A16B"
              strokeWidth="0.9"
              fill="#B9A16B"
              fillOpacity="0.18"
            />

            {/* Pequenos diamantes laterais de lapidação */}
            <path
              data-ornament-fill
              d="M 128 22 L 132 18.5 L 136 22 L 132 25.5 Z"
              fill="#B9A16B"
            />
            <path
              data-ornament-fill
              d="M 224 22 L 228 18.5 L 232 22 L 228 25.5 Z"
              fill="#B9A16B"
            />
            <circle
              data-ornament-fill
              cx="94"
              cy="22"
              r="1.5"
              fill="#B7CDD8"
            />
            <circle
              data-ornament-fill
              cx="266"
              cy="22"
              r="1.5"
              fill="#B7CDD8"
            />
          </g>
        </svg>
      </div>
    );
  }

  // Variant default: 'crest' (Emblema principal de Alta Joalheria)
  return (
    <div
      ref={rootRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : 'true'}
      className={`inline-flex items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 0 260 124"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-52 sm:w-64 md:w-72 h-auto overflow-visible"
      >
        <g data-ornament-core>
          {/* Linhas de horizonte externas em Champagne */}
          <line
            data-ornament-stroke
            x1="6"
            y1="62"
            x2="66"
            y2="62"
            stroke="#B9A16B"
            strokeOpacity="0.7"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          <line
            data-ornament-stroke
            x1="194"
            y1="62"
            x2="254"
            y2="62"
            stroke="#B9A16B"
            strokeOpacity="0.7"
            strokeWidth="0.85"
            strokeLinecap="round"
          />

          {/* Eixo vertical sutil de prumo gemológico */}
          <line
            data-ornament-stroke
            x1="130"
            y1="4"
            x2="130"
            y2="16"
            stroke="#B9A16B"
            strokeOpacity="0.65"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          <line
            data-ornament-stroke
            x1="130"
            y1="108"
            x2="130"
            y2="120"
            stroke="#B9A16B"
            strokeOpacity="0.65"
            strokeWidth="0.85"
            strokeLinecap="round"
          />

          {/* Arcos cáusticos externos — refração da luz na superfície da água (Blue Mist) */}
          <path
            data-ornament-stroke
            data-ornament-caustic
            d="M 34 62 C 72 16, 188 16, 226 62"
            stroke={secondaryStrokeColor}
            strokeOpacity={mistStrokeOpacity}
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          <path
            data-ornament-stroke
            data-ornament-caustic
            d="M 34 62 C 72 108, 188 108, 226 62"
            stroke={secondaryStrokeColor}
            strokeOpacity={mistStrokeOpacity}
            strokeWidth="0.85"
            strokeLinecap="round"
          />

          {/* Arcos cáusticos internos secundários */}
          <path
            data-ornament-stroke
            data-ornament-caustic
            d="M 56 62 C 88 30, 172 30, 204 62"
            stroke="#B7CDD8"
            strokeOpacity={theme === 'light' ? '0.9' : '0.45'}
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <path
            data-ornament-stroke
            data-ornament-caustic
            d="M 56 62 C 88 94, 172 94, 204 62"
            stroke="#B7CDD8"
            strokeOpacity={theme === 'light' ? '0.9' : '0.45'}
            strokeWidth="0.75"
            strokeLinecap="round"
          />

          {/* Moldura octogonal de lapidação esmeralda sutil */}
          <polygon
            data-ornament-stroke
            points="130,18 162,30 174,62 162,94 130,106 98,94 86,62 98,30"
            stroke="#B9A16B"
            strokeOpacity="0.45"
            strokeWidth="0.75"
            strokeLinejoin="round"
          />

          {/* Lapidação Losango Principal (Coroa da Gema) */}
          <path
            data-ornament-stroke
            d="M 130 14 L 182 62 L 130 110 L 78 62 Z"
            stroke="#B9A16B"
            strokeWidth="1.15"
            strokeLinejoin="round"
          />

          {/* Mesa Interna (Table Facet) */}
          <path
            data-ornament-stroke
            d="M 130 28 L 166 62 L 130 96 L 94 62 Z"
            stroke="#B9A16B"
            strokeOpacity="0.85"
            strokeWidth="0.85"
            strokeLinejoin="round"
          />

          {/* Linhas de faceta da coroa (Star & Bezel Facets) */}
          <line
            data-ornament-stroke
            x1="130"
            y1="14"
            x2="130"
            y2="28"
            stroke="#B9A16B"
            strokeWidth="0.85"
          />
          <line
            data-ornament-stroke
            x1="182"
            y1="62"
            x2="166"
            y2="62"
            stroke="#B9A16B"
            strokeWidth="0.85"
          />
          <line
            data-ornament-stroke
            x1="130"
            y1="110"
            x2="130"
            y2="96"
            stroke="#B9A16B"
            strokeWidth="0.85"
          />
          <line
            data-ornament-stroke
            x1="78"
            y1="62"
            x2="94"
            y2="62"
            stroke="#B9A16B"
            strokeWidth="0.85"
          />
          <line
            data-ornament-stroke
            x1="104"
            y1="38"
            x2="112"
            y2="45"
            stroke="#B9A16B"
            strokeOpacity="0.7"
            strokeWidth="0.75"
          />
          <line
            data-ornament-stroke
            x1="156"
            y1="38"
            x2="148"
            y2="45"
            stroke="#B9A16B"
            strokeOpacity="0.7"
            strokeWidth="0.75"
          />
          <line
            data-ornament-stroke
            x1="104"
            y1="86"
            x2="112"
            y2="79"
            stroke="#B9A16B"
            strokeOpacity="0.7"
            strokeWidth="0.75"
          />
          <line
            data-ornament-stroke
            x1="156"
            y1="86"
            x2="148"
            y2="79"
            stroke="#B9A16B"
            strokeOpacity="0.7"
            strokeWidth="0.75"
          />

          {/* Brilho Especular Central (Luz na Superfície da Água) */}
          <path
            data-ornament-stroke
            data-ornament-star
            d="M 130 38 Q 130 62 154 62 Q 130 62 130 86 Q 130 62 106 62 Q 130 62 130 38 Z"
            stroke="#B9A16B"
            strokeWidth="1.05"
            fill="#B9A16B"
            fillOpacity="0.14"
          />

          {/* Gemas laterais e pontos de luz */}
          <path
            data-ornament-fill
            d="M 66 62 L 71 58 L 76 62 L 71 66 Z"
            fill="#B9A16B"
          />
          <path
            data-ornament-fill
            d="M 184 62 L 189 58 L 194 62 L 189 66 Z"
            fill="#B9A16B"
          />
          <circle
            data-ornament-fill
            cx="130"
            cy="62"
            r="2.2"
            fill="#B9A16B"
          />
          <circle
            data-ornament-fill
            cx="34"
            cy="62"
            r="1.6"
            fill={secondaryStrokeColor}
          />
          <circle
            data-ornament-fill
            cx="226"
            cy="62"
            r="1.6"
            fill={secondaryStrokeColor}
          />
        </g>
      </svg>
    </div>
  );
}
export default BrandOrnament;
