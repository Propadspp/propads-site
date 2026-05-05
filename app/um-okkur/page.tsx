import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function UmOkkurPage() {
  return (
    <PageLayout>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '140px 24px 80px' }}>
        <Link href="/" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32, fontSize: '0.8125rem' }}>← Til baka</Link>
        <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Um okkur</p>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff', marginBottom: 24 }}>Hannaðar fyrir þá sem gefa 100%.</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.0625rem', maxWidth: 580, lineHeight: 1.75 }}>Propads er íslenskt fyrirtæki stofnað af fótboltamönnum fyrir fótboltamenn.</p>
      </section>
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Um okkur</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.85 }}>Við þróum búnað fyrir leikmenn sem vilja einfaldar og áreiðanlegar lausnir. Áherslan er á þægindi og hönnun sem fellur vel að leiknum og truflar ekki.</p>
          </div>
          <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 32 }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Gildi okkar</p>
            {['Gæði', 'Einlægni', 'Einföldun'].map(g => (
              <div key={g} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand)', flexShrink: 0 }} />
                <p style={{ color: '#fff', fontSize: '0.9375rem', fontWeight: 500 }}>{g}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
