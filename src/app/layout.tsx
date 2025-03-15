import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import LanguageSwitcher from "./components/LanguageSwitcher";
import TopNavigation from './components/TopNavigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Order Management System",
  description: "A comprehensive system for managing orders and inventory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <LanguageProvider>
          <TopNavigation />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
