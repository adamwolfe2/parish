import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Parish & Company — Independent investment research and management since 1998.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#F7F4EE',
          padding: '70px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'serif',
          color: '#1A1F2B',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#4A6B4F',
              fontWeight: 500,
            }}
          >
            Parish &amp; Company LLC · Since 1998
          </div>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              maxWidth: 1000,
            }}
          >
            Independent investment research and management.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              height: 1,
              width: '100%',
              background: 'rgba(26, 31, 43, 0.12)',
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#525866',
              letterSpacing: '-0.005em',
            }}
          >
            Featured in The New York Times · The Wall Street Journal · Bloomberg · Barron&apos;s
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
