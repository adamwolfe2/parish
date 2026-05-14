type Row = { env: string; stocks: number; fixed: number };

const rows: Row[] = [
  { env: 'Growth', stocks: 75, fixed: 25 },
  { env: 'Balanced', stocks: 50, fixed: 50 },
  { env: 'Conservative', stocks: 25, fixed: 75 },
  { env: 'Wealth Preservation', stocks: 0, fixed: 100 },
];

/**
 * Horizontal stacked bar visualization of the four-environment allocation
 * framework. Replaces the plain HTML table that the audit flagged as
 * "visually monotonous" — readers can grasp the framework in one second
 * instead of ten.
 */
export function AllocationBars() {
  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2 mb-7 text-[0.78rem] text-[var(--color-slate)]">
        <span className="inline-flex items-center gap-2.5">
          <span className="inline-block w-3.5 h-3.5 bg-[var(--color-moss)]" aria-hidden="true" />
          Stocks &amp; stock funds
        </span>
        <span className="inline-flex items-center gap-2.5">
          <span className="inline-block w-3.5 h-3.5 bg-[var(--color-basalt)]/15 border border-[var(--color-basalt)]/25" aria-hidden="true" />
          Low-risk fixed income
        </span>
      </div>

      {/* Bars */}
      <ul className="space-y-5">
        {rows.map((row) => (
          <li key={row.env}>
            <div className="flex items-baseline justify-between mb-2">
              <p className="font-[family-name:var(--font-display)] text-[1.05rem] md:text-[1.15rem] text-[var(--color-basalt)]">
                {row.env}
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[0.78rem] tabular-nums text-[var(--color-slate)]">
                {row.stocks}% / {row.fixed}%
              </p>
            </div>
            <div
              role="img"
              aria-label={`${row.env}: ${row.stocks} percent stocks, ${row.fixed} percent fixed income`}
              className="flex h-7 w-full overflow-hidden bg-[var(--color-bone)] border border-[var(--color-hairline)]"
            >
              {row.stocks > 0 && (
                <div
                  className="bg-[var(--color-moss)]"
                  style={{ width: `${row.stocks}%` }}
                />
              )}
              {row.fixed > 0 && (
                <div
                  className="bg-[var(--color-basalt)]/15"
                  style={{ width: `${row.fixed}%` }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
