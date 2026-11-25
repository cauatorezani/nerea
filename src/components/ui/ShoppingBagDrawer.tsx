'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrencyBRL, type Product } from '@/data/products';
import { Button } from './Button';

export interface BagItem {
  product: Product;
  quantity: number;
}

export interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: BagItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearBag: () => void;
}

export function ShoppingBagDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
}: ShoppingBagDrawerProps) {
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCheckoutSubmitted(false);
      return;
    }

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckoutDemo = () => {
    setCheckoutSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sacola de compras NÉRÉA"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-midnight/75 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <aside
        data-lenis-prevent
        className="relative z-10 w-full max-w-md bg-pearl text-midnight h-full flex flex-col justify-between border-l border-champagne/40 shadow-2xl"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-mist/70 flex items-center justify-between bg-pearl">
          <div className="flex items-center gap-3">
            <ShoppingBag
              className="w-5 h-5 text-atlantic"
              aria-hidden="true"
            />
            <h2 className="font-serif text-2xl sm:text-3xl tracking-wide text-midnight">
              Sua Sacola
            </h2>
            <span className="w-6 h-6 rounded-full text-xs font-semibold bg-midnight text-pearl flex items-center justify-center">
              {totalItems}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar sacola"
            className="w-10 h-10 rounded-full flex items-center justify-center text-midnight/80 hover:text-midnight hover:bg-mist/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {checkoutSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-14 h-14 rounded-full bg-atlantic/10 border border-champagne flex items-center justify-center mb-5">
                <CheckCircle2
                  className="w-7 h-7 text-atlantic"
                  aria-hidden="true"
                />
              </div>
              <span className="text-xs uppercase tracking-[0.24em] text-ocean font-semibold mb-2">
                Atendimento Private Concierge
              </span>
              <h3 className="font-serif text-3xl text-midnight mb-3">
                Solicitação Recebida
              </h3>
              <p className="text-sm text-midnight/85 leading-relaxed mb-8">
                Sua seleção da <em>Coleção Lumière Bleue</em> foi registrada. Um
                consultor de alta joalheria da Maison NÉRÉA conduzirá seu
                atendimento personalizado e o envio segurado.
              </p>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  onClearBag();
                  setCheckoutSubmitted(false);
                  onClose();
                }}
              >
                Voltar à Coleção
              </Button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-14">
              <div className="w-12 h-12 rounded-full border border-mist flex items-center justify-center mb-4 text-ocean">
                <Sparkles
                  className="w-5 h-5 text-champagne"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-midnight mb-2">
                Sua sacola está vazia
              </h3>
              <p className="text-sm text-midnight/75 max-w-xs leading-relaxed mb-7">
                Conheça as peças numeradas em Ouro 18k, safiras azuis e
                diamantes naturais da Maison NÉRÉA.
              </p>
              <Button variant="primary" size="md" onClick={onClose}>
                Explorar Coleção
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-mist/70">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="py-5 first:pt-0 last:pb-0 flex gap-4"
                >
                  <div className="relative w-20 h-20 aspect-square rounded-none bg-[#ECEEEF] shrink-0 overflow-hidden border border-[#e6e3de]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="200px"
                      className="object-contain object-center"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-xl sm:text-2xl text-midnight leading-snug">
                          {product.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          aria-label={`Remover ${product.name} da sacola`}
                          className="text-midnight/60 hover:text-midnight p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="text-xs text-midnight/75 mt-0.5">
                        {product.category} — {product.editorialNote}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center rounded-full border border-mist bg-pearl overflow-hidden">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          aria-label={`Diminuir quantidade de ${product.name}`}
                          className="w-8 h-8 flex items-center justify-center text-midnight hover:bg-mist/30 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold tabular-nums text-midnight">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          aria-label={`Aumentar quantidade de ${product.name}`}
                          className="w-8 h-8 flex items-center justify-center text-midnight hover:bg-mist/30 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold tabular-nums tracking-wider text-midnight">
                        {formatCurrencyBRL(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !checkoutSubmitted && (
          <div className="p-6 border-t border-mist/80 bg-pearl space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-midnight/80">
                <span>Envio Blindado &amp; Seguro All-Risk</span>
                <span className="uppercase tracking-widest text-ocean font-semibold">
                  Cortesia
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-mist/50">
                <span className="text-xs uppercase tracking-[0.22em] text-midnight font-semibold">
                  Subtotal
                </span>
                <span className="font-serif text-3xl tabular-nums text-midnight">
                  {formatCurrencyBRL(subtotal)}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleCheckoutDemo}
            >
              Finalizar Reserva Exclusiva
            </Button>

            <p className="text-xs text-center text-midnight/70">
              Todas as criações acompanham certificado gemológico numerado.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
