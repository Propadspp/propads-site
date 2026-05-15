'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Nav from './Nav';
import CartDrawer from './CartDrawer';
import ProductsSection from './ProductsSection';
import { type Product, type Player, urlFor } from '@/lib/sanity';

export default function HomeClient({ products, players }: { products: Product[]; players: Player[] }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Nav onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* HERO */}
      <section style={{ background: 'radial-gradient(ellipse 85% 55% at 50% 100%, rgba(184,240,58,0.11) 0%, transparent 65%), radial-gradient(ellipse 45% 35% at 18% 65%, rgba(184,240,58,0.05) 0%, transparent 55%), #080808', minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -60, left: '50%', width: 800, height: 420, background: 'radial-gradient(ellipse,rgba(184,240,58,0.11) 0%,transparent 70%)', pointerEvents: 'none', animation: 'floatY 7s ease-in-out infinite' }} />
        <Link href="/gripsokkar" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', textDecoration: 'none', marginBottom: 36 }}>
          <span style={{ background: 'var(--brand)', color: '#080808', fontSize: '0.625rem', fontWeight: 700, padding: '2px 7px', borderRadius: 5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>NÝTT</span>
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8125rem' }}>Gripsokkar komnir á lagerinn →</span>
        </Link>
        <h1 className="font-display" style={{ fontSize: 'clamp(4.5rem,12vw,12rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.015em', color: 'var(--brand)', maxWidth: 1200, marginBottom: 52, textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 60px rgba(184,240,58,0.5), 0 0 140px rgba(184,240,58,0.25)' }}>
          Propads
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.0625rem', lineHeight: 1.75, maxWidth: 460, marginBottom: 44 }}>
          Fótboltavörur — hannaðar fyrir þá sem gefa 100% í leikinn.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
          <a href="#vorur" className="btn-primary" style={{ padding: '14px 32px' }}>Skoðaðu vörurnar</a>
          <Link href="/um-okkur" className="btn-outline" style={{ padding: '14px 32px' }}>Kynntu þér Propads</Link>
        </div>
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, opacity: 0.28, pointerEvents: 'none' }}>
          <span style={{ fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Fletttu niður</span>
          <svg width="14" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ animation: 'arrowBob 2s ease-in-out infinite' }}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px 0' }}>
        <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            { href: '/legghlifar', label: 'Legghlífar', cta: 'Sjá vörur →' },
            { href: '/gripsokkar', label: 'Gripsokkar', cta: 'Sjá vörur →' },
            { href: '/tilbod', label: 'Tilboð', cta: 'Sjá pakka →' },
          ].map(cat => (
            <Link key={cat.href} href={cat.href} style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden', cursor: 'pointer', textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'transform 0.26s cubic-bezier(0.34,1.56,0.64,1), border-color 0.26s ease' }}>
              <div style={{ position: 'relative', height: 320, overflow: 'hidden', background: '#161616' }}>
                <Image src={`https://placehold.co/680x320/141414/252525?text=`} alt={cat.label} fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,8,0.75) 0%,transparent 50%)' }} />
              </div>
              <div style={{ padding: 28, background: '#101010', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>Flokkur</p>
                  <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1 }}>{cat.label}</h2>
                </div>
                <span className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.875rem', whiteSpace: 'nowrap', flexShrink: 0 }}>{cat.cta}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <ProductsSection products={products} />

      {/* PLAYERS */}
      {players.length > 0 && (
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Leikmenn</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem,2.5vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, color: '#fff' }}>Þeir treysta Propads</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {players.map(p => {
              const img = p.image
                ? urlFor(p.image.asset).width(400).height(480).fit('crop').auto('format').url()
                : 'https://placehold.co/400x480/181818/333?text=';
              return (
                <div key={p._id} style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 260 }}>
                    <Image src={img} alt={p.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px 22px' }}>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fff', marginBottom: 3 }}>{p.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--brand)', fontWeight: 500 }}>{p.club}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>FAQ</p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem,2.5vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, color: '#fff' }}>Algengar spurningar</h2>
        </div>
        {[
          { q: 'Hvernig vel ég rétta stærð?', a: 'Legghlífarnar koma í S (4–8 ára), M (8–12 ára) og L (15+).' },
          { q: 'Hversu fljótt fæ ég pöntunina?', a: 'Við sendum allar pantanir samdægurs ef þær berast fyrir kl. 14:00 á virkum degi. Á höfuðborgarsvæðinu kemur sending yfirleitt sama dag eða daginn eftir. Utan höfuðborgarsvæðisins tekur það 1–3 virka daga.' },
          { q: 'Get ég skilað vöru?', a: <>Já, skilafrestur er 30 dagar. <Link href="/skilaregla" style={{ color: 'var(--brand)', textDecoration: 'none' }}>Smelltu hér til að lesa nánar um skilavörur.</Link></> },
          { q: 'Hvernig hef ég samband?', a: 'Sendu okkur tölvupóst á propadspp@gmail.com eða fylgdu okkur á Instagram @propadsiceland. Við svörum eins fljótt og auðið er.' },
        ].map((item, i) => (
          <details key={i} className="faq-item">
            <summary style={{ listStyle: 'none', cursor: 'pointer', padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, fontSize: '1rem', fontWeight: 500, color: '#fff', userSelect: 'none' }}>
              {item.q}<span className="faq-arrow">▾</span>
            </summary>
            <p style={{ padding: '0 0 20px', color: 'rgba(255,255,255,0.55)', fontSize: '0.9375rem', lineHeight: 1.75 }}>{item.a}</p>
          </details>
        ))}
      </section>

      {/* TRUST BAR */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.055)', borderBottom: '1px solid rgba(255,255,255,0.055)', background: '#0c0c0c' }}>
        <div className="trust-grid" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
          {[
            { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>, title: 'Frí sending', sub: 'Ef verslað er fyrir 8.000 kr eða meira' },
            { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>, title: '30 daga skilafrestur', sub: 'Ónotaðar vörur í upprunalegum umbúðum' },
            { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>, title: 'Pósturinn um allt land', sub: '1-3 virka daga á höfuðborgarsvæðinu' },
          ].map((t, i) => (
            <div key={i} style={{ padding: '36px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.055)' : undefined }}>
              <div style={{ color: 'var(--brand)' }}><svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">{t.icon}</svg></div>
              <div><h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 4 }}>{t.title}</h4><p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.8125rem', lineHeight: 1.6 }}>{t.sub}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <section id="hafa-samband" style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Samband</p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem,2.5vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, color: '#fff' }}>Hafðu samband</h2>
        </div>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <form onSubmit={e => { e.preventDefault(); const f = e.target as HTMLFormElement; window.location.href = `mailto:propadspp@gmail.com?subject=${encodeURIComponent('Fyrirspurn frá ' + (f.querySelector('[name=nafn]') as HTMLInputElement).value)}&body=${encodeURIComponent((f.querySelector('[name=skilabod]') as HTMLTextAreaElement).value)}`; }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div><label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Nafn</label><input name="nafn" type="text" required placeholder="Nafnið þitt" className="form-input" /></div>
            <div><label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Netfang</label><input name="netfang" type="email" required placeholder="netfang@dæmi.is" className="form-input" /></div>
            <div><label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Skilaboð</label><textarea name="skilabod" rows={5} required placeholder="Skrifaðu skilaboðin hér..." className="form-input" style={{ resize: 'vertical' }} /></div>
            <button type="submit" className="btn-primary" style={{ padding: '14px 32px', alignSelf: 'flex-start' }}>Senda</button>
          </form>
          <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 32 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 24 }}>Tengiliðaupplýsingar</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'Tölvupóstur', value: 'propadspp@gmail.com', href: 'mailto:propadspp@gmail.com' },
                { label: 'Instagram', value: '@propadsiceland', href: '#' },
              ].map(c => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(184,240,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand)' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{c.label}</p>
                    {c.href ? <a href={c.href} style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9375rem' }}>{c.value}</a> : <p style={{ color: '#fff', fontSize: '0.9375rem' }}>{c.value}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
                {[['Legghlífar','/legghlifar'],['Gripsokkar','/gripsokkar'],['Tilboð','/tilbod']].map(([l,h]) => <li key={h}><Link href={h} className="nav-link">{l}</Link></li>)}
              </ul>
            </div>
            <div>
              <h5 style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 18 }}>Fyrirtækið</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[['Um okkur','/um-okkur'],['Hafðu samband','/#hafa-samband'],['Skilaregla','/skilaregla']].map(([l,h]) => <li key={h}><Link href={h} className="nav-link">{l}</Link></li>)}
              </ul>
            </div>
            <div>
              <h5 style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 18 }}>Tengiliðir</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li><a href="mailto:propadspp@gmail.com" className="nav-link">propadspp@gmail.com</a></li>
                <li><a href="#" className="nav-link">@propadsiceland</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.8125rem' }}>© 2026 Propads. Öll réttindi áskilin.</p>
            <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.8125rem' }}>Gert með ♥ á Íslandi</p>
          </div>
        </div>
      </footer>
    </>
  );
}
