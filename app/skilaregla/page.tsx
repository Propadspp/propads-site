import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function SkilareglaPage() {
  const rules = [
    { title: '30 daga skilafrestur', desc: 'Þú getur skilað ónotuðum vörum í upprunalegu ástandi innan 30 daga frá kaupum.' },
    { title: 'Inneign í búðinni', desc: 'Skilaðar vörur fá inneign í Propads búðinni. Við endurgreiðum ekki í reiðufé.' },
    { title: 'Upprunalegt ástand', desc: 'Varan þarf að vera ónotuð, í upprunalegu umbúðum og án skemmda.' },
    { title: 'Hvernig á að skila', desc: 'Sendu okkur tölvupóst á propadspp@gmail.com með pöntunarnúmeri og ástæðu skila.' },
  ];

  return (
    <PageLayout>
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '140px 24px 64px' }}>
        <Link href="/" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32, fontSize: '0.8125rem' }}>← Til baka</Link>
        <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Skilareglur</p>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff', marginBottom: 20 }}>Skilareglur</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 520 }}>Við viljum að þú sért ánægður með kaupið. Ef eitthvað er ekki eins og þú væntest, erum við hér til að hjálpa.</p>
      </section>
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {rules.map(r => (
          <div key={r.title} style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '28px 32px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(184,240,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--brand)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 8 }}>{r.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9375rem', lineHeight: 1.7 }}>{r.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </PageLayout>
  );
}
