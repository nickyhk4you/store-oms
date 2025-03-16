'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (newLanguage: 'zh' | 'en') => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center items-center px-3 py-2 border border-[#C3A080]/30 rounded-md shadow-sm text-sm font-medium text-[#6B4423] dark:text-[#C3A080] bg-white dark:bg-neutral-800 hover:bg-[#F5EFE0] dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6B4423]"
        onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        {language === 'en' ? '中文' : 'English'}
      </button>
    </div>
  );
} 