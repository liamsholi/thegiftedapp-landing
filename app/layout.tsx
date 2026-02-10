import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gifted-app.vercel.app"),
  title: "Gifted - Find the Perfect Gift",
  description: "Discover amazing gift ideas with a swipe. Save favorites to wishlists, share with friends, and never give a boring gift again.",
  keywords: ["gift ideas", "gift finder", "wishlist", "presents", "birthday gifts", "christmas gifts"],
  authors: [{ name: "Gifted" }],
  openGraph: {
    title: "Gifted - Find the Perfect Gift",
    description: "Discover amazing gift ideas with a swipe. Save favorites to wishlists, share with friends.",
    type: "website",
    siteName: "Gifted",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gifted - Find the Perfect Gift",
    description: "Discover amazing gift ideas with a swipe.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
