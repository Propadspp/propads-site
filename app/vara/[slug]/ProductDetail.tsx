'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { urlFor, type Product } from '@/lib/sanity';

function fmtPrice(n: number) { return n.toLocaleString('is-IS') + ' kr'; }

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find(s => s.stock > 0)?.size ?? product.sizes[0]?.size ?? ''
  );
  const [activeImg, setActiveImg] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastSize, setToastSize] = useState('');

  const images = product.images ?? [];
  const mainImg = images[activeImg]
    ? urlFor(images[activeImg]).width(800).height(800).fit('crop').auto('format').url()
    : 'https://placehold.co/800x800/141414/222222?text=';

  const categoryLabel = product.category === 'legghlifar' ? 'Legghlífar' : 'Gripsokkar';
  const categoryHref = product.category === 'legghlifar' ? '/legghlifar' : '/gripsokkar';
  const inStock = product.sizes.some(s => s.stock > 0);
  const selectedSizeObj = product.sizes.find(s => s.size === selectedSize);
  const selectedStock = selectedSizeObj?.stock ?? 0;
  const currentPrice = selectedSizeObj?.price ?? product.price;

  function handleAdd() {
    if (!selectedSize || selectedStock === 0) return;
    addItem({ id: product._id, name: product.name, price: currentPrice, category: categoryLabel, size: selectedSize });
    setToastSize(selectedSize);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  }

  const thumbSrc = images[0]
    ? urlFor(images[0]).width(120).height(120).fit('crop').auto('format').url()
    : null;

  return (
    <div style={{ minHeight: '100svh', background: '#080808', color: '#fff' }}>

      {/* Add-to-cart toast */}
      <div style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 9000,
        background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
        boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
        transform: toastVisible ? 'translateY(0)' : 'translateY(120%)',
        opacity: toastVisible ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease',
        pointerEvents: 'none', maxWidth: 320,
      }}>
        {thumbSrc && (
          <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', flexShrink: 0, position: 'relative', background: '#111' }}>
            <Image src={thumbSrc} alt="" fill style={{ objectFit: 'cover' }} />
          </div>
        )}
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--brand)', fontWeight: 700, marginBottom: 2 }}>Bætt í körfu ✓</p>
          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>Stærð {toastSize} · {fmtPrice(currentPrice)}</p>
        </div>
      </div>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '20px 32px', display: 'flex', gap: 8, alignItems: 'center', background: 'linear-gradient(to bottom,rgba(8,8,8,0.9) 0%,transparent 100%)', backdropFilter: 'blur(12px)' }}>
        <Link href={categoryHref} className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem' }}>
          ← {categoryLabel}
        </Link>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 24px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'start' }}>

        {/* Image column */}
        <div>
          <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 20, overflow: 'hidden', background: '#111' }}>
            <Image src={mainImg} alt={product.name} fill style={{ objectFit: 'cover' }} priority />
            {product.featured && (
              <span style={{ position: 'absolute', top: 16, left: 16, background: 'var(--brand)', color: '#080808', fontSize: '0.6875rem', fontWeight: 700, padding: '4px 12px', borderRadius: 7, letterSpacing: '0.05em' }}>NÝTT</span>
            )}
          </div>
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              {images.map((img, i) => {
                const thumb = urlFor(img).width(120).height(120).fit('crop').auto('format').url();
                return (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 72, borderRadius: 10, overflow: 'hidden', border: `2px solid ${activeImg === i ? 'var(--brand)' : 'transparent'}`, padding: 0, cursor: 'pointer', flexShrink: 0, position: 'relative', background: '#111' }}>
                    <Image src={thumb} alt="" fill style={{ objectFit: 'cover' }} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Info column */}
        <div style={{ paddingTop: 16 }}>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{categoryLabel}</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05, color: '#fff', marginBottom: 16 }}>{product.name}</h1>

          {product.description && (
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.75, marginBottom: 32 }}>{product.description}</p>
          )}

          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>Veldu stærð</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
              {product.sizes.map(s => (
                <button
                  key={s.size}
                  onClick={() => s.stock > 0 && setSelectedSize(s.size)}
                  className={`size-btn${selectedSize === s.size ? ' active' : ''}`}
                  disabled={s.stock === 0}
                  style={{ padding: '0 24px', height: 48, fontSize: '0.9375rem', opacity: s.stock === 0 ? 0.35 : 1 }}
                >
                  {s.size}{s.stock === 0 ? ' — uppselt' : ''}
                </button>
              ))}
            </div>
            {product.category === 'legghlifar' && (
              <details style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 10 }}>
                <summary style={{ listStyle: 'none', cursor: 'pointer', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  Hvernig vel ég rétta stærð? <span>▾</span>
                </summary>
                <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginTop: 8 }}>
                  Legghlífar koma í 3 mismunandi stærðum:<br/>S — 4–8 ára — 8×5 cm<br/>M — 8–12 ára — 10×6 cm<br/>L — 15+ ára — 12×8 cm
                </p>
              </details>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <span className="font-display" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>{fmtPrice(currentPrice)}</span>
            {!inStock && <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>Uppselt</span>}
          </div>

          <button
            onClick={handleAdd}
            disabled={!inStock || selectedStock === 0}
            className="btn-primary"
            style={{ width: '100%', padding: '16px 0', fontSize: '1rem', borderRadius: 14, opacity: (!inStock || selectedStock === 0) ? 0.4 : 1, marginBottom: 24 }}
          >
            {!inStock || selectedStock === 0 ? 'Uppselt' : 'Bæta í körfu'}
          </button>

          {/* Traits */}
          <div style={{ display: 'flex', gap: 10 }}>
            {product.category === 'legghlifar' && (
              <div style={{ flex: 1, background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--brand)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff' }}>Létt</span>
              </div>
            )}
            <div style={{ flex: 1, background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--brand)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff' }}>Þægilegt</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
