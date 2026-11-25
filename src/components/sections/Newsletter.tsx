'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Check, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { animateSectionReveal } from '@/lib/animations';
import { Button } from '@/components/ui/Button';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MEMBER_PRIVILEGES = [
  '01. Pré-lançamentos Exclusivos',
  '02. Convites do Atelier',
  '03. Edições Numeradas',
];

export function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useGSAP(
    () => {
      animateSectionReveal(sectionRef.current, '[data-newsletter-reveal]', {
        y: 24,
        duration: 1.1,
        stagger: 0.14,
      });
    },
    { scope: sectionRef }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitted) return;

    const trimmed = email.trim();

    if (!trimmed) {
      setErrorMessage('Por favor, insira seu endereço de e-mail.');
      return;
    }

    if (!EMAIL_REGEX.test(trimmed)) {
      setErrorMessage('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    setErrorMessage('');
    setIsSubmitted(true);
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      aria-labelledby="newsletter-heading"
      className="relative bg-atlantic text-pearl py-28 sm:py-36 lg:py-44 px-6 sm:px-10 lg:px-16 xl:px-20 border-t border-champagne/25 overflow-hidden"
    >
      {/* Monumental Watermark Background Typography — Larger & Clearer */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center overflow-hidden z-0"
      >
        <span className="text-[15vw] font-serif font-light uppercase leading-none tracking-[0.12em] text-pearl/[0.06] whitespace-nowrap">
          NÉRÉA PRIVÉ
        </span>
      </div>

      {/* Subtle Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/4 w-[620px] h-[360px] rounded-full bg-ocean/35 blur-3xl z-0"
      />

      <div className="relative z-10 max-w-[1800px] mx-auto w-full">
        <div className="rounded-[32px] bg-midnight/60 backdrop-blur-md border border-champagne/35 p-8 sm:p-12 lg:p-16 xl:p-20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center">
            {/* Left Column: Editorial Headline, Narrative & Privilege Pills (Left-to-Right Flow) */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div
                data-newsletter-reveal
                className="inline-flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.28em] text-champagne font-medium"
              >
                <Sparkles className="w-4 h-4 text-champagne" aria-hidden="true" />
                <span>Atendimento Privé · Maison NÉRÉA</span>
              </div>

              <h2
                id="newsletter-heading"
                data-newsletter-reveal
                className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-light text-pearl tracking-wide leading-[1.06]"
              >
                Acesso privado às <span className="italic">novas criações.</span>
              </h2>

              <p
                data-newsletter-reveal
                className="text-base sm:text-lg lg:text-xl text-pearl/90 max-w-2xl leading-relaxed font-light"
              >
                Inscreva-se no círculo privado da Maison NÉRÉA para receber em
                primeira mão peças únicas, séries numeradas e convites para
                atendimento exclusivo com nossos gemologistas.
              </p>

              {/* 3 Privilege Pills for Members */}
              <div
                data-newsletter-reveal
                className="pt-2 flex flex-wrap items-center justify-start gap-3"
              >
                {MEMBER_PRIVILEGES.map((privilege) => (
                  <span
                    key={privilege}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-atlantic/75 border border-champagne/40 text-xs uppercase tracking-[0.18em] text-pearl font-medium"
                  >
                    {privilege}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Subscription Form & Status */}
            <div data-newsletter-reveal className="lg:col-span-5 w-full">
              <div className="rounded-2xl bg-midnight/75 border border-champagne/30 p-6 sm:p-8 shadow-xl">
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="space-y-2 text-left">
                    <label
                      htmlFor="newsletter-email"
                      className="block text-xs uppercase tracking-[0.22em] text-champagne font-medium"
                    >
                      Inscrição Privada
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 text-left">
                        <input
                          id="newsletter-email"
                          type="email"
                          value={email}
                          disabled={isSubmitted}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errorMessage) setErrorMessage('');
                          }}
                          placeholder="Seu melhor e-mail"
                          aria-invalid={Boolean(errorMessage)}
                          aria-describedby={
                            errorMessage
                              ? 'newsletter-error'
                              : isSubmitted
                                ? 'newsletter-success'
                                : undefined
                          }
                          className="w-full min-h-[54px] px-5 py-3.5 rounded-full bg-midnight/90 border border-mist/45 text-pearl placeholder:text-mist/70 text-sm sm:text-base focus:outline-none focus:border-champagne transition-colors disabled:opacity-65 disabled:border-champagne/45 disabled:cursor-not-allowed"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitted}
                        className={`rounded-full shrink-0 ${
                          isSubmitted
                            ? 'disabled:opacity-100 !bg-midnight/90 !border-champagne !text-champagne'
                            : ''
                        }`}
                      >
                        {isSubmitted ? (
                          <>
                            <Check className="w-4 h-4 text-champagne" aria-hidden="true" />
                            <span>Inscrito</span>
                          </>
                        ) : (
                          <>
                            <span>Inscrever-se</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {errorMessage && (
                    <div
                      id="newsletter-error"
                      role="alert"
                      className="flex items-center justify-start gap-2 text-xs sm:text-sm text-champagne pt-1"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {isSubmitted && (
                    <div
                      id="newsletter-success"
                      role="status"
                      aria-live="polite"
                      className="p-4 rounded-2xl bg-atlantic/80 border border-champagne/50 text-pearl flex items-center justify-start gap-3 transition-opacity duration-500"
                    >
                      <CheckCircle2 className="w-5 h-5 text-champagne shrink-0" aria-hidden="true" />
                      <p className="font-serif text-lg sm:text-xl tracking-wide text-pearl">
                        Obrigado por acompanhar a NÉRÉA.
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-pearl/75 pt-1 text-left leading-relaxed">
                    Comunicações ocasionais e curadas. Respeitamos integralmente sua privacidade.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
