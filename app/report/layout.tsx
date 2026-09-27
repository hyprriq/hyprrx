import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./report.css";
import { FunnelProvider } from "./ui";

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
  title: { absolute: "Check your wholesale supplier before you pay — $79 report in 24h | Hyprr X" },
  description:
    "A full researched report on your Amazon wholesale supplier and its brands in 24 hours: supplier identity, authorized-distributor claims, brand reseller posture, invoice review. One-time $79. No account, no subscription.",
  openGraph: {
    title: "Before you wire that PO, know who you're wiring it to.",
    description: "Full supplier intelligence report in 24 hours — $79, one-time.",
    url: "https://report.hyprrx.com",
    siteName: "Hyprr X",
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
      <FunnelProvider>{children}</FunnelProvider>
    </div>
  );
}
