import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Link from "next/link";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="text-xl font-bold">
                      Store OMS
                    </Link>
                  </div>
                  <nav className="ml-6 flex space-x-8">
                    <Link 
                      href="/" 
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-gray-300 dark:hover:border-gray-600"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/orders" 
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-gray-300 dark:hover:border-gray-600"
                    >
                      Orders
                    </Link>
                    <Link 
                      href="/products" 
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-gray-300 dark:hover:border-gray-600"
                    >
                      Products
                    </Link>
                    <Link 
                      href="/customers" 
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-gray-300 dark:hover:border-gray-600"
                    >
                      Customers
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center space-x-4">
                  <LanguageSwitcher />
                  <div className="flex-shrink-0">
                    <span className="relative inline-block">
                      <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                        <span className="sr-only">View notifications</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </button>
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                    </span>
                  </div>
                  <div className="ml-3 relative">
                    <div>
                      <button className="max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full flex items-center text-sm focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300">
                          A
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
