export default function ResearchLoading() {
  return (
    <>
      <header className="border-b border-[var(--color-hairline)] bg-[var(--color-bone)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-20 md:py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="inline-block h-4 w-24 bg-[var(--color-mist)] animate-pulse" />
            <div className="mt-6 mx-auto h-12 w-3/4 bg-[var(--color-mist)] animate-pulse" />
            <div className="mt-7 mx-auto h-5 w-2/3 bg-[var(--color-mist)]/70 animate-pulse" />
            <div className="mt-2 mx-auto h-5 w-1/2 bg-[var(--color-mist)]/70 animate-pulse" />
          </div>
        </div>
      </header>

      <section className="bg-[var(--color-bone)] border-b border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-5 flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-7 w-24 bg-[var(--color-mist)] animate-pulse" />
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[var(--container-editorial)] px-6 md:px-10 py-12">
          <ul className="border-y border-[var(--color-hairline)]">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="py-7 border-b border-[var(--color-hairline)]">
                <div className="h-3 w-32 bg-[var(--color-mist)] animate-pulse" />
                <div className="mt-3 h-6 w-3/4 bg-[var(--color-mist)] animate-pulse" />
                <div className="mt-2 h-4 w-1/2 bg-[var(--color-mist)]/70 animate-pulse" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
