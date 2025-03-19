"use client"

import React from 'react';

interface StorePerformance {
  storeId: string;
  storeName: string;
  location: string;
  ordersFulfilled: number;
  totalOrderValue: number;
  avgDeliveryTime: number;
  customerRating: number;
  incentiveEarned: number;
  pointsEarned: number;
}

interface StorePerformanceTableProps {
  stores: StorePerformance[];
  language: string;
  onViewDetails: (storeId: string) => void;
}

export default function StorePerformanceTable({ 
  stores, 
  language, 
  onViewDetails 
}: StorePerformanceTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[#C3A080]/20">
        <thead className="bg-[#F5EFE0] dark:bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B4423] dark:text-[#C3A080] uppercase tracking-wider">
              {language === 'zh' ? '门店' : 'Store'}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B4423] dark:text-[#C3A080] uppercase tracking-wider">
              {language === 'zh' ? '配送订单数' : 'Orders Fulfilled'}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B4423] dark:text-[#C3A080] uppercase tracking-wider">
              {language === 'zh' ? '订单总金额' : 'Total Order Value'}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B4423] dark:text-[#C3A080] uppercase tracking-wider">
              {language === 'zh' ? '平均配送时间' : 'Avg. Delivery Time'}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B4423] dark:text-[#C3A080] uppercase tracking-wider">
              {language === 'zh' ? '客户评分' : 'Customer Rating'}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B4423] dark:text-[#C3A080] uppercase tracking-wider">
              {language === 'zh' ? '激励金额' : 'Incentive Earned'}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B4423] dark:text-[#C3A080] uppercase tracking-wider">
              {language === 'zh' ? '积分' : 'Points'}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#6B4423] dark:text-[#C3A080] uppercase tracking-wider">
              {language === 'zh' ? '操作' : 'Actions'}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-[#C3A080]/20">
          {stores.map((store) => (
            <tr key={store.storeId}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {store.storeName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {store.location}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {store.ordersFulfilled}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {language === 'zh' ? `¥${store.totalOrderValue.toLocaleString()}` : `$${(store.totalOrderValue / 7).toLocaleString()}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {store.avgDeliveryTime} {language === 'zh' ? '分钟' : 'mins'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="text-sm text-gray-900 dark:text-white mr-2">{store.customerRating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(store.customerRating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {language === 'zh' ? `¥${store.incentiveEarned.toLocaleString()}` : `$${(store.incentiveEarned / 7).toLocaleString()}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {store.pointsEarned}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  onClick={() => onViewDetails(store.storeId)}
                  className="text-[#6B4423] hover:text-[#5A371D] dark:text-[#C3A080] dark:hover:text-[#B39070] mr-3"
                >
                  {language === 'zh' ? '详情' : 'Details'}
                </button>
                <button className="text-[#6B4423] hover:text-[#5A371D] dark:text-[#C3A080] dark:hover:text-[#B39070]">
                  {language === 'zh' ? '导出' : 'Export'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 