import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { siteUrl } from "@/lib/env";
import { themeInitScript } from "@/lib/theme";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const SITE_DESCRIPTION =
  "Search N Play is a digital product engineering and growth partner — SaaS platforms, web and mobile applications, AI integrations, and the growth work that turns a launch into a business result.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "product engineering",
    "SaaS development",
    "web application development",
    "mobile app development",
    "UI UX design",
    "AI integration",
    "digital marketing agency",
    "Go backend development",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0c10",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: siteUrl(),
  description: SITE_DESCRIPTION,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: siteUrl(),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        {/* Runs before hydration so the correct theme applies from the very
            first paint — without it, the page would flash the default
            theme before React mounts and reads the stored preference. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-paper"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
