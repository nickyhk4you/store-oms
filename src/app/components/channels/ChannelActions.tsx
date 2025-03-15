'use client';

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import ViewChannelDetailsModal from './ViewChannelDetailsModal';
import SyncChannelModal from './SyncChannelModal';

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

interface ChannelActionsProps {
  channel: ChannelItem;
  onUpdate: () => void;
}

export default function ChannelActions({ channel, onUpdate }: ChannelActionsProps) {
  const { t } = useLanguage();
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);

  const handleSync = (data: any) => {
    console.log('Syncing channel:', data);
    // In a real app, you would call an API to sync the channel
    // Then update the UI
    onUpdate();
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => setViewDetailsModalOpen(true)}
        className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
        title={t('view.details')}
      >
        {t('view.details')}
      </button>
      
      <button
        onClick={() => setSyncModalOpen(true)}
        className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
        title={t('sync.now')}
      >
        {t('sync')}
      </button>

      {/* View Details Modal */}
      <ViewChannelDetailsModal
        isOpen={viewDetailsModalOpen}
        onClose={() => setViewDetailsModalOpen(false)}
        channel={channel}
      />

      {/* Sync Modal */}
      <SyncChannelModal
        isOpen={syncModalOpen}
        onClose={() => setSyncModalOpen(false)}
        channel={channel}
        onSync={handleSync}
      />
    </div>
  );
} 