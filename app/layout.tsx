import type { Metadata } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import MetaPixel from '@/components/MetaPixel';
import CookieBanner from '@/components/CookieBanner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { getSiteSettings, urlFor } from '@/lib/sanity';
import { SITE_URL } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const barlowCondensed = Barlow_Condensed({
  weight: ['700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-barlow',
});

const DEFAULT_TITLE = 'Propads — Legghlífar & Gripsokkar';
const DEFAULT_DESCRIPTION = 'Íslenskar fótboltavörur. Hannaðar fyrir þá sem gefa 100%.';

// Forsýningin sem birtist þegar propads.is er deilt á Instagram, Facebook, Messenger o.fl.
// Myndin er "Legghlífar" flokkamyndin úr Sanity (Site Settings).
export async function generateMetadata(): Promise<Metadata> {
  let image: string | undefined;
  try {
    const settings = await getSiteSettings();
    if (settings?.legghlifarImage) {
      image = urlFor(settings.legghlifarImage).width(1200).height(630).fit('crop').auto('format').url();
    }
  } catch {}
  return {
    metadataBase: new URL(SITE_URL),
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    openGraph: {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
      siteName: 'Propads',
      locale: 'is_IS',
      type: 'website',
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: 'Propads legghlífar' }] } : {}),
    },
    twitter: { card: 'summary_large_image', title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, ...(image ? { images: [image] } : {}) },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="is" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body>
        <MetaPixel />
        <CookieBanner />
        <CartProvider>{children}</CartProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
