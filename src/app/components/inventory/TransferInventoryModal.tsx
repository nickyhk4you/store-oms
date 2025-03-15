'use client';

import { useState } from 'react';
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

interface TransferInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventoryItem: InventoryItem | null;
  onTransfer: (data: any) => void;
}

export default function TransferInventoryModal({ isOpen, onClose, inventoryItem, onTransfer }: TransferInventoryModalProps) {
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState<number>(1);
  const [destination, setDestination] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = () => {
    if (quantity <= 0 || quantity > (inventoryItem?.availableStock || 0)) {
      setError(t('invalid.quantity'));
      return;
    }
    
    if (!destination) {
      setError(t('destination.required'));
      return;
    }
    
    // In a real app, you would call an API to transfer inventory
    onTransfer({
      inventoryItemId: inventoryItem?.id,
      quantity,
      sourceLocation: inventoryItem?.location,
      destinationLocation: destination,
      notes,
      date: new Date().toISOString()
    });
    
    // Reset form and close modal
    setQuantity(1);
    setDestination('');
    setNotes('');
    setError('');
    onClose();
  };

  if (!isOpen || !inventoryItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('transfer.inventory')} - {inventoryItem.name}
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
        
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-300">{t('sku')}:</span>
              <span className="font-medium">{inventoryItem.sku}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-300">{t('source.location')}:</span>
              <span className="font-medium">{inventoryItem.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">{t('available.stock')}:</span>
              <span className="font-medium">{inventoryItem.availableStock}</span>
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded-md">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="quantity">
              {t('transfer.quantity')} <span className="text-red-500">*</span>
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={inventoryItem.availableStock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="destination">
              {t('destination.location')} <span className="text-red-500">*</span>
            </label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
            >
              <option value="">{t('select.destination')}</option>
              <option value="Online Warehouse">{t('online.warehouse')}</option>
              <option value="Beijing Flagship Store">{t('beijing.flagship.store')}</option>
              <option value="Shanghai Store">{t('shanghai.store')}</option>
              <option value="Guangzhou Store">{t('guangzhou.store')}</option>
              <option value="Shenzhen Store">{t('shenzhen.store')}</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="notes">
              {t('notes')}
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
              placeholder={t('enter.notes')}
            ></textarea>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t('transfer')}
          </button>
        </div>
      </div>
    </div>
  );
} 