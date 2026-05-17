import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { getBundles, getProducts, urlFor } from '@/lib/sanity';
import TeamBundleCard from './TeamBundleCard';

export const dynamic = 'force-dynamic';


export default async function TilbodPage() {
  const [bundles, allProducts] = await Promise.all([getBundles(), getProducts()]);
  const legghlifar = allProducts
    .filter(p => p.category === 'legghlifar')
    .map(p => ({
      _id: p._id,
      name: p.name,
      imgUrl: p.images?.[0]
        ? urlFor(p.images[0]).width(120).height(120).fit('crop').auto('format').url()
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
            <TeamBundleCard key={b._id} bundle={b} legghlifar={legghlifar} />
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

