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

export const metadata: Metadata = {
  title: "GA Design Studio · Architects",
  description: "Architecture and construction across Dhule, Nashik, Mumbai and Pune. Creativity, Values and Freedom.",
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
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
