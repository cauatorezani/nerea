import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#071F33',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'NÉRÉA Haute Joaillerie | Ouro 18k, Safiras Azuis & Diamantes',
  description:
    'A arte da alta joalheria. Safiras de azul profundo, águas-marinhas Santa Maria e diamantes naturais cravados à mão em ouro 18k certificado.',
  keywords: [
    'NÉRÉA',
    'alta joalheria',
    'haute joaillerie',
    'ouro 18k',
    'safira azul',
    'diamantes naturais',
    'pulseira riviera safira',
  ],
  openGraph: {
    title: 'NÉRÉA Haute Joaillerie | Ouro 18k, Safiras Azuis & Diamantes',
    description:
      'Peças numeradas forjadas à mão em ouro 18k com safiras naturais selecionadas e diamantes de lapidação brilhante.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${montserrat.variable}`}
    >
      <body className="font-sans bg-pearl text-midnight antialiased selection:bg-champagne/30 selection:text-midnight">
        {children}
      </body>
    </html>
  );
}
