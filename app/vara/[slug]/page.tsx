import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts, urlFor } from '@/lib/sanity';
import ProductDetail from './ProductDetail';
import { fmtNumber } from '@/lib/format';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ slug: p.slug.current }));
}

// Vefslóðir með íslenskum stöfum (t.d. "æ") berast kóðaðar ("%C3%A6") — afkóðum þær.
function decodeSlug(slug: string) {
  try { return decodeURIComponent(slug); } catch { return slug; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = decodeSlug((await params).slug);
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const title = `${product.name} — Propads`;
  const description = product.description ?? `Kauptu ${product.name} frá Propads. ${fmtNumber(product.price)} kr.`;
  const image = product.images?.[0]
    ? urlFor(product.images[0]).width(1200).height(630).fit('crop').auto('format').url()
    : undefined;
  return {
    title,
    description,
    alternates: { canonical: `/vara/${product.slug.current}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/vara/${product.slug.current}`,
      siteName: 'Propads',
      locale: 'is_IS',
      type: 'website',
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: product.name }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, ...(image ? { images: [image] } : {}) },
  };
}

export default async function VaraPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = decodeSlug((await params).slug);
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
