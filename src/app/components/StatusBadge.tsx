import React from 'react';
import { statusColors } from '../styles/theme';

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  // 获取状态对应的图标
  const getStatusIcon = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    
    if (normalizedStatus.includes('complete') || normalizedStatus.includes('完成')) {
      return (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    } else if (normalizedStatus.includes('process') || normalizedStatus.includes('处理')) {
      return (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    } else if (normalizedStatus.includes('pending') || normalizedStatus.includes('待')) {
      return (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else if (normalizedStatus.includes('ship') || normalizedStatus.includes('发货')) {
      return (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      );
    } else if (normalizedStatus.includes('cancel') || normalizedStatus.includes('取消')) {
      return (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    
    return null;
  };
  
  // 获取状态对应的颜色类
  const getStatusColorClass = (status: string) => {
    const normalizedStatus = status.toLowerCase().replace(/\s+/g, '');
    
    if (normalizedStatus.includes('complete') || normalizedStatus.includes('完成')) {
      return statusColors.completed;
    } else if (normalizedStatus.includes('process') || normalizedStatus.includes('处理')) {
      return statusColors.processing;
    } else if (normalizedStatus.includes('pending') || normalizedStatus.includes('待')) {
      return statusColors.pending;
    } else if (normalizedStatus.includes('ship') || normalizedStatus.includes('发货')) {
      return statusColors.shipped;
    } else if (normalizedStatus.includes('cancel') || normalizedStatus.includes('取消')) {
      return statusColors.cancelled;
    }
    
    return statusColors.pending; // 默认颜色
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${getStatusColorClass(status)}`}>
      {getStatusIcon(status)}
      {status}
    </span>
  );
} 