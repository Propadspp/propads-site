'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { useCart } from '@/lib/cart';
import { type Product } from '@/lib/sanity';

function fmtPrice(n: number) { return n.toLocaleString('is-IS') + ' kr'; }

export default function GripsokkarClient({ products }: { products: Product[] }) {
  const product = products[0];
  const price = product?.price ?? 0;
  const sizes = product?.sizes?.map(s => s.size) ?? ['38-42', '42-45'];

  const { addItem } = useCart();
  const [singleSize, setSingleSize] = useState(sizes[0] ?? '38-42');
  const [bundleSize, setBundleSize] = useState(sizes[0] ?? '38-42');
  const [selectedBundle, setSelectedBundle] = useState<'3' | '5'>('3');
  const [toast, setToast] = useState('');

  const bundle3Price = Math.round(price * 3 * 0.86);
  const bundle5Price = Math.round(price * 5 * 0.79);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2000); }

  function addSingle() {
    if (!product) return;
    addItem({ id: product._id, name: product.name, price, category: 'Gripsokkar', size: singleSize });
    showToast('Bætt í körfu ✓');
  }

  function addBundle() {
    const qty = selectedBundle === '3' ? 3 : 5;
    const bundlePrice = selectedBundle === '3' ? bundle3Price : bundle5Price;
    addItem({ id: `${product?._id}-bundle-${qty}`, name: `${product?.name ?? 'Gripsokkar'} × ${qty}`, price: bundlePrice, category: 'Gripsokkar', size: bundleSize });
    showToast('Bundle bætt í körfu ✓');
  }

  return (
    <PageLayout>
      {toast && <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9000, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '12px 20px', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500 }}>{toast}</div>}

      <section style={{ padding: '140px 24px 48px', maxWidth: 1280, margin: '0 auto' }}>
        <Link href="/" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32, fontSize: '0.8125rem' }}>← Til baka</Link>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 900, letterSpacing: '-0.015em', lineHeight: 1, color: '#fff', marginBottom: 16 }}>Gripsokkar</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}>Gripsokkar hannaðir með þægindi og grip efst í huga. Fáanlegir í stærðum 38–42 og 42–45.</p>
      </section>

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 32px' }}>
        <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 24, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 400 }}>
            <div style={{ background: '#161616', position: 'relative', minHeight: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '1rem' }}>Mynd kemur</span>
              <span style={{ position: 'absolute', top: 20, left: 20, background: 'var(--brand)', color: '#080808', fontSize: '0.6875rem', fontWeight: 700, padding: '4px 12px', borderRadius: 7, letterSpacing: '0.05em' }}>NÝTT</span>
            </div>
            <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Gripsokkar</p>
              <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 10 }}>{product?.name ?? 'Gripsokkar'}</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9375rem', lineHeight: 1.75, marginBottom: 24 }}>Hannaðir með anti-slip tækni sem heldur fætinum á réttum stað inni í skónum.</p>
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>Veldu stærð</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {sizes.map(s => (
                    <button key={s} className={`size-btn${singleSize === s ? ' active' : ''}`} style={{ padding: '0 18px', height: 44 }} onClick={() => setSingleSize(s)}>{s}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <span className="font-display" style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>{fmtPrice(price)}</span>
                <button onClick={addSingle} className="btn-primary" style={{ padding: '14px 28px', fontSize: '0.9375rem', borderRadius: 12 }}>Í körfu</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Tilboð</p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem,2.5vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>Kauptu fleiri — sparaðu meira</h2>
        </div>
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>Veldu stærð</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {sizes.map(s => (
              <button key={s} className={`size-btn${bundleSize === s ? ' active' : ''}`} style={{ padding: '0 18px', height: 44 }} onClick={() => setBundleSize(s)}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { id: '3' as const, qty: 3, price: bundle3Price, fullPrice: price * 3, discount: '14%' },
            { id: '5' as const, qty: 5, price: bundle5Price, fullPrice: price * 5, discount: '21%' },
          ].map(b => (
            <div key={b.id} onClick={() => setSelectedBundle(b.id)} style={{ background: selectedBundle === b.id ? '#0f1208' : '#101010', border: `1px solid ${selectedBundle === b.id ? 'var(--brand)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 20, padding: '28px 32px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${selectedBundle === b.id ? 'var(--brand)' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {selectedBundle === b.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--brand)' }} />}
                  </div>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fff' }}>{b.qty} pör</span>
                </div>
                <span style={{ background: 'rgba(184,240,58,0.15)', color: 'var(--brand)', fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>{b.discount} AFSLÁTTUR</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span className="font-display" style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>{fmtPrice(b.price)}</span>
                <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through' }}>{fmtPrice(b.fullPrice)}</span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addBundle} style={{ width: '100%', padding: 16, background: 'var(--brand)', color: '#080808', fontSize: '1rem', fontWeight: 700, border: 'none', borderRadius: 12, cursor: 'pointer' }}>
          Bæta í körfu — {selectedBundle === '3' ? `3 pör · ${fmtPrice(bundle3Price)}` : `5 pör · ${fmtPrice(bundle5Price)}`}
        </button>
      </section>
    </PageLayout>
  );
}
