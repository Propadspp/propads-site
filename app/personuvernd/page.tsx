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
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', marginBottom: 56 }}>Síðast uppfært: nóvember 2026</p>

        <Section title="1. Um okkur">
          <p>Propads er íslenskt fyrirtæki stofnað af fótboltamönnum fyrir fótboltamenn. Markmið okkar er að verða fyrsta val íslenskra fótboltamanna. Við viljum vera hluti af hverjum leik.</p>
        </Section>

        <Section title="2. Hvaða upplýsingar við söfnum">
          <p>Til að klára pöntun þarftu að gefa upp nafn, heimilisfang, netfang og símanúmer. Kortaupplýsingar eru meðhöndlaðar af Teya og koma aldrei til okkar.</p>
        </Section>

        <Section title="3. Hvernig við notum upplýsingarnar">
          <p>Við notum gögnin þín til að afgreiða og senda pöntunina og til að svara fyrirspurnum. Við seljum aldrei persónuupplýsingar.</p>
        </Section>

        <Section title="4. Þjónustuaðilar sem vinna fyrir okkur">
          <p>Til að reka vefverslunina notum við eftirfarandi þjónustuaðila, sem fá aðeins þær upplýsingar sem þeir þurfa:</p>
          <ul style={{ paddingLeft: 20, marginTop: 10 }}>
            <li><strong style={{ color: '#fff' }}>Teya</strong> — greiðslumiðlun (kortaupplýsingar).</li>
            <li><strong style={{ color: '#fff' }}>Pósturinn</strong> — afhending pantana (nafn og heimilisfang).</li>
            <li><strong style={{ color: '#fff' }}>Sanity</strong> — geymsla pantana.</li>
            <li><strong style={{ color: '#fff' }}>Resend</strong> — sending staðfestingarpósta.</li>
            <li><strong style={{ color: '#fff' }}>Vercel</strong> — hýsing vefsins og heimsóknatölfræði án vafrakaka.</li>
          </ul>
        </Section>

        <Section title="5. Vafrakökur og auglýsingar">
          <p>Ef þú ýtir á „Samþykkja“ í kökuborðanum notum við Meta Pixel (Facebook/Instagram) til að mæla árangur auglýsinga. Ef þú ýtir á „Hafna“ eru engar upplýsingar sendar til Meta. Þú getur breytt valinu með því að hreinsa vafrakökur í vafranum þínum.</p>
        </Section>

        <Section title="6. Kaupsaga">
          <p>Kaupsaga viðskiptavinar er læst á öruggu svæði, eingöngu til að þjónusta viðskiptavin varðandi síðustu pöntun. Tími sem pöntun er geymd til uppflettingar eru 365 dagar.</p>
        </Section>

        <Section title="7. Samband">
          <p>Spurningar um persónuvernd:<br />
          <a href="mailto:propadspp@gmail.com" style={{ color: 'var(--brand)', textDecoration: 'none' }}>propadspp@gmail.com</a></p>
        </Section>
      </main>
    </PageLayout>
  );
}
