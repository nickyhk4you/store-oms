'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ProductFilters } from '../products/page';

interface ProductSearchProps {
  onSearch: (filters: ProductFilters) => void;
  initialFilters?: ProductFilters;
  totalResults?: number;
}

export default function ProductSearch({ onSearch, initialFilters, totalResults = 0 }: ProductSearchProps) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters || {
    productId: '',
    productName: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    status: ''
  });

  // 当初始筛选条件变化时更新本地状态
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

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
    // 保持筛选面板展开，以便用户可以进一步调整筛选条件
  };

  const handleReset = () => {
    const emptyFilters = {
      productId: '',
      productName: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      status: ''
    };
    setFilters(emptyFilters);
    onSearch(emptyFilters);
  };

  // 检查是否有任何筛选条件被应用
  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  // Coach 产品分类选项
  const categories = [
    { value: '', label: t('category.all') },
    { value: '手提包', label: t('category.handbag') || '手提包' },
    { value: '托特包', label: t('category.tote') || '托特包' },
    { value: '单肩包', label: t('category.shoulder') || '单肩包' },
    { value: '斜挎包', label: t('category.crossbody') || '斜挎包' },
    { value: '钱包', label: t('category.wallet') || '钱包' },
    { value: '鞋履', label: t('category.footwear') || '鞋履' },
    { value: '配饰', label: t('category.accessories') || '配饰' }
  ];

  // 产品状态选项
  const statuses = [
    { value: '', label: t('status.all') },
    { value: '在售', label: t('status.active') || '在售' },
    { value: '缺货', label: t('status.outofstock') || '缺货' },
    { value: '预售', label: t('status.preorder') || '预售' },
    { value: '停产', label: t('status.discontinued') || '停产' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
          <h2 className="text-lg font-medium">
            {t('filter.products') || '筛选产品'}
            {hasActiveFilters && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                {t('filters.active') || '筛选已应用'}
              </span>
            )}
          </h2>
          {totalResults > 0 && (
            <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
              {totalResults} {t('results.found') || '个结果'}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
        >
          {isExpanded ? (
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          ) : (
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
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
                  {t('product.id') || '产品编号'}
                </label>
                <input
                  type="text"
                  name="productId"
                  value={filters.productId}
                  onChange={handleChange}
                  placeholder={t('enter.product.id') || '输入产品编号'}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('product.name') || '产品名称'}
                </label>
                <input
                  type="text"
                  name="productName"
                  value={filters.productName}
                  onChange={handleChange}
                  placeholder={t('enter.product.name') || '输入产品名称'}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('category') || '分类'}
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('min.price') || '最低价格'}
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">¥</span>
                  </div>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleChange}
                    placeholder={t('enter.min.price') || '输入最低价格'}
                    className="w-full pl-7 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('max.price') || '最高价格'}
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">¥</span>
                  </div>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleChange}
                    placeholder={t('enter.max.price') || '输入最高价格'}
                    className="w-full pl-7 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('status') || '状态'}
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm font-medium flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  {t('reset.filters') || '清除筛选'}
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                {t('apply.filters') || '应用筛选'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 