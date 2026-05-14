type Props = {
  className?: string;
  variant?: 'hood' | 'range' | 'ridge';
  /** When true, the SVG stretches edge-to-edge (no aspect-ratio preservation). Use for full-width dividers. */
  stretch?: boolean;
};

/**
 * Minimal PNW silhouette accents — all paths use most of the viewbox height
 * so peaks remain visible even when the SVG is stretched into a thin band.
 *
 * - hood: Mt. Hood-style central peak (dominant feature)
 * - range: rolling Cascade range with multiple peaks across width
 * - ridge: distant horizon line, single layer (very subtle)
 */
export function MountainSilhouette({ className, variant = 'hood', stretch = false }: Props) {
  const par = stretch ? 'none' : 'xMidYMax slice';
  if (variant === 'range') return <RangeRolling className={className} par={par} />;
  if (variant === 'ridge') return <Ridge className={className} par={par} />;
  return <HoodPeak className={className} par={par} />;
}

function HoodPeak({ className, par }: { className?: string; par: string }) {
  return (
    <svg
      viewBox="0 0 600 100"
      preserveAspectRatio={par}
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Far distant range */}
      <path
        d="M0 70 L50 60 L100 68 L160 50 L210 64 L270 45 L320 58 L380 40 L430 55 L500 38 L560 52 L600 48 L600 100 L0 100 Z"
        fill="currentColor"
        opacity="0.18"
      />
      {/* Middle range */}
      <path
        d="M0 85 L60 70 L120 80 L180 55 L240 72 L300 45 L355 55 L385 30 L420 55 L480 65 L540 50 L600 65 L600 100 L0 100 Z"
        fill="currentColor"
        opacity="0.32"
      />
      {/* Foreground — Mt. Hood-like dominant peak slightly right of center */}
      <path
        d="M0 95 L50 88 L110 92 L170 80 L230 90 L290 65 L325 12 L360 65 L420 88 L480 80 L540 90 L600 85 L600 100 L0 100 Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Snow cap */}
      <path
        d="M313 42 L325 12 L337 42 L332 44 L325 28 L319 44 Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

function RangeRolling({ className, par }: { className?: string; par: string }) {
  return (
    <svg
      viewBox="0 0 600 100"
      preserveAspectRatio={par}
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Far — light rolling ridges */}
      <path
        d="M0 60 L40 52 L90 58 L140 42 L190 56 L235 48 L285 38 L335 50 L380 40 L425 56 L475 44 L520 54 L575 46 L600 52 L600 100 L0 100 Z"
        fill="currentColor"
        opacity="0.22"
      />
      {/* Middle — bigger peaks */}
      <path
        d="M0 80 L45 60 L95 72 L150 48 L210 70 L260 40 L305 58 L355 32 L405 58 L460 38 L510 64 L560 46 L600 62 L600 100 L0 100 Z"
        fill="currentColor"
        opacity="0.38"
      />
      {/* Foreground — dramatic rolling */}
      <path
        d="M0 95 L40 75 L100 88 L160 60 L220 82 L280 50 L335 68 L395 42 L450 70 L510 55 L560 78 L600 70 L600 100 L0 100 Z"
        fill="currentColor"
        opacity="0.62"
      />
    </svg>
  );
}

function Ridge({ className, par }: { className?: string; par: string }) {
  return (
    <svg
      viewBox="0 0 600 60"
      preserveAspectRatio={par}
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 50 L40 32 L90 42 L150 22 L210 38 L270 18 L330 32 L390 14 L450 30 L510 20 L570 34 L600 28 L600 60 L0 60 Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}
