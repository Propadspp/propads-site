import Link from 'next/link';

export default function GreidslutekistPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(184,240,58,0.12)', border: '1px solid rgba(184,240,58,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="var(--brand)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', marginBottom: 16 }}>Greiðsla tókst!</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: 40 }}>Takk fyrir kaupið. Við sendum þér staðfestingu á netfangið þitt og pöntunin verður send fljótlega.</p>
        <Link href="/" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>Til baka á forsíðu</Link>
      </div>
    </main>
  );
}
