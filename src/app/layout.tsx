import type { Metadata } from "next";
import { Noto_Serif_Bengali, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const notoBengali = Noto_Serif_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Chapter of Wishes | Celebrating Memories",
  description: "A space dedicated to beautiful wishes, shared memories, and timeless moments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoBengali.variable} ${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#12110E] text-[#F3E7CC] selection:bg-[#3A2A1D] selection:text-[#F3E7CC]">
        {children}
      </body>
    </html>
  );
}

