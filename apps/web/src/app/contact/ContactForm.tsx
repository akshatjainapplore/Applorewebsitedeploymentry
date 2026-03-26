'use client';

import { useState } from 'react';

const DISCUSS_OPTIONS = [
  'Technology strategy advisory',
  'Platform architecture and system design',
  'AI and automation implementation',
  'Other',
];

export default function ContactForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggleOption(opt: string) {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ name, company, email, phone, selected });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{
        background: '#F0FDF4', border: '1px solid rgba(34,197,94,0.2)',
        borderRadius: '20px', padding: '64px 48px', textAlign: 'center',
      }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #22C55E, #16A34A)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <svg width="24" height="24" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '24px', color: '#111827', marginBottom: '8px' }}>
          Message sent!
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: '24px', color: '#4B5563', margin: 0 }}>
          We'll be in touch shortly at <strong>{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Name */}
      <div>
        <label style={labelStyle}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          required
          style={inputStyle}
        />
      </div>

      {/* Company */}
      <div>
        <label style={labelStyle}>Company</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Your company name"
          style={inputStyle}
        />
      </div>

      {/* Company Email */}
      <div>
        <label style={labelStyle}>Company Email ID</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          style={inputStyle}
        />
      </div>

      {/* Discuss checkboxes */}
      <div>
        <label style={{ ...labelStyle, display: 'block', marginBottom: '12px' }}>
          What would you like to discuss?
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {DISCUSS_OPTIONS.map((opt) => {
            const active = selected.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleOption(opt)}
                style={{
                  padding: '8px 16px', borderRadius: '9999px', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500,
                  border: active ? '1.5px solid #2563EB' : '1.5px solid rgba(0,0,0,0.12)',
                  background: active ? '#EFF6FF' : '#ffffff',
                  color: active ? '#2563EB' : '#4B5563',
                  transition: 'all 0.15s',
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label style={labelStyle}>Phone</label>
        <div style={{ display: 'flex', gap: '0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '12px 16px', border: '1.5px solid rgba(0,0,0,0.12)',
            borderRight: 'none', borderRadius: '10px 0 0 10px',
            fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#4B5563',
            background: '#F9FAFB', flexShrink: 0,
          }}>
            +91
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="98765 43210"
            style={{
              ...inputStyle,
              borderRadius: '0 10px 10px 0',
              flex: 1,
            }}
          />
        </div>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            padding: '14px 40px', borderRadius: '9999px',
            background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #7C3AED 100%)',
            color: '#ffffff', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 700,
            letterSpacing: '0.01em',
            boxShadow: '0 4px 20px rgba(37,99,235,0.3)',
            transition: 'opacity 0.2s',
          }}
        >
          Start the Conversation
        </button>
      </div>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '11px',
  fontWeight: 600,
  color: '#6B7280',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  display: 'block',
  marginBottom: '8px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '10px',
  border: '1.5px solid rgba(0,0,0,0.12)',
  fontFamily: 'var(--font-sans)',
  fontSize: '15px',
  color: '#111827',
  background: '#ffffff',
  outline: 'none',
  boxSizing: 'border-box',
};
