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

        <Section title="1. Hverjir við erum">
          <p>Propads (propadspp@gmail.com) er íslenskt fyrirtæki sem selur fótboltavörur á netinu. Við berum ábyrgð á meðhöndlun persónuupplýsinga sem safnað er í gegnum þessa vefsíðu.</p>
        </Section>

        <Section title="2. Hvaða upplýsingar við söfnum">
          <p style={{ marginBottom: 12 }}>Við söfnum einungis þeim upplýsingum sem eru nauðsynlegar til að ljúka pöntun:</p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>Nafn og netfang</li>
            <li>Símanúmer (valkvæmt)</li>
            <li>Sendingarheimilisfang og póstnúmer</li>
            <li>Pöntunarupplýsingar (vörur, verð, stærðir)</li>
          </ul>
          <p style={{ marginTop: 12 }}>Við geymum <strong style={{ color: '#fff' }}>ekki</strong> greiðsluupplýsingar (kortanúmer o.fl.) — þær fara í gegnum Teya, öruggt greiðslufyrirtæki.</p>
        </Section>

        <Section title="3. Hvernig við notum upplýsingarnar">
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>Til að afgreiða og senda pöntun þína</li>
            <li>Til að hafa samband ef vandamál koma upp með pöntun</li>
            <li>Til að uppfylla lagalegar skyldur (bókhald, skattar)</li>
          </ul>
          <p style={{ marginTop: 12 }}>Við segjum <strong style={{ color: '#fff' }}>aldrei</strong> frá persónuupplýsingum þínum til þriðja aðila í markaðsskyni.</p>
        </Section>

        <Section title="4. Kökur (Cookies)">
          <p style={{ marginBottom: 12 }}>Þessi vefsíða notar takmarkaðar kökur:</p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li><strong style={{ color: '#fff' }}>Nauðsynlegar kökur</strong> — geyma innihald körfunnar þinnar meðan þú verslar.</li>
            <li><strong style={{ color: '#fff' }}>Greiningarkökur</strong> — Meta Pixel (Facebook/Instagram) og Google Analytics hjálpa okkur að skilja hvernig síðan er notuð. Engar persónugreinanlegar upplýsingar eru geymdar.</li>
          </ul>
          <p style={{ marginTop: 12 }}>Þú getur slökkt á greiningarkökum í stillingum vafrann þíns.</p>
        </Section>

        <Section title="5. Réttindi þín samkvæmt GDPR">
          <p style={{ marginBottom: 12 }}>Þú átt rétt á að:</p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>Fá aðgang að þeim upplýsingum sem við höfum um þig</li>
            <li>Fá upplýsingarnar leiðréttar ef þær eru rangar</li>
            <li>Fá upplýsingarnar eyddar ("réttur til að gleyma")</li>
            <li>Andmæla vinnslu upplýsinga þinna</li>
          </ul>
          <p style={{ marginTop: 12 }}>Til að nýta þér þessi réttindi skaltu hafa samband við okkur á <a href="mailto:propadspp@gmail.com" style={{ color: 'var(--brand)', textDecoration: 'none' }}>propadspp@gmail.com</a>.</p>
        </Section>

        <Section title="6. Hversu lengi geymum við gögn">
          <p>Pöntunarupplýsingar eru geymdar í 7 ár í samræmi við lög um bókhald. Aðrar upplýsingar eru eyddar þegar þær eru ekki lengur nauðsynlegar.</p>
        </Section>

        <Section title="7. Samband">
          <p>Ef þú hefur spurningar um persónuvernd skaltu hafa samband:<br />
          <a href="mailto:propadspp@gmail.com" style={{ color: 'var(--brand)', textDecoration: 'none' }}>propadspp@gmail.com</a></p>
        </Section>
      </main>
    </PageLayout>
  );
}
