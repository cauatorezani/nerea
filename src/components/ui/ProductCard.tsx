'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import type { Product } from '@/data/products';

export interface ProductCardProps {
  product: Product;
  index?: number;
  onSelect: (product: Product) => void;
  onQuickAdd?: (product: Product) => void;
}

export function ProductCard({
  product,
  onSelect,
  onQuickAdd,
}: ProductCardProps) {
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSwatchIndex, setActiveSwatchIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const handlePrevSlide = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setCurrentSlide((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextSlide = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setCurrentSlide((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleQuickAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (onQuickAdd) {
      onQuickAdd(product);
      setJustAdded(true);
      window.setTimeout(() => setJustAdded(false), 1400);
    } else {
      onSelect(product);
    }
  };

  const handleSwatchSelect = (
    event: React.MouseEvent<HTMLButtonElement>,
    swatchIndex: number,
    imageIndex: number
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setActiveSwatchIndex(swatchIndex);
    setCurrentSlide(imageIndex % galleryImages.length);
  };

  const isSaleBadge = product.badge?.startsWith('-');

  return (
    <article
      data-product-card
      className="card__container group relative flex flex-col text-left h-full select-none"
    >
      {/* 1. PICTURE & MULTI-SLIDE GALLERY CONTAINER (1:1 Wonder Theme .card-pro__gallery) */}
      <div
        onClick={() => onSelect(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(product);
          }
        }}
        aria-label={`Ver detalhes de ${product.name} — ${product.formattedPrice}`}
        className="card__picture-container card-pro__gallery relative w-full aspect-square bg-[#F7F6F3] overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1e1b18]"
      >
        {/* Slides Track */}
        <div className="relative w-full h-full">
          {galleryImages.map((imgSrc, idx) => (
            <div
              key={`${product.id}-img-${idx}`}
              className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                idx === currentSlide
                  ? 'opacity-100 z-[1]'
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={imgSrc}
                alt={`${product.name} — Vista ${idx + 1}`}
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>

        {/* Top-Left Pill Badge (.card__badges) */}
        {product.badge && (
          <div className="card__badges absolute top-3 left-3 z-10 flex flex-col items-start gap-1.5 pointer-events-none">
            <span
              className={`px-2.5 py-1 rounded-[30px] text-[12px] leading-none font-medium tracking-wide ${
                isSaleBadge
                  ? 'bg-[#6f3434] text-white'
                  : 'bg-[#e6e3de]/95 text-[#1e1b18] backdrop-blur-sm'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Bottom Center Dual-Arrow Pill [ < | > ] (.card-pro__gallery-buttons) */}
        {galleryImages.length > 1 && (
          <div
            data-gallery-buttons
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center rounded-[30px] overflow-hidden opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shadow-sm"
          >
            <button
              type="button"
              onClick={handlePrevSlide}
              aria-label="Foto anterior"
              className="wt-gallery-arrow wt-gallery-arrow--prev"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 7L5 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 17L5 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              aria-label="Próxima foto"
              className="wt-gallery-arrow wt-gallery-arrow--next"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 12H5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 17L19 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 7L19 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Bottom-Right Circular Quick-Add '+' Button (.card-pro__qbp-trigger) */}
        <div className="absolute right-2 bottom-2 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleQuickAddClick}
            aria-label={`Adicionar ${product.name} à sacola`}
            className="wt-qbp-trigger shadow-sm"
          >
            {justAdded ? (
              <Check className="w-4 h-4" aria-hidden="true" />
            ) : (
              <svg
                className="w-4 h-4 fill-current"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 72 72"
              >
                <g>
                  <rect
                    className="icon-plus-y"
                    width="54"
                    height="5"
                    rx="2.5"
                    y="33.5"
                    x="9"
                  />
                  <rect
                    className="icon-plus-x"
                    width="5"
                    height="54"
                    rx="2.5"
                    y="9"
                    x="33.5"
                  />
                </g>
              </svg>
            )}
          </button>
        </div>

        {/* Bottom Edge 4-Segment Progress Indicator (.card-pro__gallery-indicator) */}
        {galleryImages.length > 1 && (
          <div
            aria-hidden="true"
            className="absolute bottom-0 inset-x-0 z-10 flex opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            {galleryImages.map((_, idx) => (
              <span
                key={`${product.id}-seg-${idx}`}
                className={`flex-1 h-[2px] transition-colors duration-200 ${
                  idx === currentSlide ? 'bg-[#4c4a45]' : 'bg-white/90'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. METADATA & PRICE BELOW CARD (1:1 Wonder Theme .card--left) */}
      <div className="flex flex-col items-start text-left pt-0.5">
        {/* Vendor / Brand (.card__subtitle) */}
        <p className="mt-3 mb-1 text-[10px] uppercase tracking-[0.22em] text-[#9b9b9b] font-medium leading-normal">
          {product.vendor || 'Maison NÉRÉA'}
        </p>

        {/* Product Title (.card__title) */}
        <h3 className="m-0">
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="font-serif text-left text-[18px] sm:text-[19.5px] leading-[1.25] font-normal tracking-[0.01em] text-[#1e1b18] hover:text-[#165D7A] transition-colors cursor-pointer"
          >
            {product.name}
          </button>
        </h3>

        {/* Price Always Visible Below Title (.card__price) */}
        <div className="mt-1 mb-1 flex items-center gap-2 text-[13.5px] sm:text-[14px] font-normal tracking-[0.05em] tabular-nums text-[#1e1b18]">
          <span
            className={
              product.compareAtPrice ? 'text-[#6f3434] font-medium' : ''
            }
          >
            {product.formattedPrice}
          </span>
          {product.compareAtPrice && (
            <s className="text-[12.5px] text-[#1e1b18] opacity-50 font-light">
              {product.compareAtPrice}
            </s>
          )}
        </div>

        {/* Color Swatches (.card__color-swatcher--container) */}
        {product.swatches && product.swatches.length > 0 && (
          <div
            className="mt-1.5 flex items-center flex-wrap gap-2 min-h-[18px]"
            aria-label={`Opções de acabamento para ${product.name}`}
          >
            {product.swatches.map((swatch, idx) => {
              const isSelected = idx === activeSwatchIndex;
              return (
                <button
                  key={`${product.id}-swatch-${swatch.name}`}
                  type="button"
                  title={swatch.name}
                  aria-label={`${product.name} — ${swatch.name}`}
                  onClick={(e) => handleSwatchSelect(e, idx, swatch.imageIndex)}
                  onMouseEnter={(e) =>
                    handleSwatchSelect(e, idx, swatch.imageIndex)
                  }
                  className={`w-[18px] h-[18px] rounded-full p-[2px] border transition-colors cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? 'border-[#1e1b18]'
                      : 'border-[#d6d6d6] hover:border-[#9b9b9b]'
                  }`}
                >
                  <span
                    className="w-full h-full rounded-full block border border-black/10"
                    style={{ backgroundColor: swatch.color }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
