import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function StaerdLeidbeinPage() {
  const sizes = [
    { size: 'S', label: 'LOW', age: '4–8 ára', desc: 'Minni legghlíf sem veitir grunnhlífð á miðjum legg. Hentar yngstu leikmönnum og þeim sem vilja lágmarks hlífð.', active: false },
    { size: 'M', label: 'MID — Vinsælust', age: '8–12 ára', desc: 'Meðalstærð sem veitir góða hlífð á miðjum legg. Best fyrir flesta unglinga leikmenn.', active: true },
    { size: 'L', label: 'HIGH', age: '15+ ára', desc: 'Stærsta legghlífin — 13 cm á hæð og veitir hámarks hlífð á miðjum legg. Fullkomin fyrir fullorðna leikmenn.', active: false },
  ];

  return (
    <PageLayout>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '140px 24px 48px' }}>
        <Link href="/" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32, fontSize: '0.8125rem' }}>← Til baka</Link>
        <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Stærðarleiðbeiningar</p>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff', marginBottom: 20 }}>Hvaða stærð á ég?</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 560 }}>Legghlífarnar koma í þremur stærðum eftir aldri og hlífðarþörfum.</p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 24, padding: '48px 24px' }}>
          <svg viewBox="0 0 780 380" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 780, display: 'block', margin: '0 auto' }}>
            <defs>
              <clipPath id="sg-s"><rect x="124" y="250" width="60" height="85" rx="8"/></clipPath>
              <clipPath id="sg-m"><rect x="343" y="205" width="74" height="130" rx="8"/></clipPath>
              <clipPath id="sg-l"><rect x="567" y="150" width="86" height="180" rx="8"/></clipPath>
            </defs>

            <g transform="translate(80,20)">
              <path d="M60 30 C55 30 45 40 43 80 L40 200 C39 230 38 260 42 290 C44 310 50 330 60 340 L80 340 C90 330 96 310 98 290 C102 260 101 230 100 200 L97 80 C95 40 85 30 80 30 Z" fill="#1a1a1a" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
              <ellipse cx="70" cy="175" rx="30" ry="18" fill="#161616" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <line x1="110" y1="232" x2="110" y2="314" stroke="rgba(184,240,58,0.5)" strokeWidth="1.5" strokeDasharray="4,3"/>
              <circle cx="110" cy="232" r="3" fill="#b8f03a" opacity="0.7"/>
              <circle cx="110" cy="314" r="3" fill="#b8f03a" opacity="0.7"/>
              <text x="70" y="375" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Inter,sans-serif" letterSpacing="1">S — LOW</text>
            </g>
            <rect x="124" y="250" width="60" height="85" rx="8" fill="white" opacity="0.95"/>
            <image href="/product.jpg" x="124" y="250" width="60" height="85" preserveAspectRatio="xMidYMid slice" clipPath="url(#sg-s)"/>
            <rect x="124" y="250" width="60" height="85" rx="8" fill="none" stroke="#b8f03a" strokeWidth="1.5" opacity="0.7"/>

            <g transform="translate(310,20)">
              <g transform="translate(70,0) scale(1.24,1) translate(-70,0)">
                <path d="M60 30 C55 30 45 40 43 80 L40 200 C39 230 38 260 42 290 C44 310 50 330 60 340 L80 340 C90 330 96 310 98 290 C102 260 101 230 100 200 L97 80 C95 40 85 30 80 30 Z" fill="#1a1a1a" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
                <ellipse cx="70" cy="175" rx="30" ry="18" fill="#161616" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              </g>
              <line x1="120" y1="187" x2="120" y2="314" stroke="rgba(184,240,58,0.5)" strokeWidth="1.5" strokeDasharray="4,3"/>
              <circle cx="120" cy="187" r="3" fill="#b8f03a" opacity="0.7"/>
              <circle cx="120" cy="314" r="3" fill="#b8f03a" opacity="0.7"/>
              <text x="70" y="375" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Inter,sans-serif" letterSpacing="1">M — MID</text>
            </g>
            <rect x="343" y="205" width="74" height="130" rx="8" fill="white" opacity="0.95"/>
            <image href="/product.jpg" x="343" y="205" width="74" height="130" preserveAspectRatio="xMidYMid slice" clipPath="url(#sg-m)"/>
            <rect x="343" y="205" width="74" height="130" rx="8" fill="none" stroke="#b8f03a" strokeWidth="1.5" opacity="0.7"/>

            <g transform="translate(540,20)">
              <g transform="translate(70,0) scale(1.43,1) translate(-70,0)">
                <path d="M60 30 C55 30 45 40 43 80 L40 200 C39 230 38 260 42 290 C44 310 50 330 60 340 L80 340 C90 330 96 310 98 290 C102 260 101 230 100 200 L97 80 C95 40 85 30 80 30 Z" fill="#1a1a1a" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
                <ellipse cx="70" cy="175" rx="30" ry="18" fill="#161616" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              </g>
              <line x1="122" y1="132" x2="122" y2="309" stroke="rgba(184,240,58,0.5)" strokeWidth="1.5" strokeDasharray="4,3"/>
              <circle cx="122" cy="132" r="3" fill="#b8f03a" opacity="0.7"/>
              <circle cx="122" cy="309" r="3" fill="#b8f03a" opacity="0.7"/>
              <text x="142" y="145" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="Inter,sans-serif">← Hnésbót</text>
              <text x="70" y="375" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Inter,sans-serif" letterSpacing="1">L — HIGH</text>
            </g>
            <rect x="567" y="150" width="86" height="180" rx="8" fill="white" opacity="0.95"/>
            <image href="/product.jpg" x="567" y="150" width="86" height="180" preserveAspectRatio="xMidYMid slice" clipPath="url(#sg-l)"/>
            <rect x="567" y="150" width="86" height="180" rx="8" fill="none" stroke="#b8f03a" strokeWidth="1.5" opacity="0.7"/>
          </svg>
          <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>Hvíti bakgrunnurinn á myndinni er <strong style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>sokkurinn</strong> sem legghlífin er sett yfir.</p>
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {sizes.map(s => (
            <div key={s.size} style={{ background: s.active ? '#0f1308' : '#101010', border: `1px solid ${s.active ? 'rgba(184,240,58,0.35)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 20, padding: '36px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(184,240,58,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#b8f03a', lineHeight: 1 }}>{s.size}</span>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--brand)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</p>
                <p className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>{s.age}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', marginBottom: 20 }}>Ert þú á mörkum milli stærða? Veldu stærri.</p>
          <Link href="/legghlifar" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: 14 }}>Verslaðu legghlífar →</Link>
        </div>
      </section>
    </PageLayout>
  );
}
