import clsx from "clsx";

/**
 * The two-tone ambient glow (cobalt top-left, warm amber top-right) used on
 * the hero, extracted so every page can share the exact same treatment
 * instead of each one hand-rolling its own gradient. Render as the first
 * child of a `relative overflow-hidden` wrapper; a fixed height (rather than
 * `inset-0`) keeps the effect looking the same near the top of a page
 * regardless of how much content follows below it.
 */
export function PageGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={clsx("pointer-events-none absolute inset-x-0 top-0 h-[560px]", className)}
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 0%, rgba(51,85,255,0.24), transparent 45%), radial-gradient(circle at 100% 0%, rgba(245,165,36,0.12), transparent 40%)",
      }}
    />
  );
}
