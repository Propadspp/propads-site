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
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.85 }}>Við þróum vörur fyrir leikmenn sem vilja einfaldar og þægilegar lausnir. Við hönnum vörur sem falla vel að trufla ekki leikinn.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 32 }}>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Gildi okkar</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.7 }}>Við leggjum áherslu á gæði, endingu og hönnun sem þjónar hlutverki sínu.</p>
            </div>
            <Link href="/legghlifar" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1rem', borderRadius: 14, justifyContent: 'center' }}>Skoðaðu vörurnar →</Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '40px 48px' }}>
          <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Framtíðarsýn</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.85, maxWidth: 600 }}>Markmið okkar er að verða fyrsta val íslenskra fótboltamanna. Við viljum vera hluti af hverjum leik.</p>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {[
            { label: 'Létt', desc: 'Hönnuð til að vera ekki fyrir.', d: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { label: 'Þægilegt', desc: 'Fellur vel að.', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
            { label: 'Hönnun', desc: 'Hannað hér heima.', d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
            { label: 'Hlífð', desc: 'Verndar á réttum stöðum.', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
          ].map(t => (
            <div key={t.label} style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(184,240,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--brand)" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={t.d} />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: 4 }}>{t.label}</p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
