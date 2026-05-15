'use client';

import { useCart } from '@/lib/cart';
import { useRouter } from 'next/navigation';

function fmtPrice(n: number) { return n.toLocaleString('is-IS') + ' kr'; }

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, removeItem, updateQty, subtotal } = useCart();
  const router = useRouter();

  function goCheckout() {
    onClose();
    router.push('/klara-kaup');
  }

  return (
    <>
      {open && <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200 }} />}
      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-label="Karfa">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Karfan þín</h2>
          <button onClick={onClose} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 9, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
          {cart.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '60px 24px', textAlign: 'center' }}>
              <svg width="52" height="52" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.18)" strokeWidth="1.4"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9375rem' }}>Karfan þín er tóm</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={`${item.id}-${item.size}`} style={{ display: 'flex', gap: 12, padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fff', marginBottom: 3 }}>{item.name}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>{item.category} · Stærð {item.size}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                    <button onClick={() => updateQty(item.id, item.size, item.qty - 1)} style={{ width: 28, height: 28, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 7, background: 'transparent', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                    <span style={{ minWidth: 22, textAlign: 'center', fontSize: '0.9rem' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.size, item.qty + 1)} style={{ width: 28, height: 28, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 7, background: 'transparent', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
                  <button onClick={() => removeItem(item.id, item.size)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '1.25rem', lineHeight: 1 }}>×</button>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{fmtPrice(item.price * item.qty)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem' }}>Millisamtals</span>
              <span style={{ fontSize: '0.8125rem' }}>{fmtPrice(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem' }}>Sending</span>
              {subtotal >= 8000
                ? <span style={{ fontSize: '0.8125rem', color: 'var(--brand)', fontWeight: 600 }}>Ókeypis</span>
                : <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>700 / 1.500 kr</span>}
            </div>
            <button onClick={goCheckout} className="btn-primary" style={{ width: '100%', padding: 14, fontSize: '1rem', borderRadius: 12 }}>Klára kaup</button>
          </div>
        )}
      </aside>
    </>
  );
}
