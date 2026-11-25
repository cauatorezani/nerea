'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Product } from '@/data/products';
import {
  createSmoothScroll,
  prefersReducedMotion,
  type SmoothScrollController,
} from '@/lib/animations';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { WonderUpperSections } from '@/components/sections/WonderUpperSections';
import { WonderExperienceSections } from '@/components/sections/WonderExperienceSections';
import { Newsletter } from '@/components/sections/Newsletter';
import { ProductModal } from '@/components/ui/ProductModal';
import {
  ShoppingBagDrawer,
  type BagItem,
} from '@/components/ui/ShoppingBagDrawer';

export default function HomePage() {
  const scrollControllerRef = useRef<SmoothScrollController | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [bagItems, setBagItems] = useState<BagItem[]>([]);

  useEffect(() => {
    const controller = createSmoothScroll();
    scrollControllerRef.current = controller;

    return () => {
      controller.destroy();
      scrollControllerRef.current = null;
    };
  }, []);

  const handleNavigate = useCallback((targetSelector: string) => {
    const fallbackBehavior: ScrollBehavior = prefersReducedMotion()
      ? 'auto'
      : 'smooth';

    const normalizedSelector =
      targetSelector === 'colecoes'
        ? '#collection'
        : targetSelector.startsWith('#')
          ? targetSelector
          : `#${targetSelector}`;

    if (normalizedSelector === '#hero') {
      if (scrollControllerRef.current) {
        scrollControllerRef.current.scrollTo(0, 0);
      } else {
        window.scrollTo({ top: 0, behavior: fallbackBehavior });
      }
      return;
    }

    if (scrollControllerRef.current) {
      scrollControllerRef.current.scrollTo(normalizedSelector, -72);
    } else {
      const el = document.querySelector(normalizedSelector);
      if (el) {
        el.scrollIntoView({ behavior: fallbackBehavior });
      }
    }
  }, []);

  const handleAddToBag = useCallback((product: Product) => {
    setBagItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const handleUpdateQuantity = useCallback(
    (productId: string, delta: number) => {
      setBagItems((prev) =>
        prev
          .map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + delta }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    },
    []
  );

  const handleRemoveItem = useCallback((productId: string) => {
    setBagItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  }, []);

  const handleClearBag = useCallback(() => {
    setBagItems([]);
  }, []);

  const totalBagCount = bagItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-pearl text-midnight">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-midnight focus:text-pearl focus:border focus:border-champagne focus:text-xs focus:uppercase focus:tracking-[0.2em]"
      >
        Pular para o conteúdo principal
      </a>

      {/* 1. Header (Única barra no topo da página, sem AnnouncementBar acima) */}
      <Header
        bagCount={totalBagCount}
        onOpenBag={() => setIsBagOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onExploreClick={() => handleNavigate('#collection')}
          onSelectProduct={setSelectedProduct}
        />

        {/* 3. Wonder Upper Sections (Departments, Mosaic Collage, The Design Edit, Split Banner, Essentials) */}
        <WonderUpperSections
          onSelectProduct={setSelectedProduct}
          onAddToBag={handleAddToBag}
          onNavigate={handleNavigate}
        />

        {/* 4. Wonder Experience Sections (Blur Banner, Marquee, Shoppable Image, Sticky Parallax, Video Reels, 4-Column Grid, Pills, Testimonials, Features) */}
        <WonderExperienceSections
          onSelectProduct={setSelectedProduct}
          onAddToBag={handleAddToBag}
          onNavigate={handleNavigate}
        />

        {/* 5. Newsletter Section */}
        <Newsletter />
      </main>

      {/* 8. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToBag={handleAddToBag}
      />

      {/* Interactive Shopping Bag Drawer */}
      <ShoppingBagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={bagItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBag={handleClearBag}
      />
    </div>
  );
}
