'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      zIndex: 9999, width: 'calc(100% - 48px)', maxWidth: 620,
      background: '#141414', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 16, padding: '20px 24px',
      boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, flexWrap: 'wrap',
    }}>
      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, flex: 1, minWidth: 200 }}>
        Við notum kökur til að bæta upplifunina og fylgjast með auglýsingum.{' '}
        <Link href="/personuvernd" style={{ color: 'var(--brand)', textDecoration: 'none' }}>Lesa nánar</Link>
      </p>
      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button onClick={decline} style={{
          padding: '9px 18px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.12)',
          background: 'transparent', color: 'rgba(255,255,255,0.45)', fontSize: '0.8125rem',
          fontWeight: 500, cursor: 'pointer',
        }}>Hafna</button>
        <button onClick={accept} className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.8125rem', borderRadius: 9 }}>
          Samþykkja
        </button>
      </div>
    </div>
  );
}
