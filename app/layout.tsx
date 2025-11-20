import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AudioPlayer from "@/components/Overalls/Audio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: './BFM Icon Red Shadowed.svg'
  },
  title: "BFM",
  description: "Bold your BRAND, Bold your STORY, with us!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}
