export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span className="size-2 animate-ping rounded-full bg-accent-500" aria-hidden="true" />
        Loading…
      </div>
    </div>
  );
}
