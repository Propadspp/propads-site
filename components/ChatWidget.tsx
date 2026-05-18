'use client';

import { useState, useRef, useEffect } from 'react';

type Message = { from: 'user' | 'bot'; text: string };

const CONFIG = {
  botName: 'Propads aðstoð',
  greeting: 'Hæ! 👋 Hvernig get ég hjálpað þér?',
  color: '#ff4dab',
  offlineText: 'Knúið af AI — við svörum alltaf á íslensku.',
};

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

  async function send() {
    const text = input.trim();
    if (!text || typing) return;
    setInput('');

    const userMessage: Message = { from: 'user', text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setTyping(true);

    try {
      const apiMessages = updatedMessages
        .filter(m => m.text !== CONFIG.greeting)
        .map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { from: 'bot', text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { from: 'bot', text: 'Eitthvað fór úrskeiðis. Hafðu samband á propadspp@gmail.com 😊' }]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
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

          {/* Subtitle */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{CONFIG.offlineText}</p>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 320 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', padding: '10px 14px',
                  borderRadius: m.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
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
              disabled={typing}
              style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: '0.875rem', outline: 'none', fontFamily: 'Inter, sans-serif', opacity: typing ? 0.5 : 1 }}
            />
            <button onClick={send} disabled={typing} style={{ width: 40, height: 40, borderRadius: 10, background: CONFIG.color, border: 'none', cursor: typing ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: typing ? 0.5 : 1 }}>
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
          boxShadow: '0 8px 24px rgba(255,77,171,0.4)',
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
