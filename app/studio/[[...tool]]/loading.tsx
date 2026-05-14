export default function StudioLoading() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#F7F4EE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 380, padding: '0 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 28,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="4" fill="#4A6B4F" />
            <text x="16" y="22" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fill="#F7F4EE">
              P&amp;C
            </text>
          </svg>
          <span
            style={{
              fontFamily: 'Georgia, "Source Serif 4", serif',
              fontSize: 22,
              fontWeight: 500,
              color: '#1A1F2B',
              letterSpacing: '-0.01em',
            }}
          >
            Parish &amp; Company
          </span>
        </div>

        <p
          style={{
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#4A6B4F',
            fontWeight: 500,
            marginBottom: 14,
          }}
        >
          Loading Studio
        </p>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.55,
            color: '#525866',
            margin: 0,
          }}
        >
          The content editor is starting up. This takes a moment the first time you visit
          — subsequent loads are instant.
        </p>

        <div
          style={{
            margin: '36px auto 0',
            width: 160,
            height: 2,
            background: '#1a1f2b14',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#4A6B4F',
              transformOrigin: 'left',
              animation: 'studio-progress 1.4s ease-in-out infinite',
            }}
          />
        </div>

        <style>{`
          @keyframes studio-progress {
            0% { transform: translateX(-100%) scaleX(0.3); }
            50% { transform: translateX(40%) scaleX(0.6); }
            100% { transform: translateX(100%) scaleX(0.3); }
          }
        `}</style>
      </div>
    </div>
  );
}
