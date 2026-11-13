import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import { organizationGraphJsonLd } from "@/lib/seo";
import { AnalyticsListener } from "@/components/analytics/analytics-listener";
import { ConsentAnalytics } from "@/components/analytics/consent-analytics";
import { CookieBanner } from "@/components/consent/cookie-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "VTR Import C.A. | Repuestos, cauchos y accesorios para motos al mayor",
    template: "%s | VTR Import C.A.",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "business",
  keywords: [
    "repuestos para motos al mayor",
    "cauchos para motos Venezuela",
    "cascos para motos al mayor",
    "accesorios para motos",
    "baterías para motos",
    "distribuidor mayorista motos",
  ],
  alternates: { canonical: "/" },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: "/",
    siteName: siteConfig.name,
    title:
      "VTR Import C.A. | Repuestos, cauchos y accesorios para motos al mayor",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "VTR Import C.A. | Repuestos, cauchos y accesorios para motos al mayor",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0B",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.language}
      className={`${inter.variable} ${barlow.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only z-[100] bg-vtr-amber px-4 py-3 font-bold text-vtr-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido principal
        </a>
        <JsonLd data={organizationGraphJsonLd()} />
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <CookieBanner />
        <AnalyticsListener />
        <ConsentAnalytics />
        <ScrollReveal />
      </body>
    </html>
  );
}
