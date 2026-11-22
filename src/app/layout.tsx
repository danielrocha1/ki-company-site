import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { getMainNav } from "@/content/navigation";
import { site } from "@/content/site";
import { ogImageUrl, organizationJsonLd } from "@/lib/seo";

import "@fontsource-variable/montserrat";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Engenharia de software, integração e automação`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    images: [{ url: ogImageUrl(site.tagline), width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0A1020",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={GeistMono.variable}>
      <body className="min-h-dvh">
        <MotionProvider>
          <Header nav={getMainNav()} />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
