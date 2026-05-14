/**
 * Custom Studio brand icon — Parish & Company wordmark in moss-green.
 */
export function StudioIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="4" fill="#4A6B4F" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontFamily="Georgia, 'Source Serif 4', serif"
        fontSize="18"
        fontWeight="500"
        fill="#F7F4EE"
      >
        P&amp;C
      </text>
    </svg>
  );
}

export function StudioLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <StudioIcon />
      <span style={{
        fontFamily: 'Georgia, "Source Serif 4", serif',
        fontSize: 17,
        fontWeight: 500,
        letterSpacing: '-0.01em',
      }}>
        Parish &amp; Company
      </span>
    </div>
  );
}
