import Link from "next/link";
import clsx from "clsx";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5"
      aria-label="Search N Play — home"
    >
      <span
        className={clsx(
          "relative flex size-8 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold",
          inverted ? "bg-paper text-ink" : "bg-ink text-paper"
        )}
      >
        S
        <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-accent-500 ring-2 ring-paper" />
      </span>
      <span
        className={clsx(
          "font-display text-[15px] font-semibold tracking-tight",
          inverted ? "text-paper" : "text-ink"
        )}
      >
        Search N Play
      </span>
    </Link>
  );
}
