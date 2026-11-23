import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

const display = localFont({
  src: [
    { path: "./fonts/Cormorant.woff2", style: "normal", weight: "300 700" },
    { path: "./fonts/Cormorant-Italic.woff2", style: "italic", weight: "300 700" },
  ],
  variable: "--f-display",
  display: "swap",
});

const mono = localFont({
  src: [
    { path: "./fonts/PlexMono.woff2", style: "normal", weight: "400" },
    { path: "./fonts/PlexMono-Medium.woff2", style: "normal", weight: "500" },
  ],
  variable: "--f-mono",
  display: "swap",
});

const sans = localFont({
  src: [{ path: "./fonts/PlexSans.woff2", style: "normal", weight: "100 700" }],
  variable: "--f-sans",
  display: "swap",
});

const deva = localFont({
  src: [
    { path: "./fonts/TiroMarathi.woff2", style: "normal", weight: "400" },
    { path: "./fonts/TiroMarathi-Italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--f-deva",
  display: "swap",
});

const SITE = "https://ankushpatil45.github.io/ga-design-studio/";
const DESC = "GA Design Studio designs and builds homes, schools and buildings across Dhule, Nashik, Mumbai and Pune. Architecture by Farzeb Shaikh, construction by Shoaib Shaikh.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "GA Design Studio · Architects in Dhule, Nashik, Mumbai and Pune",
  description: DESC,
  keywords: ["architect Dhule", "architect Nashik", "architect Pune", "architect Mumbai", "house design Maharashtra", "school architect", "GA Design Studio", "Farzeb Shaikh"],
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "GA Design Studio",
    title: "GA Design Studio · Every great building begins as a line",
    description: DESC,
    images: [{ url: "og.jpg", width: 1200, height: 630, alt: "GA Design Studio" }],
    locale: "en_IN",
    alternateLocale: ["mr_IN"],
  },
  twitter: { card: "summary_large_image", title: "GA Design Studio", description: DESC, images: ["og.jpg"] },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  additionalType: "https://schema.org/Architect",
  name: "GA Design Studio",
  slogan: "Creativity, Values and Freedom",
  url: SITE,
  image: `${SITE}og.jpg`,
  logo: `${SITE}brand/nav-mark.svg`,
  address: { "@type": "PostalAddress", streetAddress: "Jai Hind Colony, Deopur", addressLocality: "Dhule", addressRegion: "Maharashtra", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 20.9042, longitude: 74.7749 },
  areaServed: ["Dhule", "Nashik", "Mumbai", "Pune"].map((name) => ({ "@type": "City", name })),
  founder: [{ "@type": "Person", name: "Farzeb Shaikh", jobTitle: "Principal Architect" }],
  employee: [{ "@type": "Person", name: "Shoaib Shaikh", jobTitle: "Civil Engineer" }],
  knowsLanguage: ["en", "mr"],
  sameAs: ["https://www.instagram.com/farzebshaikh/"],
};

export const viewport: Viewport = {
  themeColor: "#0F2A22",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-lang="en" className={`${display.variable} ${mono.variable} ${sans.variable} ${deva.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
