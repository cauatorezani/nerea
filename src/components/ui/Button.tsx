'use client';

import React from 'react';

/**
 * Identidade visual estrita de apenas 2 estilos de botão em todo o site:
 * 1. Primary (Pill Sólido Champagne #B9A16B -> Hover Deep Atlantic/Midnight)
 * 2. Secondary (Pill Glass/Outline -> Hover Champagne #B9A16B)
 * Mantemos os aliases no tipo apenas para compatibilidade de contrato entre seções.
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'pearl'
  | 'outline-light'
  | 'outline-dark'
  | 'champagne';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const PRIMARY_STYLE =
  'rounded-full bg-champagne text-midnight border border-champagne hover:bg-pearl hover:text-midnight hover:border-pearl shadow-[0_12px_30px_rgba(185,161,107,0.28)]';

const SECONDARY_STYLE =
  'rounded-full bg-midnight/60 backdrop-blur-md text-pearl border border-pearl/35 hover:bg-champagne hover:text-midnight hover:border-champagne';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: PRIMARY_STYLE,
  champagne: PRIMARY_STYLE,
  pearl: PRIMARY_STYLE,
  secondary: SECONDARY_STYLE,
  'outline-light': SECONDARY_STYLE,
  'outline-dark': SECONDARY_STYLE,
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-[44px] px-6 py-2.5 text-xs tracking-[0.2em]',
  md: 'min-h-[50px] px-8 py-3.5 text-xs sm:text-[13px] tracking-[0.22em]',
  lg: 'min-h-[56px] px-10 py-4 text-[13px] sm:text-sm tracking-[0.24em]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-3 font-sans uppercase font-semibold transition-all duration-500 ease-luxury cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-midnight disabled:opacity-50 disabled:pointer-events-none ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
