import { Kicker } from './Kicker';

const publications = [
  'The New York Times',
  'The Wall Street Journal',
  'Bloomberg',
  "Barron's",
  'Financial Times',
  'Los Angeles Times',
  'The Guardian',
  'NPR',
  'USA Today',
  'Fortune',
  'The Oregonian',
  'Willamette Week',
];

export function PressMarks() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-[var(--color-hairline)]" />
        <Kicker as="span">Original research featured in</Kicker>
        <span className="h-px flex-1 bg-[var(--color-hairline)]" />
      </div>
      <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-7">
        {publications.map((p) => (
          <li
            key={p}
            className="font-[family-name:var(--font-display)] text-[0.95rem] md:text-[1rem] text-[var(--color-basalt)]/85 leading-tight tracking-tight text-center md:text-left"
          >
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
