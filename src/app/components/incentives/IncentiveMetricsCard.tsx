"use client"

import React from 'react';

interface IncentiveMetricsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: number;
  trendLabel: string;
}

export default function IncentiveMetricsCard({ title, value, icon, trend, trendLabel }: IncentiveMetricsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-[#C3A080]/20">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-[#6B4423] dark:text-[#C3A080] mt-1">{value}</p>
          <div className="flex items-center mt-2">
            <span className={`text-xs font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{trendLabel}</span>
          </div>
        </div>
        <div className="p-3 bg-[#F5EFE0] dark:bg-gray-700 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
} 