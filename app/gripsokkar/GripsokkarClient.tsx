'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { useCart } from '@/lib/cart';
import { type Product } from '@/lib/sanity';

function fmtPrice(n: number) { return n.toLocaleString('is-IS') + ' kr'; }

type SizeQty = Record<string, number>;

export default function GripsokkarClient({ products }: { products: Product[] }) {
  const product = products[0];
  const price = product?.price ?? 0;
  const sizes = product?.sizes?.map(s => s.size) ?? ['38-42', '42-45'];

  const { addItem } = useCart();
  const [singleSize, setSingleSize] = useState(sizes[0] ?? '38-42');
  const [selectedBundle, setSelectedBundle] = useState<3 | 5>(3);
  const [bundleQty, setBundleQty] = useState<SizeQty>(() =>
    Object.fromEntries(sizes.map((s, i) => [s, i === 0 ? 1 : 0]))
  );
  const [toast, setToast] = useState('');

  const bundle3Price = Math.round(price * 3 * 0.86);
  const bundle5Price = Math.round(price * 5 * 0.79);
  const bundlePrice = selectedBundle === 3 ? bundle3Price : bundle5Price;
  const bundleTotal = Object.values(bundleQty).reduce((a, b) => a + b, 0);
  const bundleValid = bundleTotal === selectedBundle;

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2000); }

  function adjustQty(size: string, delta: number) {
    setBundleQty(prev => {
      const next = { ...prev, [size]: Math.max(0, (prev[size] ?? 0) + delta) };
      const total = Object.values(next).reduce((a, b) => a + b, 0);
      if (total > selectedBundle) return prev;
      return next;
    });
  }

  function switchBundle(n: 3 | 5) {
    setSelectedBundle(n);
    setBundleQty(Object.fromEntries(sizes.map((s, i) => [s, i === 0 ? 1 : 0])));
  }

  function addSingle() {
    if (!product) return;
    addItem({ id: product._id, name: product.name, price, category: 'Gripsokkar', size: singleSize });
    showToast('Bætt í körfu ✓');
  }

  function addBundle() {
    if (!bundleValid || !product) return;
    const sizeDesc = Object.entries(bundleQty)
      .filter(([, q]) => q > 0)
      .map(([s, q]) => `${q}× ${s}`)
      .join(', ');
    addItem({
      id: `${product._id}-bundle-${selectedBundle}`,
      name: `${product.name ?? 'Gripsokkar'} × ${selectedBundle} (${sizeDesc})`,
      price: bundlePrice,
      category: 'Gripsokkar',
      size: sizeDesc,
    });
    showToast('Bundle bætt í körfu ✓');
  }

  return (
    <PageLayout>
      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9000, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '12px 20px', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500 }}>
          {toast}
        </div>
      )}

      <section style={{ padding: '140px 24px 48px', maxWidth: 1280, margin: '0 auto' }}>
        <Link href="/" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32, fontSize: '0.8125rem' }}>← Til baka</Link>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 900, letterSpacing: '-0.015em', lineHeight: 1, color: '#fff', marginBottom: 16 }}>Gripsokkar</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}>Gripsokkar hannaðir með þægindi og grip efst í huga. Fáanlegir í stærðum 38–42 og 42–45.</p>
      </section>

      {/* Single product */}
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="font-display" style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>{fmtPrice(price)}</span>
                <button onClick={addSingle} className="btn-primary" style={{ padding: '14px 28px', fontSize: '0.9375rem', borderRadius: 12 }}>Í körfu</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Tilboð</p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem,2.5vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>Kauptu fleiri — sparaðu meira</h2>
        </div>

        {/* Bundle size selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {([3, 5] as const).map(n => {
            const p = n === 3 ? bundle3Price : bundle5Price;
            const full = price * n;
            const pct = n === 3 ? '14%' : '21%';
            const active = selectedBundle === n;
            return (
              <div key={n} onClick={() => switchBundle(n)} style={{ background: active ? '#0f1208' : '#101010', border: `1px solid ${active ? 'var(--brand)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 20, padding: '24px 28px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${active ? 'var(--brand)' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {active && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--brand)' }} />}
                    </div>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fff' }}>{n} pör</span>
                  </div>
                  <span style={{ background: 'rgba(184,240,58,0.15)', color: 'var(--brand)', fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>{pct} AFSLÁTTUR</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>{fmtPrice(p)}</span>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through' }}>{fmtPrice(full)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Per-size quantity picker */}
        <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '24px 28px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>Veldu stærðarskiptingu</p>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: bundleValid ? 'var(--brand)' : 'rgba(255,255,255,0.35)' }}>
              {bundleTotal} / {selectedBundle} pör
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sizes.map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#fff' }}>{s}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  <button
                    onClick={() => adjustQty(s, -1)}
                    style={{ width: 36, height: 36, borderRadius: '8px 0 0 8px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: (bundleQty[s] ?? 0) === 0 ? 'rgba(255,255,255,0.2)' : '#fff', fontSize: '1.1rem', cursor: 'pointer' }}
                  >−</button>
                  <div style={{ width: 44, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', fontSize: '0.9375rem', fontWeight: 600, color: '#fff' }}>
                    {bundleQty[s] ?? 0}
                  </div>
                  <button
                    onClick={() => adjustQty(s, 1)}
                    style={{ width: 36, height: 36, borderRadius: '0 8px 8px 0', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: bundleTotal >= selectedBundle ? 'rgba(255,255,255,0.2)' : '#fff', fontSize: '1.1rem', cursor: 'pointer' }}
                  >+</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={addBundle}
          disabled={!bundleValid}
          style={{ width: '100%', padding: 16, background: bundleValid ? 'var(--brand)' : 'rgba(255,255,255,0.08)', color: bundleValid ? '#080808' : 'rgba(255,255,255,0.3)', fontSize: '1rem', fontWeight: 700, border: 'none', borderRadius: 12, cursor: bundleValid ? 'pointer' : 'default', transition: 'background 0.15s, color 0.15s' }}>
          {bundleValid
            ? `Bæta í körfu — ${selectedBundle} pör · ${fmtPrice(bundlePrice)}`
            : `Veldu ${selectedBundle - bundleTotal} pör í viðbót`}
        </button>
      </section>
    </PageLayout>
  );
}
