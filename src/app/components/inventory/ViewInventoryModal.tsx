'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  location: string;
  totalStock: number;
  availableStock: number;
  reservedStock: number;
  lastUpdated: string;
}

interface ViewInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventoryItem: InventoryItem | null;
}

export default function ViewInventoryModal({ isOpen, onClose, inventoryItem }: ViewInventoryModalProps) {
  const { t } = useLanguage();
  const [historyData, setHistoryData] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen && inventoryItem) {
      // In a real app, you would fetch history data from an API
      // For now, we'll use mock data
      setHistoryData([
        {
          id: '1',
          date: '2023-11-15',
          type: 'received',
          quantity: 50,
          location: inventoryItem.location,
          user: 'Admin User'
        },
        {
          id: '2',
          date: '2023-11-20',
          type: 'adjusted',
          quantity: -5,
          reason: 'Damaged goods',
          location: inventoryItem.location,
          user: 'Store Manager'
        },
        {
          id: '3',
          date: '2023-12-01',
          type: 'transferred',
          quantity: -10,
          fromLocation: inventoryItem.location,
          toLocation: 'Shanghai Store',
          user: 'Inventory Manager'
        }
      ]);
    }
  }, [isOpen, inventoryItem]);

  if (!isOpen || !inventoryItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('view.inventory')} - {inventoryItem.name}
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
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('inventory.details')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('sku')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{inventoryItem.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('location')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{inventoryItem.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('total.stock')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{inventoryItem.totalStock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('available.stock')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{inventoryItem.availableStock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('reserved.stock')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{inventoryItem.reservedStock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('last.updated')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{inventoryItem.lastUpdated}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('channel.distribution')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('channel.xiaohongshu')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('channel.jd')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('channel.taobao')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('channel.douyin')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('channel.offline')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{inventoryItem.totalStock - 50}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('inventory.activity')}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('date')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('type')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('quantity')}
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
                  {historyData.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.type === 'received' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : item.type === 'adjusted' 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        }`}>
                          {t(`stock.${item.type}.status`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {item.quantity > 0 ? `+${item.quantity}` : item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {item.type === 'adjusted' && item.reason}
                        {item.type === 'transferred' && `${t('from.label')} ${item.fromLocation} ${t('to')} ${item.toLocation}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {item.user}
                      </td>
                    </tr>
                  ))}
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
            {t('close.button')}
          </button>
        </div>
      </div>
    </div>
  );
} 