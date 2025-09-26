import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UM Arendus",
  description:
    "Loome AI-toega kaasaegseid veebilehti, mis aitavad sul jõuda klientideni soodsama hinnaga.",
  manifest: "/manifest.json", // siit läheb su manifest
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon1.png", type: "image/png", sizes: "192x192" },
      { url: "/apple-icon.png", type: "image/png", rel: "apple-touch-icon" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
  },
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="et">
      <head>
        <link rel="preload" as="image" href="/section1-bg.webp" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
