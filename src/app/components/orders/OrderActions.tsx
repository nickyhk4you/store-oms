'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import Link from 'next/link';

interface OrderActionsProps {
  orderId: string;
  onSplit: () => void;
  onMerge: () => void;
}

export default function OrderActions({ orderId, onSplit, onMerge }: OrderActionsProps) {
  const { t } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <div className="flex space-x-2">
        <Link 
          href={`/orders/${orderId}`} 
          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
        >
          {t('view')}
        </Link>
        
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
      
      {showDropdown && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
          onBlur={() => setShowDropdown(false)}
        >
          <div className="py-1">
            <button
              onClick={() => {
                onSplit();
                setShowDropdown(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {t('split.order')}
            </button>
            <button
              onClick={() => {
                onMerge();
                setShowDropdown(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {t('merge.with.other.orders')}
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {t('edit')}
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {t('cancel.order')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 