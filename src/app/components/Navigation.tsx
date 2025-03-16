'use client';

import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navigation() {
  const { t } = useLanguage();
  
  return (
    <nav className="bg-white dark:bg-neutral-900 border-b border-[#C3A080]/20 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                {/* Coach 标志 */}
                <svg className="h-8 w-auto mr-2" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 95C74.8528 95 95 74.8528 95 50C95 25.1472 74.8528 5 50 5C25.1472 5 5 25.1472 5 50C5 74.8528 25.1472 95 50 95Z" fill="#F5EFE0" stroke="#6B4423" strokeWidth="2"/>
                  <path d="M30 40C30 35.5817 33.5817 32 38 32H62C66.4183 32 70 35.5817 70 40V60C70 64.4183 66.4183 68 62 68H38C33.5817 68 30 64.4183 30 60V40Z" fill="#6B4423"/>
                  <path d="M38 50H62" stroke="#F5EFE0" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M50 38V62" stroke="#F5EFE0" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-xl font-serif font-bold text-[#6B4423] dark:text-[#C3A080]">
                  Coach Store OMS
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-neutral-600 hover:text-[#6B4423] hover:border-[#C3A080] dark:text-neutral-300 dark:hover:text-[#C3A080] dark:hover:border-[#6B4423]"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {t('home')}
              </Link>
              <Link 
                href="/orders" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-[#6B4423] text-sm font-medium text-[#6B4423] dark:border-[#C3A080] dark:text-[#C3A080]"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                {t('orders')}
              </Link>
              <Link 
                href="/products" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-neutral-600 hover:text-[#6B4423] hover:border-[#C3A080] dark:text-neutral-300 dark:hover:text-[#C3A080] dark:hover:border-[#6B4423]"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {t('products')}
              </Link>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-neutral-600 hover:text-[#6B4423] hover:border-[#C3A080] dark:text-neutral-300 dark:hover:text-[#C3A080] dark:hover:border-[#6B4423]"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {t('dashboard')}
              </Link>
              <Link href="/inventory" className={`nav-link ${pathname === '/inventory' ? 'active' : ''}`}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {t('inventory')}
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <div className="ml-4 flex items-center">
              <button className="bg-[#F5EFE0] p-1 rounded-full text-[#6B4423] hover:bg-[#C3A080]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6B4423] dark:bg-[#6B4423]/10 dark:text-[#C3A080]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="ml-3 relative">
                <div>
                  <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6B4423]">
                    <img className="h-8 w-8 rounded-full border-2 border-[#C3A080]" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 移动端导航菜单 */}
      <div className="sm:hidden border-t border-[#C3A080]/20 dark:border-neutral-800">
        <div className="pt-2 pb-3 space-y-1">
          <Link 
            href="/" 
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-neutral-600 hover:text-[#6B4423] hover:bg-[#F5EFE0] hover:border-[#C3A080] dark:text-neutral-300 dark:hover:text-[#C3A080] dark:hover:bg-neutral-800 dark:hover:border-[#6B4423]"
          >
            {t('home')}
          </Link>
          <Link 
            href="/orders" 
            className="block pl-3 pr-4 py-2 border-l-4 border-[#6B4423] bg-[#F5EFE0]/50 text-base font-medium text-[#6B4423] dark:border-[#C3A080] dark:bg-[#6B4423]/10 dark:text-[#C3A080]"
          >
            {t('orders')}
          </Link>
          <Link 
            href="/products" 
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-neutral-600 hover:text-[#6B4423] hover:bg-[#F5EFE0] hover:border-[#C3A080] dark:text-neutral-300 dark:hover:text-[#C3A080] dark:hover:bg-neutral-800 dark:hover:border-[#6B4423]"
          >
            {t('products')}
          </Link>
          <Link 
            href="/dashboard" 
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-neutral-600 hover:text-[#6B4423] hover:bg-[#F5EFE0] hover:border-[#C3A080] dark:text-neutral-300 dark:hover:text-[#C3A080] dark:hover:bg-neutral-800 dark:hover:border-[#6B4423]"
          >
            {t('dashboard')}
          </Link>
        </div>
      </div>
    </nav>
  );
} 