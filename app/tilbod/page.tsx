import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { getBundles, type Bundle } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

function fmtPrice(n: number) { return n.toLocaleString('is-IS') + ' kr'; }

export default async function TilbodPage() {
  const bundles = await getBundles();
  const [leikmaur, lid] = [
    bundles.find(b => b.legghlif === 1) ?? bundles[0],
    bundles.find(b => b.legghlif > 1) ?? bundles[1],
  ];

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

          {/* Leikmaður */}
          <BundleCard bundle={leikmaur} accent={false} />

          {/* Liðið */}
          <BundleCard bundle={lid} accent={true} />

        </div>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem', marginTop: 24 }}>
          Spurningar um lið pakkann? Hafðu samband á{' '}
          <a href="mailto:propadspp@gmail.com" style={{ color: 'var(--brand)', textDecoration: 'none' }}>propadspp@gmail.com</a>
        </p>
      </section>
    </PageLayout>
  );
}

function BundleCard({ bundle, accent }: { bundle: Bundle | undefined; accent: boolean }) {
  if (!bundle) return null;

  const items = [
    bundle.legghlif > 0 && [`${bundle.legghlif}× Legghlíf${bundle.legghlif > 1 ? 'ar' : ''}`, bundle.legghlif > 1 ? 'Blandaðar stærðir mögulegar' : 'S, M eða L'],
    bundle.gripsokkar > 0 && [`${bundle.gripsokkar}× Gripsokkar`, bundle.legghlif > 1 ? '2 pör á hvern leikmann' : '2 pör, veldu stærð'],
  ].filter(Boolean) as [string, string][];

  return (
    <div style={{ background: accent ? '#0f1308' : '#101010', border: `1px solid ${accent ? 'rgba(184,240,58,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 24, overflow: 'hidden' }}>
      <div style={{ padding: '32px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            {accent ? 'Lið pakkinn' : 'Grunnpakkinn'}
          </p>
          {bundle.badge && (
            <span style={{ background: 'rgba(184,240,58,0.15)', color: 'var(--brand)', fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: 6, letterSpacing: '0.06em' }}>{bundle.badge}</span>
          )}
        </div>
        <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', marginBottom: 6 }}>{bundle.name}</h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 24 }}>{bundle.description}</p>
        <div style={{ marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {items.map(([t, s]) => (
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
        <span className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>
          {bundle.price > 0 ? fmtPrice(bundle.price) : '— kr'}
        </span>
        {accent ? (
          <a href="mailto:propadspp@gmail.com" className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem', borderRadius: 11 }}>Hafa samband</a>
        ) : (
          <Link href="/legghlifar" className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem', borderRadius: 11 }}>Kaupa</Link>
        )}
      </div>
    </div>
  );
}
