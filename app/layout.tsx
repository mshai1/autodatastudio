import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import { Analytics } from "@vercel/analytics/next";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "AutoData Studio",
  description: "Explore and export vehicle models by make & year",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <Analytics />
      </body>
    </html>
  );
}
