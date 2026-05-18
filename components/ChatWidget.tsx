'use client';

import { useState, useRef, useEffect } from 'react';

// ============================================================
// CHATBOT TEMPLATE — reusable across projects
// ============================================================
// To use in a new project:
// 1. Copy this file
// 2. Edit the CONFIG object below (name, color, faqs, etc.)
// 3. Import and add <ChatWidget /> to your layout
// ============================================================

type Message = { from: 'user' | 'bot'; text: string };

type FAQ = {
  keywords: string[];  // words that trigger this answer (lowercase)
  answer: string;
};

// ============================================================
// CONFIG — edit this for each project
// ============================================================
const CONFIG = {
  botName: 'Propads aðstoð',
  greeting: 'Hæ! 👋 Hvernig get ég hjálpað þér?',
  color: '#ff4dab',          // brand color
  contactEmail: 'propadspp@gmail.com',
  contactText: 'Sendu okkur tölvupóst',
  offlineText: 'Við svörum vanalega innan fárra mínútna.',
  fallback: 'Ég er ekki viss um það! Þú getur sent okkur tölvupóst á propadspp@gmail.com og við svörum fljótt. 😊',

  faqs: [
    {
      keywords: ['stærð', 'stærðir', 'hvaða stærð', 'size', 's', 'm', 'l'],
      answer: 'Legghlífar koma í þremur stærðum:\n\nS — 4–8 ára — 8×5 cm\nM — 8–12 ára — 10×6 cm\nL — 15+ ára — 12×8 cm\n\nGripsokkar koma í 38–42 og 42–45.',
    },
    {
      keywords: ['sending', 'hvenær', 'afhending', 'póst', 'fæ ég', 'kemur'],
      answer: 'Á höfuðborgarsvæðinu tekur sending 1–3 virka daga. Utan höfuðborgarsvæðisins 2–4 virka daga með Póstinum.',
    },
    {
      keywords: ['frísending', 'frítt', 'ókeypis sending', 'sendingarkostnaður', 'sendingar'],
      answer: 'Sending er ókeypis ef þú verslar fyrir 8.000 kr eða meira! 🎉\n\nAnnars: 700 kr á höfuðborgarsvæðinu, 1.500 kr utan þess.',
    },
    {
      keywords: ['skil', 'skila', 'skilaregla', 'skila vöru', 'skila pöntun'],
      answer: 'Skilafrestur er 30 dagar. Varan þarf að vera ónotuð í upprunalegum umbúðum. Skoðaðu fulla skilareglu á /skilaregla 📦',
    },
    {
      keywords: ['verð', 'kostar', 'hvað kostar', 'kr', 'króna'],
      answer: 'Legghlífar kosta 3.990 kr (S/M) eða 4.299 kr (L).\n\nGripsokkar kosta 1.990 kr.\n\nVið bjóðum einnig upp á pakkakjör í tilboðum — skoðaðu /tilbod! 🛍️',
    },
    {
      keywords: ['gripsokk', 'gripsokkar', 'sokkar', 'sokk'],
      answer: 'Gripsokkar okkar eru hannaðir með anti-slip tækni sem heldur fætinum á réttum stað í skónum. Fáanlegir í 38–42 og 42–45. 🧦',
    },
    {
      keywords: ['legghlíf', 'legghlífar', 'legghlífa'],
      answer: 'Legghlífarnar okkar eru léttar og þægilegar, hannaðar til að vera sem minnst fyrir þér á meðan þær vernda þig. Fáanlegar í S, M og L. 🛡️',
    },
    {
      keywords: ['tilboð', 'pakki', 'pakka', 'bundle', 'kaupa fleiri'],
      answer: 'Við höfum tilboð þar sem þú getur sparað með því að kaupa fleiri vörur saman! Skoðaðu /tilbod fyrir bestu kjörin. 💰',
    },
    {
      keywords: ['greiðsla', 'greiða', 'visa', 'mastercard', 'kort', 'teya'],
      answer: 'Við tökum við öllum helstu greiðslukortum í gegnum Teya — Visa og Mastercard. Greiðslan er örugg og dulkóðuð. 🔒',
    },
    {
      keywords: ['samband', 'hafa samband', 'netfang', 'email', 'hringja'],
      answer: 'Þú getur sent okkur tölvupóst á propadspp@gmail.com eða fylgt okkur á Instagram @propadsiceland. Við svörum eins fljótt og auðið er! 📧',
    },
    {
      keywords: ['verslun', 'búð', 'kaupa í búð', 'kaupa í verslun', 'physical', 'staðbundið'],
      answer: 'Eins og staðan er núna er kaup eingöngu í boði á netinu á propads.is 🛒',
    },
    {
      keywords: ['útlönd', 'erlendis', 'sending til útlanda', 'ship abroad', 'denmark', 'sweden'],
      answer: 'Sendingar eru að svo stöddu eingöngu innan Íslands. Við vonum að geta boðið upp á fleiri lönd í framtíðinni! 🌍',
    },
    {
      keywords: ['röng vara', 'rangur pakkinn', 'fékk ranga', 'villa í pöntun', 'wrong item'],
      answer: 'Hafðu samband við okkur strax á propadspp@gmail.com og við leiðréttum málið eins fljótt og auðið er. 📦',
    },
    {
      keywords: ['panta á síma', 'instagram', 'panta í gegnum', 'dm', 'skilaboð'],
      answer: 'Ekki er hægt að panta í síma en þú getur sent okkur skilaboð á Instagram @propadsiceland og við hjálpum þér þar! 📲',
    },
    {
      keywords: ['konur', 'stelpur', 'kona', 'girls', 'women', 'henta öllum'],
      answer: 'Auðvitað! Gripsokkar henta öllum. Notaðu stærðarleiðbeiningarnar okkar til að finna réttu stærðina þína. 🧦',
    },
    {
      keywords: ['breyta pöntun', 'hætta við', 'afpanta', 'cancel', 'breyta'],
      answer: 'Hafðu samband við okkur strax á propadspp@gmail.com eða Instagram — við reynum að hjálpa ef pöntunin er ekki komin í ferð. ⏱️',
    },
    {
      keywords: ['gerð á íslandi', 'íslenskt', 'framleidd', 'made in', 'hvar eru gerðar'],
      answer: 'Vörurnar eru ekki framleiddar á Íslandi en eru hannaðar af okkur Íslendingum, sérstaklega fyrir íslenska fótboltamenn. 🇮🇸',
    },
    {
      keywords: ['rennur niður', 'rennur af', 'heldur ekki', 'festir', 'teypa', 'band'],
      answer: 'Við mælum með að teypa legghlífina fastar við legginn með legghlífabandi. Þetta tryggir að hún haldist á sínum stað allan leikinn. 💪',
    },
    {
      keywords: ['lið', 'félög', 'magn', 'mörg', 'team', 'club', 'heildarverð'],
      answer: 'Já! Við bjóðum upp á tilboð fyrir lið og félög sem kaupa í magni. Kíktu á /tilbod eða sendu okkur línu á propadspp@gmail.com 🏆',
    },
    {
      keywords: ['þvo', 'þvotta', 'þvottavél', 'hreinsa', 'wash', 'cleaning'],
      answer: 'Við mælum með að þrífa legghlífarnar með rökum svamp og sápu. Þvottavél er ekki mælt með til að viðhalda líftíma vörunnar. 🧼',
    },
    {
      keywords: ['gjöf', 'gjafaumbúðir', 'gift', 'wrap', 'birthday'],
      answer: 'Nei því miður, gjafaumbúðir eru ekki í boði að svo stöddu. En vörurnar koma í flottum umbúðum sem henta vel sem gjöf! 🎁',
    },
    {
      keywords: ['fylgjast með', 'rakningarnúmer', 'track', 'tracking', 'hvar er pöntunin'],
      answer: 'Hafðu samband við okkur á propadspp@gmail.com eða Instagram @propadsiceland með pöntunarnúmerið þitt og við sendum þér uppfærslu. 📍',
    },
    {
      keywords: ['low socks', 'lágir sokkar', 'stuttir sokkar', 'lág legghlíf', 'low', 'stærð low', 'legghlíf low'],
      answer: 'Við mælum með S stærð með lágum sokkum — hún situr vel og truflar ekki. 🛡️',
    },
    {
      keywords: ['staðfesting', 'kvittun', 'email eftir kaup', 'staðfestingarpóstur', 'confirmation'],
      answer: 'Þú færð greiðslukvittun frá Teya eftir kaup. Ef þú hefur spurningar um pöntunina skaltu hafa samband á propadspp@gmail.com 📧',
    },
  ] as FAQ[],
};
// ============================================================

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  let best: { answer: string; score: number } | null = null;
  for (const faq of CONFIG.faqs) {
    const score = faq.keywords.filter(k => lower.includes(k)).length;
    if (score > 0 && (!best || score > best.score)) {
      best = { answer: faq.answer, score };
    }
  }
  return best ? best.answer : CONFIG.fallback;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: CONFIG.greeting },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(prev => [...prev, { from: 'user', text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getBotReply(text) }]);
    }, 800);
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 88, right: 24, zIndex: 9998,
          width: 340, maxWidth: 'calc(100vw - 48px)',
          background: '#111', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Header */}
          <div style={{ background: CONFIG.color, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#080808', opacity: 0.5 }} />
              <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#080808' }}>{CONFIG.botName}</span>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#080808', fontSize: '1.1rem', opacity: 0.6, lineHeight: 1 }}>✕</button>
          </div>

          {/* Offline note */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{CONFIG.offlineText}</p>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 320 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: m.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: m.from === 'user' ? CONFIG.color : 'rgba(255,255,255,0.08)',
                  color: m.from === 'user' ? '#080808' : '#fff',
                  fontSize: '0.875rem', lineHeight: 1.6, whiteSpace: 'pre-line',
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex' }}>
                <div style={{ padding: '10px 16px', borderRadius: '14px 14px 14px 4px', background: 'rgba(255,255,255,0.08)', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: `bounce 1s ${i * 0.15}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Skrifaðu skilaboð..."
              style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: '0.875rem', outline: 'none', fontFamily: 'Inter, sans-serif' }}
            />
            <button onClick={send} style={{ width: 40, height: 40, borderRadius: 10, background: CONFIG.color, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#080808" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9997,
          width: 56, height: 56, borderRadius: '50%',
          background: CONFIG.color, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 24px rgba(255,77,171,0.4)`,
          transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {open
          ? <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#080808" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          : <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#080808" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
        }
      </button>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
