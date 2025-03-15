'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function ProductsPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('products')}</h1>
          <p className="text-gray-600 dark:text-gray-300">{t('products.coming.soon')}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
          <svg className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <h2 className="text-2xl font-semibold mb-2">{t('coming.soon')}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {t('products.page.description')}
          </p>
        </div>
      </main>
    </div>
  );
} 