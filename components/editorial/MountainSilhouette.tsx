type Props = { className?: string };

/**
 * A minimal Mt. Hood-inspired silhouette used as a refined PNW accent.
 * Pure SVG, no external assets.
 */
export function MountainSilhouette({ className }: Props) {
  return (
    <svg
      viewBox="0 0 600 120"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Distant ridge */}
      <path
        d="M0 95 L60 80 L110 88 L150 70 L195 82 L240 65 L285 78 L320 70 L380 82 L430 72 L490 85 L540 75 L600 88 L600 120 L0 120 Z"
        fill="currentColor"
        opacity="0.15"
      />
      {/* Middle ridge */}
      <path
        d="M0 110 L40 95 L95 105 L145 88 L185 100 L230 82 L280 95 L325 70 L350 55 L375 70 L420 88 L470 78 L520 92 L600 84 L600 120 L0 120 Z"
        fill="currentColor"
        opacity="0.28"
      />
      {/* Foreground — Mt. Hood-like peak slightly right of center */}
      <path
        d="M0 120 L0 112 L55 105 L120 110 L180 100 L240 108 L290 92 L325 50 L360 92 L410 100 L470 92 L520 102 L600 96 L600 120 Z"
        fill="currentColor"
        opacity="0.55"
      />
      {/* Snow cap accent on the peak */}
      <path
        d="M315 78 L325 50 L335 78 L330 80 L325 70 L320 80 Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}
