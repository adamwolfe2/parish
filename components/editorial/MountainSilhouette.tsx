type Props = {
  className?: string;
  variant?: 'hood' | 'range' | 'ridge';
  /** When true, the SVG stretches edge-to-edge (no aspect-ratio preservation). Use for full-width dividers. */
  stretch?: boolean;
};

/**
 * Minimal PNW silhouette accents.
 * - hood: Mt. Hood-style central peak (default)
 * - range: rolling Cascade range (no dominant peak)
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
      viewBox="0 0 600 120"
      preserveAspectRatio={par}
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 95 L60 80 L110 88 L150 70 L195 82 L240 65 L285 78 L320 70 L380 82 L430 72 L490 85 L540 75 L600 88 L600 120 L0 120 Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M0 110 L40 95 L95 105 L145 88 L185 100 L230 82 L280 95 L325 70 L350 55 L375 70 L420 88 L470 78 L520 92 L600 84 L600 120 L0 120 Z"
        fill="currentColor"
        opacity="0.28"
      />
      <path
        d="M0 120 L0 112 L55 105 L120 110 L180 100 L240 108 L290 92 L325 50 L360 92 L410 100 L470 92 L520 102 L600 96 L600 120 Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M315 78 L325 50 L335 78 L330 80 L325 70 L320 80 Z"
        fill="currentColor"
        opacity="0.85"
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
      {/* Far distance — soft rolling ridges */}
      <path
        d="M0 75 C 40 68, 70 72, 110 65 S 200 60, 240 64 S 320 58, 380 62 S 470 56, 520 60 S 590 62, 600 60 L 600 100 L 0 100 Z"
        fill="currentColor"
        opacity="0.12"
      />
      {/* Middle — multiple gentle peaks */}
      <path
        d="M0 85 L40 78 L80 82 L130 70 L175 80 L220 72 L265 78 L310 66 L355 76 L395 70 L450 80 L500 72 L555 82 L600 76 L600 100 L0 100 Z"
        fill="currentColor"
        opacity="0.24"
      />
      {/* Foreground rolling */}
      <path
        d="M0 100 L0 92 L50 86 L100 90 L160 82 L220 88 L280 80 L340 86 L400 78 L460 84 L520 80 L580 86 L600 84 L600 100 Z"
        fill="currentColor"
        opacity="0.42"
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
        d="M0 60 L0 48 L40 42 L80 46 L130 38 L180 44 L230 36 L290 42 L350 34 L410 40 L470 36 L530 42 L600 38 L600 60 Z"
        fill="currentColor"
        opacity="0.32"
      />
    </svg>
  );
}
