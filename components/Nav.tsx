'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';

export default function Nav({ onCartOpen }: { onCartOpen: () => void }) {
  const { totalQty } = useCart();

  return (
    <>
      <nav style={{ background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.055)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }} aria-label="Propads forsíða">
            <span className="font-display" style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.035em', color: '#fff' }}>PROPADS</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={onCartOpen} aria-label="Karfa" style={{ position: 'relative', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', background: 'transparent', cursor: 'pointer' }}>
              <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {totalQty > 0 && (
                <span style={{ position: 'absolute', top: -6, right: -6, minWidth: 18, height: 18, padding: '0 4px', background: 'var(--brand)', color: '#080808', fontSize: '0.6rem', fontWeight: 700, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {totalQty}
                </span>
              )}
            </button>
            <button onClick={onCartOpen} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.875rem', borderRadius: 10 }}>Kaupa núna</button>
          </div>
        </div>
      </nav>
      <div className="nav-center" style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', height: 64, display: 'flex', alignItems: 'center', gap: 32, zIndex: 51 }}>
        <Link href="/#vorur" className="nav-link">Vörur</Link>
        <Link href="/legghlifar" className="nav-link">Legghlífar</Link>
        <Link href="/gripsokkar" className="nav-link">Gripsokkar</Link>
        <Link href="/tilbod" className="nav-link">Tilboð</Link>
        <Link href="/um-okkur" className="nav-link">Um okkur</Link>
        <Link href="/#hafa-samband" className="nav-link">Hafðu samband</Link>
      </div>
    </>
  );
}
