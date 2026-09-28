import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./report.css";
import { FunnelProvider } from "./ui";
import MetaPixel from "./MetaPixel";

const schibsted = localFont({
  src: "./fonts/SchibstedGrotesk-Variable.woff2",
  variable: "--font-schibsted",
  weight: "400 900",
  display: "swap",
});
const publicSans = localFont({
  src: "./fonts/PublicSans-Variable.woff2",
  variable: "--font-public",
  weight: "100 900",
  display: "swap",
});
const plex = localFont({
  src: "./fonts/IBMPlexMono-500.woff2",
  variable: "--font-plex",
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://report.hyprrx.com"),
  title: { absolute: "Real supplier. Real invoice. Account still suspended. — HyprrIQ Supplier Report, $79" },
  description:
    "A real business isn't the same as an authorised source. Send us one supplier; within 10 hours you get a researched report on whether it can back up what it's selling you. $79, one-time. No account, no subscription.",
  openGraph: {
    title: "Real supplier. Real invoice. Account still suspended.",
    description: "HyprrIQ Supplier Report — one supplier, up to 5 brands, in your inbox within 10 hours. $79, one-time.",
    url: "https://report.hyprrx.com",
    siteName: "HyprrIQ",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B1B33",
  width: "device-width",
  initialScale: 1,
};

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`rp ${schibsted.variable} ${publicSans.variable} ${plex.variable}`}>
      <MetaPixel />
      <FunnelProvider>{children}</FunnelProvider>
    </div>
  );
}
