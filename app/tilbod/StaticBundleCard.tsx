'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart';
import { type Bundle } from '@/lib/sanity';

function fmtPrice(n: number) { return n.toLocaleString('is-IS') + ' kr'; }

const LEGGHLIF_SIZES = ['S', 'M', 'L'];
const SOKKA_SIZES = ['38-42', '42-45'];

type LegghlifItem = { _id: string; name: string; imgUrl: string | null };

function SizeBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: '7px 16px', borderRadius: 9, border: `1px solid ${active ? 'var(--brand)' : 'rgba(255,255,255,0.12)'}`,
      background: active ? 'rgba(184,240,58,0.12)' : 'transparent', color: active ? 'var(--brand)' : 'rgba(255,255,255,0.6)',
      fontSize: '0.875rem', fontWeight: active ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s',
    }}>{label}</button>
  );
}

function Modal({ bundle, legghlifar, onClose }: { bundle: Bundle; legghlifar: LegghlifItem[]; onClose: () => void }) {
  const { addItem } = useCart();
  const needsSokkar = bundle.gripsokkar > 0;
  const needsLegghlif = bundle.legghlif > 0;

  const [legghlifProductId, setLegghlifProductId] = useState(legghlifar[0]?._id ?? '');
  const [legghlifSize, setLegghlifSize] = useState('');
  const [sokkarSize, setSokkarSize] = useState('');

  const isComplete =
    (!needsLegghlif || (legghlifSize !== '' && legghlifProductId !== '')) &&
    (!needsSokkar || sokkarSize !== '');

  function handleAdd() {
    if (!isComplete) return;
    const selectedLegghlif = legghlifar.find(p => p._id === legghlifProductId);
    const sizeSummary = [
      needsLegghlif && `Legghlíf: ${selectedLegghlif?.name ?? ''} – ${legghlifSize}`,
      needsSokkar && `Sokkar: ${sokkarSize}`,
    ].filter(Boolean).join(' · ');

    addItem({
      id: bundle._id,
      name: bundle.name,
      price: bundle.price,
      category: 'bundle',
      size: sizeSummary,
    });
    onClose();
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 520, background: '#0f0f0f', borderRadius: '24px 24px 0 0', border: '1px solid rgba(255,255,255,0.08)', padding: '28px 28px 40px', zIndex: 1, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>{bundle.name}</h2>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {needsLegghlif && legghlifar.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Líkan legghlífar</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {legghlifar.map(p => {
                const active = legghlifProductId === p._id;
                return (
                  <button key={p._id} onClick={() => setLegghlifProductId(p._id)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', position: 'relative', border: `2px solid ${active ? 'var(--brand)' : 'rgba(255,255,255,0.1)'}`, background: '#161616', transition: 'border-color 0.15s' }}>
                      {p.imgUrl
                        ? <Image src={p.imgUrl} alt={p.name} fill style={{ objectFit: 'cover' }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} /></div>}
                    </div>
                    <span style={{ fontSize: '0.65rem', color: active ? 'var(--brand)' : 'rgba(255,255,255,0.35)', fontWeight: active ? 600 : 400, maxWidth: 56, textAlign: 'center', lineHeight: 1.2 }}>{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {needsLegghlif && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Stærð legghlífar</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {LEGGHLIF_SIZES.map(s => (
                <SizeBtn key={s} label={s} active={legghlifSize === s} onClick={() => setLegghlifSize(s)} />
              ))}
            </div>
          </div>
        )}

        {needsSokkar && (
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Stærð gripsokka</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {SOKKA_SIZES.map(s => (
                <SizeBtn key={s} label={s} active={sokkarSize === s} onClick={() => setSokkarSize(s)} />
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <span className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>{fmtPrice(bundle.price)}</span>
          <button onClick={handleAdd} disabled={!isComplete} className="btn-primary"
            style={{ padding: '12px 28px', fontSize: '0.9375rem', borderRadius: 12, opacity: isComplete ? 1 : 0.4, cursor: isComplete ? 'pointer' : 'not-allowed' }}>
            Í körfu →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StaticBundleCard({ bundle, legghlifar }: { bundle: Bundle; legghlifar: LegghlifItem[] }) {
  const [open, setOpen] = useState(false);

  const items = [
    bundle.legghlif > 0 && [`${bundle.legghlif}× Legghlíf`, 'S, M eða L'],
    bundle.gripsokkar > 0 && [`${bundle.gripsokkar}× Gripsokkar`, '38-42 eða 42-45'],
  ].filter(Boolean) as [string, string][];

  return (
    <>
      <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 24, overflow: 'hidden' }}>
        <div style={{ padding: '32px 32px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Grunnpakkinn</p>
            {bundle.badge && (
              <span style={{ background: 'color-mix(in srgb, var(--brand) 15%, transparent)', color: 'var(--brand)', fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: 6, letterSpacing: '0.06em' }}>{bundle.badge}</span>
            )}
          </div>
          <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', marginBottom: 6 }}>{bundle.name}</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 24 }}>{bundle.description}</p>
          <div style={{ marginBottom: 28, display: 'flex', flexDirection: 'column' }}>
            {items.map(([t, s]) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.055)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: 'color-mix(in srgb, var(--brand) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand)' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{t}</p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>
            {bundle.price > 0 ? fmtPrice(bundle.price) : '— kr'}
          </span>
          <button onClick={() => setOpen(true)} className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem', borderRadius: 11 }}>Kaupa</button>
        </div>
      </div>
      {open && <Modal bundle={bundle} legghlifar={legghlifar} onClose={() => setOpen(false)} />}
    </>
  );
}
