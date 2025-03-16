import React from 'react';

// 获取订单状态对应的颜色类
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case '已完成':
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case '处理中':
    case 'processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case '待处理':
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case '已发货':
    case 'shipped':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case '已取消':
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

// 获取渠道对应的图标
export function getChannelIcon(channel: string): React.ReactElement {
  // 根据渠道名称返回对应的图标
  const iconClass = "w-5 h-5 text-gray-500 dark:text-gray-400";
  
  switch (channel.toLowerCase()) {
    case '小红书':
    case 'xiaohongshu':
      return (
        <div className="flex items-center">
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M11 7h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
          <span className="ml-2">{channel}</span>
        </div>
      );
    case '京东':
    case 'jd.com':
      return (
        <div className="flex items-center">
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
          </svg>
          <span className="ml-2">{channel}</span>
        </div>
      );
    // 添加更多渠道的图标
    default:
      return (
        <div className="flex items-center">
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          <span className="ml-2">{channel}</span>
        </div>
      );
  }
} 