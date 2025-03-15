'use client';

import Link from "next/link";
import { useLanguage } from "./contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('oms.title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('oms.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{t('order.management')}</h2>
            <p className="mb-4">{t('order.management.desc')}</p>
            <Link 
              href="/orders" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              {t('view.orders')}
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{t('dashboard')}</h2>
            <p className="mb-4">{t('dashboard.desc')}</p>
            <Link 
              href="/dashboard" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              {t('view.dashboard')}
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{t('quick.stats')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('pending.orders')}</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('completed.today')}</p>
              <p className="text-2xl font-bold">18</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('total.revenue')}</p>
              <p className="text-2xl font-bold">{t('language') === 'zh' ? '¥42,850' : '$6,285'}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('avg.processing.time')}</p>
              <p className="text-2xl font-bold">1.8 {t('days')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
