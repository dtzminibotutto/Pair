'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [pairingCode, setPairingCode] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [renderUrl, setRenderUrl] = useState('');

  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_URL || '';

  const handleDeploy = async () => {
    if (!phone.trim()) {
      setErrorMsg('Phone number is required.');
      setStatus('error');
      return;
    }
    if (!RENDER_BACKEND_URL) {
      setErrorMsg('NEXT_PUBLIC_RENDER_URL is not configured.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');
    setPairingCode('');

    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/pair?number=${encodeURIComponent(phone)}`);
      const data = await res.json();

      if (data.error) {
        setErrorMsg(data.error);
        setStatus('error');
      } else {
        setPairingCode(data.code);
        setStatus('success');
      }
    } catch (err) {
      setErrorMsg('Failed to reach backend. Check your Render URL.');
      setStatus('error');
    }
  };

  return (
    <main className={styles.main}>
      {/* Background grid */}
      <div className={styles.grid} />

      {/* Glow blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.card}>
        <div className={styles.topBar}>
          <span className={styles.dot} style={{ background: '#ff5f57' }} />
          <span className={styles.dot} style={{ background: '#febc2e' }} />
          <span className={styles.dot} style={{ background: '#28c840' }} />
        </div>

        <div className={styles.header}>
          <div className={styles.iconWrap}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#25D366" />
              <path
                d="M22.5 9.5C20.8 7.8 18.5 6.9 16 6.9c-5.1 0-9.2 4.1-9.2 9.1 0 1.6.4 3.2 1.2 4.6L6.8 25.1l4.7-1.2c1.3.7 2.8 1.1 4.4 1.1h.1c5.1 0 9.2-4.1 9.2-9.1 0-2.4-.9-4.7-2.7-6.4zm-6.5 14c-1.4 0-2.8-.4-4-1.1l-.3-.2-2.8.7.7-2.7-.2-.3c-.8-1.2-1.2-2.6-1.2-4 0-4.2 3.4-7.6 7.6-7.6 2 0 3.9.8 5.4 2.2 1.4 1.4 2.2 3.4 2.2 5.4 0 4.2-3.4 7.6-7.4 7.6zm4.1-5.7c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.8.9-.1.2-.3.2-.5.1-.8-.4-1.6-.9-2.2-1.6-.5-.6-1-1.3-1.4-2-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4 0-.1 0-.3-.1-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4H11c-.2 0-.4.1-.6.3-.7.7-1 1.5-1 2.4 0 1 .5 2 1.6 3.4 1.1 1.4 3.1 3 5.8 3.7.8.2 1.5.3 2 .2.6-.1 1.9-.8 2.1-1.5.2-.7.2-1.3.2-1.4-.1-.2-.2-.3-.5-.4z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <h1 className={styles.title}>WhatsApp Bot</h1>
            <p className={styles.subtitle}>Deployer Console</p>
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>Render Backend URL</label>
          <input
            className={styles.input}
            type="text"
            placeholder="https://your-app.onrender.com"
            value={renderUrl}
            onChange={(e) => setRenderUrl(e.target.value)}
          />
          <p className={styles.hint}>
            Set <code>NEXT_PUBLIC_RENDER_URL</code> in Vercel, or enter it above to override.
          </p>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>WhatsApp Number</label>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              type="tel"
              placeholder="+94771234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDeploy()}
            />
            <button
              className={`${styles.btn} ${status === 'loading' ? styles.btnLoading : ''}`}
              onClick={handleDeploy}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className={styles.spinner} />
              ) : (
                'Pair'
              )}
            </button>
          </div>
        </div>

        {status === 'success' && (
          <div className={styles.resultBox}>
            <p className={styles.resultLabel}>✅ Pairing Code</p>
            <div className={styles.codeDisplay}>
              {pairingCode?.match(/.{1,4}/g)?.join(' - ') || pairingCode}
            </div>
            <p className={styles.resultHint}>
              Open WhatsApp → Linked Devices → Link a Device → Enter code above
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className={styles.errorBox}>
            <p>⚠️ {errorMsg}</p>
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.statusRow}>
            <span className={`${styles.pill} ${status === 'success' ? styles.pillGreen : styles.pillGray}`}>
              {status === 'success' ? '● Connected' : status === 'loading' ? '● Connecting...' : '○ Idle'}
            </span>
            <span className={styles.footerNote}>Powered by Baileys + Render</span>
          </div>
        </div>
      </div>
    </main>
  );
}
