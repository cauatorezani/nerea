'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let isGsapRegistered = false;

export function registerGsapPlugins(): void {
  if (typeof window === 'undefined' || isGsapRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);

  // Fallback para janelas minimizadas/oclusas onde o Chromium pausa requestAnimationFrame
  let lastRaf = performance.now();
  const trackRaf = () => {
    lastRaf = performance.now();
    window.requestAnimationFrame(trackRaf);
  };
  window.requestAnimationFrame(trackRaf);

  window.setInterval(() => {
    if (performance.now() - lastRaf > 80) {
      gsap.ticker.tick();
    }
  }, 32);

  isGsapRegistered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export interface SmoothScrollController {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  destroy: () => void;
}

export function createSmoothScroll(): SmoothScrollController {
  registerGsapPlugins();

  if (typeof window === 'undefined' || prefersReducedMotion()) {
    return {
      lenis: null,
      scrollTo: (target, offset = 0) => {
        if (typeof window === 'undefined') return;
        const behavior: ScrollBehavior = prefersReducedMotion()
          ? 'auto'
          : 'smooth';
        if (typeof target === 'number') {
          window.scrollTo({ top: target + offset, behavior });
          return;
        }
        const element =
          typeof target === 'string'
            ? (document.querySelector(target) as HTMLElement | null)
            : target;
        if (element) {
          const top =
            element.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior });
        }
      },
      destroy: () => {},
    };
  }

  let isDestroyed = false;

  const lenis = new Lenis({
    duration: 1.25,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.92,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  if (typeof document !== 'undefined' && 'fonts' in document) {
    document.fonts.ready.then(() => {
      if (!isDestroyed) {
        ScrollTrigger.refresh();
      }
    });
  }

  return {
    lenis,
    scrollTo: (target, offset = 0) => {
      lenis.scrollTo(target, {
        offset,
        duration: 1.35,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
    },
    destroy: () => {
      isDestroyed = true;
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    },
  };
}

export interface FadeInUpOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
}

export function animateSectionReveal(
  trigger: Element | null,
  targets: gsap.TweenTarget,
  options: FadeInUpOptions = {}
): gsap.core.Tween | null {
  registerGsapPlugins();
  if (!trigger || prefersReducedMotion()) return null;

  const {
    y = 32,
    duration = 1.15,
    stagger = 0.14,
    delay = 0,
    start = 'top 82%',
  } = options;

  return gsap.fromTo(
    targets,
    {
      y,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none',
        once: true,
      },
    }
  );
}

export interface ImageMaskRevealOptions {
  fromClipPath?: string;
  toClipPath?: string;
  fromScale?: number;
  toScale?: number;
  duration?: number;
  start?: string;
}

export function animateImageMaskReveal(
  trigger: Element | null,
  frameTarget: gsap.TweenTarget,
  innerTarget?: gsap.TweenTarget | null,
  options: ImageMaskRevealOptions = {}
): gsap.core.Timeline | null {
  registerGsapPlugins();
  if (!trigger || prefersReducedMotion()) return null;

  const {
    fromClipPath = 'inset(10% 6% 10% 6%)',
    toClipPath = 'inset(0% 0% 0% 0%)',
    fromScale = 1.08,
    toScale = 1,
    duration = 1.35,
    start = 'top 80%',
  } = options;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none',
      once: true,
    },
  });

  tl.fromTo(
    frameTarget,
    {
      clipPath: fromClipPath,
      opacity: 0.85,
    },
    {
      clipPath: toClipPath,
      opacity: 1,
      duration,
      ease: 'power3.out',
    },
    0
  );

  if (innerTarget) {
    tl.fromTo(
      innerTarget,
      { scale: fromScale },
      {
        scale: toScale,
        duration: duration * 1.15,
        ease: 'power3.out',
      },
      0
    );
  }

  return tl;
}
