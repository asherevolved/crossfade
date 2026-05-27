import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import ScrollFader from "@/components/ScrollFader";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import VideoIntro from "@/components/VideoIntro";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Crossfade DJing Academy — Mysuru | Learn DJing 1:1",
  description:
    "Crossfade is a DJing academy based in Mysuru. Founded by Hemanth Rakki. 1:1 sessions, industry-level tech, real gig opportunities. You're either a DJ or you're not.",
  keywords: ["DJ academy Mysuru", "learn DJing Mysuru", "Crossfade", "Hemanth Rakki", "DJ classes Karnataka", "CDJ training", "beatmatching"],
  openGraph: {
    title: "Crossfade DJing Academy — Mysuru",
    description: "1:1 DJ training in Mysuru. Industry gear. Real gigs. No levels — only DJs.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} ${mono.variable} scroll-smooth`}>
      <body className="antialiased bg-black text-white font-sans">
        <div className="noise-overlay" aria-hidden />
        <ScrollFader />
        <WhatsAppFloat />
        <VideoIntro>
          {children}
        </VideoIntro>
      </body>
    </html>
  );
}
