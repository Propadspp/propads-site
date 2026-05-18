import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Persónuverndarstefna — Propads',
  description: 'Persónuverndarstefna Propads. Hér er útskýrt hvernig við meðhöndlum persónuupplýsingar þínar.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: 14 }}>{title}</h2>
      <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9375rem', lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

export default function PersonuverndPage() {
  return (
    <PageLayout>
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '120px 24px 80px' }}>
        <Link href="/" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 40, fontSize: '0.8125rem' }}>← Til baka</Link>

        <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Persónuvernd</p>
        <h1 className="font-display" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff', marginBottom: 16 }}>Persónuverndarstefna</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', marginBottom: 56 }}>Síðast uppfært: maí 2026</p>

        <Section title="1. Persónuupplýsingar">
          <p>Við öflum persónuupplýsingum um þig eingöngu til að þjónusta þig. Þessar upplýsingar — nafn, heimilisfang, símanúmer og tölvupóstur — eru eingöngu notaðar til afgreiðslu á pöntunum.</p>
        </Section>

        <Section title="2. Miðlun gagna">
          <p>Einu skiptin sem við deilum gögnum um þig er ef vara er send í pósti. Þá þarf flutningsaðili að fá upplýsingar um þig til að geta komið sendingunni til þín. Við deilum aldrei gögnum þínum í markaðsskyni.</p>
        </Section>

        <Section title="3. Kaupsaga">
          <p>Kaupsaga viðskiptavinar er læst á öruggu svæði, eingöngu til að þjónusta viðskiptavin varðandi síðustu pöntun. Tími sem pöntun er geymd til uppflettingar eru 365 dagar.</p>
        </Section>

        <Section title="4. Samband">
          <p>Spurningar um persónuvernd:<br />
          <a href="mailto:propadspp@gmail.com" style={{ color: 'var(--brand)', textDecoration: 'none' }}>propadspp@gmail.com</a></p>
        </Section>
      </main>
    </PageLayout>
  );
}
