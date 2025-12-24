import type { Metadata } from "next";
import { Outfit, Righteous } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-righteous",
});

export const metadata: Metadata = {
  title: "IMAGINO - AI Image Generator",
  description: "Create stunning AI-generated images with IMAGINO",
  openGraph: {
    title: "IMAGINO - AI Image Generator",
    description: "Create stunning AI-generated images with IMAGINO",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IMAGINO - AI Image Generator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IMAGINO - AI Image Generator",
    description: "Create stunning AI-generated images with IMAGINO",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className={`${outfit.className} ${righteous.variable} bg-background-dark text-white overflow-x-hidden min-h-screen relative`}>
        {children}
      </body>
    </html>
  );
}
