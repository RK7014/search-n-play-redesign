import Link from "next/link";
import { MapPin, Mail } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { FOOTER_EMAIL, FOOTER_LINKS, FOOTER_LOCATION } from "@/lib/constants";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-paper">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-paper">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-1)] bg-ink text-paper">
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Logo inverted />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              A digital product engineering and growth partner — SaaS, web, mobile, AI, and the
              growth work that turns a launch into a business result.
            </p>
            <dl className="mt-6 space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-slate-500" aria-hidden="true" />
                <dd>{FOOTER_LOCATION}</dd>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-slate-500" aria-hidden="true" />
                <dd>{FOOTER_EMAIL}</dd>
              </div>
            </dl>
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-paper">Get occasional updates</h3>
              <p className="mt-2 text-sm text-slate-400">
                Notes on product engineering and delivery. No spam, unsubscribe anytime.
              </p>
              <div className="mt-4">
                <NewsletterForm />
              </div>
            </div>
          </div>

          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn title="Services" links={FOOTER_LINKS.services} />
          <FooterColumn title="Resources" links={FOOTER_LINKS.resources} />
          <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--border-1)] pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Search N Play — independent demo concept. All rights reserved.</p>
          <p className="max-w-xl sm:text-right">
            Independent interview/demo redesign concept inspired by publicly available information
            about Search N Play. Not the official Search N Play website.
          </p>
        </div>
      </Container>
    </footer>
  );
}
