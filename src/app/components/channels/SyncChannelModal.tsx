'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

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

interface SyncChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  channel: ChannelItem | null;
  onSync: (data: any) => void;
}

export default function SyncChannelModal({ isOpen, onClose, channel, onSync }: SyncChannelModalProps) {
  const { t } = useLanguage();
  const [syncOptions, setSyncOptions] = useState({
    products: true,
    inventory: true,
    orders: true,
    prices: true
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncMessage, setSyncMessage] = useState('');

  const handleOptionChange = (option: keyof typeof syncOptions) => {
    setSyncOptions({
      ...syncOptions,
      [option]: !syncOptions[option]
    });
  };

  const handleSync = async () => {
    if (!channel) return;
    
    // Check if at least one option is selected
    if (!Object.values(syncOptions).some(value => value)) {
      setSyncMessage(t('select.at.least.one.option'));
      return;
    }
    
    setIsSyncing(true);
    setSyncMessage(t('sync.started'));
    setSyncProgress(0);
    
    // Simulate sync process with progress updates
    const totalSteps = Object.values(syncOptions).filter(Boolean).length;
    let currentStep = 0;
    
    // Simulate syncing products
    if (syncOptions.products) {
      await simulateSync(t('syncing.products'));
      currentStep++;
      setSyncProgress(Math.round((currentStep / totalSteps) * 100));
    }
    
    // Simulate syncing inventory
    if (syncOptions.inventory) {
      await simulateSync(t('syncing.inventory'));
      currentStep++;
      setSyncProgress(Math.round((currentStep / totalSteps) * 100));
    }
    
    // Simulate syncing orders
    if (syncOptions.orders) {
      await simulateSync(t('syncing.orders'));
      currentStep++;
      setSyncProgress(Math.round((currentStep / totalSteps) * 100));
    }
    
    // Simulate syncing prices
    if (syncOptions.prices) {
      await simulateSync(t('syncing.prices'));
      currentStep++;
      setSyncProgress(Math.round((currentStep / totalSteps) * 100));
    }
    
    // Complete sync
    setSyncMessage(t('sync.completed'));
    
    // In a real app, you would call an API to sync the channel
    onSync({
      channelId: channel.id,
      syncOptions,
      timestamp: new Date().toISOString()
    });
    
    // Reset and close after a delay
    setTimeout(() => {
      setIsSyncing(false);
      setSyncProgress(0);
      setSyncMessage('');
      onClose();
    }, 1500);
  };
  
  // Helper function to simulate async operations
  const simulateSync = async (message: string) => {
    setSyncMessage(message);
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  if (!isOpen || !channel) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('sync.channel')} - {channel.name}
          </h2>
          {!isSyncing && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-300">{t('channel.id')}:</span>
              <span className="font-medium">{channel.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-300">{t('last.sync')}:</span>
              <span className="font-medium">{channel.lastSync}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">{t('sync.status')}:</span>
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
          
          {syncMessage && (
            <div className={`mb-4 p-3 rounded-md ${
              syncMessage === t('select.at.least.one.option')
                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            }`}>
              {syncMessage}
            </div>
          )}
          
          {isSyncing ? (
            <div className="mb-6">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{syncProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${syncProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('select.sync.options')}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="sync-products"
                    type="checkbox"
                    checked={syncOptions.products}
                    onChange={() => handleOptionChange('products')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sync-products" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    {t('sync.products')}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="sync-inventory"
                    type="checkbox"
                    checked={syncOptions.inventory}
                    onChange={() => handleOptionChange('inventory')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sync-inventory" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    {t('sync.inventory')}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="sync-orders"
                    type="checkbox"
                    checked={syncOptions.orders}
                    onChange={() => handleOptionChange('orders')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sync-orders" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    {t('sync.orders')}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="sync-prices"
                    type="checkbox"
                    checked={syncOptions.prices}
                    onChange={() => handleOptionChange('prices')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sync-prices" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    {t('sync.prices')}
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          {!isSyncing && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleSync}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {t('sync.now')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 