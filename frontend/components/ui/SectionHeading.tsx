import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "light" (default, matches the site's dark theme) = paper text for an ink background; "dark" = ink text for a rare paper-background section. */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <span
          className={clsx(
            "mb-3 inline-block text-xs font-semibold uppercase tracking-[0.14em]",
            tone === "dark" ? "text-accent-600" : "text-accent-400"
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={clsx(
          "text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl",
          tone === "dark" ? "text-ink" : "text-paper"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={clsx(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-slate-600" : "text-slate-300"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
