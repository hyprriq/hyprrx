import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hyprrx.com"),
  title: {
    default: "HyprrX — Decision intelligence for e-commerce sellers",
    template: "%s — HyprrX",
  },
  description:
    "HyprrX is an AI research lab building decision intelligence for e-commerce sellers. Most tools show every seller the same data. We build tools that reason about your specific business and give you the answer that applies to you.",
  openGraph: {
    title: "HyprrX — Decision intelligence for e-commerce sellers",
    description:
      "Most tools show every seller the same data. We build AI tools that reason about your specific business and give you the answer that applies to you.",
    url: "https://hyprrx.com",
    siteName: "HyprrX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
