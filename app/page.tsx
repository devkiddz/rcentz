export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-foreground">
      <section className="rcentz-content flex min-h-screen items-center py-24">
        <div className="max-w-3xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-muted">Rcentz Systems</p>

          <h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            The system is being built from real data outward.
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted md:text-lg">
            A production-focused software platform for services, project management, commerce, content,
            analytics, and the systems Rcentz operates.
          </p>

          <div className="mt-10 inline-flex items-center gap-2 border border-border bg-surface px-3 py-2 font-mono text-xs text-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-foreground" />
            Foundation active
          </div>
        </div>
      </section>
    </main>
  );
}
