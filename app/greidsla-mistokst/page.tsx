import Link from 'next/link';

export default function GreidslaMistokstPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#ff5050" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', marginBottom: 16 }}>Greiðsla mistókst</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: 40 }}>Eitthvað fór úrskeiðis við greiðsluna. Pöntunin þín er óbreytt — reyndu aftur eða hafðu samband við okkur.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/klara-kaup" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>Reyna aftur</Link>
          <a href="mailto:propadspp@gmail.com" style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-block' }}>Hafa samband</a>
        </div>
      </div>
    </main>
  );
}
