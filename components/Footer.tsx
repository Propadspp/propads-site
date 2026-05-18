import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#060606', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 48px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          <div>
            <span className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.035em', color: '#fff', display: 'block', marginBottom: 16 }}>PROPADS</span>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', lineHeight: 1.8, maxWidth: 260 }}>Fótboltavörur — hannaðar fyrir þá sem gefa 100% í leikinn.</p>
          </div>
          <div>
            <h5 style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 18 }}>Vörur</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['Legghlífar', '/legghlifar'], ['Gripsokkar', '/gripsokkar'], ['Tilboð', '/tilbod']].map(([l, h]) => (
                <li key={h}><Link href={h} className="nav-link">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 18 }}>Fyrirtækið</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['Um okkur', '/um-okkur'], ['Hafðu samband', '/#hafa-samband'], ['Skilaregla', '/skilaregla']].map(([l, h]) => (
                <li key={h}><Link href={h} className="nav-link">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 18 }}>Tengiliðir</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><a href="mailto:propadspp@gmail.com" className="nav-link">propadspp@gmail.com</a></li>
              <li><a href="https://instagram.com/propadsiceland" target="_blank" rel="noopener noreferrer" className="nav-link">@propadsiceland</a></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.8125rem' }}>© 2026 Propads. Öll réttindi áskilin.</p>
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.8125rem' }}>Gert með ♥ á Íslandi</p>
        </div>
      </div>
    </footer>
  );
}
