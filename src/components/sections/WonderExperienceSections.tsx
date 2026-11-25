'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PRODUCTS, Product } from '@/data/products';

export interface WonderExperienceSectionsProps {
  onSelectProduct: (p: Product) => void;
  onAddToBag?: (p: Product) => void;
  onNavigate: (s: string) => void;
}

interface BlurCardItem {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  image: string;
  product: Product;
  cardOpacity: number;
}

interface HotspotItem {
  id: string;
  leftDesktop: string;
  topDesktop: string;
  leftMobile: string;
  topMobile: string;
  product: Product;
  badgeText: string;
}

interface ParallaxGalleryItem {
  id: string;
  image: string;
  caption: string;
  lotNumber: string;
  product: Product;
}

interface MaisonIconCard {
  id: string;
  city: string;
  subtitle: string;
  image: string;
  overlayOpacity: number;
  product: Product;
}

interface PillShortcut {
  id: string;
  label: string;
  image: string;
  product?: Product;
  targetSection?: string;
}

interface TestimonialItem {
  id: string;
  heading: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  product: Product;
}

interface MulticolItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  bgColor: string;
  textColor: string;
  image: string;
  product: Product;
}

interface LookbookReelItem {
  id: string;
  reelImage: string;
  objectPosition: string;
  product: Product;
}

const BLUR_BANNER_CARDS: BlurCardItem[] = [
  {
    id: 'blur-card-1',
    title: 'Lapidação Calibrada',
    description:
      'Cada safira natural do Ceilão é selecionada e lapidada manualmente para um encaixe milimétrico e refração contínua de luz.',
    buttonLabel: 'Descobrir Lapidação',
    image: '/images/catalog/covers/capa-anel-imperial-safira-mao.jpg',
    product: PRODUCTS[4],
    cardOpacity: 0.88,
  },
  {
    id: 'blur-card-2',
    title: 'Profundidade Azul Real',
    description:
      'Matizes oceânicos raros combinados a diamantes naturais F-G / VVS que amplificam a luminosidade sob qualquer ângulo.',
    buttonLabel: 'Ver Safiras & Gemas',
    image: '/images/catalog/covers/capa-mulher-colar-gota-safira.jpg',
    product: PRODUCTS[1],
    cardOpacity: 0.92,
  },
  {
    id: 'blur-card-3',
    title: 'Mestria das Curvas',
    description:
      'Articulação artesanal elo por elo em ouro branco maciço 18k (Au 750), desenhada para envolver o pulso com fluidez absoluta.',
    buttonLabel: 'Explorar Riviera',
    image: '/images/catalog/covers/capa-pulseira-safira-ouro-pulso.jpg',
    product: PRODUCTS[3],
    cardOpacity: 0.9,
  },
];

const LOOKBOOK_REELS: LookbookReelItem[] = [
  {
    id: 'reel-1',
    reelImage: '/images/catalog/covers/capa-mulher-brincos-safira.jpg',
    objectPosition: 'center center',
    product: PRODUCTS[9],
  },
  {
    id: 'reel-2',
    reelImage: '/images/catalog/covers/capa-anel-imperial-safira-mao.jpg',
    objectPosition: 'center center',
    product: PRODUCTS[4],
  },
  {
    id: 'reel-3',
    reelImage: '/images/catalog/covers/capa-riviera-safira-pulso.jpg',
    objectPosition: '62% center',
    product: PRODUCTS[3],
  },
  {
    id: 'reel-4',
    reelImage: '/images/catalog/covers/capa-solitario-diamante-mao.jpg',
    objectPosition: 'center center',
    product: PRODUCTS[14],
  },
];

const CERTIFICATION_BADGES: string[] = [
  'GIA CERTIFIED DIAMONDS',
  'OURO 18K AU 750',
  'RESPONSIBLE JEWELLERY COUNCIL',
  'SAFIRAS NATURAIS CEYLAN',
  'ATELIER NÉRÉA',
];

const SHOPPABLE_HOTSPOTS: HotspotItem[] = [
  {
    id: 'spot-solitario',
    leftDesktop: '55%',
    topDesktop: '47%',
    leftMobile: '55%',
    topMobile: '48%',
    product: PRODUCTS[10],
    badgeText: 'Diamante Natural GIA 2.05 ct E/VVS1',
  },
  {
    id: 'spot-riviera',
    leftDesktop: '94%',
    topDesktop: '52%',
    leftMobile: '93.5%',
    topMobile: '52%',
    product: PRODUCTS[11],
    badgeText: 'Riviera Ouro Branco 5.20 ct F/VVS',
  },
];

const PARALLAX_GALLERY_ITEMS: ParallaxGalleryItem[] = [
  {
    id: 'parallax-img-1',
    image: '/images/catalog/covers/capa-anel-oval-safira-veludo.jpg',
    caption: 'Lapidação Real Calibrada — Safira Azul Ceylan 2.15 ct',
    lotNumber: 'ARCHIVE N° 01',
    product: PRODUCTS[0],
  },
  {
    id: 'parallax-img-2',
    image: '/images/catalog/products/colar-filigrana-safira-gota-vertical.jpg',
    caption: 'Alta Ourivesaria — Safira Real 6.40 ct & Marquises VVS',
    lotNumber: 'ARCHIVE N° 02',
    product: PRODUCTS[8],
  },
  {
    id: 'parallax-img-3',
    image: '/images/catalog/products/brincos-chandelier-diamantes.jpg',
    caption: 'Cascata Articulada — 3.80 ct de Diamantes Gota & Marquise',
    lotNumber: 'ARCHIVE N° 03',
    product: PRODUCTS[12],
  },
  {
    id: 'parallax-img-4',
    image: '/images/catalog/covers/capa-bracelete-caverna-cristal.jpg',
    caption: 'Articulação Contínua — 4.80 ct de Safiras Reais & Brilhantes',
    lotNumber: 'ARCHIVE N° 04',
    product: PRODUCTS[3],
  },
];

const SCROLLING_ICON_PHRASES: string[] = [
  'Lapidação Manual Calibrada',
  'Ouro Maciço 18k Au 750',
  'Safiras Naturais do Ceilão',
  'Cravação sob Microscópio',
  'Design Autoral Atemporal',
  'Certificação Internacional GIA',
];

const MAISON_ICONS: MaisonIconCard[] = [
  {
    id: 'icon-paris',
    city: 'Paris',
    subtitle: 'Elegância sem esforço',
    image: '/images/catalog/covers/capa-mulher-colar-gota-safira.jpg',
    overlayOpacity: 0.16,
    product: PRODUCTS[1],
  },
  {
    id: 'icon-madrid',
    city: 'Madrid',
    subtitle: 'Silhuetas marcantes',
    image: '/images/catalog/covers/capa-pulseira-safira-ouro-pulso.jpg',
    overlayOpacity: 0.16,
    product: PRODUCTS[5],
  },
  {
    id: 'icon-atenas',
    city: 'Atenas',
    subtitle: 'Precisão arquitetônica',
    image: '/images/catalog/covers/capa-anel-safira-ouro-vertical.jpg',
    overlayOpacity: 0.12,
    product: PRODUCTS[15],
  },
  {
    id: 'icon-milao',
    city: 'Milão',
    subtitle: 'Minimalismo luminoso',
    image: '/images/catalog/covers/capa-mao-segurando-solitario-diamante.jpg',
    overlayOpacity: 0.14,
    product: PRODUCTS[10],
  },
];

const PILL_SHORTCUTS: PillShortcut[] = [
  {
    id: 'pill-1',
    label: 'Anéis de Safira',
    image: '/images/catalog/products/anel-safira-ouro-branco-redondo.jpg',
    product: PRODUCTS[0],
  },
  {
    id: 'pill-2',
    label: 'Pulseiras Riviera',
    image: '/images/catalog/products/pulseira-riviera-safira-ouro-branco.jpg',
    product: PRODUCTS[3],
  },
  {
    id: 'pill-3',
    label: 'Colares de Diamante',
    image: '/images/catalog/products/colar-solitario-diamante-ouro-branco.jpg',
    product: PRODUCTS[13],
  },
  {
    id: 'pill-4',
    label: 'Brincos Iluminados',
    image: '/images/catalog/products/brincos-solitario-diamantes.jpg',
    product: PRODUCTS[12],
  },
  {
    id: 'pill-5',
    label: 'Solitários 18k',
    image: '/images/catalog/products/anel-trilogia-diamantes-ouro-branco.jpg',
    product: PRODUCTS[14],
  },
  {
    id: 'pill-6',
    label: 'Presentes Eternos',
    image: '/images/catalog/products/argolas-classicas-ouro-18k.jpg',
    targetSection: 'colecoes',
  },
];

const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: 'test-1',
    heading: 'Luxo Atemporal Verdadeiro',
    quote:
      'O Anel Royal Safira superou todas as expectativas. A profundidade do azul Ceylan sob a luz natural e o conforto interno do aro em ouro branco 18k mostram um rigor técnico digno das maiores maisons europeias.',
    author: 'Helena Vasconcelos',
    role: 'Colecionadora — São Paulo',
    avatar: '/images/catalog/products/anel-safira-ouro-branco-oval.jpg',
    product: PRODUCTS[0],
  },
  {
    id: 'test-2',
    heading: 'Brilho Incomparável',
    quote:
      'A Pulseira Riviera Lumière tem uma articulação tão fluida que parece seda sobre a pele. O fecho joalheiro invisível é uma obra de engenharia e as safiras calibradas brilham a cada movimento.',
    author: 'Beatriz Monteiro de Barros',
    role: 'Cliente Verificada — Rio de Janeiro',
    avatar: '/images/catalog/products/pulseira-riviera-safira-ouro-branco.jpg',
    product: PRODUCTS[3],
  },
  {
    id: 'test-3',
    heading: 'Atendimento Impecável',
    quote:
      'Desde a consultoria com o concierge até a entrega segurada com o certificado GIA, a experiência NÉRÉA foi memorável. O Colar Éclat Imperial em ouro champagne ilumina o rosto com extrema delicadeza.',
    author: 'Camila Alencar',
    role: 'Cliente Verificada — Brasília',
    avatar: '/images/catalog/products/pendente-gota-safira-ouro-18k.jpg',
    product: PRODUCTS[1],
  },
  {
    id: 'test-4',
    heading: 'Herança de Família',
    quote:
      'Adquiri os Brincos Ondine Lumière para celebrar uma data marcante. O par espelhado de safiras possui uma simetria hipnotizante e uma sustentação anatômica perfeita na orelha.',
    author: 'Fernanda Klabin',
    role: 'Colecionadora — Curitiba',
    avatar: '/images/catalog/products/brincos-oval-safira-ouro-branco.jpg',
    product: PRODUCTS[2],
  },
  {
    id: 'test-5',
    heading: 'Cravação Perfeita',
    quote:
      'Sou apaixonada por alta ourivesaria e fiquei impressionada com o triplo pavê e a limpeza absoluta do ouro 18k Au 750. É uma joia escultural feita para atravessar gerações.',
    author: 'Isadora Meirelles',
    role: 'Arquiteta — Belo Horizonte',
    avatar: '/images/catalog/products/alianca-pave-diamantes-ouro-18k.jpg',
    product: PRODUCTS[15],
  },
];

const MULTICOL_ITEMS: MulticolItem[] = [
  {
    id: 'multicol-1',
    title: 'Detalhe Puro',
    subtitle: 'CRAVAÇÃO SOB MICROSCÓPIO',
    description:
      'Garras esculpidas manualmente e galerias arquitetônicas abertas que permitem a entrada de luz em 360 graus através do pavilhão de cada gema.',
    ctaLabel: 'Explorar Anéis',
    bgColor: '#b1a196',
    textColor: '#ffffff',
    image: '/images/catalog/products/anel-imperial-safira-ouro-amarelo.jpg',
    product: PRODUCTS[4],
  },
  {
    id: 'multicol-2',
    title: 'Ouro Maciço 18k',
    subtitle: 'LIGA AUTORAL AU 750',
    description:
      'Forjado em nosso atelier com ouro certificado de origem responsável, combinando densidade nobre, polimento espelhado e equilíbrio ergonômico.',
    ctaLabel: 'Conhecer o Atelier',
    bgColor: '#c2c6c8',
    textColor: '#222222',
    image: '/images/catalog/products/alianca-pave-diamantes-ouro-18k.jpg',
    product: PRODUCTS[15],
  },
  {
    id: 'multicol-3',
    title: 'Luz Submarina',
    subtitle: 'SAFIRAS & ÁGUA-MARINHA',
    description:
      'Gemas naturais de saturação oceânica extraordinária, individualmente pareadas por mestres gemólogos para garantir harmonia cromática absoluta.',
    ctaLabel: 'Ver Coleção',
    bgColor: '#f0eeeb',
    textColor: '#1e1b18',
    image: '/images/catalog/products/colar-imperial-safira-diamantes.jpg',
    product: PRODUCTS[8],
  },
];

export function WonderExperienceSections({
  onSelectProduct,
  onAddToBag,
  onNavigate,
}: WonderExperienceSectionsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Refs para Engenharia Reversa 1: Blur Banner Sticky Scroll (blur-banner.js)
  const blurHeroRef = useRef<HTMLDivElement>(null);
  const blurBottomContentRef = useRef<HTMLDivElement>(null);
  const [isBlurActive, setIsBlurActive] = useState(false);

  // Estado para Engenharia Reversa 3: Shoppable Image Hotspots
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('spot-solitario');

  // Refs para Engenharia Reversa 4: Sticky Parallax Gallery com rotação no scroll (parallax.js)
  const parallaxSectionRef = useRef<HTMLElement>(null);
  const parallaxImageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // 1. Engenharia Reversa exata do blur-banner.js (requestAnimationFrame + getBoundingClientRect)
  useEffect(() => {
    let rafId: number | null = null;
    let isScheduled = false;

    const toggleHeroFilter = () => {
      if (!blurBottomContentRef.current) return;
      const rect = blurBottomContentRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Ativa o backdrop-filter: blur(13px) e escurecimento quando o bloco inferior entra na viewport
      const shouldActivate = rect.top < windowHeight * 0.92 && rect.bottom > 80;
      setIsBlurActive((prev) => (prev !== shouldActivate ? shouldActivate : prev));
    };

    const handleScrollOrResize = () => {
      if (!isScheduled) {
        isScheduled = true;
        rafId = window.requestAnimationFrame(() => {
          toggleHeroFilter();
          isScheduled = false;
          rafId = null;
        });
      }
    };

    toggleHeroFilter();
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // 2. Engenharia Reversa exata do parallax.js (rotação progressiva 0deg a -12deg para ímpares e +12deg para pares)
  useEffect(() => {
    let rafId: number | null = null;
    const maxRotation = parseInt(
      parallaxSectionRef.current?.dataset.rotation || '12',
      10
    );

    const updateParallaxRotation = () => {
      const windowHeight = window.innerHeight;
      parallaxImageRefs.current.forEach((img, index) => {
        if (!img) return;
        const imageRect = img.getBoundingClientRect();
        if (imageRect.top < windowHeight && imageRect.bottom > -120) {
          const visiblePercent = Math.max(
            0,
            ((windowHeight - imageRect.top) / windowHeight) * 100
          );
          let rotationDegree = Math.min(
            (visiblePercent / 100) * maxRotation,
            maxRotation
          );
          // Ímpares na galeria (1º e 3º -> index 0 e 2) rotacionam até -12deg; pares até +12deg
          if (index % 2 === 0) {
            rotationDegree *= -1;
          }
          img.style.transform = `translate3d(0px, 0px, 0px) rotate(${rotationDegree.toFixed(2)}deg)`;
        } else if (imageRect.top >= windowHeight) {
          img.style.transform = 'translate3d(0px, 0px, 0px) rotate(0deg)';
        }
      });
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        updateParallaxRotation();
        rafId = null;
      });
    };

    updateParallaxRotation();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // 3. Sistema de Animações via IntersectionObserver (idêntico ao animations.js do Wonder Theme)
  // Garante que containers sticky (.wt-parallax__content e .wt-blur-banner__content__top) NUNCA sofram reverse
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const animatedNodes = Array.from(
      root.querySelectorAll<HTMLElement>('.wt-scroll-reveal')
    );

    animatedNodes.forEach((el) => {
      const orderAttr = el.getAttribute('data-cascade-order');
      if (orderAttr) {
        el.style.setProperty('--animation-order', orderAttr);
      }
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animatedNodes.forEach((el) => {
        el.classList.add('wt-scroll-reveal--visible');
        el.classList.remove('scroll-trigger--offscreen');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const isInsideSticky = Boolean(
            el.closest('.wt-parallax__content, .wt-blur-banner__content__top')
          );

          if (entry.isIntersecting || isInsideSticky) {
            el.classList.add('wt-scroll-reveal--visible');
            el.classList.remove('scroll-trigger--offscreen');
          } else if (entry.boundingClientRect.top > window.innerHeight * 0.96) {
            el.classList.remove('wt-scroll-reveal--visible');
            el.classList.add('scroll-trigger--offscreen');
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.08,
      }
    );

    animatedNodes.forEach((el) => {
      if (el.closest('.wt-parallax__content, .wt-blur-banner__content__top')) {
        el.classList.add('wt-scroll-reveal--visible');
        el.classList.remove('scroll-trigger--offscreen');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleQuickAction = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (onAddToBag) {
      onAddToBag(product);
    } else {
      onSelectProduct(product);
    }
  };

  return (
    <div
      ref={rootRef}
      data-button-animations="fill_on_hover"
      data-animate-picures-onhover="true"
      className="wonder-experience-root w-full overflow-x-clip text-[#1e1b18]"
    >
      {/* ESTILOS ESCOPADOS FIÉIS AO WONDER THEME (blur-banner, shoppable-image, parallax, pills, marquee) */}
      <style>{`
        .wonder-experience-root {
          --border-radius: 0px;
          --border-radius-button: 30px;
          --color-button-primary-background: #071F33;
          --color-button-primary-text: #ffffff;
          --color-button-primary-background-hover: #165D7A;
          --color-button-secondary-background: #ffffff;
          --color-button-secondary-border: #e6e3de;
          --color-button-secondary-text: #1e1b18;
          --color-button-secondary-background-hover: #165D7A;
          --color-button-secondary-text-hover: #ffffff;
        }

        /* Botão Pill com Preenchimento de Baixo para Cima no Hover (fill_on_hover) */
        .wonder-experience-root .wt-pill-btn {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--border-radius-button, 30px);
          background-clip: padding-box;
          clip-path: inset(0 round var(--border-radius-button, 30px));
          overflow: hidden;
          transition: color 0.3s ease-in, border-color 0.3s ease-in-out, transform 0.3s ease;
          cursor: pointer;
        }
        .wonder-experience-root .wt-pill-btn::after {
          content: "";
          position: absolute;
          top: -2px;
          right: -2px;
          bottom: -2px;
          left: -2px;
          background: var(--btn-hover-fill, #165D7A);
          transform: translateY(101%);
          transition: transform 0.32s cubic-bezier(0.24, 0.47, 0.46, 0.93);
          z-index: -1;
          border-radius: inherit;
        }
        .wonder-experience-root .wt-pill-btn:hover::after {
          transform: translateY(0);
        }
        .wonder-experience-root .wt-pill-btn--light {
          background: #ffffff;
          color: #071F33;
          border: 1px solid #ffffff;
          --btn-hover-fill: #165D7A;
        }
        .wonder-experience-root .wt-pill-btn--light:hover {
          color: #ffffff;
          border-color: #165D7A;
        }
        .wonder-experience-root .wt-pill-btn--dark {
          background: #071F33;
          color: #ffffff;
          border: 1px solid #071F33;
          --btn-hover-fill: #165D7A;
        }
        .wonder-experience-root .wt-pill-btn--dark:hover {
          color: #ffffff;
          border-color: #165D7A;
        }
        .wonder-experience-root .wt-pill-btn--glass {
          background: rgba(255, 255, 255, 0.92);
          color: #071F33;
          border: 1px solid rgba(255, 255, 255, 0.5);
          --btn-hover-fill: #165D7A;
        }
        .wonder-experience-root .wt-pill-btn--glass:hover {
          color: #ffffff;
          border-color: #165D7A;
        }

        /* Link com Sublinhado Deslizante (.hero__button--link) */
        .wonder-experience-root .wt-sliding-link {
          display: inline-block;
          background: none;
          border: none;
          padding: 0 0 2px;
          cursor: pointer;
          text-decoration: none;
        }
        .wonder-experience-root .wt-sliding-link span {
          position: relative;
          display: inline-block;
        }
        .wonder-experience-root .wt-sliding-link span::before {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: currentColor;
          transform-origin: right;
          transform: scaleX(1);
          transition: transform 0.4s ease;
        }
        .wonder-experience-root .wt-sliding-link span::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: currentColor;
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .wonder-experience-root .wt-sliding-link:hover span::before {
          transform: scaleX(0);
          transition: 0.4s transform ease;
        }
        .wonder-experience-root .wt-sliding-link:hover span::after {
          transform: scaleX(1);
          transition: 0.4s transform ease 0.28s;
        }

        /* Zoom Suave de Imagem no Hover (Wonder Theme 5s cubic-bezier(.24,.47,.46,.93)) */
        .wonder-experience-root .wt-hover-zoom-img {
          transition: transform 3.8s cubic-bezier(0.24, 0.47, 0.46, 0.93);
          will-change: transform;
        }
        @media (hover: hover) and (pointer: fine) {
          .wonder-experience-root .wt-hover-zoom-wrap:hover .wt-hover-zoom-img {
            transform: scale(1.08);
          }
        }

        /* Blur Banner Sticky Filter (section-blur-banner.css) */
        .wonder-experience-root .wt-blur-banner__hero-inner::before {
          content: "";
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(7, 24, 38, 0.18);
          z-index: 1;
          -webkit-backdrop-filter: blur(0px);
          backdrop-filter: blur(0px);
          transition: background-color 0.3s ease-in, backdrop-filter 0.3s ease-in, -webkit-backdrop-filter 0.3s ease-in;
          pointer-events: none;
        }
        .wonder-experience-root .wt-blur-banner__hero--filter-active .wt-blur-banner__hero-inner::before {
          background-color: rgba(7, 24, 38, 0.46);
          -webkit-backdrop-filter: blur(13px);
          backdrop-filter: blur(13px);
        }

        /* Hotspots Pulsantes (@keyframes pulsate de shoppable-image.css) */
        @keyframes wt-pulsate {
          0% {
            transform: scale(0.1, 0.1);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1.35, 1.35);
            opacity: 0;
          }
        }
        .wonder-experience-root .wt-dot__ringing {
          border: 3px solid #ffffff;
          border-radius: 9999px;
          height: 40px;
          width: 40px;
          position: absolute;
          left: -4px;
          top: -4px;
          animation: wt-pulsate 1.4s ease-out infinite;
          opacity: 0;
          pointer-events: none;
        }
        .wonder-experience-root .wt-dot .icon-plus-x {
          transform-origin: center;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wonder-experience-root .wt-dot--active .icon-plus-x,
        .wonder-experience-root .wt-dot:hover .icon-plus-x {
          transform: scaleY(0);
        }
        .wonder-experience-root .wt-dot {
          left: var(--spot-left-m);
          top: var(--spot-top-m);
        }
        @media (min-width: 768px) {
          .wonder-experience-root .wt-dot {
            left: var(--spot-left-d);
            top: var(--spot-top-d);
          }
        }
        .wonder-experience-root .wt-dot__tooltip::after {
          content: "";
          position: absolute;
          bottom: 100%;
          left: var(--tooltip-arrow-left, 50%);
          border: solid transparent;
          border-width: 0 6px 6px;
          border-bottom-color: #ffffff;
          margin-left: -6px;
        }

        /* Bounce do ícone do Parallax (section-parallax.css) */
        @keyframes wt-icon-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .wonder-experience-root .wt-parallax__additional__icon {
          animation: wt-icon-bounce 1s ease-in-out infinite;
        }

        /* Marquees Contínuos (brands_CBqJYN, scrolling_icon_with_text, testimonial_marquee) */
        @keyframes wt-marquee-left {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .wonder-experience-root .wt-marquee-track {
          display: flex;
          width: max-content;
          animation: wt-marquee-left var(--marquee-duration, 38s) linear infinite;
          will-change: transform;
        }
        .wonder-experience-root .wt-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* =====================================================================
          1. BLUR BANNER STICKY SCROLL (blur-banner.js + section-blur-banner.css)
         ===================================================================== */}
      <section
        id="editorial"
        className="section-blur-banner wt-shopify-section relative w-full"
      >
        <div className="wt-blur-banner__container relative grid min-h-[180vh] w-full grid-cols-1 grid-rows-1">
          {/* Imagem Hero Sticky 100dvh top-0 que aplica backdrop-filter: blur(13px) quando a base entra */}
          <div
            ref={blurHeroRef}
            className={`wt-blur-banner__hero col-start-1 row-start-1 sticky top-0 h-[100dvh] w-full overflow-hidden ${
              isBlurActive ? 'wt-blur-banner__hero--filter-active' : ''
            }`}
          >
            <div className="wt-blur-banner__hero-inner hero relative h-full w-full overflow-hidden">
              <img
                src="/images/products/abyss-bracelet.jpg"
                alt="Pulseira Riviera Lumière — Alta Joalheria NÉRÉA"
                className="h-full w-full object-cover object-center scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>

          {/* Conteúdo Sobreposto (Topo 100vh + Base com Grid de 3 Cards que sobe sobre o fundo desfocado) */}
          <div className="wt-blur-banner__content col-start-1 row-start-1 relative z-10 flex w-full flex-col justify-between">
            {/* TOPO STICKY: 'Pulseira Riviera Lumière' + 'A Obra-Prima em Safiras & Diamantes' */}
            <div className="wt-blur-banner__content__top flex h-[100vh] min-h-[100vh] w-full items-center justify-center px-6 md:px-12">
              <div className="wt-blur-banner__content__top__content mx-auto flex max-w-[780px] flex-col items-center text-center text-white">
                <p
                  data-cascade-order="1"
                  className="wt-scroll-reveal scroll-trigger animate--slide-in text-[12px] md:text-[13px] font-medium uppercase tracking-[0.22em] text-white/90 mb-3"
                >
                  A Obra-Prima em Safiras &amp; Diamantes
                </p>
                <h2
                  data-cascade-order="2"
                  className="wt-scroll-reveal scroll-trigger animate--slide-in font-serif text-[40px] sm:text-[54px] md:text-[68px] font-light leading-[1.08] tracking-tight text-white drop-shadow-sm"
                >
                  Pulseira <span className="italic">Riviera Lumière</span>
                </h2>
                <p
                  data-cascade-order="3"
                  className="wt-scroll-reveal scroll-trigger animate--slide-in mt-4 max-w-[480px] text-[15px] md:text-[16px] leading-[1.6] text-white/85"
                >
                  Articulada manualmente elo por elo em ouro branco 18k maciço,
                  intercalando 4.80 ct de safiras azuis reais e diamantes em
                  cravação contínua.
                </p>
                <div
                  data-cascade-order="4"
                  className="wt-scroll-reveal scroll-trigger animate--slide-in mt-7"
                >
                  <button
                    type="button"
                    onClick={() => onSelectProduct(PRODUCTS[3])}
                    className="wt-pill-btn wt-pill-btn--light px-8 py-4 text-[14px] font-medium tabular-nums tracking-[0.04em]"
                  >
                    <span>Descobrir a Obra-Prima — {PRODUCTS[3].formattedPrice}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* BASE QUE SOBE SOBRE O FUNDO DESFOCADO: Grid de 3 Cards (.wt-blur-banner-cards-container__grid, gap-[20px]) */}
            <div
              ref={blurBottomContentRef}
              className="wt-blur-banner__content__bottom relative w-full pb-[72px] pt-[20px] px-4 sm:px-8 md:px-12 lg:px-16"
            >
              <div className="wt-blur-banner-cards-container mx-auto w-full max-w-[1680px] py-[40px] md:py-[60px]">
                <div className="wt-blur-banner-cards-container__grid grid grid-cols-1 md:grid-cols-3 gap-[20px] items-stretch">
                  {BLUR_BANNER_CARDS.map((card, idx) => (
                    <div
                      key={card.id}
                      data-cascade-order={idx + 1}
                      className="wt-blur-banner-cards-container__item wt-scroll-reveal scroll-trigger animate--slide-in flex"
                    >
                      <article
                        style={{
                          backgroundColor: `rgba(255, 255, 255, ${card.cardOpacity})`,
                        }}
                        className="wt-blur-banner-card wt-hover-zoom-wrap flex h-full w-full flex-col overflow-hidden backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
                      >
                        <div
                          onClick={() => onSelectProduct(card.product)}
                          className="wt-blur-banner-card__image relative aspect-[4/3] w-full cursor-pointer overflow-hidden"
                        >
                          <img
                            src={card.image}
                            alt={card.title}
                            className="wt-blur-banner-card__image-tag wt-hover-zoom-img block h-full w-full object-cover"
                          />
                        </div>
                        <div className="wt-blur-banner-card__content flex flex-1 flex-col p-[20px] xl:p-[28px] text-left text-[#1e1e1c]">
                          <h3 className="wt-blur-banner-card__heading font-serif text-[24px] md:text-[26px] font-medium leading-[1.2] text-[#1e1e1c]">
                            {card.title}
                          </h3>
                          <p className="mt-3 text-[14px] md:text-[15px] leading-[1.55] text-[#4c4a45]">
                            {card.description}
                          </p>
                          <div className="wt-blur-banner-card__button mt-auto pt-[20px]">
                            <button
                              type="button"
                              onClick={() => onSelectProduct(card.product)}
                              className="wt-pill-btn wt-pill-btn--dark px-6 py-3 text-[13px] font-medium tracking-[0.03em]"
                            >
                              <span>{card.buttonLabel}</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. LOOKBOOK REELS & MARQUEE DE CERTIFICAÇÕES (video_reels + brands_CBqJYN)
         ===================================================================== */}
      <section
        id="wonder-video-reels"
        className="spaced-section collection-list-section bg-white pt-[60px] pb-[20px]"
      >
        <div className="mx-auto max-w-[1800px] px-4 sm:px-8 md:px-12">
          <div className="headline mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p
                data-cascade-order="1"
                className="wt-scroll-reveal scroll-trigger animate--slide-in text-[11px] uppercase tracking-[0.18em] text-[#605e5d] mb-1.5"
              >
                ALTA JOALHERIA EM CENA
              </p>
              <h2
                data-cascade-order="2"
                className="headline__title wt-scroll-reveal scroll-trigger animate--slide-in font-serif text-[32px] md:text-[42px] font-light leading-[1.15] text-[#1e1b18]"
              >
                Inspiração em <span className="italic">Movimento</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('colecoes')}
              className="wt-sliding-link text-[14px] font-medium text-[#1e1b18] self-start sm:self-auto"
            >
              <span>Explorar todas as criações</span>
            </button>
          </div>

          {/* 4 Cards Verticais (aspect-[9/16]) com zoom suave no hover e mini-card sobreposto na base */}
          <div className="video-reels__container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {LOOKBOOK_REELS.map((reel, index) => {
              const { product } = reel;
              return (
                <div
                  key={reel.id}
                  data-cascade-order={index + 1}
                  onClick={() => onSelectProduct(product)}
                  className="video-container wt-scroll-reveal scroll-trigger animate--slide-in wt-hover-zoom-wrap group relative aspect-[9/16] w-full cursor-pointer overflow-hidden bg-[#111820]"
                >
                  <img
                    src={reel.reelImage}
                    alt={product.name}
                    style={{ objectPosition: reel.objectPosition }}
                    className="wt-hover-zoom-img h-full w-full object-cover"
                  />

                  {/* Gradiente editorial sutil para contraste */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20 transition-opacity duration-300 group-hover:from-black/75" />

                  {/* Selo superior estilo Reels do Wonder Theme */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="bg-black/35 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-[0.18em] border border-white/15">
                      {product.category} • Au 750
                    </span>
                    <span
                      aria-hidden="true"
                      className="wt-video__sound-toggle flex h-8 w-8 items-center justify-center rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                      </svg>
                    </span>
                  </div>

                  {/* Mini-card de produto sobreposto na base (miniatura 48x48 + nome + preço em R$ + botão '+' circular 34x34px) */}
                  <div className="shoppable-product-card absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-[48px] w-[48px] flex-shrink-0 overflow-hidden bg-[#f4f2ee]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 text-left">
                        <p className="truncate text-[13px] font-medium leading-tight text-[#1e1b18]">
                          {product.name}
                        </p>
                        <p className="mt-1 text-[13px] font-semibold tabular-nums text-[#071F33]">
                          {product.formattedPrice}
                        </p>
                      </div>
                    </div>

                    {/* Botão '+' circular de 34x34px (.card-pro__qbp-trigger) */}
                    <button
                      type="button"
                      aria-label={`Adicionar ${product.name}`}
                      onClick={(e) => handleQuickAction(e, product)}
                      className="wt-pill-btn wt-pill-btn--light h-[34px] w-[34px] flex-shrink-0 rounded-full border border-[#e6e3de]"
                    >
                      <svg
                        className="svg-icon svg-icon--plus h-[14px] w-[14px]"
                        viewBox="0 0 72 72"
                        fill="currentColor"
                      >
                        <rect width="54" height="4" rx="2" y="34" x="9" />
                        <rect width="4" height="54" rx="2" y="9" x="34" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MARQUEE DE CERTIFICAÇÕES (brands_CBqJYN) */}
      <section
        id="wonder-brands-marquee"
        aria-label="Chancelas e Certificações da Maison"
        className="wt-brands__container wt-brands__container--marquee border-y border-[#e6e3de] bg-white py-5 overflow-hidden"
      >
        <div
          className="wt-marquee-track flex items-center"
          style={{ '--marquee-duration': '36s' } as React.CSSProperties}
        >
          {[0, 1, 2].map((LoopIndex) => (
            <div
              key={LoopIndex}
              className="flex items-center shrink-0"
              aria-hidden={LoopIndex > 0}
            >
              {CERTIFICATION_BADGES.map((badge, i) => (
                <div
                  key={`${LoopIndex}-${i}`}
                  className="wt-brands__item flex items-center"
                >
                  <span className="px-7 md:px-10 text-[12px] md:text-[13px] font-medium tracking-[0.24em] uppercase text-[#383531] whitespace-nowrap">
                    {badge}
                  </span>
                  <span className="text-[#B9A16B] text-[14px]" aria-hidden="true">
                    •
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          3. SHOP THE LOOK — SHOPPABLE IMAGE COM HOTSPOTS '+' PULSANTES
             (Engenharia reversa de shoppable-image.css + button_W6HQW4)
         ===================================================================== */}
      <section
        id="wonder-shoppable-image"
        className="shoppable-image-section bg-[#f8f7f6] pt-[64px] pb-[64px] text-[#000000]"
      >
        <div className="shoppable-image mx-auto max-w-[1800px] px-4 sm:px-8 md:px-12">
          {/* Título centralizado: 'Compre a Composição' ('Inspire-se no Conjunto') */}
          <div className="headline mb-8 text-center">
            <p
              data-cascade-order="1"
              className="shoppable-image__text wt-scroll-reveal scroll-trigger animate--slide-in text-[12px] uppercase tracking-[0.2em] text-[#605e5d] mb-2"
            >
              Inspire-se no Conjunto
            </p>
            <h2
              data-cascade-order="2"
              className="headline__title wt-scroll-reveal scroll-trigger animate--slide-in font-serif text-[34px] md:text-[46px] font-light leading-[1.12] text-[#1e1b18]"
            >
              Compre a <span className="italic">Composição</span>
            </h2>
          </div>

          {/* Imagem panorâmica (aspect-[18/10] no desktop, aspect-square no mobile) com 2 hotspots reais */}
          <div
            data-cascade-order="3"
            className="shoppable-image__body wt-scroll-reveal scroll-trigger animate--slide-in relative mx-auto w-full aspect-square md:aspect-[18/10] overflow-visible"
          >
            <div className="relative h-full w-full overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
              <img
                src="/images/catalog/covers/capa-solitario-diamante-e-riviera.jpg"
                alt="Compre a Composição — Solitário Diamante GIA & Riviera NÉRÉA"
                className="hero__img block h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/15" />
            </div>

            {/* 2 Hotspots Interativos (.wt-dot) alinhados às joias reais da composição */}
            {SHOPPABLE_HOTSPOTS.map((spot) => {
              const isActive = activeHotspotId === spot.id;
              // Ajusta alinhamento horizontal do card flutuante para nunca escapar da viewport
              const horizontalnum = parseFloat(spot.leftDesktop);
              const tooltipTranslateClass =
                horizontalnum <= 25
                  ? 'left-0 -translate-x-[12%]'
                  : horizontalnum >= 80
                  ? 'right-0 translate-x-0'
                  : horizontalnum >= 65
                  ? 'left-0 -translate-x-[72%] sm:-translate-x-[55%]'
                  : 'left-1/2 -translate-x-1/2';

              const tooltipArrowLeft =
                horizontalnum <= 25
                  ? 'calc(12% + 16px)'
                  : horizontalnum >= 80
                  ? 'calc(100% - 16px)'
                  : '50%';

              return (
                <div
                  key={spot.id}
                  data-block-id={spot.id}
                  style={
                    {
                      '--spot-left-d': spot.leftDesktop,
                      '--spot-top-d': spot.topDesktop,
                      '--spot-left-m': spot.leftMobile,
                      '--spot-top-m': spot.topMobile,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => setActiveHotspotId(spot.id)}
                  className={`wt-dot wt-dot--benefit absolute z-20 -translate-x-1/2 -translate-y-1/2 ${
                    isActive ? 'wt-dot--active z-30' : ''
                  }`}
                >
                  {/* Anel externo pulsante (@keyframes wt-pulsate) */}
                  <div className="wt-dot__ringing" />

                  {/* Círculo branco 32x32px com ícone '+' em SVG onde a barra vertical .icon-plus-x faz scaleY(0) virando '-' */}
                  <button
                    type="button"
                    aria-label={`Ver joia: ${spot.product.name}`}
                    aria-expanded={isActive}
                    onClick={() =>
                      setActiveHotspotId((prev) =>
                        prev === spot.id ? null : spot.id
                      )
                    }
                    className="wt-dot__circle relative flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white text-[#000000] shadow-[0_2px_10px_rgba(0,0,0,0.28)] transition-transform duration-200 hover:scale-105 focus:outline-none"
                  >
                    <span className="wt-dot__icon wt-dot__icon--plus pointer-events-none flex items-center justify-center">
                      <svg
                        className="svg-icon svg-icon--plus h-[14px] w-[14px]"
                        viewBox="0 0 72 72"
                        fill="currentColor"
                      >
                        <g id="Plus3">
                          <rect
                            className="icon-plus-y"
                            width="54"
                            height="4"
                            rx="2"
                            y="34"
                            x="9"
                          />
                          <rect
                            className="icon-plus-x"
                            width="4"
                            height="54"
                            rx="2"
                            y="9"
                            x="34"
                          />
                        </g>
                      </svg>
                    </span>
                  </button>

                  {/* Card Flutuante Branco (.wt-dot__tooltip, max-w-[337px], sombra suave, setinha triangular no topo, foto 96x96) */}
                  <div
                    onClick={() => onSelectProduct(spot.product)}
                    style={
                      {
                        '--tooltip-arrow-left': tooltipArrowLeft,
                      } as React.CSSProperties
                    }
                    className={`wt-dot__tooltip absolute top-full mt-[14px] w-[285px] sm:w-[337px] max-w-[337px] bg-white p-[14px] sm:p-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.44)] transition-all duration-300 ${tooltipTranslateClass} ${
                      isActive
                        ? 'wt-dot__tooltip--active pointer-events-auto visible translate-y-0 scale-100 opacity-100 z-30'
                        : 'pointer-events-none invisible translate-y-2 scale-95 opacity-0 -z-10'
                    }`}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          onSelectProduct(spot.product);
                        }
                      }}
                      className="wt-dot__link flex items-center gap-4 text-left no-underline cursor-pointer group/tooltip"
                    >
                      <picture className="wt-dot__picture relative block h-[96px] w-[96px] flex-shrink-0 overflow-hidden bg-[#f5f2eb]">
                        <img
                          src={spot.product.image}
                          alt={spot.product.name}
                          className="wt-dot__image h-full w-full object-cover transition-transform duration-500 group-hover/tooltip:scale-105"
                        />
                      </picture>
                      <div className="wt-dot__body flex flex-1 flex-col text-left leading-tight">
                        <span className="wt-dot__brand text-[11px] font-medium uppercase tracking-[1px] text-[#1e1b18]/60">
                          NÉRÉA
                        </span>
                        <h3 className="wt-dot__title mt-1.5 text-[15px] font-medium leading-[1.25] text-[#1e1b18] group-hover/tooltip:text-[#165D7A] transition-colors">
                          {spot.product.name}
                        </h3>
                        <p className="mt-1 text-[11px] text-[#605e5d]">
                          {spot.badgeText}
                        </p>
                        <div className="wt-dot__price mt-2 flex items-center justify-between">
                          <span className="text-[14px] font-semibold tabular-nums text-[#1e1b18]">
                            {spot.product.formattedPrice}
                          </span>
                          <span className="text-[11px] uppercase tracking-[0.12em] text-[#1e1b18] underline underline-offset-4">
                            Ver joia
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Abaixo da imagem (button_W6HQW4): link centralizado 'Ver todas as inspirações' com sublinhado deslizante */}
          <div className="wt-button-section mt-[28px] text-center">
            <div
              data-cascade-order="4"
              className="wt-button-section__container wt-scroll-reveal scroll-trigger animate--slide-in"
            >
              <button
                type="button"
                onClick={() => onNavigate('colecoes')}
                className="wt-sliding-link hero__button--link text-[15px] font-medium text-[#1e1b18]"
              >
                <span className="wt-newsletter__send__text">
                  Ver todas as inspirações
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. STICKY PARALLAX GALLERY COM ROTAÇÃO NO SCROLL
             (Engenharia reversa de parallax.js + section-parallax.css)
         ===================================================================== */}
      <section
        id="about"
        ref={parallaxSectionRef}
        data-rotation="12"
        className="wt-parallax relative min-h-[195vh] w-full bg-white text-[#222321]"
      >
        {/* Bloco central sticky sempre 100% visível (opacity: 1) durante todo o scroll da seção #about */}
        <div className="wt-parallax__content sticky top-0 z-10 flex h-[100vh] w-full items-center justify-center bg-white px-6 opacity-100">
          <div className="hero__overlay__content mx-auto flex max-w-[960px] flex-col items-center text-center opacity-100">
            <span
              aria-hidden="true"
              className="mb-5 block h-[1px] w-14 bg-[#222321]/25"
            />
            <p className="hero__subheading text-[12px] md:text-[13px] font-medium uppercase tracking-[1.8px] text-[#605e5d] mb-4">
              ALTA OURIVESARIA NÉRÉA
            </p>
            <h2 className="hero__title font-serif text-[46px] sm:text-[68px] md:text-[92px] lg:text-[112px] font-light leading-[1.02] tracking-tight text-[#222321]">
              Mais de 10.000 <span className="italic">Facetas de Luz</span>
            </h2>
            <p className="hero__text mt-5 max-w-[640px] text-[15px] md:text-[16px] leading-[1.65] text-[#4c4a45]">
              Quatro décadas de tradição na lapidação calibrada de safiras reais
              do Ceilão e diamantes certificados GIA, forjados manualmente em
              ouro 18k.
            </p>
            <div className="hero__button--gap mt-8">
              <button
                type="button"
                onClick={() => onNavigate('colecoes')}
                className="wt-pill-btn wt-pill-btn--dark px-8 py-4 text-[14px] font-medium tracking-[0.04em]"
              >
                <span>Explorar Acervo Completo</span>
              </button>
            </div>
          </div>

          {/* Ícone inferior com animação bounce (@keyframes wt-icon-bounce) */}
          <div className="wt-parallax__additional absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-center text-[#222321]/70">
            <span className="text-[11px] uppercase tracking-[0.2em]">
              Role para contemplar os ângulos
            </span>
            <div className="wt-parallax__additional__icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M12 5v14M19 12l-7 7-7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Galeria de 4 imagens que sobem alternadas à esquerda (ímpar) e à direita (par, justify-end) e rotacionam até ±12deg no scroll */}
        <div className="wt-parallax__gallery relative z-20 mx-auto max-w-[1800px] -mt-[82vh] overflow-visible px-6 sm:px-10 md:px-16 pt-[6vh] pb-[18vh] pointer-events-none">
          <ul className="wt-parallax__gallery__list flex flex-col gap-[8vh] md:gap-[10vh]">
            {PARALLAX_GALLERY_ITEMS.map((item, idx) => {
              const isOddItem = idx % 2 === 0; // 1º e 3º itens (ímpares na contagem 1..4) à esquerda; 2º e 4º (pares) à direita com justify-end
              return (
                <li
                  key={item.id}
                  className={`wt-parallax__gallery__item flex w-full ${
                    isOddItem
                      ? 'justify-start'
                      : 'justify-end md:-mt-[22vh]'
                  }`}
                >
                  <div
                    onClick={() => onSelectProduct(item.product)}
                    className="pointer-events-auto group cursor-pointer"
                  >
                    <img
                      ref={(el) => {
                        parallaxImageRefs.current[idx] = el;
                      }}
                      src={item.image}
                      alt={item.product.name}
                      style={{
                        transition: 'transform 0.1s ease',
                        willChange: 'transform',
                      }}
                      className={`wt-parallax__img block w-[62vw] sm:w-[48vw] md:w-[390px] lg:w-[420px] max-w-[430px] aspect-[4/5] object-cover shadow-[0_24px_60px_rgba(0,0,0,0.22)] ${
                        isOddItem
                          ? 'wt-parallax__img--odd'
                          : 'wt-parallax__img--even'
                      }`}
                    />
                    <div className="mt-3 flex items-center justify-between bg-white/95 backdrop-blur-sm px-3.5 py-2.5 shadow-sm border border-[#ece9e2]">
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-[#605e5d]">
                          {item.lotNumber}
                        </span>
                        <span className="text-[14px] font-medium tabular-nums text-[#1e1b18] group-hover:underline">
                          {item.product.name} — {item.product.formattedPrice}
                        </span>
                      </div>
                      <span className="text-[12px] text-[#383531]">→</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* FAIXA #f0eeeb DE SCROLLING ICON WITH TEXT (scrolling_icon_with_text_YdyJj8) */}
      <section
        id="wonder-scrolling-icon-banner"
        className="wt-scrolling-text-banner wt-scrolling-icon bg-[#f0eeeb] text-[#4c4a45] h-[60px] md:h-[80px] flex items-center overflow-hidden border-y border-[#e2dfd9]"
      >
        <div
          className="wt-marquee-track flex items-center"
          style={{ '--marquee-duration': '32s' } as React.CSSProperties}
        >
          {[0, 1, 2].map((loopIdx) => (
            <div
              key={loopIdx}
              className="flex items-center shrink-0"
              aria-hidden={loopIdx > 0}
            >
              {SCROLLING_ICON_PHRASES.map((phrase, idx) => (
                <div
                  key={`${loopIdx}-${idx}`}
                  className="hero__icon-with-text flex items-center gap-3 px-6 md:px-9 whitespace-nowrap"
                >
                  {/* Ícone de Diamante Lapidado */}
                  <span className="hero__icon-container flex h-[27px] w-[27px] items-center justify-center text-[#383531]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M6 3h12l4 6-10 12L2 9l4-6z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 9h20M12 21L8 9l4-6 4 6-4 12z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="hero__icon-text text-[15px] md:text-[17px] font-medium tracking-[0.02em] text-[#4c4a45]">
                    {phrase}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          5A. GRID VIEW 2 COLUNAS 1:1 (grid_view_kpM87b: 'Brilho Compartilhado' e 'Toque da Natureza')
         ===================================================================== */}
      <section
        id="wonder-grid-2col"
        className="wt-grid-box bg-white"
      >
        <div className="wt-grid-box__container wt-grid-box__container--full w-full">
          <ul className="wt-grid-box__ul grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Coluna 1: Brilho Compartilhado */}
            <li className="wt-grid-box__li">
              <div
                data-cascade-order="1"
                onClick={() => onSelectProduct(PRODUCTS[3])}
                className="wt-grid-box__item wt-scroll-reveal scroll-trigger animate--slide-in wt-hover-zoom-wrap relative aspect-square w-full cursor-pointer overflow-hidden"
              >
                <img
                  src="/images/products/editorial-ocean.jpg"
                  alt="Brilho Compartilhado — Maison NÉRÉA"
                  className="hero__img wt-hover-zoom-img block h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                <div className="hero__overlay hero__overlay--left hero__overlay--bottom absolute inset-0 flex flex-col justify-end p-8 sm:p-12 md:p-14 text-left text-white">
                  <div className="hero__overlay__content max-w-[460px]">
                    <p className="hero__subheading text-[12px] uppercase tracking-[0.18em] text-white/85 mb-2">
                      COLEÇÃO LUMIÈRE BLEUE
                    </p>
                    <h2 className="hero__title font-serif text-[34px] md:text-[46px] font-light leading-[1.12] text-white">
                      Brilho <span className="italic">Compartilhado</span>
                    </h2>
                    <div className="hero__button--gap justify-start mt-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(PRODUCTS[3]);
                        }}
                        className="wt-sliding-link hero__button--link text-[15px] font-medium text-white"
                      >
                        <span>Descobrir a Coleção</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* Coluna 2: Toque da Natureza */}
            <li className="wt-grid-box__li">
              <div
                data-cascade-order="2"
                onClick={() => onSelectProduct(PRODUCTS[3])}
                className="wt-grid-box__item wt-scroll-reveal scroll-trigger animate--slide-in wt-hover-zoom-wrap relative aspect-square w-full cursor-pointer overflow-hidden"
              >
                <img
                  src="/images/catalog/covers/capa-bracelete-caverna-cristal.jpg"
                  alt="Toque da Natureza — Maison NÉRÉA"
                  className="hero__img wt-hover-zoom-img block h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                <div className="hero__overlay hero__overlay--left hero__overlay--bottom absolute inset-0 flex flex-col justify-end p-8 sm:p-12 md:p-14 text-left text-white">
                  <div className="hero__overlay__content max-w-[460px]">
                    <p className="hero__subheading text-[12px] uppercase tracking-[0.18em] text-white/85 mb-2">
                      SAFIRAS &amp; ÁGUA-MARINHA
                    </p>
                    <h2 className="hero__title font-serif text-[34px] md:text-[46px] font-light leading-[1.12] text-white">
                      Toque da <span className="italic">Natureza</span>
                    </h2>
                    <div className="hero__button--gap justify-start mt-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(PRODUCTS[3]);
                        }}
                        className="wt-sliding-link hero__button--link text-[15px] font-medium text-white"
                      >
                        <span>Explorar Gemas Raras</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* =====================================================================
          5B. 'ÍCONES DA MAISON' — GRID 4 COLUNAS RETRATO (aspect-[0.67], gap-[16px])
              (rich_text_qmpBkH + grid_view_NVFkUq com botão pill central e botão '+' / '->' 45x45px)
         ===================================================================== */}
      <section
        id="wonder-maison-icons"
        className="wt-shopify-section bg-white pt-[64px] pb-[64px]"
      >
        <div className="mx-auto max-w-[1800px] px-4 sm:px-8 md:px-12">
          {/* Cabeçalho rich_text_qmpBkH */}
          <div className="rich-text rich-text--compact mb-[32px] text-left">
            <p
              data-cascade-order="1"
              className="hero__subheading wt-scroll-reveal scroll-trigger animate--slide-in text-[12px] uppercase tracking-[1.3px] text-[#605e5d] mb-1.5"
            >
              ARQUITETURA &amp; DESIGN INTERNACIONAL
            </p>
            <h2
              data-cascade-order="2"
              className="hero__title wt-scroll-reveal scroll-trigger animate--slide-in font-serif text-[34px] md:text-[46px] font-light leading-[1.12] text-[#222321]"
            >
              Ícones da <span className="italic">Maison</span>
            </h2>
          </div>

          {/* Grid 4 Colunas Retrato (aspect-[0.67], gap-[16px]) */}
          <div className="wt-grid-box">
            <ul className="wt-grid-box__ul grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[12px] md:gap-[16px]">
              {MAISON_ICONS.map((card, idx) => (
                <li key={card.id} className="wt-grid-box__li">
                  <div
                    data-cascade-order={idx + 1}
                    onClick={() => onSelectProduct(card.product)}
                    className="wt-grid-box__item wt-scroll-reveal scroll-trigger animate--slide-in wt-hover-zoom-wrap group relative aspect-[0.67] w-full cursor-pointer overflow-hidden bg-[#16191d]"
                  >
                    <img
                      src={card.image}
                      alt={`${card.city} — ${card.subtitle}`}
                      className="hero__img wt-hover-zoom-img block h-full w-full object-cover"
                    />
                    <div
                      style={{
                        backgroundColor: `rgba(30, 30, 28, ${card.overlayOpacity + 0.18})`,
                      }}
                      className="pointer-events-none absolute inset-0 transition-colors duration-300 group-hover:bg-black/40"
                    />

                    {/* Conteúdo Centralizado (Cidade + Subtítulo + Botão Pill Central) */}
                    <div className="hero__overlay hero__overlay--center absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                      <h3 className="hero__title font-serif text-[34px] md:text-[42px] font-normal leading-[1.1] text-white">
                        {card.city}
                      </h3>
                      <p className="hero__text mt-2 text-[14px] md:text-[15px] text-white/90">
                        {card.subtitle}
                      </p>
                      <div className="hero__button--gap mt-5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(card.product);
                          }}
                          className="wt-pill-btn wt-pill-btn--light px-6 py-2.5 text-[13px] font-medium"
                        >
                          <span>Explorar</span>
                        </button>
                      </div>
                    </div>

                    {/* Botão Circular '+' / Seta no Canto Inferior (45x45px com hover fill — .wt-grid-view-with-drawer__button) */}
                    <div className="wt-grid-view-with-drawer__button absolute bottom-[16px] right-[16px] z-10">
                      <button
                        type="button"
                        aria-label={`Ver ${card.product.name}`}
                        onClick={(e) => handleQuickAction(e, card.product)}
                        className="wt-pill-btn wt-pill-btn--light h-[45px] w-[45px] rounded-full p-0 shadow-md group/corner"
                      >
                        <span className="relative flex h-5 w-5 items-center justify-center">
                          {/* Ícone '+' que transiciona para seta '->' no hover */}
                          <svg
                            className="h-4 w-4 transition-all duration-300 group-hover/corner:opacity-0 group-hover/corner:rotate-90"
                            viewBox="0 0 72 72"
                            fill="currentColor"
                          >
                            <rect width="54" height="5" rx="2.5" y="33.5" x="9" />
                            <rect width="5" height="54" rx="2.5" y="9" x="33.5" />
                          </svg>
                          <svg
                            className="absolute h-4 w-4 opacity-0 -translate-x-1 transition-all duration-300 group-hover/corner:opacity-100 group-hover/corner:translate-x-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              d="M5 12h14M13 6l6 6-6 6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5C. PILLS NAVIGATION (rich_text_yAt89h + pills_navigation_cLGkxM)
              (fundo #f0eeeb, pt-[80px] pb-[64px], pílulas grandes arredondadas border-radius: 50px)
         ===================================================================== */}
      <section
        id="wonder-pills-navigation"
        className="wt-pills-navigation bg-[#f0eeeb] pt-[80px] pb-[64px] text-[#1a1815]"
      >
        <div className="mx-auto max-w-[1800px] px-4 sm:px-8 md:px-12">
          <div className="mb-8 text-center">
            <p
              data-cascade-order="1"
              className="wt-scroll-reveal scroll-trigger animate--slide-in text-[12px] uppercase tracking-[1px] text-[#605e5d] mb-2"
            >
              CURADORIA NÉRÉA
            </p>
            <h2
              data-cascade-order="2"
              className="wt-scroll-reveal scroll-trigger animate--slide-in font-serif text-[28px] md:text-[36px] font-light leading-[1.2] text-[#1a1815]"
            >
              Atalhos rápidos para escolher a <span className="italic">joia perfeita</span>
            </h2>
          </div>

          <ul className="wt-pills-navigation__pills mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-[8px] md:gap-[16px] py-2">
            {PILL_SHORTCUTS.map((pill, idx) => (
              <li
                key={pill.id}
                data-cascade-order={idx + 1}
                className="wt-pills-navigation__pill-item wt-scroll-reveal scroll-trigger animate--slide-in"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (pill.product) {
                      onSelectProduct(pill.product);
                    } else if (pill.targetSection) {
                      onNavigate(pill.targetSection);
                    }
                  }}
                  style={
                    {
                      '--border-radius-button': '50px',
                      '--btn-hover-fill': '#165D7A',
                    } as React.CSSProperties
                  }
                  className="wt-pills-navigation__pill wt-pill-btn flex items-center gap-3 md:gap-4 rounded-[50px] bg-[#f7f7f5] border border-[#e6e3de] hover:border-[#165D7A] px-5 md:px-7 py-2.5 md:py-3.5 text-[18px] sm:text-[22px] md:text-[28px] font-serif font-normal text-[#605e5d] hover:text-white shadow-sm"
                >
                  <img
                    src={pill.image}
                    alt={pill.label}
                    className="wt-pills-navigation__pill-image h-[1.45em] w-[1.45em] rounded-full object-cover flex-shrink-0 border border-black/10"
                  />
                  <span>{pill.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =====================================================================
          5D. TESTIMONIALS MARQUEE (testimonial_marquee_8jj9aD)
              (carrossel contínuo de avaliações com 5 estrelas douradas #d4af37)
         ===================================================================== */}
      <section
        id="wonder-testimonials-marquee"
        className="wt-testimonials-marquee bg-white pt-[80px] pb-[60px] overflow-hidden"
      >
        <div className="mx-auto max-w-[1800px] px-4 sm:px-8 md:px-12 mb-10">
          <p
            data-cascade-order="1"
            className="wt-scroll-reveal scroll-trigger animate--slide-in text-[11px] uppercase tracking-[0.2em] text-[#9b9b9b] mb-2"
          >
            RECONHECIMENTO &amp; EXCELÊNCIA
          </p>
          <h2
            data-cascade-order="2"
            className="wt-scroll-reveal scroll-trigger animate--slide-in font-serif text-[32px] md:text-[42px] font-light leading-[1.15] text-[#1e1b18]"
          >
            Vozes de Quem Coleciona <span className="italic">NÉRÉA</span>
          </h2>
        </div>

        <div className="wt-testimonials-marquee__container relative w-full overflow-hidden">
          <div
            className="wt-marquee-track flex items-stretch gap-[16px] md:gap-[32px] px-4"
            style={{ '--marquee-duration': '52s' } as React.CSSProperties}
          >
            {[0, 1].map((loopIndex) => (
              <div
                key={loopIndex}
                className="flex items-stretch gap-[16px] md:gap-[32px] shrink-0"
                aria-hidden={loopIndex > 0}
              >
                {TESTIMONIALS_LIST.map((item) => (
                  <article
                    key={`${loopIndex}-${item.id}`}
                    onClick={() => onSelectProduct(item.product)}
                    className="wt-testimonials-marquee__item flex w-[290px] sm:w-[350px] md:w-[375px] flex-col justify-between bg-[#f8f7f6] p-[24px] md:p-[28px] text-left cursor-pointer border border-[#ece9e2] transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)]"
                  >
                    <div className="wt-testimonials-marquee__content">
                      <h3 className="wt-testimonials-marquee__heading font-serif text-[21px] md:text-[23px] font-medium leading-snug text-[#1e1b18] mb-3">
                        {item.heading}
                      </h3>
                      <div className="wt-testimonials-marquee__text mb-6 text-[14px] md:text-[15px] leading-[1.6] text-[#383531]">
                        <p>“{item.quote}”</p>
                      </div>
                    </div>

                    <div className="wt-testimonials-marquee__author flex flex-col items-start gap-2 pt-4 border-t border-[#e6e3de]">
                      <div className="wt-testimonials-marquee__author-details flex items-center gap-3.5">
                        <img
                          src={item.avatar}
                          alt={item.author}
                          className="wt-testimonials-marquee__icon h-[64px] w-[64px] md:h-[70px] md:w-[70px] rounded-full object-cover border border-[#d6d3cd]"
                        />
                        <div className="wt-testimonials-marquee__author-wrapper">
                          <span className="wt-testimonials-marquee__author-text block text-[14px] font-medium text-[#1e1b18]">
                            {item.author}
                          </span>
                          <span className="block text-[12px] text-[#9b9b9b] mb-1.5">
                            {item.role}
                          </span>
                          {/* 5 Estrelas Douradas (#d4af37) */}
                          <div
                            className="wt-rating__stars flex items-center gap-1 text-[#d4af37]"
                            aria-label="Avaliação 5 de 5 estrelas"
                          >
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className="h-[14px] w-[14px] fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5E. MULTICOLUMN 3 COLUNAS (multicolumn_ApWkHW: 'Detalhe Puro', 'Ouro Maciço 18k', 'Luz Submarina')
         ===================================================================== */}
      <section
        id="wonder-multicolumn"
        className="wt-multicol-slider w-full bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0">
          {MULTICOL_ITEMS.map((col, idx) => (
            <article
              key={col.id}
              data-cascade-order={idx + 1}
              style={{
                backgroundColor: col.bgColor,
                color: col.textColor,
              }}
              onClick={() => onSelectProduct(col.product)}
              className="wt-multicol-slider__item wt-multicol-slider__item--has-bg wt-scroll-reveal scroll-trigger animate--slide-in wt-hover-zoom-wrap flex flex-col cursor-pointer overflow-hidden"
            >
              <div className="hero__pic-container relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={col.image}
                  alt={col.title}
                  className="hero__img wt-hover-zoom-img block h-full w-full object-cover"
                />
              </div>
              <div className="hero__overlay flex flex-1 flex-col justify-between p-[24px] lg:p-[32px] text-left">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] opacity-80 mb-2">
                    {col.subtitle}
                  </p>
                  <h3 className="hero__title font-serif text-[26px] md:text-[30px] font-normal leading-[1.2]">
                    {col.title}
                  </h3>
                  <p className="mt-3 text-[14px] md:text-[15px] leading-[1.6] opacity-90">
                    {col.description}
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(col.product);
                    }}
                    className="wt-sliding-link hero__button--link text-[14px] font-medium"
                    style={{ color: col.textColor }}
                  >
                    <span>{col.ctaLabel}</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================================
          5F. FEATURES BANNER DE 4 COLUNAS (features_banner_rtnxT6 — py-[80px])
         ===================================================================== */}
      <section
        id="wonder-features-banner"
        className="wt-features-banner bg-white py-[80px] border-t border-[#e6e3de]"
      >
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 md:px-12">
          <div className="wt-keys__list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {/* Item 1: Envio Segurado Cortesia */}
            <div
              data-cascade-order="1"
              className="wt-keys__item wt-keys__item--center wt-scroll-reveal scroll-trigger animate--slide-in flex flex-col items-center text-center"
            >
              <div className="wt-keys__image mb-4 flex h-[44px] w-[44px] items-center justify-center text-[#1e1b18]">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="wt-keys__title text-[17px] font-medium text-[#1e1b18] mb-2">
                Envio Segurado Cortesia
              </h3>
              <p className="wt-keys__text max-w-[260px] text-[14px] leading-[1.55] text-[#605e5d]">
                Entrega blindada com seguro integral e rastreio dedicado para
                todo o Brasil.
              </p>
            </div>

            {/* Item 2: Certificado GIA & Au 750 */}
            <div
              data-cascade-order="2"
              className="wt-keys__item wt-keys__item--center wt-scroll-reveal scroll-trigger animate--slide-in flex flex-col items-center text-center"
            >
              <div className="wt-keys__image mb-4 flex h-[44px] w-[44px] items-center justify-center text-[#1e1b18]">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path
                    d="M6 3h12l4 6-10 12L2 9l4-6z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 9h20M12 21L8 9l4-6 4 6-4 12z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="wt-keys__title text-[17px] font-medium text-[#1e1b18] mb-2">
                Certificado GIA &amp; Au 750
              </h3>
              <p className="wt-keys__text max-w-[260px] text-[14px] leading-[1.55] text-[#605e5d]">
                Laudo gemológico internacional e garantia vitalícia de
                autenticidade do ouro 18k.
              </p>
            </div>

            {/* Item 3: Ajuste de Medida Gratuito */}
            <div
              data-cascade-order="3"
              className="wt-keys__item wt-keys__item--center wt-scroll-reveal scroll-trigger animate--slide-in flex flex-col items-center text-center"
            >
              <div className="wt-keys__image mb-4 flex h-[44px] w-[44px] items-center justify-center text-[#1e1b18]">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="wt-keys__title text-[17px] font-medium text-[#1e1b18] mb-2">
                Ajuste de Medida Gratuito
              </h3>
              <p className="wt-keys__text max-w-[260px] text-[14px] leading-[1.55] text-[#605e5d]">
                Primeiro ajuste de aro ou comprimento realizado sem custo em
                nosso Atelier.
              </p>
            </div>

            {/* Item 4: Concierge Particular */}
            <div
              data-cascade-order="4"
              className="wt-keys__item wt-keys__item--center wt-scroll-reveal scroll-trigger animate--slide-in flex flex-col items-center text-center"
            >
              <div className="wt-keys__image mb-4 flex h-[44px] w-[44px] items-center justify-center text-[#1e1b18]">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="wt-keys__title text-[17px] font-medium text-[#1e1b18] mb-2">
                Concierge Particular
              </h3>
              <p className="wt-keys__text max-w-[260px] text-[14px] leading-[1.55] text-[#605e5d]">
                Atendimento exclusivo com especialistas em alta joalheria via
                vídeo ou hora marcada.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WonderExperienceSections;
