import type { Metadata, Viewport } from "next";
import "./globals.css";
import { serif, sans } from "./fonts";
import { site, isPreview } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PreviewBar } from "@/components/PreviewBar";
import { RevealObserver } from "@/components/RevealObserver";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: { default: site.seo.defaultTitle, template: site.seo.titleTemplate },
  description: site.seo.description,
  applicationName: site.brand.name,
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f3f0ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so reveal animations may hide content until it scrolls in. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <JsonLd />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <PreviewBar />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
