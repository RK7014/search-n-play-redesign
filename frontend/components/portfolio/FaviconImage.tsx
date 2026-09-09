"use client";

/** Renders a live favicon and hides itself if the request fails — isolated as
 * a Client Component because the onError handler can't be passed as a prop
 * from a Server Component. */
export function FaviconImage({ url, alt = "" }: { url: string; alt?: string }) {
  const domain = new URL(url).hostname;
  const src = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={16}
      height={16}
      loading="lazy"
      className="size-4 shrink-0 rounded-sm bg-[var(--surface-5)]"
      onError={(event) => {
        event.currentTarget.style.display = "none";
      }}
    />
  );
}
