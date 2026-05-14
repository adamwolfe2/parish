import Image from 'next/image';

export function PressMarks() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-[var(--color-hairline)]" />
        <p className="text-[0.7rem] uppercase tracking-[0.2em] font-medium text-[var(--color-slate)]">
          Original research featured in
        </p>
        <span className="h-px flex-1 bg-[var(--color-hairline)]" />
      </div>

      <div className="mt-12 md:mt-16 mx-auto max-w-4xl">
        <Image
          src="/images/press-logos.webp"
          alt="The New York Times · The Wall Street Journal · Bloomberg · Barron's · Financial Times · Los Angeles Times · The Guardian · NPR · USA Today · The Oregonian"
          width={1536}
          height={420}
          className="w-full h-auto"
          priority={false}
        />
      </div>
    </div>
  );
}
