import { CalendarClock } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";

export function DiscoveryCallButton({ schedulingUrl }: { schedulingUrl?: string }) {
  if (schedulingUrl) {
    return (
      <ButtonLink
        href={schedulingUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="outline"
        size="lg"
        className="w-full justify-center"
      >
        <CalendarClock className="size-4" aria-hidden="true" />
        Book a Discovery Call
      </ButtonLink>
    );
  }

  return (
    <div>
      <ButtonLink href="#contact-form" variant="outline" size="lg" className="w-full justify-center">
        <CalendarClock className="size-4" aria-hidden="true" />
        Book a Discovery Call
      </ButtonLink>
      <p className="mt-2 text-xs text-slate-500">
        Scheduling isn&apos;t connected in this demo — use the form and we&apos;ll follow up to
        find a time.
      </p>
    </div>
  );
}
