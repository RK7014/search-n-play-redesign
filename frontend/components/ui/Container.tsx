import type { ElementType, ReactNode } from "react";
import clsx from "clsx";

export function Container({
  children,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  // "relative" gives Container's content its own stacking context, so it
  // reliably paints above a page's decorative background layer (e.g.
  // PageGlow) regardless of DOM order, without every call site needing to
  // remember to add it.
  return <Component className={clsx("container-page relative", className)}>{children}</Component>;
}
