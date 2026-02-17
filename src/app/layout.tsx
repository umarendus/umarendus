import "./globals.css";
import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import LanguageSync from "@/components/LanguageSync";

export const metadata: Metadata = {
  title: "UM Arendus",
  description:
    "Loome AI-toega kaasaegseid veebilehti, mis aitavad sul jõuda klientideni soodsama hinnaga.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon1.png", type: "image/png", sizes: "192x192" },
      { url: "/apple-icon.png", type: "image/png", rel: "apple-touch-icon" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="et">
      <head>
        <link rel="preload" as="image" href="/Hero BG.webp" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/icon1.png" sizes="192x192" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="/apple-icon.png"
          sizes="180x180"
        />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <LanguageSync />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
