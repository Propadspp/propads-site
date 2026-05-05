import type { Metadata } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const barlowCondensed = Barlow_Condensed({
  weight: ['700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-barlow',
});

export const metadata: Metadata = {
  title: 'Propads — Legghlífar & Gripsokkar',
  description: 'Íslenskar fótboltavörur. Hannaðar fyrir þá sem gefa 100%.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="is" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
