'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { useCart } from '@/lib/cart';

function fmtPrice(n: number) { return n.toLocaleString('is-IS') + ' kr'; }

export default function KlaraKaupPage() {
  const { cart, subtotal } = useCart();

  const [area, setArea] = useState<'capital' | 'rural'>('capital');
  const [freeShipping, setFreeShipping] = useState(false);
  useEffect(() => {
    fetch('/api/site-settings').then(r => r.json()).then(d => setFreeShipping(d.freeShipping ?? false));
  }, []);
  const shipping = freeShipping ? 0 : area === 'capital' ? 700 : 1500;

  const [sameRecipient, setSameRecipient] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountMsg, setDiscountMsg] = useState('');
  const [discountLoading, setDiscountLoading] = useState(false);
  const [appliedCode, setAppliedCode] = useState('');

  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState('');

  const total = Math.max(0, subtotal + shipping - discountAmount);

  const hasBundle = cart.some(item => item.category === 'bundle');

  async function applyDiscount() {
    if (!discountCode.trim()) return;
    setDiscountLoading(true);
    setDiscountMsg('');
    try {
      const res = await fetch('/api/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discountCode.trim(), subtotal }),
      });
      const data = await res.json();
      if (data.valid) {
        if (hasBundle && !data.allowOnBundles) {
          setDiscountAmount(0);
          setAppliedCode('');
          setDiscountMsg('Þessi kóði virkar ekki á tilboðsvörum');
        } else {
          setDiscountAmount(data.discount);
          setAppliedCode(data.code);
          setDiscountMsg(`✓ ${data.type === 'percent' ? data.value + '%' : fmtPrice(data.value)} afsláttur`);
        }
      } else {
        setDiscountAmount(0);
        setAppliedCode('');
        setDiscountMsg(data.error ?? 'Kóðinn er ekki gildur');
      }
    } catch {
      setDiscountMsg('Villa við að staðfesta kóða');
    } finally {
      setDiscountLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cart.length) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, discountCode: appliedCode || undefined, note: note.trim() || undefined }),
      });
      const data = await res.json();
      if (data.payment_link) {
        window.location.href = data.payment_link;
      } else {
        setError('Villa kom upp. Reyndu aftur.');
      }
    } catch {
      setError('Tenging mistókst. Reyndu aftur.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout>
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 24px 80px' }}>
        <p style={{ color: 'var(--brand)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Greiðsla</p>
        <h1 className="font-display" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff', marginBottom: 48 }}>Klára kaup</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 48, alignItems: 'start' }}>
          <form onSubmit={handleSubmit}>
            {/* Buyer info */}
            <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 32, marginBottom: 20 }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 24 }}>Upplýsingar kaupanda</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div><label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>Fornafn</label><input name="fornafn" type="text" required placeholder="Jón" className="form-input" /></div>
                  <div><label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>Eftirnafn</label><input name="eftirnafn" type="text" required placeholder="Sigurðsson" className="form-input" /></div>
                </div>
                <div><label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>Netfang</label><input name="netfang" type="email" required placeholder="jon@daemi.is" className="form-input" /></div>
                <div><label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>Símanúmer</label><input name="simi" type="tel" placeholder="555 1234" className="form-input" /></div>
              </div>
            </div>

            {/* Same recipient */}
            <div onClick={() => setSameRecipient(!sameRecipient)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px', background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, marginBottom: 16, cursor: 'pointer' }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid var(--brand)`, background: sameRecipient ? 'rgba(184,240,58,0.14)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {sameRecipient && <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="var(--brand)" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
              </div>
              <span style={{ fontSize: '0.9375rem', color: '#fff', userSelect: 'none' }}>Kaupandi og viðtakandi er sá sami</span>
            </div>

            {!sameRecipient && (
              <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 32, marginBottom: 16 }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 20 }}>Nafn viðtakanda</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div><label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>Fornafn</label><input name="vid_fornafn" type="text" placeholder="Fornafn" className="form-input" /></div>
                  <div><label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>Eftirnafn</label><input name="vid_eftirnafn" type="text" placeholder="Eftirnafn" className="form-input" /></div>
                </div>
              </div>
            )}

            {/* Shipping */}
            <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 32, marginBottom: 16 }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 24 }}>Sendingarupplýsingar</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Area selector */}
                <div>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 10 }}>Svæði</p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {([['capital', 'Höfuðborgarsvæðið', freeShipping ? 'Ókeypis' : '700 kr'], ['rural', 'Landsbygðin', freeShipping ? 'Ókeypis' : '1.500 kr']] as const).map(([val, label, price]) => (
                      <button key={val} type="button" onClick={() => setArea(val)}
                        style={{ flex: 1, padding: '12px 16px', borderRadius: 12, border: `1.5px solid ${area === val ? 'var(--brand)' : 'rgba(255,255,255,0.1)'}`, background: area === val ? 'rgba(184,240,58,0.06)' : 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s, background 0.15s' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: area === val ? '#fff' : 'rgba(255,255,255,0.6)', marginBottom: 2 }}>{label}</p>
                        <p style={{ fontSize: '0.75rem', color: freeShipping ? 'var(--brand)' : 'rgba(255,255,255,0.35)' }}>{price}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div><label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>Heimilisfang</label><input name="heimilisfang" type="text" required placeholder="Laugavegur 1" className="form-input" /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 14 }}>
                  <div><label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>Póstnúmer</label><input name="postnumer" type="text" required placeholder="101" className="form-input" /></div>
                  <div><label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>Staður</label><input name="stadur" type="text" required placeholder="Reykjavík" className="form-input" /></div>
                </div>
              </div>
            </div>

            {/* Discount code */}
            <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 24px', marginBottom: 16 }}>
              <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginBottom: 10 }}>Afsláttarkóði</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={discountCode}
                  onChange={e => { setDiscountCode(e.target.value.toUpperCase()); setDiscountAmount(0); setAppliedCode(''); setDiscountMsg(''); }}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), applyDiscount())}
                  placeholder="KÓÐINN ÞINN"
                  className="form-input"
                  style={{ flex: 1, letterSpacing: '0.05em' }}
                  disabled={!!appliedCode}
                />
                {appliedCode ? (
                  <button type="button" onClick={() => { setAppliedCode(''); setDiscountCode(''); setDiscountAmount(0); setDiscountMsg(''); }}
                    style={{ padding: '0 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    Taka af
                  </button>
                ) : (
                  <button type="button" onClick={applyDiscount} disabled={discountLoading || !discountCode.trim()}
                    style={{ padding: '0 18px', borderRadius: 10, border: 'none', background: 'var(--brand)', color: '#080808', fontWeight: 700, fontSize: '0.8125rem', cursor: discountLoading || !discountCode.trim() ? 'default' : 'pointer', opacity: !discountCode.trim() ? 0.4 : 1, whiteSpace: 'nowrap' }}>
                    {discountLoading ? '...' : 'Nota'}
                  </button>
                )}
              </div>
              {discountMsg && (
                <p style={{ fontSize: '0.8125rem', marginTop: 8, color: appliedCode ? 'var(--brand)' : '#ff8080' }}>{discountMsg}</p>
              )}
            </div>

            {/* Note */}
            <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, marginBottom: 32, overflow: 'hidden' }}>
              <button type="button" onClick={() => setNoteOpen(!noteOpen)}
                style={{ width: '100%', padding: '18px 24px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'rgba(255,255,255,0.55)', fontSize: '0.8125rem', fontWeight: 500 }}>
                <span>Bæta við athugasemd</span>
                <span style={{ transition: 'transform 0.2s', transform: noteOpen ? 'rotate(180deg)' : 'rotate(0deg)', fontSize: '0.75rem' }}>▾</span>
              </button>
              {noteOpen && (
                <div style={{ padding: '0 24px 20px' }}>
                  <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Sérstök ósk eða skilaboð til okkar..."
                    rows={3}
                    className="form-input"
                    style={{ resize: 'vertical', width: '100%' }}
                  />
                </div>
              )}
            </div>

            {error && <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginBottom: 16 }}>{error}</p>}
            <button type="submit" disabled={loading || !cart.length} className="btn-primary" style={{ width: '100%', padding: 16, fontSize: '1.0625rem', borderRadius: 14 }}>
              {loading ? 'Hleður...' : 'Greiða með Teya →'}
            </button>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem', textAlign: 'center', marginTop: 12 }}>Þú verður vísað á örugga greiðslusíðu Teya.</p>
          </form>

          {/* Order summary */}
          <div style={{ position: 'sticky', top: 88 }}>
            <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <h2 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fff' }}>Yfirlit pöntunar</h2>
              </div>
              <div style={{ padding: '0 28px' }}>
                {cart.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', padding: '28px 0', textAlign: 'center' }}>Karfan þín er tóm</p>
                ) : (
                  cart.map(item => (
                    <div key={`${item.id}-${item.size}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.055)' }}>
                      <div>
                        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: 2 }}>{item.name}</p>
                        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Stærð {item.size} · {item.qty} stk</p>
                      </div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, flexShrink: 0 }}>{fmtPrice(item.price * item.qty)}</span>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>Millisamtals</span><span style={{ fontSize: '0.875rem' }}>{fmtPrice(subtotal)}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>Sending</span><span style={{ fontSize: '0.875rem' }}>{shipping === 0 ? <span style={{ color: 'var(--brand)' }}>Ókeypis</span> : fmtPrice(shipping)}</span></div>
                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--brand)', fontSize: '0.875rem' }}>Afsláttur ({appliedCode})</span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--brand)' }}>−{fmtPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <span style={{ fontWeight: 600 }}>Samtals</span>
                    <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.025em' }}>{fmtPrice(total)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
