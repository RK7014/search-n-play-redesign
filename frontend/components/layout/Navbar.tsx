"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer whenever the route actually changes. Adjusting
  // state during render (rather than in an effect) avoids an extra
  // render pass — React re-renders immediately when it sees a state update
  // like this before committing, so no stale-open frame is ever painted.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-1)] bg-ink/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Logo inverted />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm font-medium text-slate-400 transition-colors hover:text-paper",
                pathname === link.href && "text-paper"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <ButtonLink href="/contact" size="sm">
            Start a Project
          </ButtonLink>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-paper"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={clsx(
          "overflow-hidden border-t border-[var(--border-1)] bg-ink transition-[max-height] duration-300 ease-out lg:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0"
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-3 text-base font-medium text-paper hover:bg-[var(--surface-3)]"
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink href="/contact" className="mt-2 justify-center">
            Start a Project
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
