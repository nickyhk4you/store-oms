'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from "../contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import ChannelActions from '../components/channels/ChannelActions';

// 渠道数据接口
interface Channel {
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

export default function ChannelsPage() {
  const { t } = useLanguage();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟从API获取渠道数据
    const fetchChannels = async () => {
      // 在实际应用中，这里会调用API
      setTimeout(() => {
        const mockChannels: Channel[] = [
          {
            id: 'ch-001',
            name: t('channel.taobao'),
            type: 'marketplace',
            status: 'active',
            lastSync: '2023-06-28 09:15',
            syncStatus: 'success',
            productCount: 1250,
            orderCount: 856,
            revenue: 125680
          },
          {
            id: 'ch-002',
            name: t('channel.jd'),
            type: 'marketplace',
            status: 'active',
            lastSync: '2023-06-28 08:30',
            syncStatus: 'success',
            productCount: 980,
            orderCount: 723,
            revenue: 98450
          },
          {
            id: 'ch-003',
            name: t('channel.xiaohongshu'),
            type: 'social',
            status: 'active',
            lastSync: '2023-06-27 15:45',
            syncStatus: 'partial',
            productCount: 450,
            orderCount: 312,
            revenue: 42680
          },
          {
            id: 'ch-004',
            name: t('channel.douyin'),
            type: 'social',
            status: 'pending',
            lastSync: '2023-06-27 10:20',
            syncStatus: 'failed',
            productCount: 320,
            orderCount: 178,
            revenue: 23450
          },
          {
            id: 'ch-005',
            name: t('channel.wechat'),
            type: 'social',
            status: 'active',
            lastSync: '2023-06-28 07:45',
            syncStatus: 'success',
            productCount: 680,
            orderCount: 425,
            revenue: 56780
          },
          {
            id: 'ch-006',
            name: t('channel.offline'),
            type: 'offline',
            status: 'active',
            lastSync: '2023-06-28 09:00',
            syncStatus: 'success',
            productCount: 350,
            orderCount: 124,
            revenue: 78950
          }
        ];
        setChannels(mockChannels);
        setLoading(false);
      }, 1000);
    };

    fetchChannels();
  }, [t]);

  // 渲染状态标签
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            {t('status.active')}
          </span>
        );
      case 'inactive':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {t('status.inactive')}
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            {t('status.pending')}
          </span>
        );
      default:
        return null;
    }
  };

  // 渲染同步状态标签
  const renderSyncStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            {t('sync.success')}
          </span>
        );
      case 'partial':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            {t('sync.partial')}
          </span>
        );
      case 'failed':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            {t('sync.failed')}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('channel.management')}</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          {t('add.channel')}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('channel')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('type')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('status')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('last.sync')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('sync.status')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('product.count')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('order.count')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {channels.map((channel) => (
                  <tr key={channel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
                            {channel.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {channel.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {channel.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {channel.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatusBadge(channel.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {channel.lastSync}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderSyncStatusBadge(channel.syncStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {channel.productCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {channel.orderCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <ChannelActions 
                        channel={channel} 
                        onUpdate={() => {
                          // 在实际应用中，你会刷新数据
                          console.log('Channel updated');
                          // 可选地刷新数据
                          // setChannels([...channels]);
                        }} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 