import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "700"],
  variable: "--font-plex",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matheus Fernandes | Executive Traction",
  description: "Portfólio Digital de Matheus Fernandes",
};

import ConstructionPopup from "@/components/ui/ConstructionPopup";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${ibmPlexSans.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground bg-texture-noise">
        {/* SVG Noise Filter */}
        <svg
          className="pointer-events-none fixed isolate z-50 opacity-10 mix-blend-soft-light w-full h-full"
          width="100%"
          height="100%"
        >
          <filter id="pedestal">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.80"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#pedestal)"></rect>
        </svg>

        <NextIntlClientProvider messages={messages}>
          <ConstructionPopup />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
