'use client';

import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

export default function Navigation() {
  const { t } = useLanguage();
  
  return (
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
          {t('home')}
        </Link>
        <Link 
          href="/dashboard" 
          className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-gray-300 dark:hover:border-gray-600"
        >
          {t('dashboard')}
        </Link>
        <Link 
          href="/orders" 
          className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-gray-300 dark:hover:border-gray-600"
        >
          {t('orders')}
        </Link>
        <Link 
          href="/products" 
          className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-gray-300 dark:hover:border-gray-600"
        >
          {t('products')}
        </Link>
        <Link 
          href="/customers" 
          className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-gray-300 dark:hover:border-gray-600"
        >
          {t('customers')}
        </Link>
      </nav>
    </div>
  );
} 