'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import ViewInventoryModal from './ViewInventoryModal';
import AdjustInventoryModal from './AdjustInventoryModal';
import TransferInventoryModal from './TransferInventoryModal';

// Update the interface to match the actual data structure in inventory/page.tsx
interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  totalStock: number;
  availableStock: number;
  reservedStock: number;
  locations: {
    id: string;
    name: string;
    type: 'online' | 'offline';
    stock: number;
  }[];
  lastUpdated: string;
  lowStockThreshold: number;
}

interface InventoryActionsProps {
  item: InventoryItem;
  onUpdate: () => void;
}

export default function InventoryActions({ item, onUpdate }: InventoryActionsProps) {
  const { t } = useLanguage();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);

  // Create a simplified item for the modals
  const simplifiedItem = {
    id: item.id,
    sku: item.sku,
    name: item.productName,
    location: item.locations.length > 0 ? item.locations[0].name : '',
    totalStock: item.totalStock,
    availableStock: item.availableStock,
    reservedStock: item.reservedStock,
    lastUpdated: item.lastUpdated
  };

  const handleAdjust = (data: any) => {
    console.log('Adjusting inventory:', data);
    // In a real app, you would call an API to adjust inventory
    // Then update the UI
    onUpdate();
  };

  const handleTransfer = (data: any) => {
    console.log('Transferring inventory:', data);
    // In a real app, you would call an API to transfer inventory
    // Then update the UI
    onUpdate();
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => setViewModalOpen(true)}
        className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
        title={t('view.details')}
      >
        {t('view')}
      </button>
      
      <button
        onClick={() => setAdjustModalOpen(true)}
        className="px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-md hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800"
        title={t('adjust.inventory')}
      >
        {t('adjust')}
      </button>
      
      <button
        onClick={() => setTransferModalOpen(true)}
        className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
        title={t('transfer.inventory')}
      >
        {t('transfer')}
      </button>

      {/* View Modal */}
      <ViewInventoryModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        inventoryItem={simplifiedItem}
      />

      {/* Adjust Modal */}
      <AdjustInventoryModal
        isOpen={adjustModalOpen}
        onClose={() => setAdjustModalOpen(false)}
        inventoryItem={simplifiedItem}
        onAdjust={handleAdjust}
      />

      {/* Transfer Modal */}
      <TransferInventoryModal
        isOpen={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        inventoryItem={simplifiedItem}
        onTransfer={handleTransfer}
      />
    </div>
  );
} 