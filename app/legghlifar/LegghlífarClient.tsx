'use client';

import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import ProductCard from '@/components/ProductCard';
import { type Product } from '@/lib/sanity';

export default function LegghlífarClient({ products }: { products: Product[] }) {
  return (
    <PageLayout>
      <section style={{ padding: '140px 24px 48px', maxWidth: 1280, margin: '0 auto' }}>
        <Link href="/" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32, fontSize: '0.8125rem' }}>← Til baka</Link>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 900, letterSpacing: '-0.015em', lineHeight: 1, color: '#fff', marginBottom: 16 }}>Legghlífar</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}>Léttar og þægilegar. Hannaðar til að vera sem minnst fyrir þér. Fáanlegar í S, M og L.</p>
      </section>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>
    </PageLayout>
  );
}
