import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/sanity';
import ProductDetail from './ProductDetail';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Propads`,
    description: product.description ?? `Kauptu ${product.name} frá Propads. ${product.price.toLocaleString('is-IS')} kr.`,
    openGraph: {
      title: `${product.name} — Propads`,
      description: product.description ?? `${product.name} — ${product.price.toLocaleString('is-IS')} kr`,
      url: `https://propads.is/vara/${slug}`,
      siteName: 'Propads',
      locale: 'is_IS',
      type: 'website',
    },
  };
}

export default async function VaraPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
