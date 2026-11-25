'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Check, Sparkles, ShieldCheck, ShoppingBag } from 'lucide-react';
import type { Product } from '@/data/products';
import { Button } from './Button';

export interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToBag: (product: Product) => void;
}

export function ProductModal({
  product,
  onClose,
  onAddToBag,
}: ProductModalProps) {
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setJustAdded(false);
  }, [product]);

  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToBag(product);
    setJustAdded(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-midnight/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Surface */}
      <div
        data-lenis-prevent
        className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-pearl text-midnight border border-champagne/45 shadow-2xl grid grid-cols-1 md:grid-cols-12"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal de produto"
          className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-midnight/85 text-pearl hover:bg-champagne hover:text-midnight transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Left Column: Visual Showcase */}
        <div className="relative md:col-span-5 bg-[#F7F6F3] border-b md:border-b-0 md:border-r border-[#e6e3de] flex flex-col justify-between p-6 sm:p-8">
          <div className="relative w-full aspect-square my-auto">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-contain object-center"
            />
          </div>

          <div className="pt-5 mt-4 border-t border-[#e6e3de] text-left">
            <span className="inline-block text-xs uppercase tracking-[0.22em] text-[#605e5d] font-medium mb-1">
              {product.edition}
            </span>
            <p className="font-serif italic text-lg sm:text-xl text-[#1e1b18]">
              “A arte da alta joalheria em Ouro 18k &amp; Safiras.”
            </p>
          </div>
        </div>

        {/* Right Column: Editorial & Technical Details */}
        <div className="md:col-span-7 p-6 sm:p-8 md:p-11 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-ocean font-semibold mb-2">
              <span>{product.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
              <span>{product.editorialNote}</span>
            </div>

            <h2
              id="modal-product-title"
              className="font-serif text-3xl sm:text-5xl font-light text-midnight tracking-wide"
            >
              {product.name}
            </h2>

            <p className="mt-2 text-sm sm:text-base font-light text-midnight/80">
              {product.subtitle}
            </p>

            <div className="mt-5 pb-5 border-b border-mist/80 flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-light tabular-nums text-midnight">
                {product.formattedPrice}
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-ocean font-semibold">
                Em até 10x sem juros ou 5% off à vista
              </span>
            </div>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-midnight/90">
              {product.description}
            </p>

            {/* Noble Materials */}
            <div className="mt-6">
              <h3 className="text-xs uppercase tracking-[0.22em] text-midnight font-semibold mb-3 flex items-center gap-2">
                <Sparkles
                  className="w-4 h-4 text-champagne"
                  aria-hidden="true"
                />
                <span>Materiais Nobres &amp; Cravação</span>
              </h3>
              <ul className="space-y-2">
                {product.materials.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-midnight/85 flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specifications Grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 p-5 rounded-2xl bg-midnight/[0.03] border border-mist/80">
              {product.specifications.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-xs uppercase tracking-[0.18em] text-midnight/70 font-medium">
                    {spec.label}
                  </dt>
                  <dd className="text-sm font-semibold text-midnight mt-0.5">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs text-midnight/75 tracking-wide">
              {product.dimensions}
            </p>
          </div>

          {/* CTA & Guarantee */}
          <div className="pt-2 space-y-3">
            <Button
              variant={justAdded ? 'secondary' : 'primary'}
              size="lg"
              fullWidth
              onClick={handleAdd}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Adicionado à Sacola — Adicionar Outro</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  <span className="tabular-nums">Adicionar à Sacola — {product.formattedPrice}</span>
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-midnight/75 text-center">
              <ShieldCheck
                className="w-4 h-4 text-champagne shrink-0"
                aria-hidden="true"
              />
              <span>
                Acompanha Certificado Gemológico NÉRÉA, estojo em linho marinho
                e envio segurado.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
