export function HomeCTA() {
  return (
    <section className="rcentz-section border-t border-border py-24">
      <div className="max-w-2xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Build with Rcentz</p>

        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Have a system in mind?</h2>

        <p className="mt-4 text-sm leading-6 text-muted">
          Start with the problem, workflow or idea. We can architect the rest.
        </p>

        <button
          type="button"
          className="mt-7 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground cursor-pointer">
          Start a project
        </button>
      </div>
    </section>
  );
}
