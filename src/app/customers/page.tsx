'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function CustomersPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('customers')}</h1>
          <p className="text-gray-600 dark:text-gray-300">{t('customers.coming.soon')}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
          <svg className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <h2 className="text-2xl font-semibold mb-2">{t('coming.soon')}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {t('customers.page.description')}
          </p>
        </div>
      </main>
    </div>
  );
} 