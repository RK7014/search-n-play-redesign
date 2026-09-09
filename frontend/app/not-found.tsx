import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-ink">
      <Container className="text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent-400">
          404
        </p>
        <h1 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-slate-400">
          The page you&apos;re looking for may have moved. Try one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
          <ButtonLink href="/work" variant="outline">
            See our work
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
