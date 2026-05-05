'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart';
import { urlFor, type Product } from '@/lib/sanity';

function Toast({ msg }: { msg: string }) {
  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9000, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '12px 20px', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
      {msg}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.size ?? '');
  const [toast, setToast] = useState('');

  const imgSrc = product.images?.[0]
    ? urlFor(product.images[0].asset).width(400).height(280).fit('crop').auto('format').url()
    : 'https://placehold.co/400x280/141414/222222?text=';

  const categoryLabel = product.category === 'legghlifar' ? 'Legghlífar' : 'Gripsokkar';

  function handleAdd() {
    if (!selectedSize) { setToast('Veldu stærð fyrst'); setTimeout(() => setToast(''), 2000); return; }
    addItem({ id: product._id, name: product.name, price: product.price, category: categoryLabel, size: selectedSize });
    setToast('Bætt í körfu ✓');
    setTimeout(() => setToast(''), 2000);
  }

  return (
    <>
      <article className="product-card">
        <div style={{ position: 'relative', height: 280, overflow: 'hidden', background: '#161616' }}>
          <Image src={imgSrc} alt={product.name} fill style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,8,0.65) 0%,transparent 55%)', pointerEvents: 'none' }} />
          {product.featured && <span style={{ position: 'absolute', top: 12, right: 12, zIndex: 3, fontSize: '0.6875rem', fontWeight: 700, padding: '3px 10px', borderRadius: 7, letterSpacing: '0.05em', background: 'var(--brand)', color: '#080808' }}>NÝTT</span>}
        </div>
        <div style={{ padding: '1.25rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>{categoryLabel}</p>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 6, lineHeight: 1.3 }}>{product.name}</h3>
          {product.description && <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: 12 }}>{product.description}</p>}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
            {product.sizes.map(s => (
              <button key={s.size} className={`size-btn${selectedSize === s.size ? ' active' : ''}`} onClick={() => setSelectedSize(s.size)} disabled={s.stock === 0}>
                {s.size}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>{product.price.toLocaleString('is-IS')} kr</span>
            <button className="add-btn" onClick={handleAdd}>Í körfu</button>
          </div>
        </div>
      </article>
      {toast && <Toast msg={toast} />}
    </>
  );
}
