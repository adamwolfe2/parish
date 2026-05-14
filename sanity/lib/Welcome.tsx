/**
 * Welcome card shown in Studio when no document is selected. Tells the
 * user exactly what to do next, in plain English, with primary actions
 * matching the brand.
 */
import { useState, useEffect } from 'react';

export function Welcome() {
  const [counts, setCounts] = useState<{ posts: number; topics: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4he5cl9g';
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const url = `https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}?query=${encodeURIComponent('{"posts": count(*[_type=="post" && !(_id in path("drafts.**"))]), "topics": count(*[_type=="topic" && !(_id in path("drafts.**"))])}')}`;
    fetch(url)
      .then((r) => r.json())
      .then((j) => {
        if (!cancelled) setCounts(j.result);
      })
      .catch(() => {
        /* ignore */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      style={{
        background: '#F7F4EE',
        minHeight: 'calc(100vh - 110px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '64px 24px',
      }}
    >
      <div style={{ maxWidth: 720, width: '100%' }}>
        <p
          style={{
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#4A6B4F',
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          Parish &amp; Company · Studio
        </p>
        <h1
          style={{
            fontFamily: 'Source Serif 4, Georgia, serif',
            fontSize: 42,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#1A1F2B',
            margin: 0,
          }}
        >
          What would you like to do?
        </h1>
        <p
          style={{
            marginTop: 18,
            fontSize: 17,
            lineHeight: 1.55,
            color: '#525866',
            maxWidth: 540,
          }}
        >
          Use this space to publish new research notes, edit existing ones, and
          manage the topics they&rsquo;re filed under. Every change goes live on
          the public site within about ten seconds of clicking <strong>Publish</strong>.
        </p>

        <div
          style={{
            marginTop: 36,
            display: 'grid',
            gap: 1,
            background: '#1a1f2b14',
            border: '1px solid #1a1f2b14',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <Tile
            label="Research notes"
            count={counts?.posts}
            description="Bill’s archive plus anything new. Click + to write a new one."
            href="/studio/content/post"
          />
          <Tile
            label="Topics"
            count={counts?.topics}
            description="The categories notes are filed under. Add a new one any time."
            href="/studio/content/topic"
          />
        </div>

        <div
          style={{
            marginTop: 28,
            padding: 20,
            background: '#EBE6DD80',
            border: '1px solid #1a1f2b14',
          }}
        >
          <p
            style={{
              fontFamily: 'JetBrains Mono, ui-monospace, monospace',
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#4A6B4F',
              fontWeight: 500,
              margin: 0,
            }}
          >
            How to publish a new note
          </p>
          <ol
            style={{
              marginTop: 12,
              fontSize: 15,
              lineHeight: 1.7,
              color: '#1A1F2B',
              paddingLeft: 22,
            }}
          >
            <li>
              Click <strong>Research notes</strong> in the left sidebar.
            </li>
            <li>
              Click the green <strong>＋</strong> button at the top of the list to start a new note.
            </li>
            <li>
              Fill in the title, dek, body, topics, and publication date. Drafts save automatically.
            </li>
            <li>
              When ready, click <strong>Publish</strong> in the top right. The note appears at
              <code style={{ marginLeft: 6, padding: '1px 6px', background: '#F7F4EE', border: '1px solid #1a1f2b14' }}>
                parishinvestments.vercel.app/research
              </code>{' '}
              within about 10 seconds.
            </li>
          </ol>
        </div>

        <p
          style={{
            marginTop: 32,
            fontSize: 13,
            color: '#525866',
            lineHeight: 1.5,
          }}
        >
          Any change you publish here updates the live site immediately. Drafts
          stay private until you click Publish. Need help? Ask Adam.
        </p>
      </div>
    </div>
  );
}

function Tile({
  label,
  count,
  description,
  href,
}: {
  label: string;
  count: number | undefined;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      style={{
        display: 'block',
        background: '#F7F4EE',
        padding: '24px 26px',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'background 0.2s',
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = '#fff';
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = '#F7F4EE';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <h2
          style={{
            fontFamily: 'Source Serif 4, Georgia, serif',
            fontSize: 22,
            margin: 0,
            color: '#1A1F2B',
            letterSpacing: '-0.01em',
          }}
        >
          {label}
        </h2>
        <span
          style={{
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontSize: 13,
            color: '#4A6B4F',
            fontWeight: 500,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {count !== undefined ? count : '—'}
        </span>
      </div>
      <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.5, color: '#525866' }}>
        {description}
      </p>
    </a>
  );
}
