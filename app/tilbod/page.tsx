import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { getBundles, getProducts, urlFor, type Bundle } from '@/lib/sanity';
import TeamBundleCard from './TeamBundleCard';

export const dynamic = 'force-dynamic';

function fmtPrice(n: number) { return n.toLocaleString('is-IS') + ' kr'; }

export default async function TilbodPage() {
  const [bundles, allProducts] = await Promise.all([getBundles(), getProducts()]);
  const legghlifar = allProducts
    .filter(p => p.category === 'legghlifar')
    .map(p => ({
      _id: p._id,
      name: p.name,
      imgUrl: p.images?.[0]?.asset
        ? urlFor(p.images[0].asset).width(120).height(120).fit('crop').auto('format').url()
        : null,
    }))
    .filter((p, i, arr) => arr.findIndex(x => x._id === p._id) === i);

  return (
    <PageLayout>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '140px 24px 64px' }}>
        <Link href="/" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32, fontSize: '0.8125rem' }}>← Til baka</Link>
        <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Tilboð</p>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff', marginBottom: 20 }}>Fáðu meira — sparaðu meira</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 520 }}>Veldu pakka sem hentar — þarf að græja allt liðið?</p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 20 }}>
          {bundles.map(b =>
            b.legghlif > 1
              ? <TeamBundleCard key={b._id} bundle={b} legghlifar={legghlifar} />
              : <StaticBundleCard key={b._id} bundle={b} />
          )}
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem', marginTop: 24 }}>
          Spurningar? Hafðu samband á{' '}
          <a href="mailto:propadspp@gmail.com" style={{ color: 'var(--brand)', textDecoration: 'none' }}>propadspp@gmail.com</a>
        </p>
      </section>
    </PageLayout>
  );
}

function StaticBundleCard({ bundle }: { bundle: Bundle }) {
  const items = [
    bundle.legghlif > 0 && [bundle.legghlif > 1 ? `${bundle.legghlif}× Legghlífar` : 'Legghlíf', 'S, M eða L'],
    bundle.gripsokkar > 0 && [`${bundle.gripsokkar}× Gripsokkar`, '2 pör, veldu stærð'],
  ].filter(Boolean) as [string, string][];

  return (
    <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 24, overflow: 'hidden' }}>
      <div style={{ padding: '32px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Grunnpakkinn</p>
          {bundle.badge && (
            <span style={{ background: 'rgba(184,240,58,0.15)', color: 'var(--brand)', fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: 6, letterSpacing: '0.06em' }}>{bundle.badge}</span>
          )}
        </div>
        <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', marginBottom: 6 }}>{bundle.name}</h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 24 }}>{bundle.description}</p>
        <div style={{ marginBottom: 28, display: 'flex', flexDirection: 'column' }}>
          {items.map(([t, s]) => {
            const isSokkar = t.toLowerCase().includes('sokk') || t.toLowerCase().includes('grip');
            return (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.055)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(255,77,171,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {isSokkar ? (
                  <svg width="15" height="19" viewBox="0 0 22 26" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {/* cuff + leg going down, then foot curving to the right — J shape */}
                    <path d="M3 2h9v13h8C25 14 25 24 19 23H5Q3 23 3 19V2z"/>
                    <line x1="3" y1="7" x2="12" y2="7" strokeOpacity="0.4"/>
                  </svg>
                ) : (
                  <svg width="15" height="17" viewBox="0 0 20 22" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 2h14v11a7 7 0 0 1-14 0V2z"/>
                    <line x1="3" y1="8" x2="17" y2="8" strokeOpacity="0.35"/>
                  </svg>
                )}
              </div>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{t}</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{s}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
      <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>
          {bundle.price > 0 ? fmtPrice(bundle.price) : '— kr'}
        </span>
        <Link href="/legghlifar" className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem', borderRadius: 11 }}>Kaupa</Link>
      </div>
    </div>
  );
}
