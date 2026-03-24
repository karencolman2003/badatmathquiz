import type { Metadata } from "next";
import { IBM_Plex_Mono, IM_Fell_English } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const imFellEnglish = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Bad at Math Quiz",
  description: "A trick-question quiz about overconfidence, assumptions, and reasoning mistakes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.variable} ${imFellEnglish.variable}`}>{children}</body>
    </html>
  );
}
