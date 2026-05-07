'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { type Bundle } from '@/lib/sanity';

function fmtPrice(n: number) { return n.toLocaleString('is-IS') + ' kr'; }

const LEGGHLIF_SIZES = ['S', 'M', 'L'];

type SizeQty = Record<string, number>;

export default function TeamBundleCard({ bundle }: { bundle: Bundle }) {
  const { addItem } = useCart();
  const [sizeQty, setSizeQty] = useState<SizeQty>({ S: 0, M: 0, L: 0 });
  const [toast, setToast] = useState('');

  const total = Object.values(sizeQty).reduce((a: number, b: number) => a + b, 0);
  const needed = bundle.legghlif;
  const valid = total === needed;

  function adjust(size: string, delta: number) {
    setSizeQty(prev => {
      const next = { ...prev, [size]: Math.max(0, (prev[size] ?? 0) + delta) };
      const t = Object.values(next).reduce((a: number, b: number) => a + b, 0);
      if (t > needed) return prev;
      return next;
    });
  }

  function addToCart() {
    if (!valid) return;
    const sizeDesc = Object.entries(sizeQty)
      .filter(([, q]) => q > 0)
      .map(([s, q]) => `${q}× ${s}`)
      .join(', ');
    addItem({
      id: bundle._id,
      name: bundle.name,
      price: bundle.price,
      category: 'Legghlífar',
      size: sizeDesc,
    });
    setToast('Bætt í körfu ✓');
    setTimeout(() => setToast(''), 2000);
  }

  const items = [
    bundle.legghlif > 0 && [`${bundle.legghlif}× Legghlíf${bundle.legghlif > 1 ? 'ar' : ''}`, `${bundle.legghlif} leikm.`],
    bundle.gripsokkar > 0 && [`${bundle.gripsokkar}× Gripsokkar`, '2 pör á hvern leikmann'],
  ].filter(Boolean) as [string, string][];

  return (
    <>
      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9000, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '12px 20px', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500 }}>
          {toast}
        </div>
      )}
      <div style={{ background: '#0f1308', border: '1px solid rgba(184,240,58,0.3)', borderRadius: 24, overflow: 'hidden' }}>
        <div style={{ padding: '32px 32px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Lið pakkinn</p>
            {bundle.badge && (
              <span style={{ background: 'rgba(184,240,58,0.15)', color: 'var(--brand)', fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: 6, letterSpacing: '0.06em' }}>{bundle.badge}</span>
            )}
          </div>
          <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', marginBottom: 6 }}>{bundle.name}</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 20 }}>{bundle.description}</p>

          {/* Vara listi */}
          <div style={{ marginBottom: 20, display: 'flex', flexDirection: 'column' }}>
            {items.map(([t, s]) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.055)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(184,240,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand)' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{t}</p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{s}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stærðarval */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px 20px', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Veldu stærðir</p>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: valid ? 'var(--brand)' : 'rgba(255,255,255,0.3)' }}>
                {total} / {needed}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LEGGHLIF_SIZES.map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#fff', minWidth: 28 }}>{s}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <button
                      onClick={() => adjust(s, -1)}
                      style={{ width: 34, height: 34, borderRadius: '7px 0 0 7px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: (sizeQty[s] ?? 0) === 0 ? 'rgba(255,255,255,0.2)' : '#fff', fontSize: '1.1rem', cursor: 'pointer' }}
                    >−</button>
                    <div style={{ width: 40, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', fontSize: '0.9375rem', fontWeight: 600, color: '#fff' }}>
                      {sizeQty[s] ?? 0}
                    </div>
                    <button
                      onClick={() => adjust(s, 1)}
                      style={{ width: 34, height: 34, borderRadius: '0 7px 7px 0', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: total >= needed ? 'rgba(255,255,255,0.2)' : '#fff', fontSize: '1.1rem', cursor: 'pointer' }}
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 32px 28px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>
            {fmtPrice(bundle.price)}
          </span>
          <button
            onClick={addToCart}
            disabled={!valid}
            style={{ padding: '12px 24px', fontSize: '0.9rem', borderRadius: 11, border: 'none', cursor: valid ? 'pointer' : 'default', background: valid ? 'var(--brand)' : 'rgba(255,255,255,0.08)', color: valid ? '#080808' : 'rgba(255,255,255,0.25)', fontWeight: 700, transition: 'background 0.15s, color 0.15s' }}
          >
            {valid ? 'Í körfu' : `${needed - total} í viðbót`}
          </button>
        </div>
      </div>
    </>
  );
}
