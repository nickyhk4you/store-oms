'use client';

import Link from "next/link";
import { getTranslations } from "../utils/translations";
import ComingSoon from "../components/ComingSoon";

export default function ProductsPage() {
  const language = 'zh'; // 从 cookie 或其他服务器端方法获取
  const t = (key: string) => getTranslations(language, key);
  
  const productIcon = (
    <svg className="w-24 h-24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );
  
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('products')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('products.coming.soon')}</p>
        </div>
        
        <ComingSoon 
          title={t('products')}
          description={t('products.page.description')}
          icon={productIcon}
        />
      </main>
    </div>
  );
} 