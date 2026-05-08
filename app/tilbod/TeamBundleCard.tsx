'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart';
import { type Bundle } from '@/lib/sanity';

function fmtPrice(n: number) { return n.toLocaleString('is-IS') + ' kr'; }

const LEGGHLIF_SIZES = ['S', 'M', 'L'];
const SOKKA_SIZES = ['38-42', '42-45'];

type LegghlifItem = { _id: string; name: string; imgUrl: string | null };
type PlayerConfig = {
  legghlifSize: string;
  legghlifProductId: string;
  sokkarSize: string;
};

function isComplete(cfg: PlayerConfig, needsSokkar: boolean) {
  return cfg.legghlifSize !== '' && cfg.legghlifProductId !== '' && (!needsSokkar || cfg.sokkarSize !== '');
}

function PlayerRow({
  index,
  config,
  legghlifar,
  needsSokkar,
  onChange,
}: {
  index: number;
  config: PlayerConfig;
  legghlifar: LegghlifItem[];
  needsSokkar: boolean;
  onChange: (cfg: PlayerConfig) => void;
}) {
  const done = isComplete(config, needsSokkar);
  return (
    <div style={{ background: done ? 'rgba(184,240,58,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${done ? 'rgba(184,240,58,0.2)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 16, padding: '18px 20px', transition: 'border-color 0.2s, background 0.2s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: done ? 'var(--brand)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: done ? '#080808' : 'rgba(255,255,255,0.5)' }}>{index + 1}</span>
        </div>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: done ? '#fff' : 'rgba(255,255,255,0.6)' }}>Leikmaður {index + 1}</span>
        {done && <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--brand)', fontWeight: 600 }}>✓</span>}
      </div>

      {/* Líkan val */}
      {legghlifar.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Líkan</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {legghlifar.map(p => {
              const active = config.legghlifProductId === p._id;
              return (
                <button key={p._id} onClick={() => onChange({ ...config, legghlifProductId: p._id })}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', position: 'relative', border: `2px solid ${active ? 'var(--brand)' : 'rgba(255,255,255,0.1)'}`, background: '#161616', transition: 'border-color 0.15s' }}>
                    {p.imgUrl
                      ? <Image src={p.imgUrl} alt={p.name} fill style={{ objectFit: 'cover' }} />
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} /></div>
                    }
                  </div>
                  <span style={{ fontSize: '0.625rem', color: active ? 'var(--brand)' : 'rgba(255,255,255,0.35)', fontWeight: active ? 600 : 400, maxWidth: 52, textAlign: 'center', lineHeight: 1.2 }}>{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Legghlíf stærð */}
      <div style={{ marginBottom: needsSokkar ? 14 : 0 }}>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Stærð legghlífar</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {LEGGHLIF_SIZES.map(s => (
            <button key={s} onClick={() => onChange({ ...config, legghlifSize: s })}
              className={`size-btn${config.legghlifSize === s ? ' active' : ''}`}
              style={{ padding: '0 16px', height: 36, fontSize: '0.8125rem' }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Sokka stærð */}
      {needsSokkar && (
        <div>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Stærð sokka</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {SOKKA_SIZES.map(s => (
              <button key={s} onClick={() => onChange({ ...config, sokkarSize: s })}
                className={`size-btn${config.sokkarSize === s ? ' active' : ''}`}
                style={{ padding: '0 14px', height: 36, fontSize: '0.8125rem' }}>{s}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TeamBundleCard({ bundle, legghlifar }: { bundle: Bundle; legghlifar: LegghlifItem[] }) {
  const { addItem } = useCart();
  const needsSokkar = bundle.gripsokkar > 0;
  const sokkarPerPlayer = needsSokkar ? Math.round(bundle.gripsokkar / bundle.legghlif) : 0;

  const emptyConfig = (): PlayerConfig => ({ legghlifSize: '', legghlifProductId: legghlifar[0]?._id ?? '', sokkarSize: '' });
  const [players, setPlayers] = useState<PlayerConfig[]>(() => Array.from({ length: bundle.legghlif }, emptyConfig));
  const [toast, setToast] = useState('');

  const doneCount = players.filter(p => isComplete(p, needsSokkar)).length;
  const allDone = doneCount === bundle.legghlif;

  function updatePlayer(i: number, cfg: PlayerConfig) {
    setPlayers(prev => prev.map((p, idx) => idx === i ? cfg : p));
  }

  function addToCart() {
    if (!allDone) return;
    const desc = players.map((p, i) => {
      const prod = legghlifar.find(l => l._id === p.legghlifProductId);
      const parts = [`${i + 1}: ${p.legghlifSize}${prod ? ` · ${prod.name}` : ''}`];
      if (needsSokkar) parts[0] += ` · sokkar ${p.sokkarSize}`;
      return parts[0];
    }).join(' | ');
    addItem({ id: bundle._id, name: bundle.name, price: bundle.price, category: 'Legghlífar', size: desc });
    setToast('Bætt í körfu ✓');
    setTimeout(() => setToast(''), 2500);
  }

  return (
    <>
      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9000, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '12px 20px', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500 }}>
          {toast}
        </div>
      )}
      <div style={{ background: '#0f1308', border: '1px solid rgba(184,240,58,0.3)', borderRadius: 24, overflow: 'hidden' }}>
        <div style={{ padding: '32px 32px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Lið pakkinn</p>
            {bundle.badge && (
              <span style={{ background: 'rgba(184,240,58,0.15)', color: 'var(--brand)', fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: 6, letterSpacing: '0.06em' }}>{bundle.badge}</span>
            )}
          </div>
          <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', marginBottom: 4 }}>{bundle.name}</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 6 }}>{bundle.description}</p>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>
            {bundle.legghlif} legghlífar{needsSokkar ? ` · ${sokkarPerPlayer} pör sokka á hvern` : ''}
          </p>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(doneCount / bundle.legghlif) * 100}%`, background: 'var(--brand)', borderRadius: 2, transition: 'width 0.3s ease' }} />
            </div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: allDone ? 'var(--brand)' : 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>
              {doneCount} / {bundle.legghlif}
            </span>
          </div>

          {/* Player rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {players.map((cfg, i) => (
              <PlayerRow key={i} index={i} config={cfg} legghlifar={legghlifar} needsSokkar={needsSokkar} onChange={c => updatePlayer(i, c)} />
            ))}
          </div>
        </div>

        <div style={{ padding: '20px 32px 28px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>
            {fmtPrice(bundle.price)}
          </span>
          <button onClick={addToCart} disabled={!allDone}
            style={{ padding: '12px 24px', fontSize: '0.9rem', borderRadius: 11, border: 'none', cursor: allDone ? 'pointer' : 'default', background: allDone ? 'var(--brand)' : 'rgba(255,255,255,0.08)', color: allDone ? '#080808' : 'rgba(255,255,255,0.25)', fontWeight: 700, transition: 'background 0.15s, color 0.15s' }}>
            {allDone ? 'Í körfu' : `${bundle.legghlif - doneCount} leikm. eftir`}
          </button>
        </div>
      </div>
    </>
  );
}
