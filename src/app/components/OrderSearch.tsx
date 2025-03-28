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
  storeId: string;
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
    channel: '',
    storeId: ''
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
      channel: '',
      storeId: ''
    });
    onSearch({
      orderId: '',
      customerName: '',
      startDate: '',
      endDate: '',
      status: '',
      channel: '',
      storeId: ''
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

  const stores = [
    { id: 'store-001', name: language === 'zh' ? '北京中关村店' : 'Beijing Zhongguancun Store' },
    { id: 'store-002', name: language === 'zh' ? '上海南京路店' : 'Shanghai Nanjing Road Store' },
    { id: 'store-003', name: language === 'zh' ? '广州天河城店' : 'Guangzhou Tianhe Store' },
    { id: 'store-004', name: language === 'zh' ? '深圳华强北店' : 'Shenzhen Huaqiangbei Store' },
    { id: 'store-005', name: language === 'zh' ? '成都春熙路店' : 'Chengdu Chunxi Road Store' },
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

              <div>
                <label htmlFor="storeId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('store')}
                </label>
                <select
                  id="storeId"
                  name="storeId"
                  value={filters.storeId}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700"
                >
                  <option value="">{t('all.stores')}</option>
                  {stores.map(store => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                {t('reset')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                {t('search')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 