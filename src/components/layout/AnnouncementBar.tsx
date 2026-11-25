'use client';

import React from 'react';

export function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Comunicado da coleção"
      className="relative z-40 w-full bg-midnight text-pearl border-b border-champagne/25 py-2.5 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center">
        <span
          aria-hidden="true"
          className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-champagne/80"
        />
        <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-pearl/95 font-normal">
          THE OCEAN COLLECTION{' '}
          <span className="text-champagne mx-1.5">—</span> JOIAS QUE GUARDAM O
          AZUL
        </p>
        <span
          aria-hidden="true"
          className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-champagne/80"
        />
      </div>
    </div>
  );
}
