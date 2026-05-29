import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_NAME, CITY } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — выкуп iPhone в ${CITY}`,
  description:
    "Выкуп iPhone и техники Apple в Чите. Оценка за 5 минут, выезд за 30 минут, оплата сразу. iPhone 12–16, любое состояние.",
  keywords: [
    "выкуп iPhone Чита",
    "продать iPhone Чита",
    "сдать iPhone Забайкалье",
    "Apple выкуп",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
