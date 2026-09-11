import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://indn-website.vercel.app";
const siteDescription =
  "The Indigenous Nations Diversity Network (INDN) provides year-round Indigenous cultural programming in San Benito County, supporting Native youth, families, and elders through cultural preservation, community gatherings, and youth empowerment.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Indigenous Nations Diversity Network",
    template: "%s | Indigenous Nations Diversity Network",
  },
  description: siteDescription,
  keywords: [
    "Indigenous Nations Diversity Network",
    "INDN",
    "Indigenous",
    "Native American",
    "San Benito County",
    "Hollister Powwow",
    "cultural preservation",
    "youth empowerment",
    "nonprofit",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Indigenous Nations Diversity Network",
    title: "Indigenous Nations Diversity Network",
    description: siteDescription,
    images: [
      {
        url: "/images/logo/indn-full-logo.jpg",
        width: 1280,
        height: 1024,
        alt: "Indigenous Nations Diversity Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indigenous Nations Diversity Network",
    description: siteDescription,
    images: ["/images/logo/indn-full-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} ${cinzel.variable} font-sans antialiased`}
      >
        <Header />
        <main className="pt-20 lg:pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
