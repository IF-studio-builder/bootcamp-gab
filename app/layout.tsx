import type { Metadata } from "next";
import localFont from "next/font/local";
import { Capriola } from "next/font/google";
import "./globals.css";

const modeVF = localFont({
  src: "../public/fonts/Mode_VF_Thin_Condensed.otf",
  variable: "--font-mode",
  display: "swap",
});

const capriola = Capriola({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-capriola",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GAB | Gen AI Builders",
    template: "%s | GAB",
  },
  description:
    "La communaute francaise pour les professionnels qui construisent avec l'IA generative. Deviens un Builder augmente.",
  keywords: [
    "GenAI",
    "IA generative",
    "Claude",
    "programmation IA",
    "builder",
    "developpeur augmente",
  ],
  authors: [{ name: "GAB - Gen AI Builders" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "GAB | Gen AI Builders",
    title: "GAB | Gen AI Builders",
    description:
      "La communaute francaise pour les professionnels qui construisent avec l'IA generative.",
    images: [
      {
        url: "/assets/logos/GAB Logo full white.png",
        width: 1200,
        height: 630,
        alt: "GAB - Gen AI Builders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GAB | Gen AI Builders",
    description:
      "La communaute francaise pour les professionnels qui construisent avec l'IA generative.",
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
    <html lang="fr" className="dark">
      <body
        className={`${modeVF.variable} ${capriola.variable} min-h-screen bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
