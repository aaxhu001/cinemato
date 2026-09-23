import type { Metadata } from "next";
import "./globals.css";
import { MarketplaceProvider } from "@/context/MarketplaceContext";

export const metadata: Metadata = {
  title: "Cinemato — Cinema Advertising Marketplace",
  description: "Programmatic cinema advertising exchange connecting Cinema Hall Owners with Brand Advertisers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-cinema-midnight text-slate-100 antialiased selection:bg-cinema-gold selection:text-cinema-midnight font-sans">
        <MarketplaceProvider>
          {children}
        </MarketplaceProvider>
      </body>
    </html>
  );
}
