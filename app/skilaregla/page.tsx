import PageLayout from '@/components/PageLayout';

const Pill = ({ color, label }: { color: 'green' | 'red' | 'grey'; label: string }) => {
  const styles = {
    green: { background: 'rgba(184,240,58,0.12)', color: 'var(--brand)', border: '1px solid rgba(184,240,58,0.2)' },
    red: { background: 'rgba(255,80,80,0.1)', color: '#ff8080', border: '1px solid rgba(255,80,80,0.18)' },
    grey: { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' },
  };
  return (
    <span style={{ ...styles[color], display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
      {label}
    </span>
  );
};

const rules = [
  {
    color: 'green' as const,
    pill: 'Fullur endurgreiðsla eða inneign',
    title: 'Ónotaðar vörur',
    desc: <>Vörur í upprunalegu ástandi með órofnum umbúðum. Skilafrestur er <strong style={{ color: '#fff' }}>30 dagar</strong> frá móttöku. Fullur endurgreiðsla eða inneign (gildir í 1 ár) — að þínum vali.</>,
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconColor: 'var(--brand)',
  },
  {
    color: 'green' as const,
    pill: 'Inneign í búðinni',
    title: 'Röng stærð',
    desc: <>Pantaðir þú ranga stærð? Þú færð <strong style={{ color: '#fff' }}>inneign sem gildir í 1 ár</strong>. Sendu vöruna til baka í upprunalegu ástandi og umbúðunum.</>,
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    iconColor: 'var(--brand)',
  },
  {
    color: 'red' as const,
    pill: 'Engin skil',
    title: 'Notaðar legghlífar',
    desc: 'Af hreinlætisástæðum tökum við ekki notaðar legghlífar til baka.',
    icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636',
    iconColor: '#ff8080',
  },
  {
    color: 'red' as const,
    pill: 'Engin skil',
    title: 'Gripsokkar',
    desc: 'Af hreinlætisástæðum tökum við ekki gripsokka til baka.',
    icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636',
    iconColor: '#ff8080',
  },
  {
    color: 'green' as const,
    pill: 'Fullur endurgreiðsla',
    title: 'Gallaðar eða skemmdar vörur',
    desc: <>Ef vara berst gölluð fær þú fulla endurgreiðslu. Hafðu samband innan <strong style={{ color: '#fff' }}>30 daga</strong> frá móttöku með mynd.</>,
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    iconColor: 'var(--brand)',
  },
  {
    color: 'grey' as const,
    pill: '3 skref',
    title: 'Skilaferillinn',
    desc: <><strong style={{ color: '#fff' }}>1.</strong> Sendu tölvupóst á <a href="mailto:propadspp@gmail.com" style={{ color: 'var(--brand)', textDecoration: 'none' }}>propadspp@gmail.com</a> með pöntunarnúmeri og ástæðu skila.<br /><strong style={{ color: '#fff' }}>2.</strong> Við staðfestum skilin og sendum þér skilaupplýsingar — <strong style={{ color: '#fff' }}>þú greiðir flutningskostnað</strong>.<br /><strong style={{ color: '#fff' }}>3.</strong> Þegar við fáum vöruna staðfestum við inneign eða endurgreiðslu.</>,
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    iconColor: 'var(--brand)',
  },
];

export default function SkilareglaPage() {
  return (
    <PageLayout>
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 56px' }}>
        <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Skilmálar</p>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem,6vw,4rem)', fontWeight: 900, letterSpacing: '0.08em', lineHeight: 1, color: '#fff', marginBottom: 20 }}>Skilareglur</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 560 }}>Við viljum að þú sért ánægð/ur með kaupin. Lestu reglurnar hér að neðan — við reynum að gera þetta eins einfalt og mögulegt er.</p>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 56px', display: 'flex', flexDirection: 'column', gap: 32 }}>
        {rules.map(r => (
          <div key={r.title} style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '28px 32px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(184,240,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={r.iconColor} strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d={r.icon} />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>{r.title}</h2>
                <Pill color={r.color} label={r.pill} />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.7 }}>{r.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 6 }}>Spurningar um skil?</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>Við svörum á 1–3 virkum dögum.</p>
          </div>
          <a href="mailto:propadspp@gmail.com" className="btn-primary" style={{ padding: '11px 22px', fontSize: '0.875rem', borderRadius: 10, gap: 8, whiteSpace: 'nowrap' }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            propadspp@gmail.com
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
