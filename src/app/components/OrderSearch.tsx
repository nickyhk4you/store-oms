'use client';

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface OrderSearchProps {
  onSearch: (filters: OrderFilters) => void;
}

export interface OrderFilters {
  orderId: string;
  customerName: string;
  startDate: string;
  endDate: string;
  status: string;
  channel: string;
}

export default function OrderSearch({ onSearch }: OrderSearchProps) {
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<OrderFilters>({
    orderId: '',
    customerName: '',
    startDate: '',
    endDate: '',
    status: '',
    channel: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      orderId: '',
      customerName: '',
      startDate: '',
      endDate: '',
      status: '',
      channel: ''
    });
    onSearch({
      orderId: '',
      customerName: '',
      startDate: '',
      endDate: '',
      status: '',
      channel: ''
    });
  };

  const statuses = language === 'zh'
    ? [
        { value: '', label: t('all.statuses') },
        { value: '已完成', label: '已完成' },
        { value: '处理中', label: '处理中' },
        { value: '待处理', label: '待处理' },
        { value: '已发货', label: '已发货' }
      ]
    : [
        { value: '', label: t('all.statuses') },
        { value: 'Completed', label: 'Completed' },
        { value: 'Processing', label: 'Processing' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Shipped', label: 'Shipped' }
      ];

  const channels = language === 'zh'
    ? [
        { value: '', label: t('channel.all') },
        { value: '小红书', label: '小红书' },
        { value: '京东', label: '京东' },
        { value: '淘宝', label: '淘宝' },
        { value: '抖音', label: '抖音' },
        { value: '微信小程序', label: '微信小程序' },
        { value: '线下门店', label: '线下门店' },
        { value: '其他', label: '其他' }
      ]
    : [
        { value: '', label: t('channel.all') },
        { value: 'Xiaohongshu', label: 'Xiaohongshu' },
        { value: 'JD.com', label: 'JD.com' },
        { value: 'Taobao', label: 'Taobao' },
        { value: 'Douyin', label: 'Douyin' },
        { value: 'WeChat Mini Program', label: 'WeChat Mini Program' },
        { value: 'Offline Store', label: 'Offline Store' },
        { value: 'Other', label: 'Other' }
      ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{t('search.orders')}</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {isExpanded ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('order.id')}
                </label>
                <input
                  type="text"
                  name="orderId"
                  value={filters.orderId}
                  onChange={handleChange}
                  placeholder={t('search.by.order.id')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('customer.name')}
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={filters.customerName}
                  onChange={handleChange}
                  placeholder={t('search.by.customer')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('status')}
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  {statuses.map((status, index) => (
                    <option key={index} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('channel')}
                </label>
                <select
                  name="channel"
                  value={filters.channel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  {channels.map((channel, index) => (
                    <option key={index} value={channel.value}>
                      {channel.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('start.date')}
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('end.date')}
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-medium"
              >
                {t('reset')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
              >
                {t('search')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 