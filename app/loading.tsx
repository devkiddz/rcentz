export default function Loading() {
  return (
    <div className="flex min-h-[55vh] items-center justify-center">
      <div className="flex flex-col items-center">
        <span className="relative flex size-8 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full border border-foreground/15" />
          <span className="size-2 rounded-full bg-foreground" />
        </span>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Loading Rcentz</p>
      </div>
    </div>
  );
}
