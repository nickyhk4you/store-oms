'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChannelItem {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'pending';
  lastSync: string;
  syncStatus: 'success' | 'partial' | 'failed';
  productCount: number;
  orderCount: number;
  revenue: number;
}

interface ViewChannelDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  channel: ChannelItem | null;
}

export default function ViewChannelDetailsModal({ isOpen, onClose, channel }: ViewChannelDetailsModalProps) {
  const { t } = useLanguage();
  const [inventoryData, setInventoryData] = useState<any>(null);
  const [salesData, setSalesData] = useState<any>(null);

  useEffect(() => {
    if (isOpen && channel) {
      // In a real app, you would fetch data from an API
      // For now, we'll use mock data
      
      // Mock inventory data
      setInventoryData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: t('inventory.level'),
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
      
      // Mock sales data
      setSalesData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: t('sales'),
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [isOpen, channel, t]);

  if (!isOpen || !channel) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('channel.details')} - {channel.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('channel.information')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('channel.id')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{channel.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('channel.type')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{channel.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('status')}:</span>
                  <span className={`font-medium ${
                    channel.status === 'active' 
                      ? 'text-green-600 dark:text-green-400' 
                      : channel.status === 'inactive' 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {t(`status.${channel.status}`)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('last.sync')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{channel.lastSync}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('sync.status')}:</span>
                  <span className={`font-medium ${
                    channel.syncStatus === 'success' 
                      ? 'text-green-600 dark:text-green-400' 
                      : channel.syncStatus === 'partial' 
                        ? 'text-yellow-600 dark:text-yellow-400' 
                        : 'text-red-600 dark:text-red-400'
                  }`}>
                    {t(`sync.${channel.syncStatus}`)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('channel.statistics')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('product.count')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{channel.productCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('order.count')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{channel.orderCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('revenue')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">¥{channel.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('avg.order.value')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ¥{channel.orderCount > 0 ? (channel.revenue / channel.orderCount).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('inventory.trend')}</h3>
              {inventoryData ? (
                <div className="h-64">
                  <Bar 
                    data={inventoryData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top' as const,
                        },
                        title: {
                          display: true,
                          text: t('inventory.trend.by.month')
                        },
                      },
                    }} 
                  />
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">{t('loading.data')}</p>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('sales.trend')}</h3>
              {salesData ? (
                <div className="h-64">
                  <Bar 
                    data={salesData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top' as const,
                        },
                        title: {
                          display: true,
                          text: t('sales.trend.by.month')
                        },
                      },
                    }} 
                  />
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">{t('loading.data')}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('recent.activity')}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-600">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('date')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('activity')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('details')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('user')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      2023-06-28 09:15
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {t('sync.completed')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {t('sync.products.inventory')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      System
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      2023-06-27 14:30
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {t('order.received')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {t('order')} #12345
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      Customer
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      2023-06-26 11:45
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        {t('product.updated')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {t('product')} SKU-001
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      Admin
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
} 