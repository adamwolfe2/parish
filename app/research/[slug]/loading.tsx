export default function PostLoading() {
  return (
    <>
      <header className="border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-16 md:py-20">
          <div className="h-3 w-40 bg-[var(--color-mist)] animate-pulse" />
          <div className="mt-7 h-10 w-full max-w-[700px] bg-[var(--color-mist)] animate-pulse" />
          <div className="mt-3 h-10 w-3/4 max-w-[600px] bg-[var(--color-mist)] animate-pulse" />
          <div className="mt-8 pt-6 border-t border-[var(--color-hairline)] h-4 w-72 bg-[var(--color-mist)]/70 animate-pulse" />
        </div>
      </header>

      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-14 md:py-20">
          <div className="max-w-[700px] mx-auto space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-[var(--color-mist)]/70 animate-pulse"
                style={{ width: `${75 + ((i * 13) % 25)}%` }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
