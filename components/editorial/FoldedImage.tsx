import Image from 'next/image';
import { cn } from '@/lib/cn';

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Which corner the folded paper-flag accent sits over. Default 'tl' (top-left). */
  fold?: 'tl' | 'tr' | 'bl' | 'br';
  /** Tailwind aspect class. Default 'aspect-[4/5]'. */
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
};

/**
 * Editorial image with a folded paper-flag corner accent, in the same
 * visual language used by Vista Capital Partners on vistacp.com · a small
 * triangular fold over one corner of the image suggests the page being
 * lifted, giving the composition a tactile, magazine-cover feel.
 */
export function FoldedImage({
  src,
  alt,
  className,
  fold = 'tl',
  aspect = 'aspect-[4/5]',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  quality = 90,
}: Props) {
  // Position the fold ornament.
  const foldPos = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  }[fold];

  // Direction of the triangle path.
  const foldRotate = {
    tl: 'rotate-0',
    tr: 'scale-x-[-1]',
    bl: 'scale-y-[-1]',
    br: 'scale-[-1]',
  }[fold];

  return (
    <figure className={cn('relative', className)}>
      <div className={cn('relative w-full overflow-hidden bg-[var(--color-mist)]', aspect)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={quality}
          className="object-cover"
        />
      </div>
      {/* Folded-paper triangle, sits OVER the image edge */}
      <div
        aria-hidden="true"
        className={cn('absolute w-12 h-12 md:w-16 md:h-16 z-10 pointer-events-none', foldPos, foldRotate)}
      >
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <defs>
            <linearGradient id="fold-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(20,23,31,0.18)" />
              <stop offset="100%" stopColor="rgba(20,23,31,0.04)" />
            </linearGradient>
          </defs>
          {/* Bone-colored triangle */}
          <polygon points="0,0 64,0 0,64" fill="var(--color-bone)" />
          {/* Subtle shadow along the fold's hypotenuse */}
          <polygon points="0,0 64,0 0,64" fill="url(#fold-shadow)" />
          {/* Crease line */}
          <line
            x1="0"
            y1="64"
            x2="64"
            y2="0"
            stroke="var(--color-hairline-strong)"
            strokeWidth="0.6"
          />
        </svg>
      </div>
    </figure>
  );
}
