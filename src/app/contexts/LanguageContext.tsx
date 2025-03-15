'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import zhTranslations from '../translations/zh';
import enTranslations from '../translations/en';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// 创建一个类型安全的索引签名
interface Translations {
  [key: string]: string;
}

interface TranslationSet {
  zh: Translations;
  en: Translations;
}

const translations: TranslationSet = {
  zh: zhTranslations,
  en: enTranslations
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh');

  useEffect(() => {
    // 从本地存储中获取语言设置，如果没有则使用默认值
    try {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      // 如果localStorage不可用，使用默认语言
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    try {
      localStorage.setItem('language', newLanguage);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
} 