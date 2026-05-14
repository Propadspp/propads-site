'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart';
import { type Bundle } from '@/lib/sanity';

function fmtPrice(n: number) { return n.toLocaleString('is-IS') + ' kr'; }

const LEGGHLIF_SIZES = ['S', 'M', 'L'];
const SOKKA_SIZES = ['38-42', '42-45'];

type LegghlifItem = { _id: string; name: string; imgUrl: string | null };
type PlayerConfig = { legghlifSize: string; legghlifProductId: string; sokkarSize: string };

function isComplete(cfg: PlayerConfig, needsSokkar: boolean) {
  return cfg.legghlifSize !== '' && cfg.legghlifProductId !== '' && (!needsSokkar || cfg.sokkarSize !== '');
}

function PlayerRow({ index, config, legghlifar, needsSokkar, onChange }: {
  index: number; config: PlayerConfig; legghlifar: LegghlifItem[]; needsSokkar: boolean;
  onChange: (cfg: PlayerConfig) => void;
}) {
  const done = isComplete(config, needsSokkar);
  return (
    <div style={{ background: done ? 'rgba(184,240,58,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${done ? 'rgba(184,240,58,0.18)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 14, padding: '16px 18px', transition: 'border-color 0.2s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: done ? 'var(--brand)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: done ? '#080808' : 'rgba(255,255,255,0.5)' }}>{index + 1}</span>
        </div>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>Leikmaður {index + 1}</span>
        {done && <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--brand)', fontWeight: 700 }}>✓</span>}
      </div>

      {legghlifar.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Líkan</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {legghlifar.map(p => {
              const active = config.legghlifProductId === p._id;
              return (
                <button key={p._id} onClick={() => onChange({ ...config, legghlifProductId: p._id })}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 9, overflow: 'hidden', position: 'relative', border: `2px solid ${active ? 'var(--brand)' : 'rgba(255,255,255,0.1)'}`, background: '#161616', transition: 'border-color 0.15s' }}>
                    {p.imgUrl
                      ? <Image src={p.imgUrl} alt={p.name} fill style={{ objectFit: 'cover' }} />
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} /></div>}
                  </div>
                  <span style={{ fontSize: '0.6rem', color: active ? 'var(--brand)' : 'rgba(255,255,255,0.3)', fontWeight: active ? 600 : 400, maxWidth: 48, textAlign: 'center', lineHeight: 1.2 }}>{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Stærð legghlífar</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {LEGGHLIF_SIZES.map(s => (
              <button key={s} onClick={() => onChange({ ...config, legghlifSize: s })}
                className={`size-btn${config.legghlifSize === s ? ' active' : ''}`}
                style={{ padding: '0 14px', height: 34, fontSize: '0.8rem' }}>{s}</button>
            ))}
          </div>
        </div>
        {needsSokkar && (
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Stærð sokka</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {SOKKA_SIZES.map(s => (
                <button key={s} onClick={() => onChange({ ...config, sokkarSize: s })}
                  className={`size-btn${config.sokkarSize === s ? ' active' : ''}`}
                  style={{ padding: '0 10px', height: 34, fontSize: '0.8rem' }}>{s}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Modal({ bundle, legghlifar, onClose }: { bundle: Bundle; legghlifar: LegghlifItem[]; onClose: () => void }) {
  const { addItem } = useCart();
  const needsSokkar = bundle.gripsokkar > 0;
  const emptyConfig = (): PlayerConfig => ({ legghlifSize: '', legghlifProductId: legghlifar[0]?._id ?? '', sokkarSize: '' });
  const [players, setPlayers] = useState<PlayerConfig[]>(() => Array.from({ length: bundle.legghlif }, emptyConfig));
  const [toast, setToast] = useState('');

  const doneCount = players.filter(p => isComplete(p, needsSokkar)).length;
  const allDone = doneCount === bundle.legghlif;

  function addToCart() {
    if (!allDone) return;
    const desc = players.map((p, i) => {
      const prod = legghlifar.find(l => l._id === p.legghlifProductId);
      return `${i + 1}: ${p.legghlifSize}${prod ? ` · ${prod.name}` : ''}${needsSokkar ? ` · sokkar ${p.sokkarSize}` : ''}`;
    }).join(' | ');
    addItem({ id: bundle._id, name: bundle.name, price: bundle.price, category: 'bundle', size: desc });
    setToast('Bætt í körfu ✓');
    setTimeout(() => { setToast(''); onClose(); }, 1500);
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }} onClick={onClose} />
      <div style={{ position: 'relative', background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: 640, maxHeight: '90vh', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.25s ease' }}>
        <style>{`@keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

        {/* Header */}
        <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 2 }}>{bundle.name}</h3>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>{bundle.legghlif} leikmenn — veldu stærð og líkan fyrir hvern</p>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Progress */}
        <div style={{ padding: '14px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(doneCount / bundle.legghlif) * 100}%`, background: 'var(--brand)', borderRadius: 2, transition: 'width 0.3s ease' }} />
          </div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: allDone ? 'var(--brand)' : 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>{doneCount} / {bundle.legghlif}</span>
        </div>

        {/* Scrollable player list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {players.map((cfg, i) => (
            <PlayerRow key={i} index={i} config={cfg} legghlifar={legghlifar} needsSokkar={needsSokkar}
              onChange={c => setPlayers(prev => prev.map((p, idx) => idx === i ? c : p))} />
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 28px 28px', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <span className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>{fmtPrice(bundle.price)}</span>
          <button onClick={addToCart} disabled={!allDone}
            style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: 12, border: 'none', cursor: allDone ? 'pointer' : 'default', background: allDone ? 'var(--brand)' : 'rgba(255,255,255,0.08)', color: allDone ? '#080808' : 'rgba(255,255,255,0.25)', fontWeight: 700, transition: 'background 0.15s, color 0.15s' }}>
            {toast ? toast : allDone ? 'Í körfu' : `${bundle.legghlif - doneCount} leikm. eftir`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TeamBundleCard({ bundle, legghlifar }: { bundle: Bundle; legghlifar: LegghlifItem[] }) {
  const [open, setOpen] = useState(false);
  const needsSokkar = bundle.gripsokkar > 0;

  const items = [
    bundle.legghlif > 0 && [`${bundle.legghlif}× Legghlífar`, `${bundle.legghlif} leikmenn`],
    bundle.gripsokkar > 0 && [`${bundle.gripsokkar}× Gripsokkar`, `${Math.round(bundle.gripsokkar / bundle.legghlif)} pör á hvern`],
  ].filter(Boolean) as [string, string][];

  return (
    <>
      {open && <Modal bundle={bundle} legghlifar={legghlifar} onClose={() => setOpen(false)} />}

      <div style={{ background: '#0f1308', border: '1px solid rgba(184,240,58,0.3)', borderRadius: 24, overflow: 'hidden' }}>
        <div style={{ padding: '32px 32px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Liðspakkinn</p>
            {bundle.originalPrice && bundle.originalPrice > bundle.price && (
              <span style={{ background: 'rgba(184,240,58,0.15)', color: 'var(--brand)', fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: 6, letterSpacing: '0.06em' }}>
                {Math.round((1 - bundle.price / bundle.originalPrice) * 100)}% AFSLÁTTUR
              </span>
            )}
          </div>
          <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', marginBottom: 6 }}>{bundle.name}</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 24 }}>{bundle.description}</p>
          <div style={{ marginBottom: 28, display: 'flex', flexDirection: 'column' }}>
            {items.map(([t, s]) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.055)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(184,240,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand)' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{t}</p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{s}</p>
                </div>
              </div>
            ))}
          </div>
          {needsSokkar && (
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>Sérsniðið val á stærð og líkan fyrir hvern leikmann.</p>
          )}
        </div>
        <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>
            {fmtPrice(bundle.price)}
          </span>
          <button onClick={() => setOpen(true)} className="btn-primary" style={{ padding: '12px 28px', fontSize: '0.9rem', borderRadius: 11 }}>
            Kaupa
          </button>
        </div>
      </div>
    </>
  );
}
