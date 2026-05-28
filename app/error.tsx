'use client';

import Link from 'next/link';

export default function Error() {
  return (
    <main style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Villa</p>
        <h1 style={{ fontSize: 'clamp(2.5rem,8vw,5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1, marginBottom: 16 }}>Eitthvað fór úrskeiðis</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginBottom: 40 }}>Reyndu aftur eða hafðu samband við okkur á propadspp@gmail.com</p>
        <Link href="/" style={{ display: 'inline-block', padding: '14px 32px', background: 'var(--brand)', color: '#080808', fontWeight: 700, borderRadius: 12, textDecoration: 'none', fontSize: '0.9375rem' }}>
          Fara á forsíðu
        </Link>
      </div>
    </main>
  );
}
