import Link from "next/link";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

// The site is dark-themed throughout, so "primary" is a light button that
// pops against the ink background (the accent color is reserved for the
// single most important action per view, via "secondary").
const variants: Record<Variant, string> = {
  primary: "bg-paper text-ink hover:bg-slate-100",
  secondary: "bg-accent-500 text-white hover:bg-accent-600",
  outline: "border border-[var(--border-2)] text-paper hover:border-[var(--border-5)]",
  ghost: "text-paper hover:bg-[var(--surface-3)]",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-3",
  lg: "text-base px-6 py-3.5",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  loading,
  ...rest
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link href={href} className={clsx(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}
