'use client';

import { useCart } from '@/lib/cart';

export default function CartToast() {
  const { toast } = useCart();
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        left: '50%',
        transform: `translateX(-50%) translateY(${toast ? 0 : 24}px)`,
        opacity: toast ? 1 : 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        background: 'var(--brand)',
        color: '#0a0a0a',
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: '0.01em',
        padding: '10px 20px',
        borderRadius: 40,
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 24px color-mix(in srgb, var(--brand) 40%, transparent)',
      }}
    >
      ✓ {toast}
    </div>
  );
}
