import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { client } from '@/lib/sanity';

function fmtPrice(n: number) { return n.toLocaleString('is-IS') + ' kr'; }

async function getPrices() {
  const products = await client.fetch(
    `*[_type=="product" && !(_id in path("drafts.**"))] { category, price }`
  );
  const legghlif = products.find((p: { category: string; price: number }) => p.category === 'legghlifar')?.price ?? 0;
  const gripsokki = products.find((p: { category: string; price: number }) => p.category === 'gripsokkar')?.price ?? 0;
  return { legghlif, gripsokki };
}

export default async function TilbodPage() {
  const { legghlif, gripsokki } = await getPrices();
  const leikmadurPrice = legghlif + gripsokki * 2;
  const lidPrice = legghlif * 10 + gripsokki * 20;

  return (
    <PageLayout>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '140px 24px 64px' }}>
        <Link href="/" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32, fontSize: '0.8125rem' }}>← Til baka</Link>
        <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Tilboð</p>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff', marginBottom: 20 }}>Kauptu fleiri — sparaðu meira</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 520 }}>Veldu pakka sem hentar þér — hvort sem þú ert einn leikmaður eða að kaupa fyrir liðið.</p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 24, overflow: 'hidden' }}>
            <div style={{ padding: '32px 32px 0' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>Grunnpakkinn</p>
              <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', marginBottom: 6 }}>Leikmaður</h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 24 }}>Allt sem þú þarft til að fara á völlinn.</p>
              <div style={{ marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  ['1× Legghlíf', `${fmtPrice(legghlif)}`],
                  ['2× Gripsokkar', `${fmtPrice(gripsokki)} × 2`],
                ].map(([t, s]) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.055)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(184,240,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand)' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{t}</p>
                      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>{leikmadurPrice > 0 ? fmtPrice(leikmadurPrice) : '— kr'}</span>
              <Link href="/legghlifar" className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem', borderRadius: 11 }}>Kaupa</Link>
            </div>
          </div>

          <div style={{ background: '#0f1308', border: '1px solid rgba(184,240,58,0.3)', borderRadius: 24, overflow: 'hidden' }}>
            <div style={{ padding: '32px 32px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Lið pakkinn</p>
                <span style={{ background: 'rgba(184,240,58,0.15)', color: 'var(--brand)', fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: 6, letterSpacing: '0.06em' }}>MESTI AFSLÁTTUR</span>
              </div>
              <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', marginBottom: 6 }}>Liðið</h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 24 }}>Fyrir foreldra og þjálfara sem kaupa fyrir allt lið.</p>
              <div style={{ marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  ['10× Legghlífar', 'Blandaðar stærðir mögulegar'],
                  ['20× Gripsokkar', '2 pör á hvern leikmann'],
                ].map(([t, s]) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.055)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(184,240,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand)' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{t}</p>
                      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>{lidPrice > 0 ? fmtPrice(lidPrice) : '— kr'}</span>
              <a href="mailto:propadspp@gmail.com" className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem', borderRadius: 11 }}>Hafa samband</a>
            </div>
          </div>

        </div>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem', marginTop: 24 }}>Spurningar um lið pakkann? Hafðu samband á <a href="mailto:propadspp@gmail.com" style={{ color: 'var(--brand)', textDecoration: 'none' }}>propadspp@gmail.com</a></p>
      </section>
    </PageLayout>
  );
}
