export default function DisclosuresLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[var(--container-prose)] px-6 md:px-10 py-20 md:py-28 prose-editorial">
      {children}
    </div>
  );
}
